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
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@ApiTags('products')
@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 409, description: 'Product SKU already exists' })
  create(
    @Query('tenantId') tenantId: string,
    @Body() createProductDto: CreateProductDto,
  ) {
    return this.productsService.create(tenantId, createProductDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all products for a tenant' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean })
  @ApiQuery({ name: 'categoryId', required: false, type: String })
  @ApiResponse({ status: 200, description: 'List of products' })
  findAll(
    @Query('tenantId') tenantId: string,
    @Query('includeInactive') includeInactive?: boolean,
    @Query('categoryId') categoryId?: string,
  ) {
    return this.productsService.findAll(tenantId, includeInactive);
  }

  @Get('search')
  @ApiOperation({ summary: 'Search products by query' })
  @ApiQuery({ name: 'q', description: 'Search query' })
  @ApiQuery({ name: 'includeInactive', required: false, type: Boolean })
  @ApiResponse({ status: 200, description: 'Search results' })
  search(
    @Query('tenantId') tenantId: string,
    @Query('q') query: string,
    @Query('includeInactive') includeInactive?: boolean,
  ) {
    return this.productsService.search(tenantId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Query('tenantId') tenantId: string, @Param('id') id: string) {
    return this.productsService.findOne(tenantId, id);
  }

  @Get('sku/:sku')
  @ApiOperation({ summary: 'Get a product by SKU' })
  @ApiParam({ name: 'sku', description: 'Product SKU' })
  @ApiResponse({ status: 200, description: 'Product details' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findBySku(@Query('tenantId') tenantId: string, @Param('sku') sku: string) {
    return this.productsService.findBySku(tenantId, sku);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Product SKU already exists' })
  update(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(tenantId, id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 204, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  @ApiResponse({ status: 409, description: 'Cannot delete product with existing data' })
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Query('tenantId') tenantId: string, @Param('id') id: string) {
    return this.productsService.remove(tenantId, id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deactivated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  deactivate(@Query('tenantId') tenantId: string, @Param('id') id: string) {
    return this.productsService.deactivate(tenantId, id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate a product' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product activated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  activate(@Query('tenantId') tenantId: string, @Param('id') id: string) {
    return this.productsService.activate(tenantId, id);
  }
}