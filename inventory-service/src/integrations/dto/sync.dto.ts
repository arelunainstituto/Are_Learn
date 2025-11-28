import { IsOptional, IsString, IsNumber, IsBoolean, IsDateString } from 'class-validator';

export class SyncOptionsDto {
  @IsOptional()
  @IsDateString()
  fromDate?: string;

  @IsOptional()
  @IsDateString()
  toDate?: string;

  @IsOptional()
  @IsNumber()
  batchSize?: number;

  @IsOptional()
  @IsBoolean()
  fullSync?: boolean;

  @IsOptional()
  @IsString()
  warehouseCode?: string;

  @IsOptional()
  @IsString()
  categoryFilter?: string;
}