import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
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
import { StockReservationsService } from './stock-reservations.service';
import { CreateStockReservationDto, ReservationStatus } from './dto/create-stock-reservation.dto';
import { UpdateStockReservationDto } from './dto/update-stock-reservation.dto';

@ApiTags('Stock Reservations')
@Controller('stock-reservations')
export class StockReservationsController {
  constructor(private readonly stockReservationsService: StockReservationsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new stock reservation' })
  @ApiResponse({
    status: 201,
    description: 'Stock reservation created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error or insufficient stock',
  })
  @ApiResponse({
    status: 404,
    description: 'Product, warehouse, or location not found',
  })
  async create(
    @Body() createStockReservationDto: CreateStockReservationDto,
    @Query('tenantId') tenantId: string,
  ) {
    return this.stockReservationsService.create(tenantId, createStockReservationDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stock reservations with filters' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filter by product ID' })
  @ApiQuery({ name: 'warehouseId', required: false, description: 'Filter by warehouse ID' })
  @ApiQuery({ name: 'locationId', required: false, description: 'Filter by location ID' })
  @ApiQuery({ name: 'status', required: false, enum: ReservationStatus, description: 'Filter by status' })
  @ApiQuery({ name: 'referenceId', required: false, description: 'Filter by reference ID' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limit results (default: 100)' })
  @ApiQuery({ name: 'offset', required: false, description: 'Offset for pagination (default: 0)' })
  @ApiResponse({
    status: 200,
    description: 'List of stock reservations',
  })
  async findAll(
    @Query('tenantId') tenantId: string,
    @Query('productId') productId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('locationId') locationId?: string,
    @Query('status') status?: ReservationStatus,
    @Query('referenceId') referenceId?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.stockReservationsService.findAll(
      tenantId,
      productId,
      warehouseId,
      locationId,
      status,
      referenceId,
      limit ? parseInt(limit) : 100,
      offset ? parseInt(offset) : 0,
    );
  }

  @Get('available-stock')
  @ApiOperation({ summary: 'Get available stock summary (total - reserved)' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filter by product ID' })
  @ApiQuery({ name: 'warehouseId', required: false, description: 'Filter by warehouse ID' })
  @ApiQuery({ name: 'locationId', required: false, description: 'Filter by location ID' })
  @ApiResponse({
    status: 200,
    description: 'Available stock summary',
  })
  async getAvailableStockSummary(
    @Query('tenantId') tenantId: string,
    @Query('productId') productId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('locationId') locationId?: string,
  ) {
    return this.stockReservationsService.getAvailableStockSummary(
      tenantId,
      productId,
      warehouseId,
      locationId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stock reservation by ID' })
  @ApiParam({ name: 'id', description: 'Stock reservation ID' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiResponse({
    status: 200,
    description: 'Stock reservation details',
  })
  @ApiResponse({
    status: 404,
    description: 'Stock reservation not found',
  })
  async findOne(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
  ) {
    return this.stockReservationsService.findOne(tenantId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a stock reservation' })
  @ApiParam({ name: 'id', description: 'Stock reservation ID' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiResponse({
    status: 200,
    description: 'Stock reservation updated successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error or insufficient stock',
  })
  @ApiResponse({
    status: 404,
    description: 'Stock reservation not found',
  })
  async update(
    @Param('id') id: string,
    @Body() updateStockReservationDto: UpdateStockReservationDto,
    @Query('tenantId') tenantId: string,
  ) {
    return this.stockReservationsService.update(tenantId, id, updateStockReservationDto);
  }

  @Patch(':id/cancel')
  @ApiOperation({ summary: 'Cancel a stock reservation' })
  @ApiParam({ name: 'id', description: 'Stock reservation ID' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiQuery({ name: 'reason', required: false, description: 'Cancellation reason' })
  @ApiResponse({
    status: 200,
    description: 'Stock reservation cancelled successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Cannot cancel reservation with current status',
  })
  @ApiResponse({
    status: 404,
    description: 'Stock reservation not found',
  })
  async cancel(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
    @Query('reason') reason?: string,
  ) {
    return this.stockReservationsService.cancel(tenantId, id, reason);
  }

  @Patch(':id/fulfill')
  @ApiOperation({ summary: 'Fulfill a stock reservation' })
  @ApiParam({ name: 'id', description: 'Stock reservation ID' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiQuery({ name: 'quantity', required: false, description: 'Quantity to fulfill (default: full reservation)' })
  @ApiResponse({
    status: 200,
    description: 'Stock reservation fulfilled successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Cannot fulfill reservation with current status or invalid quantity',
  })
  @ApiResponse({
    status: 404,
    description: 'Stock reservation not found',
  })
  async fulfill(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
    @Query('quantity') quantity?: string,
  ) {
    return this.stockReservationsService.fulfill(
      tenantId, 
      id, 
      quantity ? parseFloat(quantity) : undefined
    );
  }
}