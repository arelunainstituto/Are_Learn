import { IsString, IsOptional, IsBoolean, IsNotEmpty, IsNumber, IsEnum } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';

export enum ProductType {
  SIMPLE = 'SIMPLE',
  VARIANT = 'VARIANT',
  SERVICE = 'SERVICE',
}

export class CreateProductDto {
  @ApiProperty({ description: 'Product SKU (unique per tenant)' })
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({ description: 'Product name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Product description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: ProductType, description: 'Product type' })
  @IsEnum(ProductType)
  type: ProductType;

  @ApiPropertyOptional({ description: 'Category ID' })
  @IsString()
  @IsOptional()
  categoryId?: string;

  @ApiPropertyOptional({ description: 'Product brand' })
  @IsString()
  @IsOptional()
  brand?: string;

  @ApiPropertyOptional({ description: 'Product model' })
  @IsString()
  @IsOptional()
  model?: string;

  @ApiPropertyOptional({ description: 'Unit of measure (e.g., pcs, kg, m)' })
  @IsString()
  @IsOptional()
  unitOfMeasure?: string;

  @ApiPropertyOptional({ description: 'Product weight in grams' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  weight?: number;

  @ApiPropertyOptional({ description: 'Product dimensions (JSON string)' })
  @IsString()
  @IsOptional()
  dimensions?: string;

  @ApiPropertyOptional({ description: 'Product cost price' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  costPrice?: number;

  @ApiPropertyOptional({ description: 'Product selling price' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  sellingPrice?: number;

  @ApiPropertyOptional({ description: 'Minimum stock level' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  minStock?: number;

  @ApiPropertyOptional({ description: 'Maximum stock level' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  maxStock?: number;

  @ApiPropertyOptional({ description: 'Reorder point' })
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  reorderPoint?: number;

  @ApiPropertyOptional({ description: 'Whether the product is active', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Whether the product is trackable (has serial/batch)', default: false })
  @IsBoolean()
  @IsOptional()
  isTrackable?: boolean;

  @ApiPropertyOptional({ description: 'Product tags (JSON array as string)' })
  @IsString()
  @IsOptional()
  tags?: string;

  @ApiPropertyOptional({ description: 'Product attributes (JSON object as string)' })
  @IsString()
  @IsOptional()
  attributes?: string;

  @ApiPropertyOptional({ description: 'External system ID for integration' })
  @IsString()
  @IsOptional()
  externalId?: string;
}