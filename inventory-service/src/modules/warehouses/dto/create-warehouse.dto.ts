import { IsString, IsOptional, IsBoolean, IsNotEmpty } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateWarehouseDto {
  @ApiProperty({ description: 'Warehouse code (unique per tenant)' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: 'Warehouse name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiPropertyOptional({ description: 'Warehouse description' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Warehouse address' })
  @IsString()
  @IsOptional()
  address?: string;

  @ApiPropertyOptional({ description: 'Warehouse manager name' })
  @IsString()
  @IsOptional()
  manager?: string;

  @ApiPropertyOptional({ description: 'Warehouse phone number' })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiPropertyOptional({ description: 'Warehouse email' })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiPropertyOptional({ description: 'Whether the warehouse is active', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;

  @ApiPropertyOptional({ description: 'Warehouse settings as JSON string', default: '{}' })
  @IsString()
  @IsOptional()
  settings?: string;
}