import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class BalancesService {
  constructor(private readonly prisma: PrismaService) {}

  async getBalances(params: {
    tenantId: string;
    productId?: string;
    variantId?: string;
    warehouseId?: string;
    locationId?: string;
    page?: number;
    limit?: number;
  }) {
    const { tenantId, productId, variantId, warehouseId, locationId, page = 1, limit = 100 } = params;
    const skip = (page - 1) * limit;

    const where: any = {
      tenantId,
    };

    if (productId) where.productId = productId;
    if (variantId) where.variantId = variantId;
    if (warehouseId) where.warehouseId = warehouseId;
    if (locationId) where.locationId = locationId;

    const [balances, total] = await Promise.all([
      (this.prisma as any).stockBalance.findMany({
        where,
        skip,
        take: limit,
        include: {
          product: {
            select: {
              id: true,
              sku: true,
              name: true,
            },
          },
          warehouse: {
            select: {
              id: true,
              name: true,
            },
          },
          location: {
            select: {
              id: true,
              name: true,
            },
          },
        },
        orderBy: {
          updatedAt: 'desc',
        },
      }),
      (this.prisma as any).stockBalance.count({ where }),
    ]);

    return {
      data: balances,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }
}