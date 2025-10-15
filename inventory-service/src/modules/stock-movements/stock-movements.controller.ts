import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  HttpCode,
  HttpStatus,
  UsePipes,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
  ApiBearerAuth,
} from '@nestjs/swagger';
import { StockMovementsService } from './stock-movements.service';
import { CreateStockMovementDto, CreateMovementDto } from './dto/create-stock-movement.dto';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { MovementCreate } from '@areluna/schemas';

@ApiTags('Stock Movements')
@Controller('stock-movements')
export class StockMovementsController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new stock movement' })
  @ApiResponse({
    status: 201,
    description: 'Stock movement created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error or insufficient stock',
  })
  @ApiResponse({
    status: 404,
    description: 'Product, warehouse, or location not found',
  })
  @UsePipes(new ZodValidationPipe(MovementCreate))
  async create(
    @Body() createMovementDto: CreateMovementDto,
  ) {
    return this.stockMovementsService.createMovement(createMovementDto);
  }

  // Legacy endpoint for backward compatibility
  @Post('legacy')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new stock movement (legacy format)' })
  async createLegacy(
    @Body() createStockMovementDto: CreateStockMovementDto,
    @Query('tenantId') tenantId: string,
  ) {
    return this.stockMovementsService.create(tenantId, createStockMovementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all stock movements with filters' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filter by product ID' })
  @ApiQuery({ name: 'warehouseId', required: false, description: 'Filter by warehouse ID' })
  @ApiQuery({ name: 'locationId', required: false, description: 'Filter by location ID' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Filter by start date (ISO string)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Filter by end date (ISO string)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Limit results (default: 100)' })
  @ApiQuery({ name: 'offset', required: false, description: 'Offset for pagination (default: 0)' })
  @ApiResponse({
    status: 200,
    description: 'List of stock movements',
  })
  async findAll(
    @Query('tenantId') tenantId: string,
    @Query('productId') productId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('locationId') locationId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    return this.stockMovementsService.findAll(
      tenantId,
      limit ? parseInt(limit) : 100,
      offset ? parseInt(offset) : 0,
    );
  }

  @Get('balances')
  @ApiOperation({ summary: 'Get current stock balances' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filter by product ID' })
  @ApiQuery({ name: 'variantId', required: false, description: 'Filter by variant ID' })
  @ApiQuery({ name: 'warehouseId', required: false, description: 'Filter by warehouse ID' })
  @ApiQuery({ name: 'locationId', required: false, description: 'Filter by location ID' })
  @ApiResponse({
    status: 200,
    description: 'Current stock balances',
  })
  async getStockBalance(
    @Query('tenantId') tenantId: string,
    @Query('productId') productId?: string,
    @Query('variantId') variantId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('locationId') locationId?: string,
  ) {
    return this.stockMovementsService.getStockBalance(
      tenantId,
      productId,
      variantId,
      warehouseId,
      locationId,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a stock movement by ID' })
  @ApiParam({ name: 'id', description: 'Stock movement ID' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiResponse({
    status: 200,
    description: 'Stock movement details',
  })
  @ApiResponse({
    status: 404,
    description: 'Stock movement not found',
  })
  async findOne(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
  ) {
    return this.stockMovementsService.findOne(tenantId, id);
  }
}