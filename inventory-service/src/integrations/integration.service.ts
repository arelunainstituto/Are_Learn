import { Injectable, Logger, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateIntegrationDto, UpdateIntegrationDto, IntegrationQueryDto, TestConnectionDto, IntegrationProvider } from './dto/integration.dto';
import { IntegrationValidators } from './validators/integration.validators';
import { 
  IntegrationNotFoundException, 
  IntegrationConnectionException,
  ValidationException 
} from './exceptions/integration.exceptions';
import { getAvailableProviders } from './registry';

@Injectable()
export class IntegrationService {
  private readonly logger = new Logger(IntegrationService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createIntegrationDto: CreateIntegrationDto) {
    try {
      // Validate configuration
      IntegrationValidators.validateIntegrationConfig(
        createIntegrationDto.provider,
        createIntegrationDto.config
      );

      // Mock integration creation
      const integration = {
        id: `integration_${Date.now()}`,
        name: createIntegrationDto.name,
        provider: createIntegrationDto.provider,
        config: createIntegrationDto.config,
        isActive: createIntegrationDto.isActive ?? true,
        tenantId: createIntegrationDto.tenantId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.logger.log(`Created integration ${integration.id} for tenant ${createIntegrationDto.tenantId}`);
      return integration;
    } catch (error) {
      this.logger.error(`Failed to create integration: ${error.message}`, error.stack);
      
      if (error.code === 'P2002') {
        throw new ValidationException('Integration with this name already exists for this tenant and provider', 'name', createIntegrationDto.name);
      }
      
      throw error;
    }
  }

  async findAll(tenantId: string, query: IntegrationQueryDto) {
    try {
      // Mock integrations list
      const integrations = [
        {
          id: 'integration_1',
          name: 'Sage Integration',
          provider: IntegrationProvider.SAGE,
          isActive: true,
          tenantId,
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ];

      this.logger.debug(`Retrieved ${integrations.length} integrations for tenant ${tenantId}`);
      return integrations;
    } catch (error) {
      this.logger.error(`Failed to retrieve integrations for tenant ${tenantId}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async findOne(tenantId: string, id: string) {
    try {
      // Mock integration
      const integration = {
        id,
        name: 'Mock Integration',
        provider: IntegrationProvider.SAGE,
        config: { server: 'localhost', database: 'test' },
        isActive: true,
        tenantId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (!integration) {
        throw new IntegrationNotFoundException(id);
      }

      this.logger.debug(`Retrieved integration ${id} for tenant ${tenantId}`);
      return integration;
    } catch (error) {
      this.logger.error(`Failed to retrieve integration ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async update(tenantId: string, id: string, updateDto: UpdateIntegrationDto) {
    try {
      // Mock integration update
      const integration = {
        id,
        name: updateDto.name || 'Updated Integration',
        provider: IntegrationProvider.SAGE,
        config: updateDto.config || {},
        isActive: updateDto.isActive ?? true,
        tenantId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      if (updateDto.config) {
        IntegrationValidators.validateIntegrationConfig(integration.provider, updateDto.config);
      }

      this.logger.log(`Updated integration ${id} for tenant ${tenantId}`);
      return integration;
    } catch (error) {
      this.logger.error(`Failed to update integration ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async remove(tenantId: string, id: string) {
    try {
      // Mock integration deletion
      const deletedIntegration = {
        id,
        name: 'Deleted Integration',
        provider: IntegrationProvider.SAGE,
        tenantId,
        createdAt: new Date(),
        updatedAt: new Date()
      };

      this.logger.log(`Deleted integration ${id} for tenant ${tenantId}`);
      return deletedIntegration;
    } catch (error) {
      this.logger.error(`Failed to delete integration ${id}: ${error.message}`, error.stack);
      throw error;
    }
  }

  async testConnection(tenantId: string, id: string): Promise<{
    success: boolean;
    message: string;
    provider: IntegrationProvider;
    timestamp: string;
    connected: boolean;
  }> {
    try {
      // Mock connection test
      const connected = true;

      return {
        success: true,
        message: connected ? 'Connection successful' : 'Connection failed',
        provider: IntegrationProvider.SAGE,
        timestamp: new Date().toISOString(),
        connected
      };
    } catch (error) {
      return {
        success: false,
        message: error.message || 'Connection test failed',
        provider: IntegrationProvider.SAGE,
        timestamp: new Date().toISOString(),
        connected: false
      };
    }
  }

  async getFeatures(tenantId: string, id: string): Promise<{
    success: boolean;
    features: string[];
    provider: IntegrationProvider;
  }> {
    try {
      // Mock features
      const features = ['products', 'stock_levels', 'movements'];

      return {
        success: true,
        features,
        provider: IntegrationProvider.SAGE
      };
    } catch (error) {
      throw new BadRequestException(`Failed to get features: ${error.message}`);
    }
  }

  async getAvailableProviders() {
    try {
      const providers = getAvailableProviders();
      this.logger.debug(`Retrieved ${providers.length} available providers`);
      return providers;
    } catch (error) {
      this.logger.error(`Failed to get available providers: ${error.message}`, error.stack);
      throw error;
    }
  }
}