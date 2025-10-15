import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { WarehousesService } from './warehouses.service';
import { CreateWarehouseDto } from './dto/create-warehouse.dto';
import { UpdateWarehouseDto } from './dto/update-warehouse.dto';

@ApiTags('warehouses')
@Controller('api/warehouses')
export class WarehousesController {
  constructor(private readonly warehousesService: WarehousesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new warehouse' })
  @ApiResponse({ status: 201, description: 'Warehouse created successfully' })
  @ApiResponse({ status: 409, description: 'Warehouse code already exists' })
  create(
    @Query('tenantId') tenantId: string,
    @Body() createWarehouseDto: CreateWarehouseDto,
  ) {
    return this.warehousesService.create(tenantId, createWarehouseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all warehouses for a tenant' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'List of warehouses' })
  findAll(
    @Query('tenantId') tenantId: string,
    @Query('includeInactive') includeInactive?: boolean,
  ) {
    return this.warehousesService.findAll(tenantId, includeInactive);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a warehouse by ID' })
  @ApiParam({ name: 'id', description: 'Warehouse ID' })
  @ApiResponse({ status: 200, description: 'Warehouse details' })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  findOne(@Query('tenantId') tenantId: string, @Param('id') id: string) {
    return this.warehousesService.findOne(tenantId, id);
  }

  @Get('code/:code')
  @ApiOperation({ summary: 'Get a warehouse by code' })
  @ApiParam({ name: 'code', description: 'Warehouse code' })
  @ApiResponse({ status: 200, description: 'Warehouse details' })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  findByCode(@Query('tenantId') tenantId: string, @Param('code') code: string) {
    return this.warehousesService.findByCode(tenantId, code);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a warehouse' })
  @ApiParam({ name: 'id', description: 'Warehouse ID' })
  @ApiResponse({ status: 200, description: 'Warehouse updated successfully' })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  @ApiResponse({ status: 409, description: 'Warehouse code already exists' })
  update(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() updateWarehouseDto: UpdateWarehouseDto,
  ) {
    return this.warehousesService.update(tenantId, id, updateWarehouseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a warehouse' })
  @ApiParam({ name: 'id', description: 'Warehouse ID' })
  @ApiResponse({ status: 204, description: 'Warehouse deleted successfully' })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  @ApiResponse({ status: 409, description: 'Cannot delete warehouse with existing data' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Query('tenantId') tenantId: string, @Param('id') id: string) {
    return this.warehousesService.remove(tenantId, id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a warehouse' })
  @ApiParam({ name: 'id', description: 'Warehouse ID' })
  @ApiResponse({ status: 200, description: 'Warehouse deactivated successfully' })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  deactivate(@Query('tenantId') tenantId: string, @Param('id') id: string) {
    return this.warehousesService.deactivate(tenantId, id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate a warehouse' })
  @ApiParam({ name: 'id', description: 'Warehouse ID' })
  @ApiResponse({ status: 200, description: 'Warehouse activated successfully' })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  activate(@Query('tenantId') tenantId: string, @Param('id') id: string) {
    return this.warehousesService.activate(tenantId, id);
  }

  @Post(':id/locations')
  @ApiOperation({ summary: 'Create a location in a warehouse' })
  @ApiParam({ name: 'id', description: 'Warehouse ID' })
  @ApiResponse({ status: 201, description: 'Location created successfully' })
  @ApiResponse({ status: 404, description: 'Warehouse not found' })
  createLocation(
    @Query('tenantId') tenantId: string,
    @Param('id') warehouseId: string,
    @Body() createLocationDto: any,
  ) {
    return this.warehousesService.createLocation(tenantId, warehouseId, createLocationDto);
  }

  @Get(':id/locations')
  @ApiOperation({ summary: 'Get all locations in a warehouse' })
  @ApiParam({ name: 'id', description: 'Warehouse ID' })
  @ApiResponse({ status: 200, description: 'List of locations' })
  getLocations(
    @Query('tenantId') tenantId: string,
    @Param('id') warehouseId: string,
  ) {
    return this.warehousesService.getLocations(tenantId, warehouseId);
  }
}