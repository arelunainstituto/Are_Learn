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
import { 
  Plus, 
  Search, 
  Filter, 
  FileText,
  ShoppingCart,
  Package,
  Settings,
  Check,
  Clock,
  X,
  Eye,
  Edit
} from 'lucide-react';

interface Document {
  id: string;
  tenantId: string;
  type: 'PO' | 'SO' | 'IT' | 'ADJ';
  number: string;
  status: 'DRAFT' | 'PENDING' | 'CONFIRMED' | 'CANCELLED';
  totalAmount?: number;
  supplierId?: string;
  customerId?: string;
  warehouseId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
  items?: DocumentItem[];
}

interface DocumentItem {
  id: string;
  productId: string;
  quantity: number;
  unitPrice?: number;
  totalPrice?: number;
  product?: {
    name: string;
    sku: string;
  };
}

interface DocumentFormData {
  type: 'PO' | 'SO' | 'IT' | 'ADJ';
  number: string;
  supplierId: string;
  customerId: string;
  warehouseId: string;
  notes: string;
  items: {
    productId: string;
    quantity: string;
    unitPrice: string;
  }[];
}

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [products, setProducts] = useState<any[]>([]);
  const [warehouses, setWarehouses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const [formData, setFormData] = useState<DocumentFormData>({
    type: 'PO',
    number: '',
    supplierId: '',
    customerId: '',
    warehouseId: '',
    notes: '',
    items: [{ productId: '', quantity: '', unitPrice: '' }]
  });

  const tenantId = 'cmgsa8nz2000414ohapm9c0mx'; // Hardcoded for now

  useEffect(() => {
    fetchDocuments();
    fetchProducts();
    fetchWarehouses();
  }, []);

  const fetchDocuments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/documents?tenantId=${tenantId}`);
      if (response.ok) {
        const data = await response.json();
        setDocuments(Array.isArray(data) ? data : []);
      } else {
        setDocuments([]);
      }
    } catch (error) {
      console.error('Erro ao carregar documentos:', error);
      setDocuments([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await fetch(`http://localhost:3001/api/products?tenantId=${tenantId}`);
      if (response.ok) {
        const data = await response.json();
        setProducts(Array.isArray(data) ? data : []);
      }
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
      }
    } catch (error) {
      console.error('Erro ao carregar armazéns:', error);
      setWarehouses([]);
    }
  };

  const handleCreateDocument = async () => {
    try {
      const documentData = {
        tenantId,
        type: formData.type,
        number: formData.number,
        supplierId: formData.supplierId || undefined,
        customerId: formData.customerId || undefined,
        warehouseId: formData.warehouseId || undefined,
        notes: formData.notes || undefined,
        items: formData.items.map(item => ({
          productId: item.productId,
          quantity: parseInt(item.quantity),
          unitPrice: parseFloat(item.unitPrice) || undefined
        })).filter(item => item.productId && item.quantity > 0)
      };

      const response = await fetch('http://localhost:3001/api/documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(documentData),
      });

      if (response.ok) {
        await fetchDocuments();
        setIsCreateModalOpen(false);
        resetForm();
      } else {
        console.error('Erro ao criar documento');
      }
    } catch (error) {
      console.error('Erro ao criar documento:', error);
    }
  };

  const handleConfirmDocument = async (documentId: string) => {
    try {
      const response = await fetch(`http://localhost:3001/api/documents/${documentId}/confirm`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchDocuments();
      } else {
        console.error('Erro ao confirmar documento');
      }
    } catch (error) {
      console.error('Erro ao confirmar documento:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      type: 'PO',
      number: '',
      supplierId: '',
      customerId: '',
      warehouseId: '',
      notes: '',
      items: [{ productId: '', quantity: '', unitPrice: '' }]
    });
  };

  const addItem = () => {
    setFormData({
      ...formData,
      items: [...formData.items, { productId: '', quantity: '', unitPrice: '' }]
    });
  };

  const removeItem = (index: number) => {
    setFormData({
      ...formData,
      items: formData.items.filter((_, i) => i !== index)
    });
  };

  const updateItem = (index: number, field: string, value: string) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = { ...updatedItems[index], [field]: value };
    setFormData({ ...formData, items: updatedItems });
  };

  const filteredDocuments = documents.filter(document => {
    const matchesSearch = document.number.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         document.notes?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || document.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || document.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case 'PO': return <ShoppingCart className="h-4 w-4 text-blue-600" />;
      case 'SO': return <Package className="h-4 w-4 text-green-600" />;
      case 'IT': return <FileText className="h-4 w-4 text-purple-600" />;
      case 'ADJ': return <Settings className="h-4 w-4 text-orange-600" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED': return 'bg-green-100 text-green-800';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDocumentTypeName = (type: string) => {
    switch (type) {
      case 'PO': return 'Ordem de Compra';
      case 'SO': return 'Ordem de Venda';
      case 'IT': return 'Transferência Interna';
      case 'ADJ': return 'Ajuste de Estoque';
      default: return type;
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Documentos</h1>
          <p className="text-gray-600">Gerencie ordens de compra, venda, transferências e ajustes</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Novo Documento
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
                  placeholder="Buscar por número ou notas..."
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
                <SelectItem value="PO">Ordem de Compra</SelectItem>
                <SelectItem value="SO">Ordem de Venda</SelectItem>
                <SelectItem value="IT">Transferência</SelectItem>
                <SelectItem value="ADJ">Ajuste</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="DRAFT">Rascunho</SelectItem>
                <SelectItem value="PENDING">Pendente</SelectItem>
                <SelectItem value="CONFIRMED">Confirmado</SelectItem>
                <SelectItem value="CANCELLED">Cancelado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Documents Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Documentos</CardTitle>
          <CardDescription>
            {filteredDocuments.length} documento(s) encontrado(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Carregando documentos...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Número</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Valor Total</TableHead>
                  <TableHead>Data</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDocuments.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Nenhum documento encontrado
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredDocuments.map((document) => (
                    <TableRow key={document.id}>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getDocumentIcon(document.type)}
                          <span className="font-medium">{getDocumentTypeName(document.type)}</span>
                        </div>
                      </TableCell>
                      <TableCell className="font-mono">{document.number}</TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(document.status)}>
                          {document.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {document.totalAmount ? `€${document.totalAmount.toFixed(2)}` : '-'}
                      </TableCell>
                      <TableCell>
                        {new Date(document.createdAt).toLocaleDateString('pt-PT')}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          {document.status === 'DRAFT' && (
                            <Button variant="outline" size="sm">
                              <Edit className="h-4 w-4" />
                            </Button>
                          )}
                          {(document.status === 'DRAFT' || document.status === 'PENDING') && (
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleConfirmDocument(document.id)}
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      {/* Create Document Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Novo Documento</DialogTitle>
            <DialogDescription>
              Crie uma nova ordem de compra, venda, transferência ou ajuste
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Documento</Label>
                <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PO">Ordem de Compra</SelectItem>
                    <SelectItem value="SO">Ordem de Venda</SelectItem>
                    <SelectItem value="IT">Transferência Interna</SelectItem>
                    <SelectItem value="ADJ">Ajuste de Estoque</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Número do Documento</Label>
                <Input
                  id="number"
                  value={formData.number}
                  onChange={(e) => setFormData({...formData, number: e.target.value})}
                  placeholder="DOC-001"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="warehouse">Armazém</Label>
                <Select value={formData.warehouseId} onValueChange={(value) => setFormData({...formData, warehouseId: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um armazém" />
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
                <Label htmlFor="notes">Notas</Label>
                <Input
                  id="notes"
                  value={formData.notes}
                  onChange={(e) => setFormData({...formData, notes: e.target.value})}
                  placeholder="Observações sobre o documento"
                />
              </div>
            </div>

            {/* Items Section */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label>Itens do Documento</Label>
                <Button type="button" variant="outline" size="sm" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Item
                </Button>
              </div>
              
              {formData.items.map((item, index) => (
                <div key={index} className="grid grid-cols-4 gap-2 items-end">
                  <div className="space-y-2">
                    <Label>Produto</Label>
                    <Select 
                      value={item.productId} 
                      onValueChange={(value) => updateItem(index, 'productId', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione" />
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
                  <div className="space-y-2">
                    <Label>Quantidade</Label>
                    <Input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(index, 'quantity', e.target.value)}
                      placeholder="0"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Preço Unit. (€)</Label>
                    <Input
                      type="number"
                      step="0.01"
                      value={item.unitPrice}
                      onChange={(e) => updateItem(index, 'unitPrice', e.target.value)}
                      placeholder="0.00"
                    />
                  </div>
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="sm" 
                    onClick={() => removeItem(index)}
                    disabled={formData.items.length === 1}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateDocument}>
              Criar Documento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}