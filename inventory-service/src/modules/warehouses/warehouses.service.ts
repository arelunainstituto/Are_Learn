import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@Injectable()
export class WarehousesService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createWarehouseDto: CreateWarehouseDto) {
    // Check if warehouse with same code already exists
    const existingWarehouse = await (this.prisma as any).warehouse.findFirst({
      where: {
        code: createWarehouseDto.code,
        tenantId,
      },
    });

    if (existingWarehouse) {
      throw new ConflictException(`Warehouse with code '${createWarehouseDto.code}' already exists`);
    }

    return (this.prisma as any).warehouse.create({
      data: {
        ...createWarehouseDto,
        tenantId,
      },
      include: {
        locations: true,
      },
    });
  }

  async findAll(tenantId: string, isActive?: boolean, limit = 100, offset = 0) {
    const where: any = { tenantId };
    
    if (isActive !== undefined) {
      where.isActive = isActive;
    }

    return (this.prisma as any).warehouse.findMany({
      where,
      include: {
        locations: {
          select: { id: true, code: true, name: true, isActive: true },
        },
      },
      orderBy: { name: 'asc' },
      take: limit,
      skip: offset,
    });
  }

  async findOne(tenantId: string, id: string) {
    const warehouse = await (this.prisma as any).warehouse.findFirst({
      where: { id, tenantId },
      include: {
        locations: {
          select: { id: true, code: true, name: true, isActive: true },
        },
      },
    });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID '${id}' not found`);
    }

    return warehouse;
  }

  async findByCode(tenantId: string, code: string) {
    const warehouse = await (this.prisma as any).warehouse.findFirst({
      where: { code, tenantId },
      include: {
        locations: {
          select: { id: true, code: true, name: true, isActive: true },
        },
      },
    });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with code '${code}' not found`);
    }

    return warehouse;
  }

  async update(tenantId: string, id: string, updateWarehouseDto: UpdateWarehouseDto) {
    const existingWarehouse = await (this.prisma as any).warehouse.findFirst({
      where: { id, tenantId },
    });

    if (!existingWarehouse) {
      throw new NotFoundException(`Warehouse with ID '${id}' not found`);
    }

    // Check if code is being updated and if it conflicts
    if (updateWarehouseDto.code && updateWarehouseDto.code !== existingWarehouse.code) {
      const codeConflict = await (this.prisma as any).warehouse.findFirst({
        where: {
          code: updateWarehouseDto.code,
          tenantId,
          id: { not: id },
        },
      });

      if (codeConflict) {
        throw new ConflictException(`Warehouse with code '${updateWarehouseDto.code}' already exists`);
      }
    }

    return (this.prisma as any).warehouse.update({
      where: { id },
      data: {
        ...updateWarehouseDto,
        updatedAt: new Date(),
      },
      include: {
        locations: {
          select: { id: true, code: true, name: true, isActive: true },
        },
      },
    });
  }

  async remove(tenantId: string, id: string) {
    const existingWarehouse = await (this.prisma as any).warehouse.findFirst({
      where: { id, tenantId },
    });

    if (!existingWarehouse) {
      throw new NotFoundException(`Warehouse with ID '${id}' not found`);
    }

    // Check if warehouse has active locations
    const activeLocations = await (this.prisma as any).location.findMany({
      where: {
        warehouseId: id,
        isActive: true,
      },
    });

    if (activeLocations.length > 0) {
      throw new ConflictException('Cannot delete warehouse with active locations');
    }

    // Check if warehouse has stock balances
    const stockBalances = await (this.prisma as any).stockBalance.findMany({
      where: { warehouseId: id },
      take: 1,
    });

    if (stockBalances.length > 0) {
      throw new ConflictException('Cannot delete warehouse with existing stock balances');
    }

    return (this.prisma as any).warehouse.delete({
      where: { id },
    });
  }

  async deactivate(tenantId: string, id: string) {
    const warehouse = await (this.prisma as any).warehouse.findFirst({
      where: { id, tenantId },
    });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID '${id}' not found`);
    }

    // Deactivate all locations in this warehouse
    await (this.prisma as any).location.updateMany({
      where: { warehouseId: id },
      data: { isActive: false },
    });

    return (this.prisma as any).warehouse.update({
      where: { id },
      data: {
        isActive: false,
        updatedAt: new Date(),
      },
      include: {
        locations: {
          select: { id: true, code: true, name: true, isActive: true },
        },
      },
    });
  }

  async activate(tenantId: string, id: string) {
    const warehouse = await (this.prisma as any).warehouse.findFirst({
      where: { id, tenantId },
    });

    if (!warehouse) {
      throw new NotFoundException(`Warehouse with ID '${id}' not found`);
    }

    return (this.prisma as any).warehouse.update({
      where: { id },
      data: {
        isActive: true,
        updatedAt: new Date(),
      },
      include: {
        locations: {
          select: { id: true, code: true, name: true, isActive: true },
        },
      },
    });
  }

  async createLocation(tenantId: string, warehouseId: string, createLocationDto: any) {
    // Check if warehouse exists
    const existingWarehouse = await (this.prisma as any).warehouse.findFirst({
      where: { id: warehouseId, tenantId },
    });

    if (!existingWarehouse) {
      throw new NotFoundException(`Warehouse with ID '${warehouseId}' not found`);
    }

    // Check if location code already exists in this warehouse
    const existingLocation = await (this.prisma as any).location.findFirst({
      where: {
        tenantId,
        warehouseId,
        code: createLocationDto.code,
      },
    });

    if (existingLocation) {
      throw new ConflictException(`Location with code '${createLocationDto.code}' already exists in this warehouse`);
    }

    return (this.prisma as any).location.create({
      data: {
        ...createLocationDto,
        tenantId,
        warehouseId,
      },
      include: {
        warehouse: {
          select: { id: true, code: true, name: true },
        },
      },
    });
  }

  async getLocations(tenantId: string, warehouseId: string) {
    // Check if warehouse exists
    const existingWarehouse = await (this.prisma as any).warehouse.findFirst({
      where: { id: warehouseId, tenantId },
    });

    if (!existingWarehouse) {
      throw new NotFoundException(`Warehouse with ID '${warehouseId}' not found`);
    }

    return (this.prisma as any).location.findMany({
      where: {
        tenantId,
        warehouseId,
      },
      include: {
        warehouse: {
          select: { id: true, code: true, name: true },
        },
      },
      orderBy: {
        name: 'asc',
      },
    });
  }
}