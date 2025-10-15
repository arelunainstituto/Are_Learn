import { z } from 'zod'
import type {
  Tenant,
  InventoryItem,
  InventoryMovement,
  Category,
  Location
} from '@areluna/schemas'

// Base configuration schema for all adapters
export const AdapterConfigSchema = z.object({
  name: z.string(),
  version: z.string(),
  enabled: z.boolean().default(true),
  settings: z.record(z.any()).optional()
})

export type AdapterConfig = z.infer<typeof AdapterConfigSchema>

// Connection status
export enum ConnectionStatus {
  CONNECTED = 'connected',
  DISCONNECTED = 'disconnected',
  ERROR = 'error',
  CONNECTING = 'connecting'
}

// Sync result
export interface SyncResult<T = any> {
  success: boolean
  data?: T
  error?: string
  timestamp: Date
  recordsProcessed?: number
}

// Base ERP Adapter interface
export interface ERPAdapter {
  // Adapter metadata
  readonly name: string
  readonly version: string
  readonly description: string

  // Configuration
  config: AdapterConfig
  
  // Connection management
  connect(): Promise<void>
  disconnect(): Promise<void>
  isConnected(): boolean
  getConnectionStatus(): ConnectionStatus
  testConnection(): Promise<boolean>

  // Data synchronization
  syncTenants(): Promise<SyncResult<Tenant[]>>
  syncCategories(tenantId: string): Promise<SyncResult<Category[]>>
  syncLocations(tenantId: string): Promise<SyncResult<Location[]>>
  syncInventoryItems(tenantId: string): Promise<SyncResult<InventoryItem[]>>
  syncMovements(tenantId: string, fromDate?: Date): Promise<SyncResult<InventoryMovement[]>>

  // Data export (optional)
  exportInventoryItems?(tenantId: string, format?: 'json' | 'csv' | 'xml'): Promise<SyncResult<string>>
  exportMovements?(tenantId: string, fromDate?: Date, format?: 'json' | 'csv' | 'xml'): Promise<SyncResult<string>>

  // Health check
  healthCheck(): Promise<{
    status: 'healthy' | 'unhealthy'
    details?: Record<string, any>
  }>
}

// Abstract base class for ERP adapters
export abstract class BaseERPAdapter implements ERPAdapter {
  abstract readonly name: string
  abstract readonly version: string
  abstract readonly description: string

  protected connectionStatus: ConnectionStatus = ConnectionStatus.DISCONNECTED
  
  constructor(public config: AdapterConfig) {}

  abstract connect(): Promise<void>
  abstract disconnect(): Promise<void>
  abstract testConnection(): Promise<boolean>

  isConnected(): boolean {
    return this.connectionStatus === ConnectionStatus.CONNECTED
  }

  getConnectionStatus(): ConnectionStatus {
    return this.connectionStatus
  }

  protected setConnectionStatus(status: ConnectionStatus): void {
    this.connectionStatus = status
  }

  // Default implementations that can be overridden
  async syncTenants(): Promise<SyncResult<Tenant[]>> {
    throw new Error(`${this.name}: syncTenants not implemented`)
  }

  async syncCategories(tenantId: string): Promise<SyncResult<Category[]>> {
    throw new Error(`${this.name}: syncCategories not implemented`)
  }

  async syncLocations(tenantId: string): Promise<SyncResult<Location[]>> {
    throw new Error(`${this.name}: syncLocations not implemented`)
  }

  async syncInventoryItems(tenantId: string): Promise<SyncResult<InventoryItem[]>> {
    throw new Error(`${this.name}: syncInventoryItems not implemented`)
  }

  async syncMovements(tenantId: string, fromDate?: Date): Promise<SyncResult<InventoryMovement[]>> {
    throw new Error(`${this.name}: syncMovements not implemented`)
  }

  async healthCheck(): Promise<{ status: 'healthy' | 'unhealthy'; details?: Record<string, any> }> {
    try {
      const isConnected = await this.testConnection()
      return {
        status: isConnected ? 'healthy' : 'unhealthy',
        details: {
          connectionStatus: this.connectionStatus,
          lastCheck: new Date().toISOString()
        }
      }
    } catch (error) {
      return {
        status: 'unhealthy',
        details: {
          error: error instanceof Error ? error.message : 'Unknown error',
          connectionStatus: this.connectionStatus,
          lastCheck: new Date().toISOString()
        }
      }
    }
  }
}