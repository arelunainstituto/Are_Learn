import { BaseAdapter, ConnectionConfig, Product, StockLevel, Movement, PushResult, PullOptions } from '../core/Adapter';

/**
 * Sage ERP adapter for inventory integration
 * Connects to Sage systems via REST API
 */
export class SageAdapter extends BaseAdapter {
  readonly provider = 'sage';
  readonly version = '1.0.0';

  async testConnection(config: ConnectionConfig): Promise<boolean> {
    try {
      // Test connection to Sage API
      const response = await fetch(`${config.url}/api/v1/ping`, {
        method: 'GET',
        headers: {
          'X-API-Key': config.apiKey || '',
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(config.timeout || 10000),
      });

      return response.ok;
    } catch (error) {
      console.error('Sage connection test failed:', error);
      return false;
    }
  }

  async pullProducts(config: ConnectionConfig, opts: PullOptions = {}): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (opts.since) params.append('modifiedSince', opts.since);
      if (opts.limit) params.append('limit', opts.limit.toString());

      const response = await fetch(`${config.url}/api/v1/items?${params}`, {
        method: 'GET',
        headers: {
          'X-API-Key': config.apiKey || '',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.handleError(new Error(`HTTP ${response.status}`), 'pullProducts');
      }

      const data = await response.json();
      
      return data.items?.map((item: any) => ({
        externalId: item.itemId || item.id,
        sku: item.itemCode || item.sku,
        name: item.itemName || item.description,
        uom: item.baseUnit || 'EACH',
        description: item.description,
        category: item.category,
        price: parseFloat(item.unitPrice) || 0,
        active: item.isActive !== false,
      })) || [];
    } catch (error) {
      this.handleError(error, 'pullProducts');
    }
  }

  async pullStockLevels(config: ConnectionConfig, opts: PullOptions = {}): Promise<StockLevel[]> {
    try {
      const params = new URLSearchParams();
      if (opts.since) params.append('modifiedSince', opts.since);
      if (opts.limit) params.append('limit', opts.limit.toString());

      const response = await fetch(`${config.url}/api/v1/inventory?${params}`, {
        method: 'GET',
        headers: {
          'X-API-Key': config.apiKey || '',
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.handleError(new Error(`HTTP ${response.status}`), 'pullStockLevels');
      }

      const data = await response.json();
      
      return data.inventory?.map((item: any) => ({
        externalProductId: item.itemId || item.itemCode,
        warehouseCode: item.locationCode || 'MAIN',
        qty: parseFloat(item.quantityOnHand) || 0,
        reservedQty: parseFloat(item.quantityReserved) || 0,
        availableQty: parseFloat(item.quantityAvailable) || parseFloat(item.quantityOnHand) || 0,
        lastUpdated: item.lastModified || new Date().toISOString(),
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
          itemCode: movement.sku,
          transactionType: this.mapMovementType(movement.type),
          quantity: movement.qty,
          locationCode: movement.warehouseTo || movement.warehouseFrom || 'MAIN',
          reference: movement.reference || movement.id,
          notes: movement.notes,
          transactionDate: movement.timestamp || new Date().toISOString(),
          lotNumber: movement.lot,
          serialNumber: movement.serial,
        };

        const response = await fetch(`${config.url}/api/v1/inventory/transactions`, {
          method: 'POST',
          headers: {
            'X-API-Key': config.apiKey || '',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const result = await response.json();
          results.push({
            externalId: result.transactionId?.toString() || movement.id,
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

  private mapMovementType(type: string): string {
    switch (type) {
      case 'IN':
        return 'RECEIPT';
      case 'OUT':
        return 'ISSUE';
      case 'TRANSFER':
        return 'TRANSFER';
      case 'ADJUST':
        return 'ADJUSTMENT';
      default:
        return 'MISC';
    }
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
      errors.push('Sage API URL is required');
    }

    if (!config.apiKey) {
      errors.push('Sage API key is required');
    }

    if (config.url && !config.url.startsWith('http')) {
      errors.push('Sage API URL must be a valid HTTP/HTTPS URL');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}