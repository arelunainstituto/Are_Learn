import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsBoolean } from 'class-validator';

export class CreateCompanyDto {
  @ApiProperty({ description: 'Company name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Company code/identifier' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'Tax ID (NIPC)' })
  @IsString()
  taxId: string;

  @ApiPropertyOptional({ description: 'Company address' })
  @IsOptional()
  @IsString()
  address?: string;

  @ApiPropertyOptional({ description: 'Phone number' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'Email address' })
  @IsOptional()
  @IsString()
  email?: string;

  @ApiPropertyOptional({ description: 'Legal nature' })
  @IsOptional()
  @IsString()
  legalNature?: string;

  @ApiPropertyOptional({ description: 'Social capital' })
  @IsOptional()
  @IsNumber()
  socialCapital?: number;

  @ApiPropertyOptional({ description: 'Social object' })
  @IsOptional()
  @IsString()
  socialObject?: string;

  @ApiPropertyOptional({ description: 'Management' })
  @IsOptional()
  @IsString()
  management?: string;

  @ApiPropertyOptional({ description: 'IBAN' })
  @IsOptional()
  @IsString()
  iban?: string;

  @ApiPropertyOptional({ description: 'Contributory status' })
  @IsOptional()
  @IsString()
  contributoryStatus?: string;

  @ApiPropertyOptional({ description: 'Shareholdings' })
  @IsOptional()
  @IsString()
  shareholdings?: string;

  @ApiPropertyOptional({ description: 'Active status', default: true })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}