'use client';

import { useState, useEffect } from 'react';
import { 
  Activity, 
  BarChart3, 
  Users, 
  Clock, 
  Target, 
  TrendingUp, 
  TrendingDown,
  Filter,
  Search,
  Download,
  RefreshCw,
  Eye,
  Play,
  Pause,
  CheckCircle,
  AlertCircle,
  XCircle
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { XapiStatement } from '@/types';

interface xAPITrackerProps {
  statements: XapiStatement[];
  onRefresh: () => void;
  onExport: () => void;
  onView: (statement: XapiStatement) => void;
}

export function xAPITracker({ 
  statements, 
  onRefresh, 
  onExport, 
  onView 
}: xAPITrackerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [verbFilter, setVerbFilter] = useState<string>('all');
  const [dateFilter, setDateFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'timestamp' | 'actor' | 'verb'>('timestamp');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [isLoading, setIsLoading] = useState(false);

  // Mock data - substituir por dados reais
  const mockStatements: XapiStatement[] = [
    {
      id: 'stmt-1',
      tenant_id: 'tenant-1',
      actor: {
        name: 'João Silva',
        mbox: 'joao@email.com',
        objectType: 'Agent'
      },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/experienced',
        display: {
          'en-US': 'experienced'
        }
      },
      object: {
        id: 'http://example.com/activities/course-1',
        definition: {
          name: {
            'en-US': 'Curso de Implantodontia'
          },
          type: 'http://adlnet.gov/expapi/activities/course'
        }
      },
      result: {
        score: {
          scaled: 0.85,
          raw: 85,
          min: 0,
          max: 100
        },
        completion: true,
        success: true
      },
      context: {
        registration: 'reg-123',
        instructor: {
          name: 'Dr. Maria Santos',
          mbox: 'maria@instituto.com'
        }
      },
      timestamp: '2024-01-15T10:30:00Z',
      stored: '2024-01-15T10:30:05Z'
    },
    {
      id: 'stmt-2',
      tenant_id: 'tenant-1',
      actor: {
        name: 'Pedro Costa',
        mbox: 'pedro@email.com',
        objectType: 'Agent'
      },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/completed',
        display: {
          'en-US': 'completed'
        }
      },
      object: {
        id: 'http://example.com/activities/quiz-1',
        definition: {
          name: {
            'en-US': 'Quiz de Fundamentos'
          },
          type: 'http://adlnet.gov/expapi/activities/assessment'
        }
      },
      result: {
        score: {
          scaled: 0.92,
          raw: 92,
          min: 0,
          max: 100
        },
        completion: true,
        success: true
      },
      context: {
        registration: 'reg-124',
        instructor: {
          name: 'Dr. Ana Lima',
          mbox: 'ana@instituto.com'
        }
      },
      timestamp: '2024-01-15T14:20:00Z',
      stored: '2024-01-15T14:20:03Z'
    },
    {
      id: 'stmt-3',
      tenant_id: 'tenant-1',
      actor: {
        name: 'Maria Oliveira',
        mbox: 'maria@email.com',
        objectType: 'Agent'
      },
      verb: {
        id: 'http://adlnet.gov/expapi/verbs/attempted',
        display: {
          'en-US': 'attempted'
        }
      },
      object: {
        id: 'http://example.com/activities/module-1',
        definition: {
          name: {
            'en-US': 'Módulo 1: Introdução'
          },
          type: 'http://adlnet.gov/expapi/activities/module'
        }
      },
      result: {
        completion: false,
        success: false
      },
      context: {
        registration: 'reg-125',
        instructor: {
          name: 'Dr. Carlos Rocha',
          mbox: 'carlos@instituto.com'
        }
      },
      timestamp: '2024-01-15T16:45:00Z',
      stored: '2024-01-15T16:45:02Z'
    }
  ];

  const getVerbLabel = (verb: any) => {
    if (!verb || !verb.display) return 'Unknown';
    return verb.display['en-US'] || verb.display['pt-BR'] || 'Unknown';
  };

  const getVerbColor = (verb: any) => {
    const verbId = verb?.id || '';
    if (verbId.includes('completed')) return 'bg-green-100 text-green-800';
    if (verbId.includes('experienced')) return 'bg-blue-100 text-blue-800';
    if (verbId.includes('attempted')) return 'bg-yellow-100 text-yellow-800';
    if (verbId.includes('passed')) return 'bg-green-100 text-green-800';
    if (verbId.includes('failed')) return 'bg-red-100 text-red-800';
    return 'bg-grey-100 text-grey-800';
  };

  const getObjectTypeLabel = (object: any) => {
    if (!object || !object.definition) return 'Unknown';
    const type = object.definition.type || '';
    if (type.includes('course')) return 'Curso';
    if (type.includes('assessment')) return 'Avaliação';
    if (type.includes('module')) return 'Módulo';
    if (type.includes('activity')) return 'Atividade';
    return 'Recurso';
  };

  const getObjectTypeColor = (object: any) => {
    if (!object || !object.definition) return 'bg-grey-100 text-grey-800';
    const type = object.definition.type || '';
    if (type.includes('course')) return 'bg-blue-100 text-blue-800';
    if (type.includes('assessment')) return 'bg-green-100 text-green-800';
    if (type.includes('module')) return 'bg-purple-100 text-purple-800';
    if (type.includes('activity')) return 'bg-yellow-100 text-yellow-800';
    return 'bg-grey-100 text-grey-800';
  };

  const getScoreColor = (score: number) => {
    if (score >= 0.8) return 'text-green-600';
    if (score >= 0.6) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStatusIcon = (result: any) => {
    if (!result) return <AlertCircle size={16} className="text-grey-400" />;
    
    if (result.success === true) {
      return <CheckCircle size={16} className="text-green-500" />;
    } else if (result.success === false) {
      return <XCircle size={16} className="text-red-500" />;
    }
    
    return <AlertCircle size={16} className="text-yellow-500" />;
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

  const filteredStatements = mockStatements.filter(statement => {
    const matchesSearch = 
      statement.actor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.object.definition?.name?.['en-US']?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      statement.object.definition?.name?.['pt-BR']?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesVerb = verbFilter === 'all' || 
      statement.verb.id.includes(verbFilter);
    
    const matchesDate = dateFilter === 'all' || 
      (dateFilter === 'today' && new Date(statement.timestamp).toDateString() === new Date().toDateString()) ||
      (dateFilter === 'week' && new Date(statement.timestamp) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)) ||
      (dateFilter === 'month' && new Date(statement.timestamp) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000));
    
    return matchesSearch && matchesVerb && matchesDate;
  });

  const sortedStatements = [...filteredStatements].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'timestamp':
        comparison = new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime();
        break;
      case 'actor':
        comparison = a.actor.name.localeCompare(b.actor.name);
        break;
      case 'verb':
        comparison = getVerbLabel(a.verb).localeCompare(getVerbLabel(b.verb));
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const getUniqueVerbs = () => {
    const verbs = new Set(mockStatements.map(stmt => stmt.verb.id));
    return Array.from(verbs);
  };

  const getStats = () => {
    const total = mockStatements.length;
    const completed = mockStatements.filter(stmt => stmt.verb.id.includes('completed')).length;
    const successful = mockStatements.filter(stmt => stmt.result?.success === true).length;
    const avgScore = mockStatements
      .filter(stmt => stmt.result?.score?.scaled)
      .reduce((sum, stmt) => sum + (stmt.result?.score?.scaled || 0), 0) / 
      mockStatements.filter(stmt => stmt.result?.score?.scaled).length;

    return { total, completed, successful, avgScore: avgScore || 0 };
  };

  const stats = getStats();

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            xAPI Tracker
          </h1>
          <p className="text-grey-600">
            Monitore e analise atividades de aprendizagem
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={onRefresh}
            disabled={isLoading}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <RefreshCw size={16} className="mr-2" />
            Atualizar
          </Button>
          
          <Button
            variant="outline"
            onClick={onExport}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Activity size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{stats.total}</div>
              <div className="text-sm text-grey-600">Total de Atividades</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{stats.completed}</div>
              <div className="text-sm text-grey-600">Concluídas</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Target size={24} className="text-gold-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{stats.successful}</div>
              <div className="text-sm text-grey-600">Bem-sucedidas</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {(stats.avgScore * 100).toFixed(1)}%
              </div>
              <div className="text-sm text-grey-600">Pontuação Média</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Buscar atividades..."
              onSearch={setSearchQuery}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={verbFilter}
              onChange={(e) => setVerbFilter(e.target.value)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="all">Todos os Verbos</option>
              {getUniqueVerbs().map(verb => (
                <option key={verb} value={verb}>
                  {getVerbLabel({ id: verb })}
                </option>
              ))}
            </select>
            
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="all">Todas as Datas</option>
              <option value="today">Hoje</option>
              <option value="week">Última Semana</option>
              <option value="month">Último Mês</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="timestamp">Ordenar por Data</option>
              <option value="actor">Ordenar por Usuário</option>
              <option value="verb">Ordenar por Ação</option>
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

      {/* Statements List */}
      <div className="space-y-4">
        {sortedStatements.map((statement) => (
          <Card key={statement.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <h3 className="text-lg font-medium text-grey-900">
                    {statement.actor.name}
                  </h3>
                  <Badge variant="secondary" className={getVerbColor(statement.verb)}>
                    {getVerbLabel(statement.verb)}
                  </Badge>
                  <Badge variant="outline" className={getObjectTypeColor(statement.object)}>
                    {getObjectTypeLabel(statement.object)}
                  </Badge>
                  {getStatusIcon(statement.result)}
                </div>
                
                <div className="mb-3">
                  <h4 className="font-medium text-grey-900 mb-1">
                    {statement.object.definition?.name?.['en-US'] || 
                     statement.object.definition?.name?.['pt-BR'] || 
                     'Atividade sem nome'}
                  </h4>
                  <p className="text-sm text-grey-600">
                    {statement.object.definition?.description?.['en-US'] || 
                     statement.object.definition?.description?.['pt-BR'] || 
                     'Sem descrição'}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-grey-600 mb-4">
                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    <span>{formatDate(statement.timestamp)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users size={16} />
                    <span>{statement.context?.instructor?.name || 'N/A'}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Target size={16} />
                    <span>Reg: {statement.context?.registration || 'N/A'}</span>
                  </div>
                </div>

                {/* Result Details */}
                {statement.result && (
                  <div className="bg-grey-50 p-4 rounded-lg">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {statement.result.score && (
                        <div>
                          <div className="text-sm text-grey-600 mb-1">Pontuação</div>
                          <div className={`text-lg font-bold ${getScoreColor(statement.result.score.scaled || 0)}`}>
                            {((statement.result.score.scaled || 0) * 100).toFixed(1)}%
                          </div>
                        </div>
                      )}
                      <div>
                        <div className="text-sm text-grey-600 mb-1">Conclusão</div>
                        <div className="text-lg font-bold">
                          {statement.result.completion ? 'Sim' : 'Não'}
                        </div>
                      </div>
                      <div>
                        <div className="text-sm text-grey-600 mb-1">Sucesso</div>
                        <div className="text-lg font-bold">
                          {statement.result.success === true ? 'Sim' : 
                           statement.result.success === false ? 'Não' : 'N/A'}
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onView(statement)}
                  className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                >
                  <Eye size={14} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {sortedStatements.length === 0 && (
        <Card className="p-8 text-center">
          <Activity size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Nenhuma atividade encontrada
          </h3>
          <p className="text-grey-600">
            {searchQuery || verbFilter !== 'all' || dateFilter !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Nenhuma atividade xAPI registrada ainda'
            }
          </p>
        </Card>
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold-500"></div>
            <span className="text-grey-700">Carregando...</span>
          </div>
        </div>
      )}
    </div>
  );
}
