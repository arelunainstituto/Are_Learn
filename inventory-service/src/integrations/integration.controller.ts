import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { IntegrationService } from './integration.service';
import { CreateIntegrationDto, UpdateIntegrationDto, IntegrationQueryDto } from './dto/integration.dto';

@ApiTags('integrations')
@Controller('integrations')
export class IntegrationController {
  constructor(private readonly integrationService: IntegrationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new integration' })
  @ApiResponse({ status: 201, description: 'Integration created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  @ApiResponse({ status: 409, description: 'Integration already exists' })
  async create(
    @Body() createIntegrationDto: CreateIntegrationDto,
  ) {
    try {
      const integration = await this.integrationService.create(createIntegrationDto);
      return {
        success: true,
        data: integration,
        message: 'Integration created successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  @ApiOperation({ summary: 'List all integrations for tenant' })
  @ApiResponse({ status: 200, description: 'Integrations retrieved successfully' })
  async findAll(
    @Query() query: IntegrationQueryDto,
  ) {
    const integrations = await this.integrationService.findAll('default-tenant', query);
    return { success: true, data: integrations };
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get integration by ID' })
  @ApiResponse({ status: 200, description: 'Integration retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async findOne(
    @Param('id') id: string,
  ) {
    try {
      const integration = await this.integrationService.findOne('default-tenant', id);
      return {
        success: true,
        data: integration,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to retrieve integration',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update integration' })
  @ApiResponse({ status: 200, description: 'Integration updated successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  @ApiResponse({ status: 400, description: 'Invalid input data' })
  async update(
    @Param('id') id: string,
    @Body() updateIntegrationDto: UpdateIntegrationDto,
  ) {
    try {
      const integration = await this.integrationService.update('default-tenant', id, updateIntegrationDto);
      return {
        success: true,
        data: integration,
        message: 'Integration updated successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to update integration',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete integration' })
  @ApiResponse({ status: 200, description: 'Integration deleted successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async remove(
    @Param('id') id: string,
  ) {
    try {
      await this.integrationService.remove('default-tenant', id);
      return {
        success: true,
        message: 'Integration deleted successfully',
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to delete integration',
        },
        HttpStatus.NOT_FOUND,
      );
    }
  }

  @Post(':id/test')
  @ApiOperation({ summary: 'Test integration connection' })
  @ApiResponse({ status: 200, description: 'Connection test completed' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async testConnection(
    @Param('id') id: string,
  ) {
    try {
      const result = await this.integrationService.testConnection('default-tenant', id);
      return {
        success: result.success,
        data: {
          connected: result.connected,
          provider: result.provider,
          timestamp: result.timestamp,
        },
        message: result.message,
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Connection test failed',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get(':id/features')
  @ApiOperation({ summary: 'Get integration supported features' })
  @ApiResponse({ status: 200, description: 'Features retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async getFeatures(
    @Param('id') id: string,
  ) {
    try {
      const result = await this.integrationService.getFeatures('default-tenant', id);
      return {
        success: result.success,
        data: {
          features: result.features,
          provider: result.provider,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          success: false,
          message: error.message || 'Failed to get features',
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get('providers/available')
  @ApiOperation({ summary: 'Get available integration providers' })
  @ApiResponse({ status: 200, description: 'Providers retrieved successfully' })
  async getAvailableProviders() {
    const providers = await this.integrationService.getAvailableProviders();
    return {
      success: true,
      data: providers,
      message: 'Available providers retrieved successfully',
    };
  }
}