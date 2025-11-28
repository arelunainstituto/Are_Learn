/**
 * Core adapter interface for inventory system integrations
 * Implements the port/adapter pattern for external ERP systems
 */

export type PullOptions = { 
  since?: string; 
  limit?: number;
};

export type PushResult = { 
  externalId: string; 
  status: "ok" | "skipped" | "error"; 
  reason?: string;
};

export type Product = {
  externalId: string;
  sku: string;
  name: string;
  uom: string;
  description?: string;
  category?: string;
  price?: number;
  active?: boolean;
};

export type StockLevel = {
  externalProductId: string;
  warehouseCode: string;
  qty: number;
  reservedQty?: number;
  availableQty?: number;
  lastUpdated?: string;
};

export type Movement = {
  id: string;
  sku: string;
  type: "IN" | "OUT" | "TRANSFER" | "ADJUST";
  qty: number;
  warehouseFrom?: string;
  warehouseTo?: string;
  lot?: string;
  serial?: string;
  reference?: string;
  notes?: string;
  timestamp?: string;
};

export type ConnectionConfig = {
  url?: string;
  apiKey?: string;
  username?: string;
  password?: string;
  database?: string;
  timeout?: number;
  [key: string]: any;
};

/**
 * Base interface that all inventory adapters must implement
 */
export interface InventoryAdapter {
  readonly provider: string;
  readonly version: string;
  
  /**
   * Test connection to the external system
   */
  testConnection(config: ConnectionConfig): Promise<boolean>;
  
  /**
   * Pull products from external system
   */
  pullProducts(config: ConnectionConfig, opts?: PullOptions): Promise<Product[]>;
  
  /**
   * Pull stock levels from external system
   */
  pullStockLevels(config: ConnectionConfig, opts?: PullOptions): Promise<StockLevel[]>;
  
  /**
   * Push movements to external system
   */
  pushMovements(config: ConnectionConfig, movements: Movement[]): Promise<PushResult[]>;
  
  /**
   * Get supported features of this adapter
   */
  getSupportedFeatures(): {
    pullProducts: boolean;
    pullStockLevels: boolean;
    pushMovements: boolean;
    realTimeSync: boolean;
    batchOperations: boolean;
  };
  
  /**
   * Validate configuration for this adapter
   */
  validateConfig(config: ConnectionConfig): Promise<{ valid: boolean; errors?: string[] }>;
}

/**
 * Abstract base class for adapters with common functionality
 */
export abstract class BaseAdapter implements InventoryAdapter {
  abstract readonly provider: string;
  abstract readonly version: string;
  
  abstract testConnection(config: ConnectionConfig): Promise<boolean>;
  abstract pullProducts(config: ConnectionConfig, opts?: PullOptions): Promise<Product[]>;
  abstract pullStockLevels(config: ConnectionConfig, opts?: PullOptions): Promise<StockLevel[]>;
  abstract pushMovements(config: ConnectionConfig, movements: Movement[]): Promise<PushResult[]>;
  
  getSupportedFeatures() {
    return {
      pullProducts: true,
      pullStockLevels: true,
      pushMovements: true,
      realTimeSync: false,
      batchOperations: true,
    };
  }
  
  async validateConfig(config: ConnectionConfig): Promise<{ valid: boolean; errors?: string[] }> {
    const errors: string[] = [];
    
    if (!config.url && !config.database) {
      errors.push('Either URL or database connection is required');
    }
    
    if (!config.apiKey && !config.username) {
      errors.push('Authentication credentials are required');
    }
    
    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
  
  /**
   * Helper method to handle API errors consistently
   */
  protected handleError(error: any, operation: string): never {
    const message = error.response?.data?.message || error.message || 'Unknown error';
    throw new Error(`${this.provider} ${operation} failed: ${message}`);
  }
  
  /**
   * Helper method to format dates consistently
   */
  protected formatDate(date: Date | string): string {
    if (typeof date === 'string') {
      return date;
    }
    return date.toISOString();
  }
  
  /**
   * Helper method to parse external dates
   */
  protected parseDate(dateStr: string): Date {
    return new Date(dateStr);
  }
}

/**
 * Adapter factory interface
 */
export interface AdapterFactory {
  create(provider: string): InventoryAdapter | null;
  register(provider: string, adapter: () => InventoryAdapter): void;
  getAvailableProviders(): string[];
}