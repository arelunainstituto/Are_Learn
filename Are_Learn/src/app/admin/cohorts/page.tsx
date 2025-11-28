'use client';

import { useState, useEffect } from 'react';
import { 
  Users, 
  Shield, 
  Target, 
  Zap, 
  BarChart3, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { CohortManager } from '@/components/cohorts/CohortManager';
import { Cohort, CohortMember, CohortAccess } from '@/types';

export default function AdminCohortsPage() {
  const [cohorts, setCohorts] = useState<Cohort[]>([]);
  const [members, setMembers] = useState<CohortMember[]>([]);
  const [accesses, setAccesses] = useState<CohortAccess[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setCohorts(mockCohorts);
      setMembers(mockMembers);
      setAccesses(mockAccesses);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditCohort = (cohort: Cohort) => {
    console.log('Editando cohort:', cohort);
    // TODO: Implementar edição de cohort
  };

  const handleDeleteCohort = (cohortId: string) => {
    console.log('Deletando cohort:', cohortId);
    // TODO: Implementar exclusão de cohort
  };

  const handleViewCohort = (cohort: Cohort) => {
    console.log('Visualizando cohort:', cohort);
    // TODO: Implementar visualização de cohort
  };

  const handleSettingsCohort = (cohort: Cohort) => {
    console.log('Configurando cohort:', cohort);
    // TODO: Implementar configurações de cohort
  };

  const handleAddMember = (cohortId: string, userId: string) => {
    console.log('Adicionando membro:', cohortId, userId);
    // TODO: Implementar adição de membro
  };

  const handleRemoveMember = (cohortId: string, userId: string) => {
    console.log('Removendo membro:', cohortId, userId);
    // TODO: Implementar remoção de membro
  };

  const handleUpdateAccess = (cohortId: string, resourceType: string, resourceId: string, accessType: string) => {
    console.log('Atualizando acesso:', cohortId, resourceType, resourceId, accessType);
    // TODO: Implementar atualização de acesso
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-grey-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-grey-200 rounded"></div>
            ))}
          </div>
          <div className="h-64 bg-grey-200 rounded"></div>
        </div>
      </div>
    );
  }

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
              <div className="text-2xl font-bold text-grey-900">{cohorts.length}</div>
              <div className="text-sm text-grey-600">Total de Cohorts</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Target size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{members.length}</div>
              <div className="text-sm text-grey-600">Membros Totais</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Shield size={24} className="text-gold-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{accesses.length}</div>
              <div className="text-sm text-grey-600">Acessos Configurados</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Zap size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {cohorts.filter(c => c.tipo === 'dynamic').length}
              </div>
              <div className="text-sm text-grey-600">Cohorts Dinâmicos</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Cohort Types Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Users size={20} className="text-blue-500" />
            <h3 className="font-medium text-grey-900">Cohorts Manuais</h3>
          </div>
          <div className="text-2xl font-bold text-grey-900 mb-2">
            {cohorts.filter(c => c.tipo === 'manual').length}
          </div>
          <p className="text-sm text-grey-600">
            Grupos criados e gerenciados manualmente
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Target size={20} className="text-green-500" />
            <h3 className="font-medium text-grey-900">Cohorts Dinâmicos</h3>
          </div>
          <div className="text-2xl font-bold text-grey-900 mb-2">
            {cohorts.filter(c => c.tipo === 'dynamic').length}
          </div>
          <p className="text-sm text-grey-600">
            Grupos baseados em critérios automáticos
          </p>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3 mb-3">
            <Zap size={20} className="text-purple-500" />
            <h3 className="font-medium text-grey-900">Cohorts Sincronizados</h3>
          </div>
          <div className="text-2xl font-bold text-grey-900 mb-2">
            {cohorts.filter(c => c.tipo === 'sync').length}
          </div>
          <p className="text-sm text-grey-600">
            Grupos sincronizados com sistemas externos
          </p>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card className="p-6 mb-6">
        <h2 className="text-lg font-semibold text-grey-900 mb-4">Atividade Recente</h2>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
            <CheckCircle size={20} className="text-green-500" />
            <div>
              <div className="font-medium text-grey-900">Novo cohort criado</div>
              <div className="text-sm text-grey-600">Gestores de Clínicas - 10/01/2024</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <Users size={20} className="text-blue-500" />
            <div>
              <div className="font-medium text-grey-900">Membros adicionados</div>
              <div className="text-sm text-grey-600">+3 membros no cohort Alunos de Implantodontia</div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 p-3 bg-yellow-50 rounded-lg">
            <Shield size={20} className="text-yellow-500" />
            <div>
              <div className="font-medium text-grey-900">Acesso configurado</div>
              <div className="text-sm text-grey-600">Cohort Instrutores Sênior recebeu acesso de edição</div>
            </div>
          </div>
        </div>
      </Card>

      {/* Cohort Manager */}
      <CohortManager
        cohorts={cohorts}
        members={members}
        accesses={accesses}
        onEdit={handleEditCohort}
        onDelete={handleDeleteCohort}
        onView={handleViewCohort}
        onSettings={handleSettingsCohort}
        onAddMember={handleAddMember}
        onRemoveMember={handleRemoveMember}
        onUpdateAccess={handleUpdateAccess}
      />
    </div>
  );
}
