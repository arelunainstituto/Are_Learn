import { IsString, IsOptional, IsBoolean, IsObject, IsEnum, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export enum IntegrationProvider {
  PHC = 'phc',
  PRIMAVERA = 'primavera',
  SAGE = 'sage',
  MYSTORE = 'mystore',
}

export class CreateIntegrationDto {
  @ApiProperty({ description: 'Tenant ID' })
  @IsString()
  @IsNotEmpty()
  tenantId: string;

  @ApiProperty({ enum: IntegrationProvider, description: 'Integration provider' })
  @IsEnum(IntegrationProvider)
  provider: IntegrationProvider;

  @ApiProperty({ description: 'Integration name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Integration description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Integration configuration', type: 'object' })
  @IsObject()
  config: Record<string, any>;

  @ApiPropertyOptional({ description: 'Integration features', type: 'object' })
  @IsOptional()
  @IsObject()
  features?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Integration metadata', type: 'object' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Whether integration is active', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class UpdateIntegrationDto {
  @ApiPropertyOptional({ description: 'Integration name' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({ description: 'Integration description' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({ description: 'Integration configuration', type: 'object' })
  @IsOptional()
  @IsObject()
  config?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Integration features', type: 'object' })
  @IsOptional()
  @IsObject()
  features?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Integration metadata', type: 'object' })
  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;

  @ApiPropertyOptional({ description: 'Whether integration is active' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}

export class IntegrationQueryDto {
  @ApiPropertyOptional({ description: 'Filter by provider' })
  @IsOptional()
  @IsString()
  provider?: string;

  @ApiPropertyOptional({ description: 'Filter by active status' })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Page number', default: 1 })
  @IsOptional()
  page?: number;

  @ApiPropertyOptional({ description: 'Items per page', default: 10 })
  @IsOptional()
  limit?: number;
}

export class TestConnectionDto {
  @ApiProperty({ enum: IntegrationProvider, description: 'Integration provider' })
  @IsEnum(IntegrationProvider)
  provider: IntegrationProvider;

  @ApiProperty({ description: 'Connection configuration', type: 'object' })
  @IsObject()
  config: Record<string, any>;
}

export class SyncOptionsDto {
  @ApiPropertyOptional({ description: 'Sync products' })
  @IsOptional()
  @IsBoolean()
  syncProducts?: boolean;

  @ApiPropertyOptional({ description: 'Sync stock levels' })
  @IsOptional()
  @IsBoolean()
  syncStock?: boolean;

  @ApiPropertyOptional({ description: 'Push movements' })
  @IsOptional()
  @IsBoolean()
  pushMovements?: boolean;

  @ApiPropertyOptional({ description: 'Batch size for sync operations' })
  @IsOptional()
  batchSize?: number;
}