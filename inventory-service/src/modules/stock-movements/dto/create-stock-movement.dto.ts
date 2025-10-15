import { IsString, IsOptional, IsNotEmpty, IsNumber, IsEnum, IsDateString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { MovementType, MovementCreate, MovementCreateInput } from '@areluna/schemas';

export { MovementType } from '@areluna/schemas';

export enum MovementReason {
  PURCHASE = 'PURCHASE',           // Compra
  SALE = 'SALE',                   // Venda
  RETURN = 'RETURN',               // Devolução
  TRANSFER = 'TRANSFER',           // Transferência
  ADJUSTMENT_POSITIVE = 'ADJUSTMENT_POSITIVE', // Ajuste positivo
  ADJUSTMENT_NEGATIVE = 'ADJUSTMENT_NEGATIVE', // Ajuste negativo
  PRODUCTION = 'PRODUCTION',       // Produção
  CONSUMPTION = 'CONSUMPTION',     // Consumo
  DAMAGE = 'DAMAGE',               // Avaria
  LOSS = 'LOSS',                   // Perda
  FOUND = 'FOUND',                 // Encontrado
  INITIAL_STOCK = 'INITIAL_STOCK', // Estoque inicial
}

// Zod-validated DTO for core movement creation
export class CreateMovementDto implements MovementCreateInput {
  @ApiProperty({ enum: MovementType, description: 'Type of movement' })
  @IsEnum(MovementType)
  type: "IN" | "OUT" | "TRANSFER" | "ADJUST";

  @ApiProperty({ description: 'Tenant ID' })
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @ApiProperty({ description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiPropertyOptional({ description: 'Product variant ID (if applicable)' })
  @IsString()
  @IsOptional()
  variantId?: string;

  @ApiPropertyOptional({ description: 'Lot ID (if product is trackable)' })
  @IsString()
  @IsOptional()
  lotId?: string;

  @ApiPropertyOptional({ description: 'Serial number (if product is trackable)' })
  @IsString()
  @IsOptional()
  serial?: string;

  @ApiPropertyOptional({ description: 'Source location ID (for transfers/out)' })
  @IsString()
  @IsOptional()
  fromLocationId?: string;

  @ApiPropertyOptional({ description: 'Destination location ID (for transfers/in)' })
  @IsString()
  @IsOptional()
  toLocationId?: string;

  @ApiProperty({ description: 'Quantity moved (positive number)' })
  @IsNumber()
  @Type(() => Number)
  qty: number;

  @ApiPropertyOptional({ description: 'Unit of measure', default: 'pc' })
  @IsString()
  @IsOptional()
  uom?: string = 'pc';

  @ApiPropertyOptional({ description: 'Reference document ID' })
  @IsString()
  @IsOptional()
  refDocumentId?: string;

  @ApiPropertyOptional({ description: 'Movement notes' })
  @IsString()
  @IsOptional()
  note?: string;
}

export class CreateStockMovementDto {
  @ApiProperty({ enum: MovementType, description: 'Type of movement' })
  @IsEnum(MovementType)
  type: MovementType;

  @ApiProperty({ enum: MovementReason, description: 'Reason for the movement' })
  @IsEnum(MovementReason)
  reason: MovementReason;

  @ApiProperty({ description: 'Product ID' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiPropertyOptional({ description: 'Product variant ID (if applicable)' })
  @IsString()
  @IsOptional()
  variantId?: string;

  @ApiProperty({ description: 'Warehouse ID' })
  @IsString()
  @IsNotEmpty()
  warehouseId: string;

  @ApiProperty({ description: 'Location ID' })
  @IsString()
  @IsNotEmpty()
  locationId: string;

  @ApiPropertyOptional({ description: 'Destination warehouse ID (for transfers)' })
  @IsString()
  @IsOptional()
  destinationWarehouseId?: string;

  @ApiPropertyOptional({ description: 'Destination location ID (for transfers)' })
  @IsString()
  @IsOptional()
  destinationLocationId?: string;

  @ApiProperty({ description: 'Quantity moved (positive for IN, negative for OUT)' })
  @IsNumber()
  @Type(() => Number)
  quantity: number;

  @ApiPropertyOptional({ description: 'Unit cost of the movement' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  unitCost?: number;

  @ApiPropertyOptional({ description: 'Total cost of the movement' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  totalCost?: number;

  @ApiPropertyOptional({ description: 'Batch ID (if product is trackable)' })
  @IsString()
  @IsOptional()
  batchId?: string;

  @ApiPropertyOptional({ description: 'Series ID (if product is trackable)' })
  @IsString()
  @IsOptional()
  seriesId?: string;

  @ApiPropertyOptional({ description: 'Document ID associated with this movement' })
  @IsString()
  @IsOptional()
  documentId?: string;

  @ApiPropertyOptional({ description: 'Reference number (e.g., PO number, SO number)' })
  @IsString()
  @IsOptional()
  reference?: string;

  @ApiPropertyOptional({ description: 'Movement notes' })
  @IsString()
  @IsOptional()
  notes?: string;

  @ApiPropertyOptional({ description: 'Movement date (defaults to now)' })
  @IsDateString()
  @IsOptional()
  movementDate?: string;

  @ApiPropertyOptional({ description: 'External system ID for integration' })
  @IsString()
  @IsOptional()
  externalId?: string;

  @ApiPropertyOptional({ description: 'Additional metadata (JSON string)' })
  @IsString()
  @IsOptional()
  metadata?: string;
}