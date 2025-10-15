import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Query,
  HttpStatus,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { SyncService } from './sync.service';
import { SyncOptionsDto } from './dto/integration.dto';
// TODO: Implement auth guards and decorators
// import { JwtAuthGuard } from '../auth/jwt-auth.guard';
// import { TenantGuard } from '../auth/tenant.guard';
// import { CurrentTenant } from '../auth/current-tenant.decorator';

@ApiTags('synchronization')
@ApiBearerAuth()
// TODO: Add auth guards when implemented
// @UseGuards(JwtAuthGuard, TenantGuard)
@Controller('sync')
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post('integrations/:integrationId/pull-products')
  @ApiOperation({ summary: 'Pull products from external system' })
  @ApiResponse({ status: 200, description: 'Product sync initiated successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  @ApiResponse({ status: 400, description: 'Sync failed' })
  async pullProducts(
    // TODO: Add tenant decorator when implemented
    // @CurrentTenant() tenantId: string,
    @Param('integrationId') integrationId: string,
    @Body() options: SyncOptionsDto = {},
  ) {
    try {
      // TODO: Get tenantId from auth context
      const tenantId = 'default-tenant';
      const result = await this.syncService.pullProducts(tenantId, integrationId, options);
      return {
        success: true,
        data: result,
        message: `Product sync completed: ${result.successCount}/${result.totalProducts} successful`,
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

  @Post('integrations/:integrationId/pull-stock')
  @ApiOperation({ summary: 'Pull stock levels from external system' })
  @ApiResponse({ status: 200, description: 'Stock sync initiated successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  @ApiResponse({ status: 400, description: 'Sync failed' })
  async pullStockLevels(
    // TODO: Add tenant decorator when implemented
    // @CurrentTenant() tenantId: string,
    @Param('integrationId') integrationId: string,
    @Body() options: SyncOptionsDto = {},
  ) {
    try {
      // TODO: Get tenantId from auth context
      const tenantId = 'default-tenant';
      const result = await this.syncService.pullStockLevels(tenantId, integrationId, options);
      return {
        success: true,
        data: result,
        message: `Stock sync completed: ${result.successCount}/${result.totalStockLevels} successful`,
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

  @Post('integrations/:integrationId/push-movements')
  @ApiOperation({ summary: 'Push inventory movements to external system' })
  @ApiResponse({ status: 200, description: 'Movement push completed successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  @ApiResponse({ status: 400, description: 'Push failed' })
  async pushMovements(
    // TODO: Add tenant decorator when implemented
    // @CurrentTenant() tenantId: string,
    @Param('integrationId') integrationId: string,
    @Body() body: { movementIds: string[]; options?: SyncOptionsDto },
  ) {
    try {
      // TODO: Get tenantId from auth context
      const tenantId = 'default-tenant';
      const { movementIds, options = {} } = body;
      
      if (!movementIds || movementIds.length === 0) {
        throw new Error('Movement IDs are required');
      }

      const result = await this.syncService.pushMovements(tenantId, integrationId, movementIds, options);
      return {
        success: true,
        data: result,
        message: `Movement push completed: ${result.successCount}/${result.totalMovements} successful`,
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

  @Get('integrations/:integrationId/tasks')
  @ApiOperation({ summary: 'Get sync tasks for integration' })
  @ApiResponse({ status: 200, description: 'Sync tasks retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async getSyncTasks(
    // TODO: Add tenant decorator when implemented
    // @CurrentTenant() tenantId: string,
    @Param('integrationId') integrationId: string,
    @Query('limit') limit: number = 20,
    @Query('offset') offset: number = 0,
  ) {
    try {
      // TODO: Get tenantId from auth context
      const tenantId = 'default-tenant';
      const tasks = await this.syncService.getSyncTasks(tenantId, integrationId);
      return {
        success: true,
        data: tasks,
        message: 'Sync tasks retrieved successfully',
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

  @Get('tasks/:taskId')
  @ApiOperation({ summary: 'Get sync task details' })
  @ApiResponse({ status: 200, description: 'Sync task retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Task not found' })
  async getSyncTask(
    // TODO: Add tenant decorator when implemented
    // @CurrentTenant() tenantId: string,
    @Param('taskId') taskId: string,
  ) {
    try {
      // TODO: Get tenantId from auth context
      const tenantId = 'default-tenant';
      const task = await this.syncService.getSyncTask(tenantId, taskId);
      if (!task) {
        throw new HttpException(
          {
            success: false,
            message: 'Sync task not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      return {
        success: true,
        data: task,
        message: 'Sync task retrieved successfully',
      };
    } catch (error) {
      const status = error.status || HttpStatus.BAD_REQUEST;
      throw new HttpException(
        {
          success: false,
          message: error.message,
        },
        status,
      );
    }
  }

  @Get('integrations/:integrationId/status')
  @ApiOperation({ summary: 'Get integration sync status' })
  @ApiResponse({ status: 200, description: 'Sync status retrieved successfully' })
  @ApiResponse({ status: 404, description: 'Integration not found' })
  async getSyncStatus(
    // TODO: Add tenant decorator when implemented
    // @CurrentTenant() tenantId: string,
    @Param('integrationId') integrationId: string,
  ) {
    try {
      // TODO: Get tenantId from auth context
      const tenantId = 'default-tenant';
      const status = await this.syncService.getSyncStatus(tenantId, integrationId);
      return {
        success: true,
        data: status,
        message: 'Sync status retrieved successfully',
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
}