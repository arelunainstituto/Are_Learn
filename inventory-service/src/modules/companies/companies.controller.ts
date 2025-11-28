import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { CompanyQueryDto } from './dto/company-query.dto';

@ApiTags('companies')
@Controller('companies')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new company' })
  @ApiResponse({ status: 201, description: 'Company created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request' })
  create(
    @Query('tenantId') tenantId: string,
    @Body() createCompanyDto: CreateCompanyDto,
  ) {
    return this.companiesService.create(tenantId, createCompanyDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all companies' })
  @ApiResponse({ status: 200, description: 'Companies retrieved successfully' })
  @ApiQuery({ name: 'tenantId', required: true, description: 'Tenant ID' })
  @ApiQuery({ name: 'search', required: false, description: 'Search by name, code, or tax ID' })
  @ApiQuery({ name: 'isActive', required: false, description: 'Filter by active status' })
  @ApiQuery({ name: 'page', required: false, description: 'Page number' })
  @ApiQuery({ name: 'limit', required: false, description: 'Items per page' })
  findAll(
    @Query('tenantId') tenantId: string,
    @Query() query: CompanyQueryDto,
  ) {
    return this.companiesService.findAll(tenantId, query);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a company by ID' })
  @ApiResponse({ status: 200, description: 'Company retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  findOne(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.companiesService.findOne(tenantId, id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a company' })
  @ApiResponse({ status: 200, description: 'Company updated successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  update(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.companiesService.update(tenantId, id, updateCompanyDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a company' })
  @ApiResponse({ status: 200, description: 'Company deleted successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  remove(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.companiesService.remove(tenantId, id);
  }

  @Patch(':id/activate')
  @ApiOperation({ summary: 'Activate a company' })
  @ApiResponse({ status: 200, description: 'Company activated successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  activate(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.companiesService.activate(tenantId, id);
  }

  @Patch(':id/deactivate')
  @ApiOperation({ summary: 'Deactivate a company' })
  @ApiResponse({ status: 200, description: 'Company deactivated successfully' })
  @ApiResponse({ status: 404, description: 'Company not found' })
  @ApiParam({ name: 'id', description: 'Company ID' })
  deactivate(
    @Query('tenantId') tenantId: string,
    @Param('id') id: string,
  ) {
    return this.companiesService.deactivate(tenantId, id);
  }
}