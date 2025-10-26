'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Users, 
  Settings, 
  Search, 
  Filter, 
  Eye,
  Shield,
  BookOpen,
  BarChart3,
  Calendar,
  Target,
  Zap,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Cohort, CohortMember, CohortAccess } from '@/types';

interface CohortManagerProps {
  cohorts: Cohort[];
  members: CohortMember[];
  accesses: CohortAccess[];
  onEdit: (cohort: Cohort) => void;
  onDelete: (cohortId: string) => void;
  onView: (cohort: Cohort) => void;
  onSettings: (cohort: Cohort) => void;
  onAddMember: (cohortId: string, userId: string) => void;
  onRemoveMember: (cohortId: string, userId: string) => void;
  onUpdateAccess: (cohortId: string, resourceType: string, resourceId: string, accessType: string) => void;
}

export function CohortManager({ 
  cohorts, 
  members, 
  accesses, 
  onEdit, 
  onDelete, 
  onView, 
  onSettings,
  onAddMember,
  onRemoveMember,
  onUpdateAccess
}: CohortManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'created_at' | 'member_count'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - substituir por dados reais
  const mockCohorts: Cohort[] = [
    {
      id: 'cohort-1',
      tenant_id: 'tenant-1',
      nome: 'Instrutores Sênior',
      descricao: 'Grupo de instrutores com mais de 5 anos de experiência',
      tipo: 'manual',
      criterios: null,
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: 'cohort-2',
      tenant_id: 'tenant-1',
      nome: 'Alunos de Implantodontia',
      descricao: 'Estudantes matriculados no curso de Implantodontia',
      tipo: 'dynamic',
      criterios: {
        course_id: 'curso-implantodontia',
        enrollment_status: 'active',
        progress_min: 0
      },
      created_at: '2024-01-05T00:00:00Z'
    },
    {
      id: 'cohort-3',
      tenant_id: 'tenant-1',
      nome: 'Gestores de Clínicas',
      descricao: 'Grupo de gestores e administradores de clínicas',
      tipo: 'sync',
      criterios: {
        sync_source: 'hr_system',
        department: 'management',
        sync_frequency: 'daily'
      },
      created_at: '2024-01-10T00:00:00Z'
    }
  ];

  const mockMembers: CohortMember[] = [
    { cohort_id: 'cohort-1', user_id: 'user-1', added_at: '2024-01-01T00:00:00Z' },
    { cohort_id: 'cohort-1', user_id: 'user-2', added_at: '2024-01-02T00:00:00Z' },
    { cohort_id: 'cohort-2', user_id: 'user-3', added_at: '2024-01-05T00:00:00Z' },
    { cohort_id: 'cohort-2', user_id: 'user-4', added_at: '2024-01-06T00:00:00Z' },
    { cohort_id: 'cohort-2', user_id: 'user-5', added_at: '2024-01-07T00:00:00Z' },
    { cohort_id: 'cohort-3', user_id: 'user-6', added_at: '2024-01-10T00:00:00Z' }
  ];

  const mockAccesses: CohortAccess[] = [
    {
      id: 'access-1',
      cohort_id: 'cohort-1',
      resource_type: 'course',
      resource_id: 'curso-avancado',
      access_type: 'edit'
    },
    {
      id: 'access-2',
      cohort_id: 'cohort-2',
      resource_type: 'program',
      resource_id: 'programa-implantodontia',
      access_type: 'view'
    },
    {
      id: 'access-3',
      cohort_id: 'cohort-3',
      resource_type: 'dashboard',
      resource_id: 'dashboard-gestao',
      access_type: 'manage'
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'manual': return 'Manual';
      case 'dynamic': return 'Dinâmico';
      case 'sync': return 'Sincronizado';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'manual': return 'bg-blue-100 text-blue-800';
      case 'dynamic': return 'bg-green-100 text-green-800';
      case 'sync': return 'bg-purple-100 text-purple-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const getAccessTypeLabel = (type: string) => {
    switch (type) {
      case 'view': return 'Visualizar';
      case 'edit': return 'Editar';
      case 'manage': return 'Gerenciar';
      default: return type;
    }
  };

  const getAccessTypeColor = (type: string) => {
    switch (type) {
      case 'view': return 'bg-green-100 text-green-800';
      case 'edit': return 'bg-yellow-100 text-yellow-800';
      case 'manage': return 'bg-red-100 text-red-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const getMemberCount = (cohortId: string) => {
    return mockMembers.filter(member => member.cohort_id === cohortId).length;
  };

  const getCohortAccesses = (cohortId: string) => {
    return mockAccesses.filter(access => access.cohort_id === cohortId);
  };

  const filteredCohorts = mockCohorts.filter(cohort => {
    const matchesSearch = cohort.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         cohort.descricao?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || cohort.tipo === typeFilter;
    
    return matchesSearch && matchesType;
  });

  const sortedCohorts = [...filteredCohorts].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.nome.localeCompare(b.nome);
        break;
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'member_count':
        comparison = getMemberCount(a.id) - getMemberCount(b.id);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleDeleteCohort = async (cohortId: string) => {
    if (!confirm('Tem certeza que deseja deletar este cohort? Esta ação não pode ser desfeita.')) return;
    
    setIsLoading(true);
    try {
      // TODO: Implementar API call para deletar cohort
      console.log('Cohort deletado:', cohortId);
    } catch (error) {
      console.error('Erro ao deletar cohort:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleMember = async (cohortId: string, userId: string, isMember: boolean) => {
    try {
      if (isMember) {
        onRemoveMember(cohortId, userId);
      } else {
        onAddMember(cohortId, userId);
      }
    } catch (error) {
      console.error('Erro ao atualizar membro:', error);
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Gerenciar Cohorts
          </h1>
          <p className="text-grey-600">
            Organize usuários em grupos e gerencie acesso a recursos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            <Plus size={16} className="mr-2" />
            Novo Cohort
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{mockCohorts.length}</div>
              <div className="text-sm text-grey-600">Total de Cohorts</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Target size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{mockMembers.length}</div>
              <div className="text-sm text-grey-600">Membros Totais</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-gold-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{mockAccesses.length}</div>
              <div className="text-sm text-grey-600">Acessos Configurados</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {mockCohorts.filter(c => c.tipo === 'dynamic').length}
              </div>
              <div className="text-sm text-grey-600">Cohorts Dinâmicos</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Buscar cohorts..."
              onSearch={setSearchQuery}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="all">Todos os Tipos</option>
              <option value="manual">Manual</option>
              <option value="dynamic">Dinâmico</option>
              <option value="sync">Sincronizado</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="name">Ordenar por Nome</option>
              <option value="created_at">Ordenar por Data de Criação</option>
              <option value="member_count">Ordenar por Número de Membros</option>
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

      {/* Cohorts List */}
      <div className="space-y-4">
        {sortedCohorts.map((cohort) => {
          const memberCount = getMemberCount(cohort.id);
          const cohortAccesses = getCohortAccesses(cohort.id);
          
          return (
            <Card key={cohort.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-medium text-grey-900">{cohort.nome}</h3>
                    <Badge variant="secondary" className={getTypeColor(cohort.tipo)}>
                      {getTypeLabel(cohort.tipo)}
                    </Badge>
                  </div>
                  
                  {cohort.descricao && (
                    <p className="text-grey-600 mb-4">{cohort.descricao}</p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-grey-600 mb-4">
                    <div className="flex items-center gap-2">
                      <Users size={16} />
                      <span>{memberCount} membro(s)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Shield size={16} />
                      <span>{cohortAccesses.length} acesso(s) configurado(s)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Criado em {new Date(cohort.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                  </div>

                  {/* Access Types */}
                  {cohortAccesses.length > 0 && (
                    <div className="mb-4">
                      <div className="text-sm text-grey-600 mb-2">Acessos Configurados:</div>
                      <div className="flex flex-wrap gap-2">
                        {cohortAccesses.map((access, index) => (
                          <Badge key={index} variant="outline" className={getAccessTypeColor(access.access_type)}>
                            {getAccessTypeLabel(access.access_type)} {access.resource_type}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Criteria for Dynamic/Sync Cohorts */}
                  {cohort.tipo === 'dynamic' && cohort.criterios && (
                    <div className="mb-4">
                      <div className="text-sm text-grey-600 mb-2">Critérios Dinâmicos:</div>
                      <div className="bg-grey-50 p-3 rounded-lg text-sm">
                        <pre className="text-grey-700">{JSON.stringify(cohort.criterios, null, 2)}</pre>
                      </div>
                    </div>
                  )}

                  {cohort.tipo === 'sync' && cohort.criterios && (
                    <div className="mb-4">
                      <div className="text-sm text-grey-600 mb-2">Configuração de Sincronização:</div>
                      <div className="bg-grey-50 p-3 rounded-lg text-sm">
                        <pre className="text-grey-700">{JSON.stringify(cohort.criterios, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView(cohort)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Eye size={14} />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(cohort)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Edit size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSettings(cohort)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Settings size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeleteCohort(cohort.id)}
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

      {sortedCohorts.length === 0 && (
        <Card className="p-8 text-center">
          <Users size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Nenhum cohort encontrado
          </h3>
          <p className="text-grey-600 mb-4">
            {searchQuery || typeFilter !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Comece criando seu primeiro cohort'
            }
          </p>
          {!searchQuery && typeFilter === 'all' && (
            <Button variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
              <Plus size={16} className="mr-2" />
              Criar Primeiro Cohort
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
