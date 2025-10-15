import {
  Controller,
  Get,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
} from '@nestjs/swagger';
import { StockMovementsService } from '../stock-movements/stock-movements.service';

@ApiTags('Balances')
@Controller('balances')
export class BalancesController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Get()
  @ApiOperation({ 
    summary: 'Get stock balances',
    description: 'Get current stock balances with filtering and pagination'
  })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filter by product ID' })
  @ApiQuery({ name: 'variantId', required: false, description: 'Filter by variant ID' })
  @ApiQuery({ name: 'warehouseId', required: false, description: 'Filter by warehouse ID' })
  @ApiQuery({ name: 'locationId', required: false, description: 'Filter by location ID' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 100)' })
  @ApiResponse({
    status: 200,
    description: 'Current stock balances with pagination',
    schema: {
      type: 'object',
      properties: {
        data: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              id: { type: 'string' },
              tenantId: { type: 'string' },
              productId: { type: 'string' },
              variantId: { type: 'string' },
              warehouseId: { type: 'string' },
              locationId: { type: 'string' },
              quantity: { type: 'number' },
              reservedQuantity: { type: 'number' },
              availableQuantity: { type: 'number' },
              product: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  sku: { type: 'string' },
                  name: { type: 'string' },
                },
              },
              warehouse: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                },
              },
              location: {
                type: 'object',
                properties: {
                  id: { type: 'string' },
                  name: { type: 'string' },
                },
              },
            },
          },
        },
        pagination: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            total: { type: 'number' },
            totalPages: { type: 'number' },
          },
        },
      },
    },
  })
  async getBalances(
    @Query('tenantId') tenantId: string,
    @Query('productId') productId?: string,
    @Query('variantId') variantId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('locationId') locationId?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 100;

    // Use the existing stock balance method from StockMovementsService
    const balances = await this.stockMovementsService.getStockBalance(
      tenantId,
      productId,
      variantId,
      warehouseId,
      locationId,
    );

    // For now, return the data as-is
    // TODO: Implement proper pagination
    return {
      data: balances,
      pagination: {
        page: pageNum,
        limit: limitNum,
        total: Array.isArray(balances) ? balances.length : 0,
        totalPages: Math.ceil((Array.isArray(balances) ? balances.length : 0) / limitNum),
      },
    };
  }
}