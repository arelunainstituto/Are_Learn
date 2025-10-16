'use client';

import { useEffect, useState, useMemo, useCallback } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiClient } from '@/lib/api';
import { 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Upload,
  Edit,
  Trash2,
  Package,
  QrCode
} from 'lucide-react';
import { QRReader } from '@/components/qr-reader';
import { TablePreferences } from '@/components/table-preferences';
import { WarehouseFilter } from '@/components/warehouse-filter';
import { SearchInput, FilterPanel, FilterState } from '@/components/search';
import { useSearch } from '@/hooks/use-search';

interface Product {
  id: string;
  tenantId: string;
  name: string;
  sku: string;
  description?: string;
  type: string;
  costPrice?: number;
  sellingPrice?: number;
  minStock?: number;
  maxStock?: number;
  isActive: boolean;
  isTrackable: boolean;
  tags?: string;
  createdAt: string;
  updatedAt: string;
}

interface ProductFormData {
  name: string;
  sku: string;
  description: string;
  type: string;
  costPrice: string;
  sellingPrice: string;
  minStock: string;
  maxStock: string;
  isActive: boolean;
}

export default function InventoryPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleColumns, setVisibleColumns] = useState<string[]>([
    'sku', 'name', 'type', 'costPrice', 'sellingPrice', 'stock', 'status'
  ]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    sku: '',
    description: '',
    type: 'SIMPLE',
    costPrice: '',
    sellingPrice: '',
    minStock: '',
    maxStock: '',
    isActive: true
  });

  // Initialize filter state for FilterPanel
  const [filterState, setFilterState] = useState<FilterState>({
    search: '',
    category: undefined,
    dateRange: undefined,
    priceRange: undefined,
    user: undefined,
    status: undefined,
    tags: []
  });

  // Search and filter functionality
  const { 
    searchTerm, 
    setSearchTerm, 
    suggestions,
    filters, 
    updateFilter,
    clearFilters,
    filteredData,
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder
  } = useSearch(products, {
    searchFields: ['name', 'sku', 'description']
  });

  // Handle filter changes from FilterPanel
  const handleFilterChange = (newFilters: FilterState) => {
    setFilterState(newFilters);
    
    // Clear existing filters first
    clearFilters();
    
    // Apply new filters using updateFilter
    if (newFilters.category) {
      updateFilter('type', newFilters.category);
    }
    
    if (newFilters.status) {
      updateFilter('isActive', newFilters.status === 'active');
    }
    
    if (newFilters.priceRange) {
      updateFilter('sellingPrice', {
        min: newFilters.priceRange.min || 0,
        max: newFilters.priceRange.max || Infinity
      });
    }
    
    if (newFilters.dateRange) {
      updateFilter('createdAt', {
        from: newFilters.dateRange.from,
        to: newFilters.dateRange.to
      });
    }
  };

  // Convert suggestions to SearchSuggestion format
  const searchSuggestions = useMemo(() => {
    return suggestions.map(suggestion => ({
      id: suggestion,
      label: suggestion,
      value: suggestion
    }));
  }, [suggestions]);

  // Use filteredData directly from the hook
  const finalFilteredProducts = filteredData;

  const tenantId = 'cmgsa8nz2000414ohapm9c0mx'; // Hardcoded for now

  // Mock data for demonstration
  const mockProducts: Product[] = [
    {
      id: '1',
      tenantId,
      name: 'Smartphone Samsung Galaxy S23',
      sku: 'SAM-S23-128',
      description: 'Smartphone Android com 128GB de armazenamento',
      type: 'SIMPLE',
      costPrice: 450.00,
      sellingPrice: 699.99,
      minStock: 5,
      maxStock: 50,
      isActive: true,
      isTrackable: true,
      tags: 'smartphone,samsung,android',
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z'
    },
    {
      id: '2',
      tenantId,
      name: 'Laptop Dell Inspiron 15',
      sku: 'DELL-INS15-512',
      description: 'Laptop com processador Intel i5 e 512GB SSD',
      type: 'SIMPLE',
      costPrice: 650.00,
      sellingPrice: 899.99,
      minStock: 3,
      maxStock: 20,
      isActive: true,
      isTrackable: true,
      tags: 'laptop,dell,computer',
      createdAt: '2024-01-10T14:30:00Z',
      updatedAt: '2024-01-10T14:30:00Z'
    },
    {
      id: '3',
      tenantId,
      name: 'Headphones Sony WH-1000XM4',
      sku: 'SONY-WH1000XM4',
      description: 'Headphones com cancelamento de ruído',
      type: 'SIMPLE',
      costPrice: 180.00,
      sellingPrice: 299.99,
      minStock: 10,
      maxStock: 100,
      isActive: false,
      isTrackable: true,
      tags: 'headphones,sony,audio',
      createdAt: '2024-01-05T09:15:00Z',
      updatedAt: '2024-01-20T16:45:00Z'
    },
    {
      id: '4',
      tenantId,
      name: 'Kit Teclado + Mouse Logitech',
      sku: 'LOG-KM-COMBO',
      description: 'Kit wireless com teclado e mouse',
      type: 'BUNDLE',
      costPrice: 45.00,
      sellingPrice: 79.99,
      minStock: 15,
      maxStock: 80,
      isActive: true,
      isTrackable: true,
      tags: 'keyboard,mouse,logitech,wireless',
      createdAt: '2024-01-12T11:20:00Z',
      updatedAt: '2024-01-12T11:20:00Z'
    },
    {
      id: '5',
      tenantId,
      name: 'Monitor LG UltraWide 29"',
      sku: 'LG-UW29-IPS',
      description: 'Monitor ultrawide IPS 29 polegadas',
      type: 'VARIABLE',
      costPrice: 220.00,
      sellingPrice: 349.99,
      minStock: 2,
      maxStock: 15,
      isActive: true,
      isTrackable: true,
      tags: 'monitor,lg,ultrawide,ips',
      createdAt: '2024-01-08T13:45:00Z',
      updatedAt: '2024-01-18T10:30:00Z'
    }
  ];

  useEffect(() => {
    // Use mock data instead of API call for demonstration
    setProducts(mockProducts);
    setLoading(false);
  }, []);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await apiClient.getProducts(tenantId);
      const productsArray = Array.isArray(response) ? response : [];
      setProducts(productsArray);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateProduct = async () => {
    try {
      const productData = {
        tenantId,
        name: formData.name,
        sku: formData.sku,
        description: formData.description,
        type: formData.type,
        costPrice: parseFloat(formData.costPrice) || 0,
        sellingPrice: parseFloat(formData.sellingPrice) || 0,
        minStock: parseInt(formData.minStock) || 0,
        maxStock: parseInt(formData.maxStock) || 0,
        isActive: formData.isActive
      };

      await apiClient.createProduct(productData);
      await fetchProducts();
      setIsCreateModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const handleEditProduct = async () => {
    if (!editingProduct) return;

    try {
      const productData = {
        name: formData.name,
        sku: formData.sku,
        description: formData.description,
        type: formData.type,
        costPrice: parseFloat(formData.costPrice) || 0,
        sellingPrice: parseFloat(formData.sellingPrice) || 0,
        minStock: parseInt(formData.minStock) || 0,
        maxStock: parseInt(formData.maxStock) || 0,
        isActive: formData.isActive
      };

      await apiClient.updateProduct(editingProduct.id, productData);
      await fetchProducts();
      setIsEditModalOpen(false);
      setEditingProduct(null);
      resetForm();
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      sku: '',
      description: '',
      type: 'SIMPLE',
      costPrice: '',
      sellingPrice: '',
      minStock: '',
      maxStock: '',
      isActive: true
    });
  };

  const handleQRScan = (data: { sku?: string; location?: string; [key: string]: any }) => {
    if (data.sku) {
      setSearchTerm(data.sku);
    }
    // Location handling would be implemented when warehouse/location features are added
  };

  const tableColumns = useMemo(() => [
    { key: 'sku', label: 'SKU' },
    { key: 'name', label: 'Nome' },
    { key: 'type', label: 'Tipo' },
    { key: 'costPrice', label: 'Preço Custo' },
    { key: 'sellingPrice', label: 'Preço Venda' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Ações' }
  ], []);

  const filteredTableColumns = useMemo(() => 
    tableColumns.filter(col => col.key !== 'actions'), 
    [tableColumns]
  );

  const handlePreferencesChange = useCallback((visibleColumns: string[]) => {
    setVisibleColumns(visibleColumns);
  }, []);

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      sku: product.sku,
      description: product.description || '',
      type: product.type,
      costPrice: product.costPrice?.toString() || '',
      sellingPrice: product.sellingPrice?.toString() || '',
      minStock: product.minStock?.toString() || '',
      maxStock: product.maxStock?.toString() || '',
      isActive: product.isActive
    });
    setIsEditModalOpen(true);
  };

  // Using filteredData from useSearch hook directly

  const getStatusBadge = (isActive: boolean) => {
    return isActive ? 
      <Badge variant="default" className="bg-green-100 text-green-800">Ativo</Badge> :
      <Badge variant="secondary">Inativo</Badge>;
  };

  const ProductForm = ({ isEdit = false }: { isEdit?: boolean }) => (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="name">Nome do Produto</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Nome do produto"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            value={formData.sku}
            onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
            placeholder="SKU único"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Input
          id="description"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Descrição do produto"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo</Label>
          <Select value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="SIMPLE">Simples</SelectItem>
              <SelectItem value="VARIABLE">Variável</SelectItem>
              <SelectItem value="GROUPED">Agrupado</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select value={formData.isActive ? 'active' : 'inactive'} onValueChange={(value) => setFormData({ ...formData, isActive: value === 'active' })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Ativo</SelectItem>
              <SelectItem value="inactive">Inativo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="costPrice">Preço de Custo (€)</Label>
          <Input
            id="costPrice"
            type="number"
            step="0.01"
            value={formData.costPrice}
            onChange={(e) => setFormData({ ...formData, costPrice: e.target.value })}
            placeholder="0.00"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sellingPrice">Preço de Venda (€)</Label>
          <Input
            id="sellingPrice"
            type="number"
            step="0.01"
            value={formData.sellingPrice}
            onChange={(e) => setFormData({ ...formData, sellingPrice: e.target.value })}
            placeholder="0.00"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="minStock">Estoque Mínimo</Label>
          <Input
            id="minStock"
            type="number"
            value={formData.minStock}
            onChange={(e) => setFormData({ ...formData, minStock: e.target.value })}
            placeholder="0"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="maxStock">Estoque Máximo</Label>
          <Input
            id="maxStock"
            type="number"
            value={formData.maxStock}
            onChange={(e) => setFormData({ ...formData, maxStock: e.target.value })}
            placeholder="100"
          />
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando produtos...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Produtos</h1>
          <p className="text-gray-600 mt-1">Gestão completa do inventário</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4 mr-2" />
            Importar CSV
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Novo Produto
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>Criar Novo Produto</DialogTitle>
                <DialogDescription>
                  Adicione um novo produto ao inventário
                </DialogDescription>
              </DialogHeader>
              <ProductForm />
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
                  Cancelar
                </Button>
                <Button onClick={handleCreateProduct}>
                  Criar Produto
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4 mb-6">
            <div className="flex-1">
              <SearchInput
                placeholder="Buscar por nome, SKU ou descrição..."
                value={searchTerm}
                onChange={setSearchTerm}
                suggestions={searchSuggestions}
              />
            </div>
            
            <FilterPanel
              filters={filterState}
              onFiltersChange={handleFilterChange}
              categories={[
                { id: 'SIMPLE', label: 'Simples', value: 'SIMPLE' },
                { id: 'VARIABLE', label: 'Variável', value: 'VARIABLE' },
                { id: 'BUNDLE', label: 'Bundle', value: 'BUNDLE' }
              ]}
              statuses={[
                { id: 'active', label: 'Ativo', value: 'active' },
                { id: 'inactive', label: 'Inativo', value: 'inactive' }
              ]}
              className="w-auto"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <QRReader onScan={handleQRScan} />
            
            <TablePreferences
              tableId="products-table"
              columns={filteredTableColumns}
              onPreferencesChange={handlePreferencesChange}
            />

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Produtos ({finalFilteredProducts.length})
          </CardTitle>
          <CardDescription>
            Lista de produtos no inventário
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  {visibleColumns.includes('sku') && <TableHead>SKU</TableHead>}
                  {visibleColumns.includes('name') && <TableHead>Nome</TableHead>}
                  {visibleColumns.includes('type') && <TableHead>Tipo</TableHead>}
                  {visibleColumns.includes('costPrice') && <TableHead>Preço Custo</TableHead>}
                  {visibleColumns.includes('sellingPrice') && <TableHead>Preço Venda</TableHead>}
                  {visibleColumns.includes('status') && <TableHead>Status</TableHead>}
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {finalFilteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    {visibleColumns.includes('sku') && (
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    )}
                    {visibleColumns.includes('name') && (
                      <TableCell className="font-medium">{product.name}</TableCell>
                    )}
                    {visibleColumns.includes('type') && (
                      <TableCell>
                        <Badge variant="outline">{product.type}</Badge>
                      </TableCell>
                    )}
                    {visibleColumns.includes('costPrice') && (
                      <TableCell>
                        {product.costPrice ? `€${product.costPrice.toFixed(2)}` : '-'}
                      </TableCell>
                    )}
                    {visibleColumns.includes('sellingPrice') && (
                      <TableCell>
                        {product.sellingPrice ? `€${product.sellingPrice.toFixed(2)}` : '-'}
                      </TableCell>
                    )}
                    {visibleColumns.includes('status') && (
                      <TableCell>{getStatusBadge(product.isActive)}</TableCell>
                    )}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(product)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <QrCode className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Edit Product Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Editar Produto</DialogTitle>
            <DialogDescription>
              Atualize as informações do produto
            </DialogDescription>
          </DialogHeader>
          <ProductForm isEdit />
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleEditProduct}>
              Salvar Alterações
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}