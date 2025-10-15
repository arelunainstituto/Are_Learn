'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { apiClient } from '@/lib/api';
import { 
  Plus, 
  Search, 
  Filter, 
  ArrowUp,
  ArrowDown,
  ArrowLeftRight,
  Settings,
  Package,
  Calendar,
  MapPin
} from 'lucide-react';

interface Movement {
  id: string;
  tenantId: string;
  productId: string;
  type: 'IN' | 'OUT' | 'TRANSFER' | 'ADJUST';
  quantity: number;
  unitCost?: number;
  totalCost?: number;
  reason?: string;
  reference?: string;
  fromWarehouseId?: string;
  toWarehouseId?: string;
  createdAt: string;
  updatedAt: string;
  product?: {
    name: string;
    sku: string;
  };
}

interface MovementFormData {
  productId: string;
  type: 'IN' | 'OUT' | 'TRANSFER' | 'ADJUST';
  quantity: string;
  unitCost: string;
  reason: string;
  reference: string;
  fromWarehouseId: string;
  toWarehouseId: string;
}

export default function MovementsPage() {
  const [movements, setMovements] = useState<Movement[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [formData, setFormData] = useState<MovementFormData>({
    productId: '',
    type: 'IN',
    quantity: '',
    unitCost: '',
    reason: '',
    reference: '',
    fromWarehouseId: '',
    toWarehouseId: ''
  });

  const tenantId = 'cmgsa8nz2000414ohapm9c0mx'; // Hardcoded for now

  useEffect(() => {
    fetchMovements();
    fetchProducts();
    fetchWarehouses();
  }, []);

  const fetchMovements = async () => {
    try {
      setLoading(true);
      // Note: This endpoint might need to be created in the backend
      const response = await fetch(`http://localhost:3001/api/movements?tenantId=${tenantId}`);
      if (response.ok) {
        const data = await response.json();
        setMovements(Array.isArray(data) ? data : []);
      } else {
        setMovements([]);
      }
    } catch (error) {
      console.error('Erro ao carregar movimentos:', error);
      setMovements([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await apiClient.getProducts(tenantId);
      setProducts(Array.isArray(response) ? response : []);
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
      setProducts([]);
    }
  };

  const fetchWarehouses = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/warehouses?tenantId=${tenantId}`);
      if (response.ok) {
        const data = await response.json();
        setWarehouses(Array.isArray(data) ? data : []);
      } else {
        setWarehouses([]);
      }
    } catch (error) {
      console.error('Erro ao carregar armazéns:', error);
      setWarehouses([]);
    }
  };

  const handleCreateMovement = async () => {
    try {
      const movementData = {
        tenantId,
        productId: formData.productId,
        type: formData.type,
        quantity: parseInt(formData.quantity),
        unitCost: parseFloat(formData.unitCost) || undefined,
        reason: formData.reason || undefined,
        reference: formData.reference || undefined,
        fromWarehouseId: formData.fromWarehouseId || undefined,
        toWarehouseId: formData.toWarehouseId || undefined
      };

      const response = await fetch('http://localhost:3001/api/movements', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(movementData),
      });

      if (response.ok) {
        await fetchMovements();
        setIsCreateModalOpen(false);
        resetForm();
      } else {
        console.error('Erro ao criar movimento');
      }
    } catch (error) {
      console.error('Erro ao criar movimento:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      productId: '',
      type: 'IN',
      quantity: '',
      unitCost: '',
      reason: '',
      reference: '',
      fromWarehouseId: '',
      toWarehouseId: ''
    });
  };

  const filteredMovements = movements.filter(movement => {
    const matchesSearch = movement.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.product?.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         movement.reference?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || movement.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getMovementIcon = (type: string) => {
    switch (type) {
      case 'IN': return <ArrowUp className="h-4 w-4 text-green-600" />;
      case 'OUT': return <ArrowDown className="h-4 w-4 text-red-600" />;
      case 'TRANSFER': return <ArrowLeftRight className="h-4 w-4 text-blue-600" />;
      case 'ADJUST': return <Settings className="h-4 w-4 text-orange-600" />;
      default: return <Package className="h-4 w-4" />;
    }
  };

  const getMovementBadgeColor = (type: string) => {
    switch (type) {
      case 'IN': return 'bg-green-100 text-green-800';
      case 'OUT': return 'bg-red-100 text-red-800';
      case 'TRANSFER': return 'bg-blue-100 text-blue-800';
      case 'ADJUST': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Movimentos de Estoque</h1>
          <p className="text-gray-600">Gerencie entradas, saídas, transferências e ajustes</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Movimento
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por produto, SKU ou referência..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="IN">Entrada</SelectItem>
                <SelectItem value="OUT">Saída</SelectItem>
                <SelectItem value="TRANSFER">Transferência</SelectItem>
                <SelectItem value="ADJUST">Ajuste</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Movements Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Movimentos</CardTitle>
          <CardDescription>
            {filteredMovements.length} movimento(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Carregando movimentos...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Produto</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Quantidade</TableHead>
                  <TableHead>Custo Unit.</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Referência</TableHead>
                  <TableHead>Data</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredMovements.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={8} className="text-center py-8 text-gray-500">
                      Nenhum movimento encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredMovements.map((movement) => (
                    <TableRow key={movement.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getMovementIcon(movement.type)}
                          <Badge className={getMovementBadgeColor(movement.type)}>
                            {movement.type}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">
                        {movement.product?.name || 'Produto não encontrado'}
                      </TableCell>
                      <TableCell>{movement.product?.sku || '-'}</TableCell>
                      <TableCell>
                        <span className={movement.type === 'OUT' ? 'text-red-600' : 'text-green-600'}>
                          {movement.type === 'OUT' ? '-' : '+'}{movement.quantity}
                        </span>
                      </TableCell>
                      <TableCell>
                        {movement.unitCost ? `€${movement.unitCost.toFixed(2)}` : '-'}
                      </TableCell>
                      <TableCell>
                        {movement.totalCost ? `€${movement.totalCost.toFixed(2)}` : '-'}
                      </TableCell>
                      <TableCell>{movement.reference || '-'}</TableCell>
                      <TableCell>
                        {new Date(movement.createdAt).toLocaleDateString('pt-PT')}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Movement Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Novo Movimento de Estoque</DialogTitle>
            <DialogDescription>
              Crie um novo movimento de entrada, saída, transferência ou ajuste
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Movimento</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="IN">Entrada</SelectItem>
                    <SelectItem value="OUT">Saída</SelectItem>
                    <SelectItem value="TRANSFER">Transferência</SelectItem>
                    <SelectItem value="ADJUST">Ajuste</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="product">Produto</Label>
                <Select value={formData.productId} onValueChange={(value) => setFormData({...formData, productId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {products.map((product) => (
                      <SelectItem key={product.id} value={product.id}>
                        {product.name} ({product.sku})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="quantity">Quantidade</Label>
                <Input
                  id="quantity"
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({...formData, quantity: e.target.value})}
                  placeholder="0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="unitCost">Custo Unitário (€)</Label>
                <Input
                  id="unitCost"
                  type="number"
                  step="0.01"
                  value={formData.unitCost}
                  onChange={(e) => setFormData({...formData, unitCost: e.target.value})}
                  placeholder="0.00"
                />
              </div>
            </div>

            {formData.type === 'TRANSFER' && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fromWarehouse">Armazém Origem</Label>
                  <Select value={formData.fromWarehouseId} onValueChange={(value) => setFormData({...formData, fromWarehouseId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione origem" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="toWarehouse">Armazém Destino</Label>
                  <Select value={formData.toWarehouseId} onValueChange={(value) => setFormData({...formData, toWarehouseId: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione destino" />
                    </SelectTrigger>
                    <SelectContent>
                      {warehouses.map((warehouse) => (
                        <SelectItem key={warehouse.id} value={warehouse.id}>
                          {warehouse.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="reference">Referência</Label>
              <Input
                id="reference"
                value={formData.reference}
                onChange={(e) => setFormData({...formData, reference: e.target.value})}
                placeholder="Número do documento, nota fiscal, etc."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="reason">Motivo</Label>
              <Input
                id="reason"
                value={formData.reason}
                onChange={(e) => setFormData({...formData, reason: e.target.value})}
                placeholder="Descrição do motivo do movimento"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateMovement}>
              Criar Movimento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}