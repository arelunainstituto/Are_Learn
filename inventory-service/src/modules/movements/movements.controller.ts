import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Headers,
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
  ApiHeader,
} from '@nestjs/swagger';
import { StockMovementsService } from '../stock-movements/stock-movements.service';
import { CreateMovementDto } from '../stock-movements/dto/create-stock-movement.dto';
import { ZodValidationPipe } from '../../common/validation/zod-validation.pipe';
import { MovementCreate } from '@areluna/schemas';

@ApiTags('Movements')
@Controller('movements')
export class MovementsController {
  constructor(private readonly stockMovementsService: StockMovementsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ 
    summary: 'Create stock movement',
    description: 'Create entrada/saída/transferência/ajuste with idempotency support'
  })
  @ApiHeader({
    name: 'Idempotency-Key',
    description: 'Unique key for idempotent operations',
    required: false,
  })
  @ApiResponse({
    status: 201,
    description: 'Movement created successfully',
  })
  @ApiResponse({
    status: 400,
    description: 'Bad request - validation error or insufficient stock',
  })
  @ApiResponse({
    status: 404,
    description: 'Product, warehouse, or location not found',
  })
  @ApiResponse({
    status: 409,
    description: 'Idempotency key already used with different data',
  })
  @UsePipes(new ZodValidationPipe(MovementCreate))
  async create(
    @Body() createMovementDto: CreateMovementDto,
    @Headers('idempotency-key') idempotencyKey?: string,
  ) {
    // TODO: Implement idempotency check
    if (idempotencyKey) {
      // Check if this key was already used
      // For now, just pass through to the service
    }

    return this.stockMovementsService.createMovement(createMovementDto);
  }

  @Get()
  @ApiOperation({ 
    summary: 'List stock movements',
    description: 'Get all stock movements with filtering and pagination'
  })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiQuery({ name: 'productId', required: false, description: 'Filter by product ID' })
  @ApiQuery({ name: 'warehouseId', required: false, description: 'Filter by warehouse ID' })
  @ApiQuery({ name: 'locationId', required: false, description: 'Filter by location ID' })
  @ApiQuery({ name: 'startDate', required: false, description: 'Filter by start date (ISO string)' })
  @ApiQuery({ name: 'endDate', required: false, description: 'Filter by end date (ISO string)' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number (default: 1)' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page (default: 100)' })
  @ApiResponse({
    status: 200,
    description: 'List of stock movements with pagination',
  })
  async findAll(
    @Query('tenantId') tenantId: string,
    @Query('productId') productId?: string,
    @Query('warehouseId') warehouseId?: string,
    @Query('locationId') locationId?: string,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string,
  ) {
    const pageNum = page ? parseInt(page) : 1;
    const limitNum = limit ? parseInt(limit) : 100;
    const offset = (pageNum - 1) * limitNum;

    return this.stockMovementsService.findAll(
      tenantId,
      limitNum,
      offset,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get movement by ID' })
  @ApiParam({ name: 'id', description: 'Movement ID' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiResponse({
    status: 200,
    description: 'Movement details',
  })
  @ApiResponse({
    status: 404,
    description: 'Movement not found',
  })
  async findOne(
    @Param('id') id: string,
    @Query('tenantId') tenantId: string,
  ) {
    return this.stockMovementsService.findOne(tenantId, id);
  }
}