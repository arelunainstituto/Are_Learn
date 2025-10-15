import { IsString, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTenantDto {
  @ApiProperty({ description: 'Tenant name' })
  @IsString()
  name: string;

  @ApiProperty({ description: 'Tenant code', required: false })
  @IsOptional()
  @IsString()
  code?: string;

  @ApiProperty({ description: 'Contact email', required: false })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'Phone number', required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ description: 'Address', required: false })
  @IsOptional()
  @IsString()
  address?: string;
}