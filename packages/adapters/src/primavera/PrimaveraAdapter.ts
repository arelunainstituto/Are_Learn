import { BaseAdapter, ConnectionConfig, Product, StockLevel, Movement, PushResult, PullOptions } from '../core/Adapter';

/**
 * Primavera ERP adapter for inventory integration
 * Connects to Primavera systems via REST API or database connection
 */
export class PrimaveraAdapter extends BaseAdapter {
  readonly provider = 'primavera';
  readonly version = '1.0.0';

  async testConnection(config: ConnectionConfig): Promise<boolean> {
    try {
      // Test connection to Primavera API
      const response = await fetch(`${config.url}/api/engine/status`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${config.username}:${config.password}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
        signal: AbortSignal.timeout(config.timeout || 10000),
      });

      return response.ok;
    } catch (error) {
      console.error('Primavera connection test failed:', error);
      return false;
    }
  }

  async pullProducts(config: ConnectionConfig, opts: PullOptions = {}): Promise<Product[]> {
    try {
      const params = new URLSearchParams();
      if (opts.since) params.append('lastModified', opts.since);
      if (opts.limit) params.append('pageSize', opts.limit.toString());

      const response = await fetch(`${config.url}/api/base/artigos?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${config.username}:${config.password}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.handleError(new Error(`HTTP ${response.status}`), 'pullProducts');
      }

      const data = await response.json();
      
      return data.DataSet?.Table?.map((item: any) => ({
        externalId: item.Artigo,
        sku: item.Artigo,
        name: item.Descricao || item.DescricaoAbreviada,
        uom: item.Unidade || 'UN',
        description: item.Descricao,
        category: item.Familia,
        price: parseFloat(item.PVP1) || 0,
        active: item.Inactivo !== true,
      })) || [];
    } catch (error) {
      this.handleError(error, 'pullProducts');
    }
  }

  async pullStockLevels(config: ConnectionConfig, opts: PullOptions = {}): Promise<StockLevel[]> {
    try {
      const params = new URLSearchParams();
      if (opts.since) params.append('lastModified', opts.since);
      if (opts.limit) params.append('pageSize', opts.limit.toString());

      const response = await fetch(`${config.url}/api/inventario/stocks?${params}`, {
        method: 'GET',
        headers: {
          'Authorization': `Basic ${Buffer.from(`${config.username}:${config.password}`).toString('base64')}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        this.handleError(new Error(`HTTP ${response.status}`), 'pullStockLevels');
      }

      const data = await response.json();
      
      return data.DataSet?.Table?.map((item: any) => ({
        externalProductId: item.Artigo,
        warehouseCode: item.Armazem || 'DEFAULT',
        qty: parseFloat(item.Stock) || 0,
        reservedQty: parseFloat(item.StockReservado) || 0,
        availableQty: parseFloat(item.StockDisponivel) || parseFloat(item.Stock) || 0,
        lastUpdated: item.UltimaActualizacao || new Date().toISOString(),
      })) || [];
    } catch (error) {
      this.handleError(error, 'pullStockLevels');
    }
  }

  async pushMovements(config: ConnectionConfig, movements: Movement[]): Promise<PushResult[]> {
    const results: PushResult[] = [];

    for (const movement of movements) {
      try {
        // Map movement types to Primavera document types
        const docType = this.mapMovementType(movement.type);
        
        const payload = {
          TipoDoc: docType,
          Serie: 'A',
          NumDoc: movement.reference || movement.id,
          DataDoc: movement.timestamp ? new Date(movement.timestamp).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
          Linhas: [{
            Artigo: movement.sku,
            Quantidade: movement.qty,
            Armazem: movement.warehouseTo || movement.warehouseFrom || 'DEFAULT',
            Lote: movement.lot,
            NumSerie: movement.serial,
            Observacoes: movement.notes,
          }],
        };

        const response = await fetch(`${config.url}/api/inventario/documentos`, {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${Buffer.from(`${config.username}:${config.password}`).toString('base64')}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const result = await response.json();
          results.push({
            externalId: result.Id?.toString() || movement.id,
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
        return 'ENT'; // Entrada
      case 'OUT':
        return 'SAI'; // Saída
      case 'TRANSFER':
        return 'TRA'; // Transferência
      case 'ADJUST':
        return 'REG'; // Regularização
      default:
        return 'MOV'; // Movimento genérico
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
      errors.push('Primavera API URL is required');
    }

    if (!config.username || !config.password) {
      errors.push('Primavera username and password are required');
    }

    if (config.url && !config.url.startsWith('http')) {
      errors.push('Primavera API URL must be a valid HTTP/HTTPS URL');
    }

    return {
      valid: errors.length === 0,
      errors: errors.length > 0 ? errors : undefined,
    };
  }
}