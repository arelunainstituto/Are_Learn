'use client';

import { useEffect, useState } from 'react';
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
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedWarehouse, setSelectedWarehouse] = useState<string | null>('all');
  const [selectedLocation, setSelectedLocation] = useState<string | null>('all');
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

  const tenantId = 'cmgsa8nz2000414ohapm9c0mx'; // Hardcoded for now

  useEffect(() => {
    fetchProducts();
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
    if (data.location) {
      setSelectedLocation(data.location);
    }
  };

  const tableColumns = [
    { key: 'sku', label: 'SKU' },
    { key: 'name', label: 'Nome' },
    { key: 'type', label: 'Tipo' },
    { key: 'costPrice', label: 'Preço Custo' },
    { key: 'sellingPrice', label: 'Preço Venda' },
    { key: 'stock', label: 'Stock' },
    { key: 'status', label: 'Status' },
    { key: 'actions', label: 'Ações' }
  ];

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

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.sku.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filterType === 'all' || product.type === filterType;
    const matchesStatus = statusFilter === 'all' || 
                         (statusFilter === 'active' && product.isActive) ||
                         (statusFilter === 'inactive' && !product.isActive);
    
    // Filtros de armazém e localização seriam aplicados aqui
    // const matchesWarehouse = !selectedWarehouse || product.warehouseId === selectedWarehouse;
    // const matchesLocation = !selectedLocation || product.location === selectedLocation;
    
    return matchesSearch && matchesType && matchesStatus;
  });

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

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <Input
                placeholder="Buscar por nome ou SKU..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="max-w-sm"
              />
            </div>
            
            <WarehouseFilter
              onWarehouseChange={setSelectedWarehouse}
              onLocationChange={setSelectedLocation}
              selectedWarehouse={selectedWarehouse}
              selectedLocation={selectedLocation}
            />
          </div>

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="SIMPLE">Simples</SelectItem>
                <SelectItem value="VARIABLE">Variável</SelectItem>
                <SelectItem value="BUNDLE">Bundle</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos</SelectItem>
                <SelectItem value="active">Ativo</SelectItem>
                <SelectItem value="inactive">Inativo</SelectItem>
              </SelectContent>
            </Select>

            <QRReader onScan={handleQRScan} />
            
            <TablePreferences
              tableId="products-table"
              columns={tableColumns.filter(col => col.key !== 'actions')}
              onPreferencesChange={setVisibleColumns}
            />

            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Exportar
            </Button>

            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-2" />
              Importar CSV
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Package className="h-5 w-5 mr-2" />
            Lista de Produtos ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                {visibleColumns.includes('sku') && <TableHead>SKU</TableHead>}
                {visibleColumns.includes('name') && <TableHead>Nome</TableHead>}
                {visibleColumns.includes('type') && <TableHead>Tipo</TableHead>}
                {visibleColumns.includes('costPrice') && <TableHead>Preço Custo</TableHead>}
                {visibleColumns.includes('sellingPrice') && <TableHead>Preço Venda</TableHead>}
                {visibleColumns.includes('stock') && <TableHead>Estoque</TableHead>}
                {visibleColumns.includes('status') && <TableHead>Status</TableHead>}
                <TableHead className="text-right">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                    <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                    <p>Nenhum produto encontrado</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    {visibleColumns.includes('sku') && (
                      <TableCell className="font-mono text-sm">{product.sku}</TableCell>
                    )}
                    {visibleColumns.includes('name') && (
                      <TableCell>
                        <div>
                          <div className="font-medium">{product.name}</div>
                          {product.description && (
                            <div className="text-sm text-gray-500">{product.description}</div>
                          )}
                        </div>
                      </TableCell>
                    )}
                    {visibleColumns.includes('type') && (
                      <TableCell>{product.type}</TableCell>
                    )}
                    {visibleColumns.includes('costPrice') && (
                      <TableCell>{product.costPrice ? `€${product.costPrice.toFixed(2)}` : '-'}</TableCell>
                    )}
                    {visibleColumns.includes('sellingPrice') && (
                      <TableCell>{product.sellingPrice ? `€${product.sellingPrice.toFixed(2)}` : '-'}</TableCell>
                    )}
                    {visibleColumns.includes('stock') && (
                      <TableCell>
                        <span className="text-sm text-gray-600">
                          {product.minStock && product.maxStock ? `${product.minStock} - ${product.maxStock}` : '-'}
                        </span>
                      </TableCell>
                    )}
                    {visibleColumns.includes('status') && (
                      <TableCell>{getStatusBadge(product.isActive)}</TableCell>
                    )}
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end space-x-2">
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
                ))
              )}
            </TableBody>
          </Table>
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