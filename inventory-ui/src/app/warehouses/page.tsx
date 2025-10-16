'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Building2, 
  Plus, 
  Search, 
  MapPin, 
  Package, 
  TrendingUp, 
  AlertTriangle,
  Edit,
  Trash2,
  Eye,
  MoreHorizontal
} from 'lucide-react';

// Mock data for warehouses
const mockWarehouses = [
  {
    id: '1',
    name: 'Armazém Principal',
    code: 'WH001',
    address: 'Rua da Indústria, 123, Lisboa',
    manager: 'João Silva',
    capacity: 10000,
    occupied: 7500,
    status: 'active',
    type: 'main',
    products: 245,
    lastInventory: '2024-01-15',
    phone: '+351 21 123 4567',
    email: 'armazem.principal@empresa.pt'
  },
  {
    id: '2',
    name: 'Armazém Norte',
    code: 'WH002',
    address: 'Zona Industrial do Porto, Porto',
    manager: 'Maria Santos',
    capacity: 5000,
    occupied: 3200,
    status: 'active',
    type: 'regional',
    products: 156,
    lastInventory: '2024-01-10',
    phone: '+351 22 987 6543',
    email: 'armazem.norte@empresa.pt'
  },
  {
    id: '3',
    name: 'Armazém Sul',
    code: 'WH003',
    address: 'Parque Industrial de Faro, Faro',
    manager: 'Carlos Oliveira',
    capacity: 3000,
    occupied: 2800,
    status: 'maintenance',
    type: 'regional',
    products: 89,
    lastInventory: '2024-01-05',
    phone: '+351 28 456 7890',
    email: 'armazem.sul@empresa.pt'
  },
  {
    id: '4',
    name: 'Centro de Distribuição',
    code: 'WH004',
    address: 'Zona Logística de Aveiro, Aveiro',
    manager: 'Ana Costa',
    capacity: 15000,
    occupied: 12000,
    status: 'active',
    type: 'distribution',
    products: 378,
    lastInventory: '2024-01-12',
    phone: '+351 23 321 0987',
    email: 'centro.distribuicao@empresa.pt'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'maintenance': return 'bg-yellow-100 text-yellow-800';
    case 'inactive': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'Ativo';
    case 'maintenance': return 'Manutenção';
    case 'inactive': return 'Inativo';
    default: return status;
  }
};

const getTypeText = (type: string) => {
  switch (type) {
    case 'main': return 'Principal';
    case 'regional': return 'Regional';
    case 'distribution': return 'Distribuição';
    default: return type;
  }
};

export default function WarehousesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedWarehouse, setSelectedWarehouse] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  const filteredWarehouses = mockWarehouses.filter(warehouse =>
    warehouse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    warehouse.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCapacity = mockWarehouses.reduce((sum, wh) => sum + wh.capacity, 0);
  const totalOccupied = mockWarehouses.reduce((sum, wh) => sum + wh.occupied, 0);
  const occupancyRate = (totalOccupied / totalCapacity) * 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Armazéns</h1>
          <p className="text-muted-foreground">
            Gerir e monitorizar todos os armazéns da empresa
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Novo Armazém
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Novo Armazém</DialogTitle>
              <DialogDescription>
                Adicione um novo armazém ao sistema
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome do Armazém</Label>
                  <Input id="name" placeholder="Ex: Armazém Central" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <Input id="code" placeholder="Ex: WH005" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Endereço</Label>
                <Input id="address" placeholder="Endereço completo do armazém" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="manager">Responsável</Label>
                  <Input id="manager" placeholder="Nome do responsável" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Tipo</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="main">Principal</SelectItem>
                      <SelectItem value="regional">Regional</SelectItem>
                      <SelectItem value="distribution">Distribuição</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="capacity">Capacidade (m³)</Label>
                  <Input id="capacity" type="number" placeholder="10000" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" placeholder="+351 21 123 4567" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="armazem@empresa.pt" />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Criar Armazém
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Armazéns</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockWarehouses.length}</div>
            <p className="text-xs text-muted-foreground">
              {mockWarehouses.filter(w => w.status === 'active').length} ativos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Capacidade Total</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity.toLocaleString()} m³</div>
            <p className="text-xs text-muted-foreground">
              {totalOccupied.toLocaleString()} m³ ocupados
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Ocupação</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{occupancyRate.toFixed(1)}%</div>
            <p className="text-xs text-muted-foreground">
              Média de todos os armazéns
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Alertas</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockWarehouses.filter(w => w.status === 'maintenance').length}
            </div>
            <p className="text-xs text-muted-foreground">
              Armazéns em manutenção
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar armazéns..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Warehouses Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredWarehouses.map((warehouse) => (
          <Card key={warehouse.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-lg">{warehouse.name}</CardTitle>
                  <CardDescription>{warehouse.code}</CardDescription>
                </div>
                <Button 
                  variant="ghost" 
                  className="h-8 w-8 p-0"
                  onClick={() => {
                    setSelectedWarehouse(warehouse);
                    setIsViewDialogOpen(true);
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Badge className={getStatusColor(warehouse.status)}>
                  {getStatusText(warehouse.status)}
                </Badge>
                <Badge variant="outline">
                  {getTypeText(warehouse.type)}
                </Badge>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center text-sm text-muted-foreground">
                  <MapPin className="mr-2 h-4 w-4" />
                  {warehouse.address}
                </div>
                <div className="text-sm">
                  <strong>Responsável:</strong> {warehouse.manager}
                </div>
                <div className="text-sm">
                  <strong>Produtos:</strong> {warehouse.products}
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Ocupação</span>
                  <span>{((warehouse.occupied / warehouse.capacity) * 100).toFixed(1)}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${(warehouse.occupied / warehouse.capacity) * 100}%` }}
                  ></div>
                </div>
                <div className="text-xs text-muted-foreground">
                  {warehouse.occupied.toLocaleString()} / {warehouse.capacity.toLocaleString()} m³
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Warehouse Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{selectedWarehouse?.name}</DialogTitle>
            <DialogDescription>
              Detalhes completos do armazém
            </DialogDescription>
          </DialogHeader>
          {selectedWarehouse && (
            <div className="space-y-6">
              {/* General Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações Gerais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Código</Label>
                    <p className="text-sm text-muted-foreground">{selectedWarehouse.code}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Tipo</Label>
                    <p className="text-sm text-muted-foreground">{getTypeText(selectedWarehouse.type)}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Estado</Label>
                    <Badge className={getStatusColor(selectedWarehouse.status)}>
                      {getStatusText(selectedWarehouse.status)}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Responsável</Label>
                    <p className="text-sm text-muted-foreground">{selectedWarehouse.manager}</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Endereço</Label>
                  <p className="text-sm text-muted-foreground">{selectedWarehouse.address}</p>
                </div>
              </div>

              {/* Capacity Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Capacidade</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Capacidade Total</Label>
                    <p className="text-2xl font-bold">{selectedWarehouse.capacity.toLocaleString()} m³</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Espaço Ocupado</Label>
                    <p className="text-2xl font-bold">{selectedWarehouse.occupied.toLocaleString()} m³</p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Taxa de Ocupação</Label>
                  <div className="mt-2">
                    <div className="flex justify-between text-sm mb-1">
                      <span>Ocupação</span>
                      <span>{((selectedWarehouse.occupied / selectedWarehouse.capacity) * 100).toFixed(1)}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-600 h-3 rounded-full" 
                        style={{ width: `${(selectedWarehouse.occupied / selectedWarehouse.capacity) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Produtos Armazenados</Label>
                  <p className="text-2xl font-bold">{selectedWarehouse.products}</p>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Contacto</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Telefone</Label>
                    <p className="text-sm text-muted-foreground">{selectedWarehouse.phone}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Email</Label>
                    <p className="text-sm text-muted-foreground">{selectedWarehouse.email}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}