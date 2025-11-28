import { BaseAdapter, ConnectionConfig, Product, StockLevel, Movement, PushResult, PullOptions } from '../core/Adapter';

/**
 * MyStore e-commerce adapter for inventory integration
 * Connects to MyStore platforms via REST API
 */
export class MyStoreAdapter extends BaseAdapter {
  readonly provider = 'mystore';
  readonly version = '1.0.0';

  async testConnection(config: ConnectionConfig): Promise<boolean> {
    try {
      // Test connection to MyStore API
      const response = await fetch(`${config.url}/api/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${config.apiKey}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(config.timeout || 10000),
      });

      return response.ok;
    } catch (error) {
      console.error('MyStore connection test failed:', error);
      return false;
    }
  }

  async pullProducts(config: ConnectionConfig, opts: PullOptions = {}): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (opts.since) params.append('updated_at_min', opts.since);
      if (opts.limit) params.append('limit', opts.limit.toString());

      const response = await fetch(`${config.url}/api/products?${params}`, {
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
        sku: item.sku || item.handle,
        name: item.title || item.name,
        uom: 'UN',
        description: item.body_html || item.description,
        category: item.product_type,
        price: parseFloat(item.variants?.[0]?.price) || 0,
        active: item.status === 'active',
      })) || [];
    } catch (error) {
      this.handleError(error, 'pullProducts');
    }
  }

  async pullStockLevels(config: ConnectionConfig, opts: PullOptions = {}): Promise<StockLevel[]> {
    try {
      const params = new URLSearchParams();
      if (opts.since) params.append('updated_at_min', opts.since);
      if (opts.limit) params.append('limit', opts.limit.toString());

      const response = await fetch(`${config.url}/api/inventory_levels?${params}`, {
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
      
      return data.inventory_levels?.map((item: any) => ({
        externalProductId: item.inventory_item_id?.toString() || item.variant_id?.toString(),
        warehouseCode: item.location_id?.toString() || 'DEFAULT',
        qty: parseInt(item.available) || 0,
        reservedQty: parseInt(item.reserved) || 0,
        availableQty: parseInt(item.available) || 0,
        lastUpdated: item.updated_at || new Date().toISOString(),
      })) || [];
    } catch (error) {
      this.handleError(error, 'pullStockLevels');
    }
  }

  async pushMovements(config: ConnectionConfig, movements: Movement[]): Promise<PushResult[]> {
    const results: PushResult[] = [];

    for (const movement of movements) {
      try {
        // MyStore typically uses inventory adjustments
        const payload = {
          inventory_item_id: movement.sku, // Assuming SKU maps to inventory_item_id
          location_id: movement.warehouseTo || movement.warehouseFrom || 'DEFAULT',
          available_adjustment: this.calculateAdjustment(movement),
          reason: movement.notes || `${movement.type} movement`,
        };

        const response = await fetch(`${config.url}/api/inventory_levels/adjust`, {
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
            externalId: result.inventory_level?.inventory_item_id?.toString() || movement.id,
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

  private calculateAdjustment(movement: Movement): number {
    switch (movement.type) {
      case 'IN':
        return movement.qty;
      case 'OUT':
        return -movement.qty;
      case 'ADJUST':
        return movement.qty; // Assuming qty is the adjustment amount
      case 'TRANSFER':
        // For transfers, this would need to be handled as two separate adjustments
        return movement.qty;
      default:
        return 0;
    }
  }

  getSupportedFeatures() {
    return {
      pullProducts: true,
      pullStockLevels: true,
      pushMovements: true,
      realTimeSync: true, // MyStore supports webhooks
      batchOperations: false, // MyStore typically processes one at a time
    };
  }

  async validateConfig(config: ConnectionConfig): Promise<{ valid: boolean; errors?: string[] }> {
    const baseValidation = await super.validateConfig(config);
    const errors = baseValidation.errors || [];

    if (!config.url) {
      errors.push('MyStore API URL is required');
    }

    if (!config.apiKey) {
      errors.push('MyStore API key is required');
    }

    if (config.url && !config.url.startsWith('http')) {
      errors.push('MyStore API URL must be a valid HTTP/HTTPS URL');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}