import { InventoryAdapter, ConnectionConfig } from '../../../packages/adapters/src/core/Adapter';
import { PhcAdapter } from '../../../packages/adapters/src/phc';
import { PrimaveraAdapter } from '../../../packages/adapters/src/primavera';
import { SageAdapter } from '../../../packages/adapters/src/sage';
import { MyStoreAdapter } from '../../../packages/adapters/src/mystore';

/**
 * Registry of available inventory adapters
 * Maps provider names to adapter factory functions
 */
export const adapterRegistry: Record<string, () => InventoryAdapter> = {
  phc: () => new PhcAdapter(),
  primavera: () => new PrimaveraAdapter(),
  sage: () => new SageAdapter(),
  mystore: () => new MyStoreAdapter(),
};

/**
 * Get an adapter instance by provider name
 */
export function getAdapter(provider: string): InventoryAdapter | null {
  const factory = adapterRegistry[provider];
  return factory ? factory() : null;
}

/**
 * Get list of available providers
 */
export function getAvailableProviders(): string[] {
  return Object.keys(adapterRegistry);
}

/**
 * Check if a provider is supported
 */
export function isProviderSupported(provider: string): boolean {
  return provider in adapterRegistry;
}

/**
 * Test connection for a specific provider with given config
 */
export async function testProviderConnection(
  provider: string,
  config: ConnectionConfig
): Promise<{ success: boolean; error?: string }> {
  try {
    const adapter = getAdapter(provider);
    if (!adapter) {
      return { success: false, error: `Provider '${provider}' not found` };
    }

    // Validate config first
    const validation = await adapter.validateConfig(config);
    if (!validation.valid) {
      return { 
        success: false, 
        error: `Configuration invalid: ${validation.errors?.join(', ')}` 
      };
    }

    // Test connection
    const connected = await adapter.testConnection(config);
    return { success: connected };
  } catch (error) {
    return { 
      success: false, 
      error: error instanceof Error ? error.message : 'Unknown error' 
    };
  }
}

/**
 * Get adapter features for a specific provider
 */
export function getProviderFeatures(provider: string): Record<string, boolean> | null {
  const adapter = getAdapter(provider);
  return adapter ? adapter.getSupportedFeatures() : null;
}