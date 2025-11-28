import { BadRequestException } from '@nestjs/common';
import { CreateIntegrationDto, UpdateIntegrationDto, SyncOptionsDto, IntegrationProvider } from '../dto/integration.dto';

export class IntegrationValidators {
  /**
   * Validate integration configuration based on provider
   */
  static validateIntegrationConfig(provider: IntegrationProvider, config: Record<string, any>): void {
    switch (provider) {
      case IntegrationProvider.SAGE:
        this.validateSageConfig(config);
        break;
      case IntegrationProvider.PRIMAVERA:
        this.validatePrimaveraConfig(config);
        break;
      case IntegrationProvider.PHC:
        this.validatePHCConfig(config);
        break;
      case IntegrationProvider.MYSTORE:
        this.validateGenericConfig(config);
        break;
      default:
        throw new BadRequestException(`Unsupported provider: ${provider}`);
    }
  }

  /**
   * Validate Sage integration configuration
   */
  static validateSageConfig(config: Record<string, any>): void {
    const required = ['server', 'database', 'username', 'password'];
    this.validateRequiredFields(config, required, 'Sage');

    if (config.server && !this.isValidUrl(config.server)) {
      throw new BadRequestException('Invalid Sage server URL');
    }

    if (config.port && (config.port < 1 || config.port > 65535)) {
      throw new BadRequestException('Invalid Sage server port');
    }
  }

  /**
   * Validate Primavera integration configuration
   */
  static validatePrimaveraConfig(config: Record<string, any>): void {
    const required = ['server', 'company', 'username', 'password'];
    this.validateRequiredFields(config, required, 'Primavera');

    if (config.server && !this.isValidUrl(config.server)) {
      throw new BadRequestException('Invalid Primavera server URL');
    }

    if (config.apiVersion && !['v1', 'v2'].includes(config.apiVersion)) {
      throw new BadRequestException('Invalid Primavera API version');
    }
  }

  /**
   * Validate PHC integration configuration
   */
  static validatePHCConfig(config: Record<string, any>): void {
    const required = ['server', 'database', 'username', 'password'];
    this.validateRequiredFields(config, required, 'PHC');

    if (config.server && !this.isValidUrl(config.server)) {
      throw new BadRequestException('Invalid PHC server URL');
    }
  }

  /**
   * Validate generic integration configuration
   */
  static validateGenericConfig(config: Record<string, any>): void {
    const required = ['baseUrl'];
    this.validateRequiredFields(config, required, 'Generic');

    if (config.baseUrl && !this.isValidUrl(config.baseUrl)) {
      throw new BadRequestException('Invalid base URL');
    }
  }

  /**
   * Validate synchronization options
   */
  static validateSyncOptions(options: SyncOptionsDto): void {
    if (options.batchSize && (options.batchSize < 1 || options.batchSize > 1000)) {
      throw new BadRequestException('Batch size must be between 1 and 1000');
    }

    // At least one sync option must be enabled
    if (!options.syncProducts && !options.syncStock && !options.pushMovements) {
      throw new BadRequestException('At least one synchronization option must be enabled');
    }
  }

  /**
   * Validate create integration DTO
   */
  static validateCreateIntegration(dto: CreateIntegrationDto): void {
    if (!dto.tenantId || dto.tenantId.trim().length === 0) {
      throw new BadRequestException('Tenant ID is required');
    }

    if (!dto.name || dto.name.trim().length === 0) {
      throw new BadRequestException('Integration name is required');
    }

    if (!dto.provider) {
      throw new BadRequestException('Integration provider is required');
    }

    if (!dto.config || Object.keys(dto.config).length === 0) {
      throw new BadRequestException('Integration configuration is required');
    }

    this.validateIntegrationConfig(dto.provider, dto.config);
  }

  /**
   * Validate update integration DTO
   */
  static validateUpdateIntegration(dto: UpdateIntegrationDto): void {
    if (dto.name !== undefined && dto.name.trim().length === 0) {
      throw new BadRequestException('Integration name cannot be empty');
    }

    if (dto.config && Object.keys(dto.config).length === 0) {
      throw new BadRequestException('Integration configuration cannot be empty');
    }
  }

  /**
   * Validate product data
   */
  static validateProductData(product: any): void {
    if (!product.code || product.code.trim().length === 0) {
      throw new BadRequestException('Product code is required');
    }

    if (!product.name || product.name.trim().length === 0) {
      throw new BadRequestException('Product name is required');
    }

    if (product.price !== undefined && product.price < 0) {
      throw new BadRequestException('Product price cannot be negative');
    }
  }

  /**
   * Validate stock level data
   */
  static validateStockLevelData(stockLevel: any): void {
    if (!stockLevel.productCode || stockLevel.productCode.trim().length === 0) {
      throw new BadRequestException('Product code is required for stock level');
    }

    if (!stockLevel.warehouseCode || stockLevel.warehouseCode.trim().length === 0) {
      throw new BadRequestException('Warehouse code is required for stock level');
    }

    if (stockLevel.quantity === undefined || stockLevel.quantity < 0) {
      throw new BadRequestException('Stock quantity must be a non-negative number');
    }
  }

  /**
   * Validate movement data
   */
  static validateMovementData(movement: any): void {
    if (!movement.productCode || movement.productCode.trim().length === 0) {
      throw new BadRequestException('Product code is required for movement');
    }

    if (!movement.type || !['in', 'out', 'transfer'].includes(movement.type)) {
      throw new BadRequestException('Movement type must be "in", "out", or "transfer"');
    }

    if (movement.quantity === undefined || movement.quantity <= 0) {
      throw new BadRequestException('Movement quantity must be a positive number');
    }

    if (!movement.date || !this.isValidDate(movement.date)) {
      throw new BadRequestException('Valid movement date is required');
    }

    if (movement.type === 'transfer') {
      if (!movement.warehouseFrom || movement.warehouseFrom.trim().length === 0) {
        throw new BadRequestException('Source warehouse is required for transfer movements');
      }
      if (!movement.warehouseTo || movement.warehouseTo.trim().length === 0) {
        throw new BadRequestException('Destination warehouse is required for transfer movements');
      }
    }
  }

  /**
   * Helper method to validate required fields
   */
  private static validateRequiredFields(config: Record<string, any>, required: string[], provider: string): void {
    const missing = required.filter(field => !config[field] || config[field].toString().trim().length === 0);
    if (missing.length > 0) {
      throw new BadRequestException(`Missing required ${provider} configuration fields: ${missing.join(', ')}`);
    }
  }

  /**
   * Helper method to validate URL format
   */
  private static isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Helper method to validate date format
   */
  private static isValidDate(date: string): boolean {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }
}