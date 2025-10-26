'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Settings, 
  Users, 
  Database, 
  Globe, 
  Shield,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Tenant } from '@/types';

interface TenantManagerProps {
  tenants: Tenant[];
  onEdit: (tenant: Tenant) => void;
  onDelete: (tenantId: string) => void;
  onView: (tenant: Tenant) => void;
  onSettings: (tenant: Tenant) => void;
}

export function TenantManager({ 
  tenants, 
  onEdit, 
  onDelete, 
  onView, 
  onSettings 
}: TenantManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'created_at' | 'last_activity' | 'active_users'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - substituir por dados reais
  const mockTenants: Tenant[] = [
    {
      id: 'tenant-1',
      nome: 'Instituto Odontológico ABC',
      slug: 'abc-odontologia',
      database_name: 'tenant_abc_odontologia',
      subdomain: 'abc.areluna.com',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      primary_color: '#ffd700',
      secondary_color: '#a295b3',
      favicon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=32&h=32&fit=crop&crop=center',
      max_users: 100,
      active_users: 45,
      status: 'active',
      site_admin_id: 'admin-1',
      created_at: '2024-01-01T00:00:00Z',
      updated_at: '2024-01-15T10:30:00Z',
      last_activity: '2024-01-15T10:30:00Z'
    },
    {
      id: 'tenant-2',
      nome: 'Clínica Dental XYZ',
      slug: 'xyz-dental',
      database_name: 'tenant_xyz_dental',
      subdomain: 'xyz.areluna.com',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      primary_color: '#2c2c2c',
      secondary_color: '#ffd700',
      favicon: 'https://images.unsplash.com/photo-1559757148-5c350d3c56?w=32&h=32&fit=crop&crop=center',
      max_users: 50,
      active_users: 23,
      status: 'active',
      site_admin_id: 'admin-1',
      created_at: '2024-01-05T00:00:00Z',
      updated_at: '2024-01-14T15:20:00Z',
      last_activity: '2024-01-14T15:20:00Z'
    },
    {
      id: 'tenant-3',
      nome: 'Centro de Estudos Avançados',
      slug: 'centro-estudos',
      database_name: 'tenant_centro_estudos',
      subdomain: 'centro.areluna.com',
      logo: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=100&h=100&fit=crop&crop=center',
      primary_color: '#a295b3',
      secondary_color: '#2c2c2c',
      favicon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=32&h=32&fit=crop&crop=center',
      max_users: 200,
      active_users: 0,
      status: 'suspended',
      site_admin_id: 'admin-1',
      created_at: '2024-01-10T00:00:00Z',
      updated_at: '2024-01-12T09:15:00Z',
      last_activity: '2024-01-12T09:15:00Z'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'suspended': return 'bg-red-100 text-red-800';
      case 'maintenance': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'suspended': return 'Suspenso';
      case 'maintenance': return 'Manutenção';
      default: return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle size={16} className="text-green-500" />;
      case 'suspended': return <AlertCircle size={16} className="text-red-500" />;
      case 'maintenance': return <Clock size={16} className="text-yellow-500" />;
      default: return <AlertCircle size={16} className="text-grey-400" />;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUsagePercentage = (active: number, max: number) => {
    if (max === 0) return 0;
    return Math.round((active / max) * 100);
  };

  const getUsageColor = (percentage: number) => {
    if (percentage >= 90) return 'text-red-600';
    if (percentage >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const filteredTenants = mockTenants.filter(tenant => {
    const matchesSearch = tenant.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         tenant.subdomain?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const sortedTenants = [...filteredTenants].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.nome.localeCompare(b.nome);
        break;
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'last_activity':
        comparison = new Date(a.last_activity).getTime() - new Date(b.last_activity).getTime();
        break;
      case 'active_users':
        comparison = a.active_users - b.active_users;
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleDeleteTenant = async (tenantId: string) => {
    if (!confirm('Tem certeza que deseja deletar este tenant? Esta ação não pode ser desfeita.')) return;
    
    setIsLoading(true);
    try {
      // TODO: Implementar API call para deletar tenant
      console.log('Tenant deletado:', tenantId);
    } catch (error) {
      console.error('Erro ao deletar tenant:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (tenantId: string, newStatus: string) => {
    try {
      // TODO: Implementar API call para atualizar status
      console.log('Status do tenant atualizado:', tenantId, newStatus);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Gerenciar Tenants
          </h1>
          <p className="text-grey-600">
            Gerencie todos os tenants da plataforma
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            <Plus size={16} className="mr-2" />
            Novo Tenant
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Globe size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{mockTenants.length}</div>
              <div className="text-sm text-grey-600">Total de Tenants</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {mockTenants.filter(t => t.status === 'active').length}
              </div>
              <div className="text-sm text-grey-600">Ativos</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-gold-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {mockTenants.reduce((sum, t) => sum + t.active_users, 0)}
              </div>
              <div className="text-sm text-grey-600">Usuários Ativos</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Database size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {mockTenants.filter(t => t.status === 'active').length}
              </div>
              <div className="text-sm text-grey-600">Bancos Ativos</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Buscar tenants..."
              onSearch={setSearchQuery}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="suspended">Suspenso</option>
              <option value="maintenance">Manutenção</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="name">Ordenar por Nome</option>
              <option value="created_at">Ordenar por Data de Criação</option>
              <option value="last_activity">Ordenar por Última Atividade</option>
              <option value="active_users">Ordenar por Usuários Ativos</option>
            </select>
            
            <Button
              variant="outline"
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
            >
              {sortOrder === 'asc' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            </Button>
          </div>
        </div>
      </Card>

      {/* Tenants List */}
      <div className="space-y-4">
        {sortedTenants.map((tenant) => {
          const usagePercentage = getUsagePercentage(tenant.active_users, tenant.max_users);
          
          return (
            <Card key={tenant.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    {tenant.logo && (
                      <img
                        src={tenant.logo}
                        alt={tenant.nome}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    )}
                    <div>
                      <h3 className="text-lg font-medium text-grey-900">{tenant.nome}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-grey-500">{tenant.subdomain}</span>
                        <Badge variant="secondary" className={getStatusColor(tenant.status)}>
                          {getStatusLabel(tenant.status)}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-grey-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Database size={16} />
                      <span>DB: {tenant.database_name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{tenant.active_users}/{tenant.max_users} usuários</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Última atividade: {formatDate(tenant.last_activity)}</span>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-grey-600">Uso de Usuários</span>
                      <span className={`text-sm font-medium ${getUsageColor(usagePercentage)}`}>
                        {usagePercentage}%
                      </span>
                    </div>
                    <div className="w-full bg-grey-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          usagePercentage >= 90 ? 'bg-red-500' :
                          usagePercentage >= 70 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${usagePercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-sm text-grey-500">
                    <div className="flex items-center gap-1">
                      <span>Criado em {formatDate(tenant.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span>Atualizado em {formatDate(tenant.updated_at)}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView(tenant)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Eye size={14} />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(tenant)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Edit size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSettings(tenant)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Settings size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleToggleStatus(tenant.id, tenant.status === 'active' ? 'suspended' : 'active')}
                    className={`border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500 ${
                      tenant.status === 'active' ? 'text-green-600' : 'text-grey-400'
                    }`}
                  >
                    {tenant.status === 'active' ? <Shield size={14} /> : <CheckCircle size={14} />}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteTenant(tenant.id)}
                    disabled={isLoading}
                    className="border-grey-300 text-red-600 hover:border-red-500 hover:text-red-700"
                  >
                    <Trash2 size={14} />
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {sortedTenants.length === 0 && (
        <Card className="p-8 text-center">
          <Globe size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Nenhum tenant encontrado
          </h3>
          <p className="text-grey-600 mb-4">
            {searchQuery || statusFilter !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Comece criando seu primeiro tenant'
            }
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <Button variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
              <Plus size={16} className="mr-2" />
              Criar Primeiro Tenant
            </Button>
          )}
        </Card>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold-500"></div>
            <span className="text-grey-700">Processando...</span>
          </div>
        </div>
      )}
    </div>
  );
}
