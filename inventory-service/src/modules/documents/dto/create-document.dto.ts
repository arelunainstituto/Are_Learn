import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsEnum, IsOptional, IsDateString, IsNumber, IsArray, ValidateNested, IsUUID, Min } from 'class-validator';
import { Type } from 'class-transformer';

export enum DocumentType {
  PURCHASE_ORDER = 'PURCHASE_ORDER',
  SALES_ORDER = 'SALES_ORDER',
  INVENTORY_TRANSFER = 'INVENTORY_TRANSFER',
  INVENTORY_ADJUSTMENT = 'INVENTORY_ADJUSTMENT',
  GOODS_RECEIPT = 'GOODS_RECEIPT',
  GOODS_ISSUE = 'GOODS_ISSUE',
  RETURN = 'RETURN',
  CYCLE_COUNT = 'CYCLE_COUNT',
}

export enum DocumentStatus {
  DRAFT = 'DRAFT',
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  REJECTED = 'REJECTED',
}

export class CreateDocumentLineDto {
  @ApiProperty({ description: 'Product ID' })
  @IsString()
  productId: string;

  @ApiPropertyOptional({ description: 'Product variant ID' })
  @IsOptional()
  @IsUUID()
  variantId?: string;

  @ApiProperty({ description: 'Quantity', minimum: 0 })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiPropertyOptional({ description: 'Unit price' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  unitPrice?: number;

  @ApiPropertyOptional({ description: 'Total price' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalPrice?: number;

  @ApiPropertyOptional({ description: 'Warehouse ID' })
  @IsOptional()
  @IsUUID()
  warehouseId?: string;

  @ApiPropertyOptional({ description: 'Location ID' })
  @IsOptional()
  @IsUUID()
  locationId?: string;

  @ApiPropertyOptional({ description: 'Batch number' })
  @IsOptional()
  @IsString()
  batchNumber?: string;

  @ApiPropertyOptional({ description: 'Serial number' })
  @IsOptional()
  @IsString()
  serialNumber?: string;

  @ApiPropertyOptional({ description: 'Line notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Line metadata' })
  @IsOptional()
  metadata?: Record<string, any>;
}

export class CreateDocumentDto {
  @ApiProperty({ description: 'Document type', enum: DocumentType })
  @IsEnum(DocumentType)
  type: DocumentType;

  @ApiProperty({ description: 'Document number' })
  @IsString()
  documentNumber: string;

  @ApiPropertyOptional({ description: 'Reference number' })
  @IsOptional()
  @IsString()
  referenceNumber?: string;

  @ApiPropertyOptional({ description: 'Document status', enum: DocumentStatus })
  @IsOptional()
  @IsEnum(DocumentStatus)
  status?: DocumentStatus = DocumentStatus.DRAFT;

  @ApiPropertyOptional({ description: 'Document date' })
  @IsOptional()
  @IsDateString()
  documentDate?: string;

  @ApiPropertyOptional({ description: 'Due date' })
  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @ApiPropertyOptional({ description: 'Source warehouse ID' })
  @IsOptional()
  @IsUUID()
  sourceWarehouseId?: string;

  @ApiPropertyOptional({ description: 'Destination warehouse ID' })
  @IsOptional()
  @IsUUID()
  destinationWarehouseId?: string;

  @ApiPropertyOptional({ description: 'Supplier/Customer ID' })
  @IsOptional()
  @IsString()
  partnerId?: string;

  @ApiPropertyOptional({ description: 'Partner name' })
  @IsOptional()
  @IsString()
  partnerName?: string;

  @ApiPropertyOptional({ description: 'Total amount' })
  @IsOptional()
  @IsNumber()
  @Min(0)
  totalAmount?: number;

  @ApiPropertyOptional({ description: 'Currency code' })
  @IsOptional()
  @IsString()
  currency?: string = 'EUR';

  @ApiPropertyOptional({ description: 'Document description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Document notes' })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiPropertyOptional({ description: 'Tags' })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @ApiPropertyOptional({ description: 'Priority level' })
  @IsOptional()
  @IsNumber()
  @Min(1)
  priority?: number = 5;

  @ApiPropertyOptional({ description: 'External system ID' })
  @IsOptional()
  @IsString()
  externalId?: string;

  @ApiPropertyOptional({ description: 'Document metadata' })
  @IsOptional()
  metadata?: Record<string, any>;

  @ApiProperty({ description: 'Document lines', type: [CreateDocumentLineDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateDocumentLineDto)
  lines: CreateDocumentLineDto[];
}