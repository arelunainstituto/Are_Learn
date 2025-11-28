import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateStockReservationDto } from './dto/create-stock-reservation.dto';
import { UpdateStockReservationDto } from './dto/update-stock-reservation.dto';

export enum ReservationStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  ACTIVE = 'ACTIVE',
  FULFILLED = 'FULFILLED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

@Injectable()
export class StockReservationsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createStockReservationDto: CreateStockReservationDto) {
    // Validate product exists
    const product = await (this.prisma as any).product.findFirst({
      where: {
        id: createStockReservationDto.productId,
        tenantId,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID '${createStockReservationDto.productId}' not found`);
    }

    // Validate variant if provided
    if (createStockReservationDto.variantId) {
      const variant = await (this.prisma as any).productVariant.findFirst({
        where: {
          id: createStockReservationDto.variantId,
          productId: createStockReservationDto.productId,
          tenantId,
        },
      });

      if (!variant) {
        throw new NotFoundException(`Product variant with ID '${createStockReservationDto.variantId}' not found`);
      }
    }

    // Validate warehouse
    const warehouse = await (this.prisma as any).warehouse.findFirst({
      where: {
        id: createStockReservationDto.warehouseId,
        tenantId,
      },
    });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID '${createStockReservationDto.warehouseId}' not found`);
    }

    // Check available stock
    const availableStock = await this.getAvailableStock(
      tenantId,
      createStockReservationDto.productId,
      createStockReservationDto.variantId,
      createStockReservationDto.warehouseId,
      createStockReservationDto.locationId,
    );

    if (availableStock < createStockReservationDto.quantity) {
      throw new BadRequestException(
        `Insufficient stock. Available: ${availableStock}, Requested: ${createStockReservationDto.quantity}`
      );
    }

    // Create reservation in a transaction
    return (this.prisma as any).$transaction(async (tx: any) => {
      // Create the reservation
      const reservation = await tx.stockReservation.create({
        data: {
          tenantId,
          productId: createStockReservationDto.productId,
          variantId: createStockReservationDto.variantId,
          warehouseId: createStockReservationDto.warehouseId,
          locationId: createStockReservationDto.locationId,
          batchId: createStockReservationDto.batchId,
          seriesId: createStockReservationDto.seriesId,
          quantity: createStockReservationDto.quantity,
          reservedQuantity: createStockReservationDto.quantity,
          fulfilledQuantity: 0,
          status: ReservationStatus.PENDING,
          type: createStockReservationDto.type,
          referenceId: createStockReservationDto.referenceId,
          referenceType: createStockReservationDto.referenceType,
          expiresAt: createStockReservationDto.expiresAt,
          priority: createStockReservationDto.priority,
          notes: createStockReservationDto.notes,
          metadata: createStockReservationDto.metadata,
        },
        include: {
          product: true,
          productVariant: true,
          warehouse: true,
          location: true,
          batch: true,
          series: true,
          document: true,
        },
      });

      // Update stock balance to reflect reservation
      await this.updateStockBalance(tx, reservation, 'RESERVE');

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'StockReservation',
          entityId: reservation.id,
          action: 'CREATE',
          changes: JSON.stringify(reservation),
          userId: 'system', // TODO: Get from context
        },
      });

      return reservation;
    });
  }

  async findAll(
    tenantId: string,
    productId?: string,
    warehouseId?: string,
    locationId?: string,
    status?: ReservationStatus,
    referenceId?: string,
    limit = 50,
    offset = 0
  ) {
    const where: any = { tenantId };

    if (productId) {
      where.productId = productId;
    }

    if (warehouseId) {
      where.warehouseId = warehouseId;
    }

    if (locationId) {
      where.locationId = locationId;
    }

    if (status) {
      where.status = status;
    }

    if (referenceId) {
      where.referenceId = referenceId;
    }

    return (this.prisma as any).stockReservation.findMany({
      where,
      include: {
        product: {
          select: { id: true, sku: true, name: true },
        },
        productVariant: {
          select: { id: true, sku: true, name: true },
        },
        warehouse: {
          select: { id: true, code: true, name: true },
        },
        location: {
          select: { id: true, code: true, name: true },
        },
        batch: {
          select: { id: true, batchNumber: true },
        },
        series: {
          select: { id: true, serialNumber: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async getAvailableStockSummary(
    tenantId: string,
    productId?: string,
    warehouseId?: string,
    locationId?: string,
  ) {
    const where: any = { tenantId };

    if (productId) {
      where.productId = productId;
    }

    if (warehouseId) {
      where.warehouseId = warehouseId;
    }

    if (locationId) {
      where.locationId = locationId;
    }

    // Get total stock balances
    const stockBalances = await (this.prisma as any).stockBalance.findMany({
      where,
      select: {
        productId: true,
        variantId: true,
        warehouseId: true,
        locationId: true,
        quantity: true,
        reservedQuantity: true,
        product: {
          select: { id: true, sku: true, name: true },
        },
        productVariant: {
          select: { id: true, sku: true, name: true },
        },
        warehouse: {
          select: { id: true, code: true, name: true },
        },
        location: {
          select: { id: true, code: true, name: true },
        },
      },
    });

    return stockBalances.map(balance => ({
      ...balance,
      availableQuantity: balance.quantity - balance.reservedQuantity,
    }));
  }

  async findOne(tenantId: string, id: string) {
    const reservation = await (this.prisma as any).stockReservation.findFirst({
      where: { id, tenantId },
      include: {
        product: true,
        productVariant: true,
        warehouse: true,
        location: true,
        batch: true,
        series: true,
        document: true,
      },
    });

    if (!reservation) {
      throw new NotFoundException(`Stock reservation with ID '${id}' not found`);
    }

    return reservation;
  }

  async update(tenantId: string, id: string, updateStockReservationDto: UpdateStockReservationDto) {
    const existingReservation = await (this.prisma as any).stockReservation.findFirst({
      where: { id, tenantId },
    });

    if (!existingReservation) {
      throw new NotFoundException(`Stock reservation with ID '${id}' not found`);
    }

    return (this.prisma as any).$transaction(async (tx: any) => {
      const updatedReservation = await tx.stockReservation.update({
        where: { id },
        data: {
          ...updateStockReservationDto,
          updatedAt: new Date(),
        },
        include: {
          product: true,
          productVariant: true,
          warehouse: true,
          location: true,
          batch: true,
          series: true,
          document: true,
        },
      });

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'StockReservation',
          entityId: id,
          action: 'UPDATE',
          changes: JSON.stringify(updateStockReservationDto),
          userId: 'system', // TODO: Get from context
        },
      });

      return updatedReservation;
    });
  }

  async remove(tenantId: string, id: string) {
    const existingReservation = await (this.prisma as any).stockReservation.findFirst({
      where: { id, tenantId },
    });

    if (!existingReservation) {
      throw new NotFoundException(`Stock reservation with ID '${id}' not found`);
    }

    return (this.prisma as any).$transaction(async (tx: any) => {
      // Cancel the reservation first
      const cancelledReservation = await tx.stockReservation.update({
        where: { id },
        data: {
          status: ReservationStatus.CANCELLED,
          updatedAt: new Date(),
        },
      });

      // Release the reserved stock
      await this.updateStockBalance(tx, cancelledReservation, 'RELEASE');

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'StockReservation',
          entityId: id,
          action: 'DELETE',
          changes: JSON.stringify({ status: ReservationStatus.CANCELLED }),
          userId: 'system', // TODO: Get from context
        },
      });

      return cancelledReservation;
    });
  }

  async confirm(tenantId: string, id: string) {
    const reservation = await (this.prisma as any).stockReservation.findFirst({
      where: { id, tenantId },
    });

    if (!reservation) {
      throw new NotFoundException(`Stock reservation with ID '${id}' not found`);
    }

    if (reservation.status !== ReservationStatus.PENDING) {
      throw new BadRequestException(`Cannot confirm reservation with status '${reservation.status}'`);
    }

    return (this.prisma as any).$transaction(async (tx: any) => {
      const confirmedReservation = await tx.stockReservation.update({
        where: { id },
        data: {
          status: ReservationStatus.CONFIRMED,
          updatedAt: new Date(),
        },
        include: {
          product: true,
          productVariant: true,
          warehouse: true,
          location: true,
          batch: true,
          series: true,
          document: true,
        },
      });

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'StockReservation',
          entityId: id,
          action: 'UPDATE',
          changes: JSON.stringify({ status: ReservationStatus.CONFIRMED }),
          userId: 'system', // TODO: Get from context
        },
      });

      return confirmedReservation;
    });
  }

  async fulfill(tenantId: string, id: string, quantity?: number) {
    const reservation = await (this.prisma as any).stockReservation.findFirst({
      where: { id, tenantId },
    });

    if (!reservation) {
      throw new NotFoundException(`Stock reservation with ID '${id}' not found`);
    }

    if (reservation.status !== ReservationStatus.CONFIRMED) {
      throw new BadRequestException(`Cannot fulfill reservation with status '${reservation.status}'`);
    }

    const quantityToFulfill = quantity || reservation.reservedQuantity;
    const remainingQuantity = reservation.reservedQuantity - reservation.fulfilledQuantity;

    if (quantityToFulfill > remainingQuantity) {
      throw new BadRequestException(
        `Cannot fulfill ${quantityToFulfill} units. Only ${remainingQuantity} units remaining.`
      );
    }

    return (this.prisma as any).$transaction(async (tx: any) => {
      const newFulfilledQuantity = reservation.fulfilledQuantity + quantityToFulfill;
      const newReservedQuantity = reservation.reservedQuantity - quantityToFulfill;
      const isFullyFulfilled = newReservedQuantity === 0;

      const fulfilledReservation = await tx.stockReservation.update({
        where: { id },
        data: {
          fulfilledQuantity: newFulfilledQuantity,
          reservedQuantity: newReservedQuantity,
          status: isFullyFulfilled ? ReservationStatus.FULFILLED : ReservationStatus.CONFIRMED,
          updatedAt: new Date(),
        },
        include: {
          product: true,
          productVariant: true,
          warehouse: true,
          location: true,
          batch: true,
          series: true,
          document: true,
        },
      });

      // Update stock balance to reflect fulfillment
      await this.updateStockBalance(tx, { ...reservation, quantity: quantityToFulfill }, 'FULFILL');

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'StockReservation',
          entityId: id,
          action: 'UPDATE',
          changes: JSON.stringify({ status: ReservationStatus.FULFILLED, fulfilledQuantity: quantityToFulfill }),
          userId: 'system', // TODO: Get from context
        },
      });

      return fulfilledReservation;
    });
  }

  async cancel(tenantId: string, id: string, reason?: string) {
    const reservation = await (this.prisma as any).stockReservation.findFirst({
      where: { id, tenantId },
    });

    if (!reservation) {
      throw new NotFoundException(`Stock reservation with ID '${id}' not found`);
    }

    if (reservation.status !== ReservationStatus.PENDING && reservation.status !== ReservationStatus.CONFIRMED) {
      throw new BadRequestException(`Cannot cancel reservation with status '${reservation.status}'`);
    }

    return this.prisma.$transaction(async (tx) => {
      // Update reservation status
      const updatedReservation = await (tx as any).stockReservation.update({
        where: { id },
        data: {
          status: ReservationStatus.CANCELLED,
          updatedAt: new Date(),
        },
      });

      // Release reserved stock
      await this.updateStockBalance(tx, reservation, 'RELEASE');

      // Create audit trail
      await (tx as any).auditTrail.create({
        data: {
          tenantId,
          entityType: 'StockReservation',
          entityId: id,
          action: 'CANCEL',
          changes: {
            status: {
              from: reservation.status,
              to: ReservationStatus.CANCELLED,
            },
            reason: reason || 'Manual cancellation',
          },
          userId: 'system', // TODO: Get from context
          timestamp: new Date(),
        },
      });

      return updatedReservation;
    });
  }

  private async getAvailableStock(
    tenantId: string,
    productId: string,
    variantId?: string,
    warehouseId?: string,
    locationId?: string,
  ): Promise<number> {
    const where: any = { tenantId, productId };

    if (variantId) where.variantId = variantId;
    if (warehouseId) where.warehouseId = warehouseId;
    if (locationId) where.locationId = locationId;

    const balance = await (this.prisma as any).stockBalance.findFirst({
      where,
    });

    return balance ? balance.quantity - balance.reservedQuantity : 0;
  }

  private async updateStockBalance(tx: any, reservation: any, action: 'RESERVE' | 'RELEASE' | 'FULFILL') {
    const where: any = {
      tenantId: reservation.tenantId,
      productId: reservation.productId,
      warehouseId: reservation.warehouseId,
    };

    if (reservation.variantId) where.variantId = reservation.variantId;
    if (reservation.locationId) where.locationId = reservation.locationId;
    if (reservation.batchId) where.batchId = reservation.batchId;
    if (reservation.seriesId) where.seriesId = reservation.seriesId;

    let balance = await tx.stockBalance.findFirst({ where });

    if (!balance) {
      // Create new balance if it doesn't exist
      balance = await tx.stockBalance.create({
        data: {
          ...where,
          quantity: 0,
          reservedQuantity: 0,
          availableQuantity: 0,
        },
      });
    }

    let updateData: any = {};

    switch (action) {
      case 'RESERVE':
        updateData = {
          reservedQuantity: balance.reservedQuantity + reservation.quantity,
          availableQuantity: balance.quantity - (balance.reservedQuantity + reservation.quantity),
        };
        break;
      case 'RELEASE':
        updateData = {
          reservedQuantity: Math.max(0, balance.reservedQuantity - reservation.reservedQuantity),
          availableQuantity: balance.quantity - Math.max(0, balance.reservedQuantity - reservation.reservedQuantity),
        };
        break;
      case 'FULFILL':
        updateData = {
          quantity: balance.quantity - reservation.quantity,
          reservedQuantity: Math.max(0, balance.reservedQuantity - reservation.quantity),
          availableQuantity: (balance.quantity - reservation.quantity) - Math.max(0, balance.reservedQuantity - reservation.quantity),
        };
        break;
    }

    await tx.stockBalance.update({
      where: { id: balance.id },
      data: updateData,
    });
  }
}