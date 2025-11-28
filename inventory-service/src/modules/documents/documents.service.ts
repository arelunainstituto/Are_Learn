import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service';
import { CreateDocumentDto, DocumentType, DocumentStatus } from './dto/create-document.dto';
import { UpdateDocumentDto } from './dto/update-document.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class DocumentsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(tenantId: string, createDocumentDto: CreateDocumentDto) {
    // Validate source warehouse if provided
    if (createDocumentDto.sourceWarehouseId) {
      const sourceWarehouse = await (this.prisma as any).warehouse.findFirst({
        where: { id: createDocumentDto.sourceWarehouseId, tenantId },
      });
      if (!sourceWarehouse) {
        throw new NotFoundException(`Source warehouse with ID ${createDocumentDto.sourceWarehouseId} not found`);
      }
    }

    // Validate destination warehouse if provided
    if (createDocumentDto.destinationWarehouseId) {
      const destinationWarehouse = await (this.prisma as any).warehouse.findFirst({
        where: { id: createDocumentDto.destinationWarehouseId, tenantId },
      });
      if (!destinationWarehouse) {
        throw new NotFoundException(`Destination warehouse with ID ${createDocumentDto.destinationWarehouseId} not found`);
      }
    }

    // Validate products in lines
    for (const lineDto of createDocumentDto.lines) {
      const product = await (this.prisma as any).product.findFirst({
        where: { id: lineDto.productId, tenantId },
      });
      if (!product) {
        throw new NotFoundException(`Product with ID ${lineDto.productId} not found`);
      }
    }

    return this.prisma.$transaction(async (tx: any) => {
      // Create the document - map DTO fields to schema fields
      const document = await tx.document.create({
        data: {
          tenantId,
          type: createDocumentDto.type,
          status: DocumentStatus.DRAFT,
          number: createDocumentDto.documentNumber,
          reference: createDocumentDto.referenceNumber,
          warehouseId: createDocumentDto.sourceWarehouseId || createDocumentDto.destinationWarehouseId,
          companyId: createDocumentDto.partnerId,
          date: createDocumentDto.documentDate ? new Date(createDocumentDto.documentDate) : new Date(),
          notes: createDocumentDto.notes,
          metadata: JSON.stringify({
            destinationWarehouseId: createDocumentDto.destinationWarehouseId,
            partnerName: createDocumentDto.partnerName,
            totalAmount: createDocumentDto.totalAmount,
            currency: createDocumentDto.currency || 'EUR',
            description: createDocumentDto.description,
            tags: createDocumentDto.tags || [],
            priority: createDocumentDto.priority,
            externalId: createDocumentDto.externalId,
            dueDate: createDocumentDto.dueDate,
            ...createDocumentDto.metadata,
          }),
        },
      });

      // Create document lines
      for (const lineDto of createDocumentDto.lines) {
        await tx.documentLine.create({
          data: {
            tenantId,
            documentId: document.id,
            productId: lineDto.productId,
            variantId: lineDto.variantId,
            quantity: lineDto.quantity,
            unitCost: lineDto.unitPrice,
            totalCost: lineDto.totalPrice,
            warehouseId: lineDto.warehouseId,
            locationId: lineDto.locationId,
            batchId: lineDto.batchNumber ? undefined : undefined, // Schema uses batchId, not batchNumber
            seriesId: lineDto.serialNumber ? undefined : undefined, // Schema uses seriesId, not serialNumber
            notes: lineDto.notes,
          },
        });
      }

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'Document',
          entityId: document.id,
          action: 'CREATE',
          changes: JSON.stringify({
            type: createDocumentDto.type,
            status: DocumentStatus.DRAFT,
            warehouseId: createDocumentDto.sourceWarehouseId,
          }),
          userId: 'system', // TODO: Get from context
        },
      });

      return document;
    });
  }

  async findAll(
    tenantId: string,
    type?: DocumentType,
    status?: DocumentStatus,
    warehouseId?: string,
    limit = 50,
    offset = 0,
  ) {
    const where: any = { tenantId };

    if (type) {
      where.type = type;
    }

    if (status) {
      where.status = status;
    }

    if (warehouseId) {
      where.warehouseId = warehouseId;
    }

    return (this.prisma as any).document.findMany({
      where,
      include: {
        lines: {
          include: {
            product: true,
            variant: true,
          },
        },
        warehouse: true,
        company: true,
      },
      orderBy: { createdAt: 'desc' },
      take: limit,
      skip: offset,
    });
  }

  async findOne(tenantId: string, id: string) {
    const document = await (this.prisma as any).document.findFirst({
      where: { id, tenantId },
      include: {
        lines: {
          include: {
            product: true,
            variant: true,
          },
        },
        warehouse: true,
        company: true,
      },
    });

    if (!document) {
      throw new NotFoundException(`Document with ID ${id} not found`);
    }

    return document;
  }

  async update(tenantId: string, id: string, updateDocumentDto: UpdateDocumentDto) {
    const document = await this.findOne(tenantId, id);

    if (document.status !== DocumentStatus.DRAFT) {
      throw new BadRequestException('Only draft documents can be updated');
    }

    return this.prisma.$transaction(async (tx: any) => {
      // Update document
      const updatedDocument = await tx.document.update({
        where: { id, tenantId },
        data: {
          type: updateDocumentDto.type,
          number: updateDocumentDto.documentNumber,
          reference: updateDocumentDto.referenceNumber,
          warehouseId: updateDocumentDto.sourceWarehouseId || updateDocumentDto.destinationWarehouseId,
          companyId: updateDocumentDto.partnerId,
          date: updateDocumentDto.documentDate ? new Date(updateDocumentDto.documentDate) : undefined,
          notes: updateDocumentDto.notes,
          metadata: updateDocumentDto.metadata ? JSON.stringify(updateDocumentDto.metadata) : undefined,
        },
      });

      // Update lines if provided
      if (updateDocumentDto.lines) {
        // Delete existing lines
        await tx.documentLine.deleteMany({
          where: { documentId: id, tenantId },
        });

        // Create new lines
        for (const lineDto of updateDocumentDto.lines) {
          await tx.documentLine.create({
            data: {
              tenantId,
              documentId: id,
              productId: lineDto.productId,
              variantId: lineDto.variantId,
              quantity: lineDto.quantity,
              unitCost: lineDto.unitPrice,
              totalCost: lineDto.totalPrice,
              warehouseId: lineDto.warehouseId,
              locationId: lineDto.locationId,
              notes: lineDto.notes,
            },
          });
        }
      }

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'Document',
          entityId: id,
          action: 'UPDATE',
          changes: JSON.stringify(updateDocumentDto),
          userId: 'system', // TODO: Get from context
        },
      });

      return updatedDocument;
    });
  }

  async remove(tenantId: string, id: string) {
    const document = await this.findOne(tenantId, id);

    if (document.status !== DocumentStatus.DRAFT) {
      throw new BadRequestException('Only draft documents can be deleted');
    }

    return this.prisma.$transaction(async (tx: any) => {
      // Delete document lines
      await tx.documentLine.deleteMany({
        where: { documentId: id, tenantId },
      });

      // Delete document
      await tx.document.delete({
        where: { id, tenantId },
      });

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'Document',
          entityId: id,
          action: 'DELETE',
          changes: JSON.stringify({ id }),
          userId: 'system', // TODO: Get from context
        },
      });

      return { message: 'Document deleted successfully' };
    });
  }

  async updateStatus(tenantId: string, id: string, status: DocumentStatus) {
    const document = await this.findOne(tenantId, id);

    const updatedDocument = await (this.prisma as any).document.update({
      where: { id, tenantId },
      data: { status },
    });

    // Create audit trail
    await (this.prisma as any).auditTrail.create({
      data: {
        tenantId,
        entityType: 'Document',
        entityId: id,
        action: 'STATUS_UPDATE',
        changes: JSON.stringify({ from: document.status, to: status }),
        userId: 'system', // TODO: Get from context
      },
    });

    return updatedDocument;
  }

  async confirmDocument(tenantId: string, id: string) {
    const document = await this.findOne(tenantId, id);

    if (document.status !== DocumentStatus.DRAFT) {
      throw new BadRequestException('Only draft documents can be confirmed');
    }

    return this.prisma.$transaction(async (tx: any) => {
      // Update status to APPROVED
      await tx.document.update({
        where: { id, tenantId },
        data: { 
          status: DocumentStatus.APPROVED,
          confirmedAt: new Date(),
          confirmedBy: 'system', // TODO: Get from context
        },
      });

      // Process the document based on type
      await this.processDocument(tx, document);

      // Update status to COMPLETED
      await tx.document.update({
        where: { id, tenantId },
        data: { status: DocumentStatus.COMPLETED },
      });

      // Create audit trail
      await tx.auditTrail.create({
        data: {
          tenantId,
          entityType: 'Document',
          entityId: id,
          action: 'CONFIRM',
          changes: JSON.stringify({ status: 'COMPLETED' }),
          userId: 'system', // TODO: Get from context
        },
      });

      return { message: 'Document confirmed and processed successfully' };
    });
  }

  private async processDocument(tx: any, document: any) {
    switch (document.type) {
      case DocumentType.INVENTORY_TRANSFER:
        await this.processInventoryTransfer(tx, document);
        break;
      case DocumentType.INVENTORY_ADJUSTMENT:
        await this.processInventoryAdjustment(tx, document);
        break;
      case DocumentType.GOODS_RECEIPT:
        await this.processGoodsReceipt(tx, document);
        break;
      case DocumentType.GOODS_ISSUE:
        await this.processGoodsIssue(tx, document);
        break;
      default:
        throw new BadRequestException(`Unsupported document type: ${document.type}`);
    }
  }

  private async processInventoryTransfer(tx: any, document: any) {
    // Get destination warehouse from metadata
    const metadata = document.metadata ? JSON.parse(document.metadata) : {};
    const destinationWarehouseId = metadata.destinationWarehouseId;

    // Create stock movements for inventory transfer
    for (const line of document.lines) {
      // OUT movement from source warehouse
      await tx.stockMovement.create({
        data: {
          tenantId: document.tenantId,
          documentId: document.id,
          productId: line.productId,
          type: 'OUT',
          quantity: -line.quantity,
          warehouseId: document.warehouseId,
          locationId: line.locationId,
          reference: document.number,
        },
      });

      // IN movement to destination warehouse
      if (destinationWarehouseId) {
        await tx.stockMovement.create({
          data: {
            tenantId: document.tenantId,
            documentId: document.id,
            productId: line.productId,
            type: 'IN',
            quantity: line.quantity,
            warehouseId: destinationWarehouseId,
            locationId: line.locationId,
            reference: document.number,
          },
        });
      }
    }
  }

  private async processInventoryAdjustment(tx: any, document: any) {
    // Create stock movements for inventory adjustment
    for (const line of document.lines) {
      const movementType = line.quantity > 0 ? 'IN' : 'OUT';
      
      await tx.stockMovement.create({
        data: {
          tenantId: document.tenantId,
          documentId: document.id,
          productId: line.productId,
          type: movementType,
          quantity: line.quantity,
          warehouseId: line.warehouseId || document.warehouseId,
          locationId: line.locationId,
          reference: document.number,
        },
      });
    }
  }

  private async processGoodsReceipt(tx: any, document: any) {
    // Create stock movements for goods receipt
    for (const line of document.lines) {
      await tx.stockMovement.create({
        data: {
          tenantId: document.tenantId,
          documentId: document.id,
          productId: line.productId,
          type: 'IN',
          quantity: line.quantity,
          warehouseId: line.warehouseId || document.warehouseId,
          locationId: line.locationId,
          reference: document.number,
        },
      });
    }
  }

  private async processGoodsIssue(tx: any, document: any) {
    // Create stock movements for goods issue
    for (const line of document.lines) {
      await tx.stockMovement.create({
        data: {
          tenantId: document.tenantId,
          documentId: document.id,
          productId: line.productId,
          type: 'OUT',
          quantity: -line.quantity,
          warehouseId: line.warehouseId || document.warehouseId,
          locationId: line.locationId,
          reference: document.number,
        },
      });
    }
  }
}