'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Plus, 
  BarChart3, 
  Calendar, 
  Download, 
  Edit, 
  Trash2, 
  Play, 
  Settings,
  Eye,
  Filter,
  Search,
  TrendingUp,
  Users,
  BookOpen,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { ReportBuilder } from '@/components/reports/ReportBuilder';
import { ScheduledReports } from '@/components/reports/ScheduledReports';
import { ReportTemplate, ScheduledReport } from '@/types';

export default function AdminReportsPage() {
  const [selectedView, setSelectedView] = useState<'templates' | 'scheduled' | 'builder'>('templates');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - substituir por dados reais
  const mockTemplates: ReportTemplate[] = [
    {
      id: 'template-1',
      tenant_id: 'tenant-1',
      nome: 'Relatório de Conclusão de Cursos',
      descricao: 'Análise detalhada do progresso dos alunos nos cursos',
      tipo: 'completion',
      query_config: {},
      visualization_config: {},
      filters: {},
      created_by: 'user-1',
      is_site_wide: false,
      created_at: '2024-01-01'
    },
    {
      id: 'template-2',
      tenant_id: 'tenant-1',
      nome: 'Performance de Instrutores',
      descricao: 'Métricas de desempenho e engajamento dos instrutores',
      tipo: 'performance',
      query_config: {},
      visualization_config: {},
      filters: {},
      created_by: 'user-1',
      is_site_wide: false,
      created_at: '2024-01-05'
    },
    {
      id: 'template-3',
      tenant_id: 'tenant-1',
      nome: 'Engajamento dos Alunos',
      descricao: 'Análise de engajamento e atividade dos alunos',
      tipo: 'engagement',
      query_config: {},
      visualization_config: {},
      filters: {},
      created_by: 'user-1',
      is_site_wide: false,
      created_at: '2024-01-10'
    }
  ];

  const mockScheduledReports: ScheduledReport[] = [
    {
      id: 'sched-1',
      report_id: 'template-1',
      frequency: 'weekly',
      recipients: ['admin@tenant1.com', 'manager@tenant1.com'],
      next_run: '2024-02-05T09:00:00Z',
      last_run: '2024-01-29T09:00:00Z',
      active: true
    },
    {
      id: 'sched-2',
      report_id: 'template-2',
      frequency: 'monthly',
      recipients: ['ceo@tenant1.com'],
      next_run: '2024-03-01T08:00:00Z',
      last_run: '2024-02-01T08:00:00Z',
      active: true
    }
  ];

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'completion': return 'Conclusão';
      case 'performance': return 'Performance';
      case 'engagement': return 'Engajamento';
      case 'cross_tenant': return 'Cross-Tenant';
      default: return type;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'completion': return 'bg-green-100 text-green-800';
      case 'performance': return 'bg-blue-100 text-blue-800';
      case 'engagement': return 'bg-purple-100 text-purple-800';
      case 'cross_tenant': return 'bg-orange-100 text-orange-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const filteredTemplates = mockTemplates.filter(template => {
    const matchesSearch = template.nome.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.descricao?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = selectedType === 'all' || template.tipo === selectedType;
    
    return matchesSearch && matchesType;
  });

  const handleDeleteTemplate = async (templateId: string) => {
    if (!confirm('Tem certeza que deseja deletar este template?')) return;
    
    setIsLoading(true);
    try {
      // TODO: Implementar API call para deletar template
      console.log('Template deletado:', templateId);
    } catch (error) {
      console.error('Erro ao deletar template:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditTemplate = (template: ReportTemplate) => {
    // TODO: Implementar edição de template
    console.log('Editando template:', template);
  };

  const handleRunTemplate = (template: ReportTemplate) => {
    // TODO: Implementar execução de template
    console.log('Executando template:', template);
  };

  const handleSaveTemplate = (template: ReportTemplate) => {
    // TODO: Implementar salvamento de template
    console.log('Salvando template:', template);
    setSelectedView('templates');
  };

  const handleEditScheduled = (report: ScheduledReport) => {
    // TODO: Implementar edição de agendamento
    console.log('Editando agendamento:', report);
  };

  const handleDeleteScheduled = (reportId: string) => {
    // TODO: Implementar exclusão de agendamento
    console.log('Deletando agendamento:', reportId);
  };

  const handleToggleScheduled = (reportId: string, active: boolean) => {
    // TODO: Implementar toggle de agendamento
    console.log('Toggle agendamento:', reportId, active);
  };

  const handleRunScheduled = (reportId: string) => {
    // TODO: Implementar execução de agendamento
    console.log('Executando agendamento:', reportId);
  };

  if (selectedView === 'builder') {
    return (
      <ReportBuilder
        onSave={handleSaveTemplate}
        onCancel={() => setSelectedView('templates')}
      />
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Relatórios e Análises
          </h1>
          <p className="text-grey-600">
            Crie e gerencie relatórios personalizados
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            onClick={() => setSelectedView('builder')}
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            <Plus size={16} className="mr-2" />
            Novo Relatório
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedView === 'templates' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('templates')}
          className="flex items-center gap-2"
        >
          <BarChart3 size={16} />
          Templates
        </Button>
        
        <Button
          variant={selectedView === 'scheduled' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('scheduled')}
          className="flex items-center gap-2"
        >
          <Calendar size={16} />
          Agendados
        </Button>
      </div>

      {/* Templates View */}
      {selectedView === 'templates' && (
        <>
          {/* Filters */}
          <Card className="p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <SearchBar
                  placeholder="Buscar templates..."
                  onSearch={setSearchQuery}
                />
              </div>
              
              <div className="flex gap-3">
                <select
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
                >
                  <option value="all">Todos os Tipos</option>
                  <option value="completion">Conclusão</option>
                  <option value="performance">Performance</option>
                  <option value="engagement">Engajamento</option>
                  <option value="cross_tenant">Cross-Tenant</option>
                </select>
              </div>
            </div>
          </Card>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card className="p-4">
              <div className="flex items-center gap-3">
                <BarChart3 size={24} className="text-blue-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">{mockTemplates.length}</div>
                  <div className="text-sm text-grey-600">Total de Templates</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Calendar size={24} className="text-green-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">{mockScheduledReports.length}</div>
                  <div className="text-sm text-grey-600">Relatórios Agendados</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <TrendingUp size={24} className="text-gold-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">15</div>
                  <div className="text-sm text-grey-600">Execuções Hoje</div>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-3">
                <Users size={24} className="text-purple-500" />
                <div>
                  <div className="text-2xl font-bold text-grey-900">8</div>
                  <div className="text-sm text-grey-600">Usuários Ativos</div>
                </div>
              </div>
            </Card>
          </div>

          {/* Templates List */}
          <div className="space-y-4">
            {filteredTemplates.map((template) => (
              <Card key={template.id} className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-medium text-grey-900">{template.nome}</h3>
                      <Badge variant="secondary" className={getTypeColor(template.tipo)}>
                        {getTypeLabel(template.tipo)}
                      </Badge>
                      {template.is_site_wide && (
                        <Badge variant="outline" className="border-blue-300 text-blue-700">
                          Site-wide
                        </Badge>
                      )}
                    </div>
                    
                    {template.descricao && (
                      <p className="text-grey-600 mb-3">{template.descricao}</p>
                    )}

                    <div className="flex items-center gap-4 text-sm text-grey-500">
                      <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>Criado em {new Date(template.created_at).toLocaleDateString('pt-BR')}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Users size={14} />
                        <span>Por {template.created_by}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 ml-4">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRunTemplate(template)}
                      className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                    >
                      <Play size={14} />
                    </Button>
                    
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleEditTemplate(template)}
                      className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                    >
                      <Edit size={14} />
                    </Button>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDeleteTemplate(template.id)}
                      disabled={isLoading}
                      className="border-grey-300 text-red-600 hover:border-red-500 hover:text-red-700"
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>

          {filteredTemplates.length === 0 && (
            <Card className="p-8 text-center">
              <BarChart3 size={48} className="text-grey-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-grey-900 mb-2">
                Nenhum template encontrado
              </h3>
              <p className="text-grey-600 mb-4">
                {searchQuery || selectedType !== 'all'
                  ? 'Tente ajustar os filtros de busca'
                  : 'Comece criando seu primeiro template'
                }
              </p>
              {!searchQuery && selectedType === 'all' && (
                <Button
                  variant="primary"
                  onClick={() => setSelectedView('builder')}
                  className="bg-gold-500 hover:bg-gold-600 text-white"
                >
                  <Plus size={16} className="mr-2" />
                  Criar Primeiro Template
                </Button>
              )}
            </Card>
          )}
        </>
      )}

      {/* Scheduled Reports View */}
      {selectedView === 'scheduled' && (
        <ScheduledReports
          reports={mockScheduledReports}
          templates={mockTemplates}
          onEdit={handleEditScheduled}
          onDelete={handleDeleteScheduled}
          onToggle={handleToggleScheduled}
          onRun={handleRunScheduled}
        />
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