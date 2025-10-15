const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3005'

class ApiClient {
  private baseUrl: string

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Tenants
  async getTenants() {
    return this.request('/tenants')
  }

  async createTenant(data: any) {
    return this.request('/tenants', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Categories
  async getCategories(tenantId: string) {
    return this.request(`/categories?tenantId=${tenantId}`)
  }

  async createCategory(data: any) {
    return this.request('/categories', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Locations
  async getLocations(tenantId: string) {
    return this.request(`/locations?tenantId=${tenantId}`)
  }

  async createLocation(data: any) {
    return this.request('/locations', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  // Products (Inventory Items)
  async getProducts(tenantId: string, params?: any) {
    const queryString = new URLSearchParams({
      tenantId,
      ...params,
    }).toString()
    
    return this.request(`/api/products?${queryString}`)
  }

  async createProduct(data: any) {
    return this.request('/api/products', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateProduct(id: string, data: any) {
    return this.request(`/api/products/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  // Legacy aliases for backward compatibility
  async getInventoryItems(tenantId: string, params?: any) {
    return this.getProducts(tenantId, params)
  }

  async createInventoryItem(data: any) {
    return this.createProduct(data)
  }

  async updateInventoryItem(id: string, data: any) {
    return this.updateProduct(id, data)
  }

  // Movements
  async getMovements(tenantId: string, params?: any) {
    const queryString = new URLSearchParams({
      tenantId,
      ...params,
    }).toString()
    
    return this.request(`/movements?${queryString}`)
  }

  async createMovement(data: any) {
    return this.request('/movements', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }
}

export const apiClient = new ApiClient()
export default apiClient