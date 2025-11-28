import { BaseAdapter, ConnectionConfig, Product, StockLevel, Movement, PushResult, PullOptions } from '../core/Adapter';

/**
 * PHC Software adapter for inventory integration
 * Connects to PHC ERP systems via REST API
 */
export class PhcAdapter extends BaseAdapter {
  readonly provider = 'phc';
  readonly version = '1.0.0';

  async testConnection(config: ConnectionConfig): Promise<boolean> {
    try {
      // Test connection to PHC API
      const response = await fetch(`${config.url}/api/v1/health`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(config.timeout || 10000),
      });

      return response.ok;
    } catch (error) {
      console.error('PHC connection test failed:', error);
      return false;
    }
  }

  async pullProducts(config: ConnectionConfig, opts: PullOptions = {}): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (opts.since) params.append('since', opts.since);
      if (opts.limit) params.append('limit', opts.limit.toString());

      const response = await fetch(`${config.url}/api/v1/products?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.handleError(new Error(`HTTP ${response.status}`), 'pullProducts');
      }

      const data = await response.json();
      
      return data.products?.map((item: any) => ({
        externalId: item.id.toString(),
        sku: item.code || item.sku,
        name: item.name || item.description,
        uom: item.unit || 'UN',
        description: item.description,
        category: item.category,
        price: item.price,
        active: item.active !== false,
      })) || [];
    } catch (error) {
      this.handleError(error, 'pullProducts');
    }
  }

  async pullStockLevels(config: ConnectionConfig, opts: PullOptions = {}): Promise<StockLevel[]> {
    try {
      const params = new URLSearchParams();
      if (opts.since) params.append('since', opts.since);
      if (opts.limit) params.append('limit', opts.limit.toString());

      const response = await fetch(`${config.url}/api/v1/stock?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.handleError(new Error(`HTTP ${response.status}`), 'pullStockLevels');
      }

      const data = await response.json();
      
      return data.stock?.map((item: any) => ({
        externalProductId: item.productId.toString(),
        warehouseCode: item.warehouse || 'DEFAULT',
        qty: parseFloat(item.quantity) || 0,
        reservedQty: parseFloat(item.reserved) || 0,
        availableQty: parseFloat(item.available) || parseFloat(item.quantity) || 0,
        lastUpdated: item.updatedAt || new Date().toISOString(),
      })) || [];
    } catch (error) {
      this.handleError(error, 'pullStockLevels');
    }
  }

  async pushMovements(config: ConnectionConfig, movements: Movement[]): Promise<PushResult[]> {
    const results: PushResult[] = [];

    for (const movement of movements) {
      try {
        const payload = {
          productCode: movement.sku,
          type: movement.type.toLowerCase(),
          quantity: movement.qty,
          warehouse: movement.warehouseTo || movement.warehouseFrom || 'DEFAULT',
          reference: movement.reference || movement.id,
          notes: movement.notes,
          date: movement.timestamp || new Date().toISOString(),
          lot: movement.lot,
          serial: movement.serial,
        };

        const response = await fetch(`${config.url}/api/v1/movements`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${config.apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const result = await response.json();
          results.push({
            externalId: result.id?.toString() || movement.id,
            status: 'ok',
          });
        } else {
          const error = await response.text();
          results.push({
            externalId: movement.id,
            status: 'error',
            reason: `HTTP ${response.status}: ${error}`,
          });
        }
      } catch (error) {
        results.push({
          externalId: movement.id,
          status: 'error',
          reason: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return results;
  }

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
    const baseValidation = await super.validateConfig(config);
    const errors = baseValidation.errors || [];

    if (!config.url) {
      errors.push('PHC API URL is required');
    }

    if (!config.apiKey) {
      errors.push('PHC API key is required');
    }

    if (config.url && !config.url.startsWith('http')) {
      errors.push('PHC API URL must be a valid HTTP/HTTPS URL');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}