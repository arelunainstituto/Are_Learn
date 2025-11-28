import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(tenantId: string, createProductDto: CreateProductDto) {
    // Check if product with same SKU already exists
    const existingProduct = await this.prisma.product.findFirst({
      where: {
        tenantId,
        sku: createProductDto.sku,
      },
    });

    if (existingProduct) {
      throw new ConflictException(`Product with SKU '${createProductDto.sku}' already exists`);
    }

    return this.prisma.product.create({
      data: {
        tenantId,
        categoryId: createProductDto.categoryId || null,
        name: createProductDto.name,
        code: createProductDto.sku, // Use SKU as code for now
        sku: createProductDto.sku,
        description: createProductDto.description || null,
        unitOfMeasure: createProductDto.unitOfMeasure || 'unit',
        type: createProductDto.type || null,
        brand: createProductDto.brand || null,
        model: createProductDto.model || null,
        weight: createProductDto.weight || null,
        dimensions: createProductDto.dimensions || null,
        costPrice: createProductDto.costPrice || null,
        sellingPrice: createProductDto.sellingPrice || null,
        minStock: createProductDto.minStock || null,
        maxStock: createProductDto.maxStock || null,
        reorderPoint: createProductDto.reorderPoint || null,
        isActive: createProductDto.isActive ?? true,
        isTrackable: createProductDto.isTrackable ?? false,
        tags: createProductDto.tags || null,
        attributes: createProductDto.attributes || null,
        externalId: createProductDto.externalId || null,
      },
      include: {
        category: true,
        variants: true,
      },
    });
  }

  async findAll(tenantId: string, isActive?: boolean, limit?: number, offset?: number) {
    return this.prisma.product.findMany({
      where: {
        tenantId,
        ...(isActive !== undefined && { isActive }),
      },
      include: {
        category: true,
        variants: true,
      },
      take: limit,
      skip: offset,
    });
  }

  async findOne(tenantId: string, id: string) {
    const product = await this.prisma.product.findFirst({
      where: { tenantId, id },
      include: {
        category: true,
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }

    return product;
  }

  async findBySku(tenantId: string, sku: string) {
    const product = await this.prisma.product.findFirst({
      where: {
        tenantId,
        sku,
      },
      include: {
        category: true,
        variants: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with SKU '${sku}' not found`);
    }

    return product;
  }

  async update(tenantId: string, id: string, updateProductDto: UpdateProductDto) {
    const existingProduct = await this.prisma.product.findFirst({
      where: { tenantId, id },
    });

    if (!existingProduct) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }

    // If SKU is being updated, check for conflicts
    if (updateProductDto.sku && updateProductDto.sku !== existingProduct.sku) {
      const skuConflict = await this.prisma.product.findFirst({
        where: {
          tenantId,
          id: { not: id },
          sku: updateProductDto.sku,
        },
      });

      if (skuConflict) {
        throw new ConflictException(`Product with SKU '${updateProductDto.sku}' already exists`);
      }
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        category: true,
        variants: true,
      },
    });
  }

  async remove(tenantId: string, id: string) {
    const product = await this.prisma.product.findFirst({
      where: { tenantId, id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }

    return this.prisma.product.delete({
      where: { id },
    });
  }

  async deactivate(tenantId: string, id: string) {
    return this.updateStatus(tenantId, id, false);
  }

  async activate(tenantId: string, id: string) {
    return this.updateStatus(tenantId, id, true);
  }

  async search(tenantId: string, query: string, limit?: number, offset?: number) {
    return this.prisma.product.findMany({
      where: {
        tenantId,
        OR: [
          { name: { contains: query } },

          { sku: { contains: query } },
          { description: { contains: query } },
        ],
      },
      include: {
        category: true,
        variants: true,
      },
      take: limit,
      skip: offset,
    });
  }

  private async updateStatus(tenantId: string, id: string, isActive: boolean) {
    const product = await this.prisma.product.findFirst({
      where: { tenantId, id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID '${id}' not found`);
    }

    return this.prisma.product.update({
      where: { id },
      data: { isActive },
      include: {
        category: true,
        variants: true,
      },
    });
  }
}