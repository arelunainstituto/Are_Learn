import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';

@Injectable()
export class TenantsService {
  constructor(private prisma: PrismaService) {}

  async create(data: any) {
    // Generate slug from name if not provided
    const slug = data.slug || data.name.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').trim('-');
    
    return this.prisma.tenant.create({
      data: {
        ...data,
        slug,
      },
    });
  }

  async findAll(options?: { page?: number; limit?: number }) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const [tenants, total] = await Promise.all([
      this.prisma.tenant.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      this.prisma.tenant.count(),
    ]);

    return {
      data: tenants,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1,
      },
    };
  }

  async findOne(id: string) {
    const tenant = await this.prisma.tenant.findUnique({
      where: { id },
      include: {
        _count: {
          select: {
            categories: true,
            locations: true,
            items: true,
            movements: true,
          },
        },
      },
    });

    if (!tenant) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }

    return tenant;
  }

  async update(id: string, data: any) {
    try {
      return await this.prisma.tenant.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.tenant.delete({
        where: { id },
      });
    } catch (error) {
      throw new NotFoundException(`Tenant with ID ${id} not found`);
    }
  }
}