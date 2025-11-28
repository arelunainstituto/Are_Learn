import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsDateString, IsEnum, Min } from 'class-validator';

export enum ReservationType {
  ORDER = 'ORDER',
  ALLOCATION = 'ALLOCATION',
  HOLD = 'HOLD',
  QUARANTINE = 'QUARANTINE',
}

export enum ReservationStatus {
  ACTIVE = 'ACTIVE',
  FULFILLED = 'FULFILLED',
  CANCELLED = 'CANCELLED',
  EXPIRED = 'EXPIRED',
}

export class CreateStockReservationDto {
  @ApiProperty({
    description: 'Product ID to reserve',
    example: 'prod_123',
  })
  @IsString()
  productId: string;

  @ApiProperty({
    description: 'Product variant ID (optional)',
    example: 'var_456',
    required: false,
  })
  @IsOptional()
  @IsString()
  variantId?: string;

  @ApiProperty({
    description: 'Warehouse ID where stock is reserved',
    example: 'wh_main',
  })
  @IsString()
  warehouseId: string;

  @ApiProperty({
    description: 'Location ID where stock is reserved',
    example: 'loc_a1',
  })
  @IsString()
  locationId: string;

  @ApiProperty({
    description: 'Quantity to reserve',
    example: 10,
    minimum: 0.01,
  })
  @IsNumber()
  @Min(0.01)
  quantity: number;

  @ApiProperty({
    description: 'Type of reservation',
    enum: ReservationType,
    example: ReservationType.ORDER,
  })
  @IsEnum(ReservationType)
  type: ReservationType;

  @ApiProperty({
    description: 'Reference ID (e.g., order ID, allocation ID)',
    example: 'order_789',
  })
  @IsString()
  referenceId: string;

  @ApiProperty({
    description: 'Reference type (e.g., "sales_order", "purchase_order")',
    example: 'sales_order',
  })
  @IsString()
  referenceType: string;

  @ApiProperty({
    description: 'Batch ID (optional)',
    example: 'batch_001',
    required: false,
  })
  @IsOptional()
  @IsString()
  batchId?: string;

  @ApiProperty({
    description: 'Series ID (optional)',
    example: 'series_001',
    required: false,
  })
  @IsOptional()
  @IsString()
  seriesId?: string;

  @ApiProperty({
    description: 'Expiration date for the reservation (ISO string)',
    example: '2024-12-31T23:59:59Z',
    required: false,
  })
  @IsOptional()
  @IsDateString()
  expiresAt?: string;

  @ApiProperty({
    description: 'Priority level (1-10, higher is more important)',
    example: 5,
    minimum: 1,
    maximum: 10,
    required: false,
  })
  @IsOptional()
  @IsNumber()
  @Min(1)
  priority?: number;

  @ApiProperty({
    description: 'Additional notes',
    example: 'Reserved for VIP customer',
    required: false,
  })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({
    description: 'Additional metadata as JSON string',
    example: '{"customerTier": "VIP", "urgency": "high"}',
    required: false,
  })
  @IsOptional()
  @IsString()
  metadata?: string;
}