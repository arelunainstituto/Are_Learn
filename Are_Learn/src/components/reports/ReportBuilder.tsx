'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Save, 
  Play, 
  Download, 
  Settings, 
  BarChart3, 
  PieChart, 
  LineChart,
  Table,
  Calendar,
  Filter,
  Eye,
  Edit,
  Trash2,
  Move,
  GripVertical
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Input } from '@/components/ui/Input';
import { ReportTemplate, ScheduledReport } from '@/types';

interface ReportBuilderProps {
  template?: ReportTemplate;
  onSave: (template: ReportTemplate) => void;
  onCancel: () => void;
}

interface ReportBlock {
  id: string;
  type: 'chart' | 'table' | 'metric' | 'text';
  title: string;
  config: any;
  position: { x: number; y: number; width: number; height: number };
}

interface ChartConfig {
  chartType: 'bar' | 'line' | 'pie' | 'doughnut' | 'area';
  dataSource: string;
  xAxis: string;
  yAxis: string;
  filters: Record<string, any>;
  colors: string[];
}

interface TableConfig {
  dataSource: string;
  columns: string[];
  filters: Record<string, any>;
  pagination: boolean;
  pageSize: number;
}

interface MetricConfig {
  dataSource: string;
  metric: string;
  aggregation: 'sum' | 'avg' | 'count' | 'min' | 'max';
  filters: Record<string, any>;
  format: 'number' | 'percentage' | 'currency';
}

export function ReportBuilder({ template, onSave, onCancel }: ReportBuilderProps) {
  const [reportName, setReportName] = useState(template?.nome || '');
  const [reportDescription, setReportDescription] = useState(template?.descricao || '');
  const [reportType, setReportType] = useState<'completion' | 'performance' | 'engagement' | 'cross_tenant'>(
    template?.tipo || 'completion'
  );
  const [blocks, setBlocks] = useState<ReportBlock[]>([]);
  const [selectedBlock, setSelectedBlock] = useState<string | null>(null);
  const [isPreview, setIsPreview] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Mock data sources
  const dataSources = [
    { id: 'users', name: 'Usuários', description: 'Dados de usuários e perfis' },
    { id: 'courses', name: 'Cursos', description: 'Informações sobre cursos' },
    { id: 'enrollments', name: 'Matrículas', description: 'Dados de matrículas e progresso' },
    { id: 'quizzes', name: 'Quizzes', description: 'Resultados de quizzes e avaliações' },
    { id: 'programs', name: 'Programas', description: 'Dados de programas de aprendizagem' }
  ];

  const chartTypes = [
    { id: 'bar', name: 'Barras', icon: BarChart3 },
    { id: 'line', name: 'Linha', icon: LineChart },
    { id: 'pie', name: 'Pizza', icon: PieChart },
    { id: 'doughnut', name: 'Rosquinha', icon: PieChart },
    { id: 'area', name: 'Área', icon: LineChart }
  ];

  const addBlock = (type: ReportBlock['type']) => {
    const newBlock: ReportBlock = {
      id: `block-${Date.now()}`,
      type,
      title: `Novo ${type === 'chart' ? 'Gráfico' : type === 'table' ? 'Tabela' : type === 'metric' ? 'Métrica' : 'Texto'}`,
      config: getDefaultConfig(type),
      position: { x: 0, y: 0, width: 4, height: 3 }
    };
    setBlocks([...blocks, newBlock]);
    setSelectedBlock(newBlock.id);
  };

  const getDefaultConfig = (type: ReportBlock['type']): any => {
    switch (type) {
      case 'chart':
        return {
          chartType: 'bar',
          dataSource: 'enrollments',
          xAxis: 'course_id',
          yAxis: 'completion_rate',
          filters: {},
          colors: ['#ffd700', '#a295b3', '#2c2c2c']
        };
      case 'table':
        return {
          dataSource: 'users',
          columns: ['name', 'email', 'role', 'created_at'],
          filters: {},
          pagination: true,
          pageSize: 10
        };
      case 'metric':
        return {
          dataSource: 'enrollments',
          metric: 'completion_rate',
          aggregation: 'avg',
          filters: {},
          format: 'percentage'
        };
      case 'text':
        return {
          content: 'Digite seu texto aqui...',
          fontSize: 16,
          alignment: 'left',
          color: '#2c2c2c'
        };
      default:
        return {};
    }
  };

  const updateBlock = (blockId: string, updates: Partial<ReportBlock>) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
  };

  const deleteBlock = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
    if (selectedBlock === blockId) {
      setSelectedBlock(null);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const reportTemplate: ReportTemplate = {
        id: template?.id || `template-${Date.now()}`,
        tenant_id: 'tenant-1', // Mock tenant ID
        nome: reportName,
        descricao: reportDescription,
        tipo: reportType,
        query_config: {
          dataSources: dataSources,
          blocks: blocks
        },
        visualization_config: {
          layout: 'grid',
          theme: 'default'
        },
        filters: {},
        created_by: 'user-1', // Mock user ID
        is_site_wide: false,
        created_at: new Date().toISOString()
      };

      onSave(reportTemplate);
    } catch (error) {
      console.error('Erro ao salvar relatório:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const renderBlock = (block: ReportBlock) => {
    switch (block.type) {
      case 'chart':
        return (
          <div className="p-4 border border-grey-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={20} className="text-gold-500" />
              <span className="font-medium text-grey-900">{block.title}</span>
            </div>
            <div className="h-32 bg-grey-100 rounded flex items-center justify-center">
              <span className="text-grey-500">Gráfico: {block.config.chartType}</span>
            </div>
          </div>
        );
      case 'table':
        return (
          <div className="p-4 border border-grey-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Table size={20} className="text-gold-500" />
              <span className="font-medium text-grey-900">{block.title}</span>
            </div>
            <div className="h-32 bg-grey-100 rounded flex items-center justify-center">
              <span className="text-grey-500">Tabela: {block.config.dataSource}</span>
            </div>
          </div>
        );
      case 'metric':
        return (
          <div className="p-4 border border-grey-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <BarChart3 size={20} className="text-gold-500" />
              <span className="font-medium text-grey-900">{block.title}</span>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gold-500">85.2%</div>
              <div className="text-sm text-grey-600">Taxa de Conclusão</div>
            </div>
          </div>
        );
      case 'text':
        return (
          <div className="p-4 border border-grey-200 rounded-lg">
            <div className="flex items-center gap-2 mb-3">
              <Edit size={20} className="text-gold-500" />
              <span className="font-medium text-grey-900">{block.title}</span>
            </div>
            <div className="text-grey-700">
              {block.config.content}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const renderBlockConfig = (block: ReportBlock) => {
    if (!block) return null;

    return (
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-grey-700 mb-1">
            Título do Bloco
          </label>
          <Input
            value={block.title}
            onChange={(e) => updateBlock(block.id, { title: e.target.value })}
            className="w-full"
          />
        </div>

        {block.type === 'chart' && (
          <>
            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Tipo de Gráfico
              </label>
              <select
                value={block.config.chartType}
                onChange={(e) => updateBlock(block.id, { 
                  config: { ...block.config, chartType: e.target.value }
                })}
                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
              >
                {chartTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Fonte de Dados
              </label>
              <select
                value={block.config.dataSource}
                onChange={(e) => updateBlock(block.id, { 
                  config: { ...block.config, dataSource: e.target.value }
                })}
                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
              >
                {dataSources.map(source => (
                  <option key={source.id} value={source.id}>{source.name}</option>
                ))}
              </select>
            </div>
          </>
        )}

        {block.type === 'table' && (
          <>
            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Fonte de Dados
              </label>
              <select
                value={block.config.dataSource}
                onChange={(e) => updateBlock(block.id, { 
                  config: { ...block.config, dataSource: e.target.value }
                })}
                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
              >
                {dataSources.map(source => (
                  <option key={source.id} value={source.id}>{source.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Colunas
              </label>
              <div className="space-y-2">
                {block.config.columns.map((column: string, index: number) => (
                  <div key={index} className="flex items-center gap-2">
                    <Input
                      value={column}
                      onChange={(e) => {
                        const newColumns = [...block.config.columns];
                        newColumns[index] = e.target.value;
                        updateBlock(block.id, { 
                          config: { ...block.config, columns: newColumns }
                        });
                      }}
                      className="flex-1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const newColumns = block.config.columns.filter((_, i) => i !== index);
                        updateBlock(block.id, { 
                          config: { ...block.config, columns: newColumns }
                        });
                      }}
                    >
                      <Trash2 size={14} />
                    </Button>
                  </div>
                ))}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    const newColumns = [...block.config.columns, 'nova_coluna'];
                    updateBlock(block.id, { 
                      config: { ...block.config, columns: newColumns }
                    });
                  }}
                >
                  <Plus size={14} className="mr-2" />
                  Adicionar Coluna
                </Button>
              </div>
            </div>
          </>
        )}

        {block.type === 'metric' && (
          <>
            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Fonte de Dados
              </label>
              <select
                value={block.config.dataSource}
                onChange={(e) => updateBlock(block.id, { 
                  config: { ...block.config, dataSource: e.target.value }
                })}
                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
              >
                {dataSources.map(source => (
                  <option key={source.id} value={source.id}>{source.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Métrica
              </label>
              <Input
                value={block.config.metric}
                onChange={(e) => updateBlock(block.id, { 
                  config: { ...block.config, metric: e.target.value }
                })}
                className="w-full"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Agregação
              </label>
              <select
                value={block.config.aggregation}
                onChange={(e) => updateBlock(block.id, { 
                  config: { ...block.config, aggregation: e.target.value }
                })}
                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
              >
                <option value="sum">Soma</option>
                <option value="avg">Média</option>
                <option value="count">Contagem</option>
                <option value="min">Mínimo</option>
                <option value="max">Máximo</option>
              </select>
            </div>
          </>
        )}

        {block.type === 'text' && (
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-1">
              Conteúdo
            </label>
            <textarea
              value={block.config.content}
              onChange={(e) => updateBlock(block.id, { 
                config: { ...block.config, content: e.target.value }
              })}
              rows={4}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
            />
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-grey-200">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-brand font-bold text-grey-900">
            Construtor de Relatórios
          </h1>
          <Badge variant="secondary" className="bg-blue-100 text-blue-800">
            {reportType === 'completion' ? 'Conclusão' : 
             reportType === 'performance' ? 'Performance' :
             reportType === 'engagement' ? 'Engajamento' : 'Cross-Tenant'}
          </Badge>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setIsPreview(!isPreview)}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <Eye size={16} className="mr-2" />
            {isPreview ? 'Editar' : 'Visualizar'}
          </Button>
          
          <Button
            variant="outline"
            onClick={onCancel}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            Cancelar
          </Button>
          
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={isSaving}
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            <Save size={16} className="mr-2" />
            {isSaving ? 'Salvando...' : 'Salvar'}
          </Button>
        </div>
      </div>

      <div className="flex-1 flex">
        {/* Sidebar */}
        <div className="w-80 border-r border-grey-200 p-4">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Nome do Relatório
              </label>
              <Input
                value={reportName}
                onChange={(e) => setReportName(e.target.value)}
                placeholder="Digite o nome do relatório"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Descrição
              </label>
              <textarea
                value={reportDescription}
                onChange={(e) => setReportDescription(e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
                placeholder="Descreva o relatório"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-grey-700 mb-1">
                Tipo de Relatório
              </label>
              <select
                value={reportType}
                onChange={(e) => setReportType(e.target.value as any)}
                className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
              >
                <option value="completion">Conclusão</option>
                <option value="performance">Performance</option>
                <option value="engagement">Engajamento</option>
                <option value="cross_tenant">Cross-Tenant</option>
              </select>
            </div>

            <div className="border-t border-grey-200 pt-4">
              <h3 className="text-sm font-medium text-grey-700 mb-3">Adicionar Blocos</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  onClick={() => addBlock('chart')}
                  className="flex flex-col items-center gap-2 p-3 h-auto"
                >
                  <BarChart3 size={20} className="text-gold-500" />
                  <span className="text-xs">Gráfico</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addBlock('table')}
                  className="flex flex-col items-center gap-2 p-3 h-auto"
                >
                  <Table size={20} className="text-gold-500" />
                  <span className="text-xs">Tabela</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addBlock('metric')}
                  className="flex flex-col items-center gap-2 p-3 h-auto"
                >
                  <BarChart3 size={20} className="text-gold-500" />
                  <span className="text-xs">Métrica</span>
                </Button>
                
                <Button
                  variant="outline"
                  onClick={() => addBlock('text')}
                  className="flex flex-col items-center gap-2 p-3 h-auto"
                >
                  <Edit size={20} className="text-gold-500" />
                  <span className="text-xs">Texto</span>
                </Button>
              </div>
            </div>

            {selectedBlock && (
              <div className="border-t border-grey-200 pt-4">
                <h3 className="text-sm font-medium text-grey-700 mb-3">Configurações</h3>
                {renderBlockConfig(blocks.find(b => b.id === selectedBlock)!)}
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-4">
          {isPreview ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blocks.map(block => (
                <div key={block.id} className="col-span-1">
                  {renderBlock(block)}
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {blocks.map(block => (
                <div key={block.id} className="col-span-1">
                  <div 
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedBlock === block.id 
                        ? 'border-gold-500 bg-gold-50' 
                        : 'border-grey-200 hover:border-grey-300'
                    }`}
                    onClick={() => setSelectedBlock(block.id)}
                  >
                    {renderBlock(block)}
                    <div className="flex justify-end gap-2 mt-3">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          deleteBlock(block.id);
                        }}
                        className="border-red-300 text-red-600 hover:border-red-500 hover:text-red-700"
                      >
                        <Trash2 size={14} />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {blocks.length === 0 && (
            <div className="flex flex-col items-center justify-center h-64 text-grey-500">
              <BarChart3 size={48} className="mb-4" />
              <h3 className="text-lg font-medium mb-2">Nenhum bloco adicionado</h3>
              <p className="text-sm">Adicione blocos na barra lateral para começar a construir seu relatório</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
