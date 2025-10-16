import {
  Controller,
  Post,
  Param,
  Query,
  HttpCode,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiQuery,
} from '@nestjs/swagger';
import { IntegrationsService } from './integrations.service';

@ApiTags('Integrations')
@Controller('integrations')
export class IntegrationsController {
  private readonly logger = new Logger(IntegrationsController.name);

  constructor(private readonly integrationsService: IntegrationsService) {}

  @Post(':provider/sync')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Trigger synchronization with external provider',
    description: 'Manually trigger data synchronization with external systems'
  })
  @ApiParam({ 
    name: 'provider', 
    description: 'Provider name (e.g., shopify, woocommerce, zoho)',
    example: 'shopify'
  })
  @ApiQuery({ 
    name: 'tenantId', 
    required: true, 
    description: 'Tenant ID for the synchronization'
  })
  @ApiQuery({ 
    name: 'syncType', 
    required: false, 
    description: 'Type of sync (full, incremental, products, orders, inventory)',
    example: 'incremental'
  })
  @ApiQuery({ 
    name: 'since', 
    required: false, 
    description: 'Sync data since this timestamp (ISO string)',
    example: '2024-01-01T00:00:00Z'
  })
  @ApiResponse({
    status: 200,
    description: 'Synchronization started successfully',
    schema: {
      type: 'object',
      properties: {
        syncId: { type: 'string' },
        status: { type: 'string' },
        provider: { type: 'string' },
        syncType: { type: 'string' },
        startedAt: { type: 'string' },
        estimatedDuration: { type: 'string' },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid sync parameters',
  })
  @ApiResponse({
    status: 404,
    description: 'Provider not supported or tenant not found',
  })
  async triggerSync(
    @Param('provider') provider: string,
    @Query('tenantId') tenantId: string,
    @Query('syncType') syncType: string = 'incremental',
    @Query('since') since?: string,
  ) {
    return this.integrationsService.triggerSync(provider, tenantId, syncType, since);
  }

  @Post(':provider/status')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ 
    summary: 'Get synchronization status',
    description: 'Check the status of a running synchronization'
  })
  @ApiParam({ 
    name: 'provider', 
    description: 'Provider name'
  })
  @ApiQuery({ 
    name: 'syncId', 
    required: true, 
    description: 'Synchronization ID'
  })
  @ApiResponse({
    status: 200,
    description: 'Synchronization status retrieved',
  })
  async getSyncStatus(
    @Param('provider') provider: string,
    @Query('syncId') syncId: string,
  ) {
    return this.integrationsService.getSyncStatus(provider, syncId);
  }
}