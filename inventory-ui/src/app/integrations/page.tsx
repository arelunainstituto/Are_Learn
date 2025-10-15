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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Search, 
  Settings,
  Zap,
  CheckCircle,
  XCircle,
  RefreshCw,
  Play,
  Pause,
  AlertCircle,
  ExternalLink,
  Key,
  Database,
  Cloud
} from 'lucide-react';

interface Integration {
  id: string;
  tenantId: string;
  name: string;
  provider: string;
  type: 'ERP' | 'ECOMMERCE' | 'ACCOUNTING' | 'WAREHOUSE' | 'OTHER';
  status: 'ACTIVE' | 'INACTIVE' | 'ERROR' | 'TESTING';
  isEnabled: boolean;
  config: Record<string, any>;
  lastSync?: string;
  lastError?: string;
  createdAt: string;
  updatedAt: string;
}

interface IntegrationFormData {
  name: string;
  provider: string;
  type: 'ERP' | 'ECOMMERCE' | 'ACCOUNTING' | 'WAREHOUSE' | 'OTHER';
  config: {
    apiUrl: string;
    apiKey: string;
    username: string;
    password: string;
    [key: string]: string;
  };
}

const AVAILABLE_PROVIDERS = [
  { id: 'sage', name: 'Sage', type: 'ERP' },
  { id: 'primavera', name: 'Primavera', type: 'ERP' },
  { id: 'sap', name: 'SAP', type: 'ERP' },
  { id: 'shopify', name: 'Shopify', type: 'ECOMMERCE' },
  { id: 'woocommerce', name: 'WooCommerce', type: 'ECOMMERCE' },
  { id: 'magento', name: 'Magento', type: 'ECOMMERCE' },
  { id: 'quickbooks', name: 'QuickBooks', type: 'ACCOUNTING' },
  { id: 'xero', name: 'Xero', type: 'ACCOUNTING' },
  { id: 'custom', name: 'API Personalizada', type: 'OTHER' }
];

export default function IntegrationsPage() {
  const [integrations, setIntegrations] = useState<Integration[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [testingIntegration, setTestingIntegration] = useState<string | null>(null);
  const [syncingIntegration, setSyncingIntegration] = useState<string | null>(null);
  const [formData, setFormData] = useState<IntegrationFormData>({
    name: '',
    provider: '',
    type: 'ERP',
    config: {
      apiUrl: '',
      apiKey: '',
      username: '',
      password: ''
    }
  });

  const tenantId = 'cmgsa8nz2000414ohapm9c0mx'; // Hardcoded for now

  useEffect(() => {
    fetchIntegrations();
  }, []);

  const fetchIntegrations = async () => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/api/integrations?tenantId=${tenantId}`);
      if (response.ok) {
        const data = await response.json();
        setIntegrations(Array.isArray(data) ? data : []);
      } else {
        setIntegrations([]);
      }
    } catch (error) {
      console.error('Erro ao carregar integrações:', error);
      setIntegrations([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIntegration = async () => {
    try {
      const integrationData = {
        tenantId,
        name: formData.name,
        provider: formData.provider,
        type: formData.type,
        config: formData.config,
        isEnabled: true
      };

      const response = await fetch('http://localhost:3001/api/integrations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(integrationData),
      });

      if (response.ok) {
        await fetchIntegrations();
        setIsCreateModalOpen(false);
        resetForm();
      } else {
        console.error('Erro ao criar integração');
      }
    } catch (error) {
      console.error('Erro ao criar integração:', error);
    }
  };

  const handleTestConnection = async (integrationId: string) => {
    try {
      setTestingIntegration(integrationId);
      const response = await fetch(`http://localhost:3001/api/integrations/${integrationId}/test`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchIntegrations();
      } else {
        console.error('Erro ao testar conexão');
      }
    } catch (error) {
      console.error('Erro ao testar conexão:', error);
    } finally {
      setTestingIntegration(null);
    }
  };

  const handleSync = async (integrationId: string) => {
    try {
      setSyncingIntegration(integrationId);
      const response = await fetch(`http://localhost:3001/api/integrations/${integrationId}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        await fetchIntegrations();
      } else {
        console.error('Erro ao sincronizar');
      }
    } catch (error) {
      console.error('Erro ao sincronizar:', error);
    } finally {
      setSyncingIntegration(null);
    }
  };

  const handleToggleIntegration = async (integrationId: string, isEnabled: boolean) => {
    try {
      const response = await fetch(`http://localhost:3001/api/integrations/${integrationId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ isEnabled: !isEnabled }),
      });

      if (response.ok) {
        await fetchIntegrations();
      } else {
        console.error('Erro ao alterar status da integração');
      }
    } catch (error) {
      console.error('Erro ao alterar status da integração:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      provider: '',
      type: 'ERP',
      config: {
        apiUrl: '',
        apiKey: '',
        username: '',
        password: ''
      }
    });
  };

  const filteredIntegrations = integrations.filter(integration => {
    const matchesSearch = integration.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         integration.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || integration.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || integration.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-gray-100 text-gray-800';
      case 'ERROR': return 'bg-red-100 text-red-800';
      case 'TESTING': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ERP': return <Database className="h-4 w-4 text-blue-600" />;
      case 'ECOMMERCE': return <ExternalLink className="h-4 w-4 text-green-600" />;
      case 'ACCOUNTING': return <Settings className="h-4 w-4 text-purple-600" />;
      case 'WAREHOUSE': return <Cloud className="h-4 w-4 text-orange-600" />;
      default: return <Zap className="h-4 w-4 text-gray-600" />;
    }
  };

  const getProviderConfig = (provider: string) => {
    const providerData = AVAILABLE_PROVIDERS.find(p => p.id === provider);
    return providerData || { name: provider, type: 'OTHER' };
  };

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Integrações</h1>
          <p className="text-gray-600">Gerencie conexões com sistemas externos</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Nova Integração
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Ativas</p>
                <p className="text-2xl font-bold">
                  {integrations.filter(i => i.status === 'ACTIVE').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <XCircle className="h-8 w-8 text-red-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Com Erro</p>
                <p className="text-2xl font-bold">
                  {integrations.filter(i => i.status === 'ERROR').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <Pause className="h-8 w-8 text-gray-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Inativas</p>
                <p className="text-2xl font-bold">
                  {integrations.filter(i => i.status === 'INACTIVE').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center">
              <RefreshCw className="h-8 w-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm font-medium text-gray-600">Total</p>
                <p className="text-2xl font-bold">{integrations.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por nome ou provedor..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os tipos</SelectItem>
                <SelectItem value="ERP">ERP</SelectItem>
                <SelectItem value="ECOMMERCE">E-commerce</SelectItem>
                <SelectItem value="ACCOUNTING">Contabilidade</SelectItem>
                <SelectItem value="WAREHOUSE">Armazém</SelectItem>
                <SelectItem value="OTHER">Outros</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
                <SelectItem value="ERROR">Erro</SelectItem>
                <SelectItem value="TESTING">Testando</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Integrations Table */}
      <Card>
        <CardHeader>
          <CardTitle>Lista de Integrações</CardTitle>
          <CardDescription>
            {filteredIntegrations.length} integração(ões) encontrada(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Carregando integrações...</div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome</TableHead>
                  <TableHead>Provedor</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Última Sync</TableHead>
                  <TableHead>Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredIntegrations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-8 text-gray-500">
                      Nenhuma integração encontrada
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredIntegrations.map((integration) => (
                    <TableRow key={integration.id}>
                      <TableCell className="font-medium">{integration.name}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getTypeIcon(integration.type)}
                          {getProviderConfig(integration.provider).name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{integration.type}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className={getStatusBadgeColor(integration.status)}>
                          {integration.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {integration.lastSync 
                          ? new Date(integration.lastSync).toLocaleDateString('pt-PT')
                          : 'Nunca'
                        }
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleTestConnection(integration.id)}
                            disabled={testingIntegration === integration.id}
                          >
                            {testingIntegration === integration.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <Zap className="h-4 w-4" />
                            )}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSync(integration.id)}
                            disabled={syncingIntegration === integration.id || integration.status !== 'ACTIVE'}
                          >
                            {syncingIntegration === integration.id ? (
                              <RefreshCw className="h-4 w-4 animate-spin" />
                            ) : (
                              <RefreshCw className="h-4 w-4" />
                            )}
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleToggleIntegration(integration.id, integration.isEnabled)}
                          >
                            {integration.isEnabled ? (
                              <Pause className="h-4 w-4" />
                            ) : (
                              <Play className="h-4 w-4" />
                            )}
                          </Button>
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

      {/* Create Integration Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Nova Integração</DialogTitle>
            <DialogDescription>
              Configure uma nova integração com sistema externo
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Integração</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="Ex: Sage X3 - Produção"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="provider">Provedor</Label>
                <Select value={formData.provider} onValueChange={(value) => setFormData({...formData, provider: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione um provedor" />
                  </SelectTrigger>
                  <SelectContent>
                    {AVAILABLE_PROVIDERS.map((provider) => (
                      <SelectItem key={provider.id} value={provider.id}>
                        {provider.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Tipo</Label>
              <Select value={formData.type} onValueChange={(value: any) => setFormData({...formData, type: value})}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ERP">ERP</SelectItem>
                  <SelectItem value="ECOMMERCE">E-commerce</SelectItem>
                  <SelectItem value="ACCOUNTING">Contabilidade</SelectItem>
                  <SelectItem value="WAREHOUSE">Armazém</SelectItem>
                  <SelectItem value="OTHER">Outros</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Alert>
              <Key className="h-4 w-4" />
              <AlertDescription>
                Configure as credenciais de acesso para a integração
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <Label htmlFor="apiUrl">URL da API</Label>
              <Input
                id="apiUrl"
                value={formData.config.apiUrl}
                onChange={(e) => setFormData({
                  ...formData, 
                  config: {...formData.config, apiUrl: e.target.value}
                })}
                placeholder="https://api.exemplo.com/v1"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="apiKey">Chave da API</Label>
                <Input
                  id="apiKey"
                  type="password"
                  value={formData.config.apiKey}
                  onChange={(e) => setFormData({
                    ...formData, 
                    config: {...formData.config, apiKey: e.target.value}
                  })}
                  placeholder="sk-..."
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="username">Usuário</Label>
                <Input
                  id="username"
                  value={formData.config.username}
                  onChange={(e) => setFormData({
                    ...formData, 
                    config: {...formData.config, username: e.target.value}
                  })}
                  placeholder="usuario@empresa.com"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateModalOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCreateIntegration}>
              Criar Integração
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}