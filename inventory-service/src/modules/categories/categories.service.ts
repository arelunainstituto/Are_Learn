import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createCategoryDto: CreateCategoryDto) {
    return this.prisma.category.create({
      data: {
        ...createCategoryDto,
        tenantId,
      },
    });
  }

  async findAll(tenantId: string, options?: { page?: number; limit?: number }) {
    const page = options?.page || 1;
    const limit = options?.limit || 20;
    const skip = (page - 1) * limit;

    const [categories, total] = await Promise.all([
      this.prisma.category.findMany({
        where: { tenantId },
        skip,
        take: limit,
        orderBy: { name: 'asc' },
      }),
      this.prisma.category.count({
        where: { tenantId },
      }),
    ]);

    return {
      data: categories,
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

  async findOne(tenantId: string, id: string) {
    const category = await this.prisma.category.findFirst({
      where: { id, tenantId },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async update(tenantId: string, id: string, updateCategoryDto: UpdateCategoryDto) {
    const category = await this.findOne(tenantId, id);

    return this.prisma.category.update({
      where: { id: category.id },
      data: updateCategoryDto,
    });
  }

  async remove(tenantId: string, id: string) {
    const category = await this.findOne(tenantId, id);

    return this.prisma.category.delete({
      where: { id: category.id },
    });
  }
}