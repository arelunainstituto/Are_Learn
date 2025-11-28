'use client';

import { useState, useEffect } from 'react';
import { 
  Globe, 
  Users, 
  Database, 
  BarChart3, 
  Settings, 
  Shield, 
  TrendingUp, 
  AlertCircle,
  CheckCircle,
  Clock,
  Activity,
  Server,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { TenantManager } from '@/components/site-admin/TenantManager';
import { Tenant } from '@/types';

export default function SiteAdminPage() {
  const [selectedView, setSelectedView] = useState<'overview' | 'tenants' | 'users' | 'analytics' | 'settings'>('overview');
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
      favicon: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=32&h=32&fit=crop&crop=center',
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

  const mockStats = {
    totalTenants: 3,
    activeTenants: 2,
    totalUsers: 68,
    activeUsers: 45,
    totalCourses: 156,
    totalPrograms: 23,
    systemHealth: 'excellent',
    uptime: '99.9%',
    lastBackup: '2024-01-15T02:00:00Z',
    storageUsed: '2.3 GB',
    storageLimit: '10 GB'
  };

  const handleEditTenant = (tenant: Tenant) => {
    console.log('Editando tenant:', tenant);
  };

  const handleDeleteTenant = (tenantId: string) => {
    console.log('Deletando tenant:', tenantId);
  };

  const handleViewTenant = (tenant: Tenant) => {
    console.log('Visualizando tenant:', tenant);
  };

  const handleSettingsTenant = (tenant: Tenant) => {
    console.log('Configurando tenant:', tenant);
  };

  const getSystemHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-600';
      case 'good': return 'text-blue-600';
      case 'warning': return 'text-yellow-600';
      case 'critical': return 'text-red-600';
      default: return 'text-grey-600';
    }
  };

  const getSystemHealthLabel = (health: string) => {
    switch (health) {
      case 'excellent': return 'Excelente';
      case 'good': return 'Bom';
      case 'warning': return 'Atenção';
      case 'critical': return 'Crítico';
      default: return health;
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

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Site Administration
          </h1>
          <p className="text-grey-600">
            Gerencie toda a plataforma AreLuna INNSiDE
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            <CheckCircle size={14} className="mr-1" />
            Sistema Operacional
          </Badge>
        </div>
      </div>

      {/* Navigation */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedView === 'overview' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('overview')}
          className="flex items-center gap-2"
        >
          <BarChart3 size={16} />
          Visão Geral
        </Button>
        
        <Button
          variant={selectedView === 'tenants' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('tenants')}
          className="flex items-center gap-2"
        >
          <Globe size={16} />
          Tenants
        </Button>
        
        <Button
          variant={selectedView === 'users' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('users')}
          className="flex items-center gap-2"
        >
          <Users size={16} />
          Usuários
        </Button>
        
        <Button
          variant={selectedView === 'analytics' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('analytics')}
          className="flex items-center gap-2"
        >
          <TrendingUp size={16} />
          Analytics
        </Button>
        
        <Button
          variant={selectedView === 'settings' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('settings')}
          className="flex items-center gap-2"
        >
          <Settings size={16} />
          Configurações
        </Button>
      </div>

      {/* Overview */}
      {selectedView === 'overview' && (
        <div className="space-y-6">
          {/* System Health */}
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-grey-900">Saúde do Sistema</h2>
              <Badge variant="secondary" className={getSystemHealthColor(mockStats.systemHealth)}>
                {getSystemHealthLabel(mockStats.systemHealth)}
              </Badge>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center gap-3">
                <Activity size={24} className="text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">{mockStats.uptime}</div>
                  <div className="text-sm text-grey-600">Uptime</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Server size={24} className="text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">{mockStats.storageUsed}</div>
                  <div className="text-sm text-grey-600">Armazenamento Usado</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Clock size={24} className="text-purple-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">{formatDate(mockStats.lastBackup)}</div>
                  <div className="text-sm text-grey-600">Último Backup</div>
                </div>
              </div>
            </div>
          </Card>

          {/* Platform Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Globe size={24} className="text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">{mockStats.totalTenants}</div>
                  <div className="text-sm text-grey-600">Total de Tenants</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">{mockStats.totalUsers}</div>
                  <div className="text-sm text-grey-600">Total de Usuários</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 size={24} className="text-gold-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">{mockStats.totalCourses}</div>
                  <div className="text-sm text-grey-600">Cursos Criados</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Zap size={24} className="text-purple-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">{mockStats.totalPrograms}</div>
                  <div className="text-sm text-grey-600">Programas Ativos</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold text-grey-900 mb-4">Atividade Recente</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle size={20} className="text-green-500" />
                <div>
                  <div className="font-medium text-grey-900">Novo tenant criado</div>
                  <div className="text-sm text-grey-600">Instituto Odontológico ABC - 15/01/2024</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                <Users size={20} className="text-blue-500" />
                <div>
                  <div className="font-medium text-grey-900">Usuários ativos aumentaram</div>
                  <div className="text-sm text-grey-600">+12 usuários nos últimos 7 dias</div>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle size={20} className="text-yellow-500" />
                <div>
                  <div className="font-medium text-grey-900">Tenant suspenso</div>
                  <div className="text-sm text-grey-600">Centro de Estudos Avançados - 12/01/2024</div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Tenants */}
      {selectedView === 'tenants' && (
        <TenantManager
          tenants={mockTenants}
          onEdit={handleEditTenant}
          onDelete={handleDeleteTenant}
          onView={handleViewTenant}
          onSettings={handleSettingsTenant}
        />
      )}

      {/* Users */}
      {selectedView === 'users' && (
        <div className="p-8 text-center">
          <Users size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Gerenciamento de Usuários
          </h3>
          <p className="text-grey-600">
            Interface de gerenciamento de usuários em desenvolvimento
          </p>
        </div>
      )}

      {/* Analytics */}
      {selectedView === 'analytics' && (
        <div className="p-8 text-center">
          <TrendingUp size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Analytics da Plataforma
          </h3>
          <p className="text-grey-600">
            Dashboard de analytics em desenvolvimento
          </p>
        </div>
      )}

      {/* Settings */}
      {selectedView === 'settings' && (
        <div className="p-8 text-center">
          <Settings size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Configurações do Sistema
          </h3>
          <p className="text-grey-600">
            Configurações avançadas em desenvolvimento
          </p>
        </div>
      )}
    </div>
  );
}
