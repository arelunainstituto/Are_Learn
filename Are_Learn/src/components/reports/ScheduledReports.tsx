'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Play, 
  Pause, 
  Calendar, 
  Clock, 
  Mail, 
  Settings,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ScheduledReport, ReportTemplate } from '@/types';

interface ScheduledReportsProps {
  reports: ScheduledReport[];
  templates: ReportTemplate[];
  onEdit: (report: ScheduledReport) => void;
  onDelete: (reportId: string) => void;
  onToggle: (reportId: string, active: boolean) => void;
  onRun: (reportId: string) => void;
}

export function ScheduledReports({ 
  reports, 
  templates, 
  onEdit, 
  onDelete, 
  onToggle, 
  onRun 
}: ScheduledReportsProps) {
  const [selectedFrequency, setSelectedFrequency] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Mock data - substituir por dados reais
  const mockReports: ScheduledReport[] = [
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
    },
    {
      id: 'sched-3',
      report_id: 'template-3',
      frequency: 'daily',
      recipients: ['analyst@tenant1.com'],
      next_run: '2024-02-01T10:00:00Z',
      last_run: '2024-01-31T10:00:00Z',
      active: false
    }
  ];

  const mockTemplates: ReportTemplate[] = [
    {
      id: 'template-1',
      tenant_id: 'tenant-1',
      nome: 'Relatório de Conclusão Semanal',
      descricao: 'Relatório semanal de progresso dos alunos',
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
      nome: 'Relatório de Performance Mensal',
      descricao: 'Análise mensal de performance dos cursos',
      tipo: 'performance',
      query_config: {},
      visualization_config: {},
      filters: {},
      created_by: 'user-1',
      is_site_wide: false,
      created_at: '2024-01-01'
    }
  ];

  const getFrequencyLabel = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'Diário';
      case 'weekly': return 'Semanal';
      case 'monthly': return 'Mensal';
      default: return frequency;
    }
  };

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'bg-blue-100 text-blue-800';
      case 'weekly': return 'bg-green-100 text-green-800';
      case 'monthly': return 'bg-purple-100 text-purple-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const getStatusIcon = (active: boolean, lastRun: string | null) => {
    if (!active) {
      return <XCircle size={16} className="text-grey-400" />;
    }
    
    if (!lastRun) {
      return <AlertCircle size={16} className="text-yellow-500" />;
    }
    
    const lastRunDate = new Date(lastRun);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastRunDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 7) {
      return <AlertCircle size={16} className="text-red-500" />;
    }
    
    return <CheckCircle size={16} className="text-green-500" />;
  };

  const getStatusLabel = (active: boolean, lastRun: string | null) => {
    if (!active) {
      return 'Pausado';
    }
    
    if (!lastRun) {
      return 'Nunca executado';
    }
    
    const lastRunDate = new Date(lastRun);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastRunDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Executado hoje';
    } else if (diffDays === 1) {
      return 'Executado ontem';
    } else {
      return `Executado há ${diffDays} dias`;
    }
  };

  const getStatusColor = (active: boolean, lastRun: string | null) => {
    if (!active) {
      return 'bg-grey-100 text-grey-800';
    }
    
    if (!lastRun) {
      return 'bg-yellow-100 text-yellow-800';
    }
    
    const lastRunDate = new Date(lastRun);
    const now = new Date();
    const diffDays = Math.floor((now.getTime() - lastRunDate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffDays > 7) {
      return 'bg-red-100 text-red-800';
    }
    
    return 'bg-green-100 text-green-800';
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return 'Nunca';
    
    const date = new Date(dateString);
    return date.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getNextRunDate = (frequency: string, lastRun: string | null) => {
    if (!lastRun) return 'N/A';
    
    const lastRunDate = new Date(lastRun);
    const nextRun = new Date(lastRunDate);
    
    switch (frequency) {
      case 'daily':
        nextRun.setDate(nextRun.getDate() + 1);
        break;
      case 'weekly':
        nextRun.setDate(nextRun.getDate() + 7);
        break;
      case 'monthly':
        nextRun.setMonth(nextRun.getMonth() + 1);
        break;
    }
    
    return nextRun.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const filteredReports = mockReports.filter(report => {
    const matchesFrequency = selectedFrequency === 'all' || report.frequency === selectedFrequency;
    const matchesStatus = selectedStatus === 'all' || 
      (selectedStatus === 'active' && report.active) ||
      (selectedStatus === 'inactive' && !report.active) ||
      (selectedStatus === 'error' && report.active && report.last_run && 
       new Date(report.last_run) < new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
    
    return matchesFrequency && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Relatórios Agendados
          </h1>
          <p className="text-grey-600">
            Gerencie relatórios automáticos e agendamentos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            <Plus size={16} className="mr-2" />
            Novo Agendamento
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-grey-700 mb-1">
              Frequência
            </label>
            <select
              value={selectedFrequency}
              onChange={(e) => setSelectedFrequency(e.target.value)}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="all">Todas as Frequências</option>
              <option value="daily">Diário</option>
              <option value="weekly">Semanal</option>
              <option value="monthly">Mensal</option>
            </select>
          </div>
          
          <div className="flex-1">
            <label className="block text-sm font-medium text-grey-700 mb-1">
              Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="all">Todos os Status</option>
              <option value="active">Ativo</option>
              <option value="inactive">Pausado</option>
              <option value="error">Com Erro</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report) => {
          const template = mockTemplates.find(t => t.id === report.report_id);
          
          return (
            <Card key={report.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-medium text-grey-900">
                      {template?.nome || 'Relatório não encontrado'}
                    </h3>
                    <Badge variant="secondary" className={getFrequencyColor(report.frequency)}>
                      {getFrequencyLabel(report.frequency)}
                    </Badge>
                    <Badge variant="secondary" className={getStatusColor(report.active, report.last_run)}>
                      {getStatusLabel(report.active, report.last_run)}
                    </Badge>
                  </div>
                  
                  {template?.descricao && (
                    <p className="text-grey-600 mb-3">{template.descricao}</p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-grey-600">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span>Próxima execução: {formatDate(report.next_run)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Última execução: {formatDate(report.last_run)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail size={16} />
                      <span>{report.recipients.length} destinatário(s)</span>
                    </div>
                  </div>

                  <div className="mt-3">
                    <div className="text-sm text-grey-600 mb-1">Destinatários:</div>
                    <div className="flex flex-wrap gap-1">
                      {report.recipients.map((email, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {email}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRun(report.id)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Play size={14} />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(report)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Edit size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onToggle(report.id, !report.active)}
                    className={`border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500 ${
                      report.active ? 'text-green-600' : 'text-grey-400'
                    }`}
                  >
                    {report.active ? <Pause size={14} /> : <Play size={14} />}
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onDelete(report.id)}
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

      {filteredReports.length === 0 && (
        <Card className="p-8 text-center">
          <Calendar size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Nenhum relatório agendado
          </h3>
          <p className="text-grey-600 mb-4">
            {selectedFrequency !== 'all' || selectedStatus !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Comece criando seu primeiro agendamento'
            }
          </p>
          {selectedFrequency === 'all' && selectedStatus === 'all' && (
            <Button variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
              <Plus size={16} className="mr-2" />
              Criar Primeiro Agendamento
            </Button>
          )}
        </Card>
      )}
    </div>
  );
}
