// Core adapter interfaces and types
export * from './core'

// Base adapter interfaces and classes
export * from './base'

// Specific adapter implementations
export * from './saft'
export * from './phc'
export * from './primavera'
export * from './sage'
export * from './mystore'

// Adapter registry and factory
export class AdapterRegistry {
  private static adapters = new Map<string, any>()

  static register(name: string, adapterClass: any): void {
    this.adapters.set(name, adapterClass)
  }

  static get(name: string): any {
    return this.adapters.get(name)
  }

  static list(): string[] {
    return Array.from(this.adapters.keys())
  }

  static create(name: string, config: any): any {
    const AdapterClass = this.get(name)
    if (!AdapterClass) {
      throw new Error(`Adapter '${name}' not found`)
    }
    return new AdapterClass(config)
  }
}

// Register built-in adapters
import { SaftAdapter } from './saft'

AdapterRegistry.register('saft', SaftAdapter)

// Export convenience functions
export function createAdapter(name: string, config: any) {
  return AdapterRegistry.create(name, config)
}

export function listAdapters(): string[] {
  return AdapterRegistry.list()
}