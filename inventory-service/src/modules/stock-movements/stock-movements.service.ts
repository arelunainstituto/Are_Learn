import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateStockMovementDto, MovementType, CreateMovementDto } from './dto/create-stock-movement.dto';
import { MovementCreateInput } from '@areluna/schemas';

@Injectable()
export class StockMovementsService {
  constructor(private prisma: PrismaService) {}

  // New Zod-validated method for creating movements
  async createMovement(input: MovementCreateInput) {
    // For now, delegate to the existing create method with adapted parameters
    // This provides a bridge between the new Zod schema and existing implementation
    const legacyDto: CreateStockMovementDto = {
      productId: input.productId,
      variantId: input.variantId,
      type: input.type as any, // Type conversion for compatibility
      reason: 'ADJUSTMENT_POSITIVE' as any, // Default reason
      quantity: input.qty,
      warehouseId: input.fromLocationId || input.toLocationId || '', // Simplified for now
      locationId: input.toLocationId || input.fromLocationId || '',
      destinationWarehouseId: input.toLocationId,
      destinationLocationId: input.toLocationId,
      batchId: input.lotId,
      seriesId: input.serial,
      documentId: input.refDocumentId,
      notes: input.note,
    };

    return this.create(input.tenantId, legacyDto);
  }

  async create(tenantId: string, createStockMovementDto: CreateStockMovementDto) {
    // Validate product exists
    const product = await (this.prisma as any).product.findFirst({
      where: {
        id: createStockMovementDto.productId,
        tenantId,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID '${createStockMovementDto.productId}' not found`);
    }

    // Validate variant if provided
    if (createStockMovementDto.variantId) {
      const variant = await (this.prisma as any).productVariant.findFirst({
        where: {
          id: createStockMovementDto.variantId,
          productId: createStockMovementDto.productId,
          tenantId,
        },
      });

      if (!variant) {
        throw new NotFoundException(`Product variant with ID '${createStockMovementDto.variantId}' not found`);
      }
    }

    // Validate warehouse
    const warehouse = await (this.prisma as any).warehouse.findFirst({
      where: {
        id: createStockMovementDto.warehouseId,
        tenantId,
      },
    });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID '${createStockMovementDto.warehouseId}' not found`);
    }

    // Validate location if provided
    if (createStockMovementDto.locationId) {
      const location = await (this.prisma as any).location.findFirst({
        where: {
          id: createStockMovementDto.locationId,
          warehouseId: createStockMovementDto.warehouseId,
          tenantId,
        },
      });

      if (!location) {
        throw new NotFoundException(`Location with ID '${createStockMovementDto.locationId}' not found`);
      }
    }

    // Validate batch if provided
    if (createStockMovementDto.batchId) {
      const batch = await (this.prisma as any).batch.findFirst({
        where: {
          id: createStockMovementDto.batchId,
          tenantId,
        },
      });

      if (!batch) {
        throw new NotFoundException(`Batch with ID '${createStockMovementDto.batchId}' not found`);
      }
    }

    // Validate series if provided
    if (createStockMovementDto.seriesId) {
      const series = await (this.prisma as any).series.findFirst({
        where: {
          id: createStockMovementDto.seriesId,
          tenantId,
        },
      });

      if (!series) {
        throw new NotFoundException(`Series with ID '${createStockMovementDto.seriesId}' not found`);
      }
    }

    // For outbound movements, check if there's enough stock
    if (['OUT', 'TRANSFER_OUT', 'ADJUSTMENT_NEGATIVE'].includes(createStockMovementDto.type)) {
      const currentBalance = await this.getStockBalance(
        tenantId,
        createStockMovementDto.productId,
        createStockMovementDto.variantId,
        createStockMovementDto.warehouseId,
        createStockMovementDto.locationId,
      );

      if (currentBalance < createStockMovementDto.quantity) {
        throw new BadRequestException(
          `Insufficient stock. Available: ${currentBalance}, Requested: ${createStockMovementDto.quantity}`
        );
      }
    }

    // Create the movement in a transaction
    return (this.prisma as any).$transaction(async (tx: any) => {
      // Create the stock movement
      const movement = await tx.stockMovement.create({
        data: {
          tenantId,
          productId: createStockMovementDto.productId,
          variantId: createStockMovementDto.variantId,
          type: createStockMovementDto.type,
          reason: createStockMovementDto.reason,
          quantity: createStockMovementDto.quantity,
          warehouseId: createStockMovementDto.warehouseId,
          locationId: createStockMovementDto.locationId,
          destinationWarehouseId: createStockMovementDto.destinationWarehouseId,
          destinationLocationId: createStockMovementDto.destinationLocationId,
          batchId: createStockMovementDto.batchId,
          seriesId: createStockMovementDto.seriesId,
          documentId: createStockMovementDto.documentId,
          notes: createStockMovementDto.notes,
          unitCost: createStockMovementDto.unitCost,
          totalCost: createStockMovementDto.unitCost ? 
            createStockMovementDto.unitCost * createStockMovementDto.quantity : null,
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

      // Update stock balances
      await this.updateStockBalances(tx, movement);

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'StockMovement',
          entityId: movement.id,
          action: 'CREATE',
          changes: JSON.stringify(movement),
          userId: 'system', // TODO: Get from context
        },
      });

      return movement;
    });
  }

  private async updateStockBalances(tx: any, movement: any) {
    const balanceKey = {
      tenantId: movement.tenantId,
      productId: movement.productId,
      variantId: movement.variantId,
      warehouseId: movement.warehouseId,
      locationId: movement.locationId,
      batchId: movement.batchId,
      seriesId: movement.seriesId,
    };

    // Handle source location (for OUT and TRANSFER)
    if (movement.type === "OUT" || movement.type === "TRANSFER") {
      const sourceBalance = await tx.stockBalance.findFirst({
        where: balanceKey,
      });

      if (sourceBalance) {
        const newQuantity = sourceBalance.quantity - Math.abs(movement.quantity);
        
        if (newQuantity < 0) {
          throw new BadRequestException('Insufficient stock for this movement');
        }

        await tx.stockBalance.update({
          where: { id: sourceBalance.id },
          data: { 
            quantity: newQuantity,
            updatedAt: new Date(),
          },
        });
      } else {
        throw new BadRequestException('No stock balance found for this product/location');
      }
    }

    // Handle destination location (for IN and TRANSFER)
    if (movement.type === "IN" || movement.type === "TRANSFER") {
      const destBalanceKey = movement.type === "TRANSFER" 
        ? {
            ...balanceKey,
            warehouseId: movement.destinationWarehouseId,
            locationId: movement.destinationLocationId,
          }
        : balanceKey;

      const destBalance = await tx.stockBalance.findFirst({
        where: destBalanceKey,
      });

      if (destBalance) {
        await tx.stockBalance.update({
          where: { id: destBalance.id },
          data: { 
            quantity: destBalance.quantity + Math.abs(movement.quantity),
            updatedAt: new Date(),
          },
        });
      } else {
        await tx.stockBalance.create({
          data: {
            ...destBalanceKey,
            quantity: Math.abs(movement.quantity),
          },
        });
      }
    }

    // Handle adjustments
    if (movement.type === "ADJUST") {
      const balance = await tx.stockBalance.findFirst({
        where: balanceKey,
      });

      if (balance) {
        const newQuantity = balance.quantity + movement.quantity; // quantity can be positive or negative
        
        if (newQuantity < 0) {
          throw new BadRequestException('Adjustment would result in negative stock');
        }

        await tx.stockBalance.update({
          where: { id: balance.id },
          data: { 
            quantity: newQuantity,
            updatedAt: new Date(),
          },
        });
      } else if (movement.quantity > 0) {
        // Create new balance only for positive adjustments
        await tx.stockBalance.create({
          data: {
            ...balanceKey,
            quantity: movement.quantity,
          },
        });
      }
    }
  }

  async findAll(tenantId: string, limit = 50, offset = 0) {
    return (this.prisma as any).stockMovement.findMany({
      where: { tenantId },
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
        document: {
          select: { id: true, number: true, type: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async findOne(tenantId: string, id: string) {
    const movement = await (this.prisma as any).stockMovement.findFirst({
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

    if (!movement) {
      throw new NotFoundException(`Stock movement with ID '${id}' not found`);
    }

    return movement;
  }

  async getStockBalance(
    tenantId: string,
    productId?: string,
    variantId?: string,
    warehouseId?: string,
    locationId?: string,
  ) {
    const where: any = { tenantId };

    if (productId) where.productId = productId;
    if (variantId) where.variantId = variantId;
    if (warehouseId) where.warehouseId = warehouseId;
    if (locationId) where.locationId = locationId;

    const balance = await (this.prisma as any).stockBalance.findFirst({
      where,
    });

    return balance?.quantity || 0;
  }
}