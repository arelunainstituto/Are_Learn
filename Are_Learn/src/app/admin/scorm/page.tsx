'use client';

import { useState, useEffect } from 'react';
import { 
  Package, 
  Activity, 
  Upload, 
  Download, 
  BarChart3, 
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye,
  Play,
  Search,
  Filter,
  TrendingUp,
  TrendingDown,
  CheckCircle,
  AlertCircle,
  Clock,
  Users,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { SCORMPackageManager } from '@/components/scorm/SCORMPackageManager';
import { xAPITracker } from '@/components/scorm/xAPITracker';
import { ScormPackage, XapiStatement } from '@/types';

export default function AdminSCORMPage() {
  const [selectedView, setSelectedView] = useState<'packages' | 'xapi' | 'analytics'>('packages');
  const [packages, setPackages] = useState<ScormPackage[]>([]);
  const [statements, setStatements] = useState<XapiStatement[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - substituir por dados reais
  const mockPackages: ScormPackage[] = [
    {
      id: 'scorm-1',
      tenant_id: 'tenant-1',
      titulo: 'Curso de Implantodontia Avançada',
      version: '2004',
      file_path: '/packages/implantodontia-avancada.zip',
      manifest: {
        identifier: 'implantodontia-avancada',
        title: 'Curso de Implantodontia Avançada',
        description: 'Curso completo sobre técnicas avançadas de implantodontia',
        version: '1.0',
        organizations: [
          {
            identifier: 'org-1',
            title: 'Instituto Odontológico',
            items: [
              {
                identifier: 'item-1',
                title: 'Módulo 1: Fundamentos',
                identifierref: 'resource-1'
              },
              {
                identifier: 'item-2',
                title: 'Módulo 2: Técnicas',
                identifierref: 'resource-2'
              }
            ]
          }
        ],
        resources: [
          {
            identifier: 'resource-1',
            href: 'module1/index.html',
            type: 'webcontent',
            adlcp: {
              scormtype: 'sco'
            }
          },
          {
            identifier: 'resource-2',
            href: 'module2/index.html',
            type: 'webcontent',
            adlcp: {
              scormtype: 'sco'
            }
          }
        ]
      },
      created_at: '2024-01-01T00:00:00Z'
    },
    {
      id: 'scorm-2',
      tenant_id: 'tenant-1',
      titulo: 'Gestão de Clínicas Odontológicas',
      version: '1.2',
      file_path: '/packages/gestao-clinicas.zip',
      manifest: {
        identifier: 'gestao-clinicas',
        title: 'Gestão de Clínicas Odontológicas',
        description: 'Curso sobre gestão e administração de clínicas',
        version: '1.0',
        organizations: [
          {
            identifier: 'org-2',
            title: 'Centro de Estudos',
            items: [
              {
                identifier: 'item-3',
                title: 'Módulo 1: Planejamento',
                identifierref: 'resource-3'
              }
            ]
          }
        ],
        resources: [
          {
            identifier: 'resource-3',
            href: 'module1/index.html',
            type: 'webcontent',
            adlcp: {
              scormtype: 'sco'
            }
          }
        ]
      },
      created_at: '2024-01-05T00:00:00Z'
    }
  ];

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
    }
  ];

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setPackages(mockPackages);
      setStatements(mockStatements);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditPackage = (pkg: ScormPackage) => {
    console.log('Editando pacote:', pkg);
    // TODO: Implementar edição de pacote
  };

  const handleDeletePackage = (packageId: string) => {
    console.log('Deletando pacote:', packageId);
    // TODO: Implementar exclusão de pacote
  };

  const handleViewPackage = (pkg: ScormPackage) => {
    console.log('Visualizando pacote:', pkg);
    // TODO: Implementar visualização de pacote
  };

  const handlePlayPackage = (pkg: ScormPackage) => {
    console.log('Executando pacote:', pkg);
    // TODO: Implementar execução de pacote
  };

  const handleUploadPackage = (file: File) => {
    console.log('Fazendo upload do pacote:', file.name);
    // TODO: Implementar upload de pacote
  };

  const handleRefreshxAPI = () => {
    console.log('Atualizando dados xAPI...');
    // TODO: Implementar atualização de dados xAPI
  };

  const handleExportxAPI = () => {
    console.log('Exportando dados xAPI...');
    // TODO: Implementar exportação de dados xAPI
  };

  const handleViewStatement = (statement: XapiStatement) => {
    console.log('Visualizando statement:', statement);
    // TODO: Implementar visualização de statement
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
            SCORM e xAPI
          </h1>
          <p className="text-grey-600">
            Gerencie conteúdo SCORM e monitore atividades xAPI
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            className="bg-gold-500 hover:bg-gold-600 text-white"
          >
            <Plus size={16} className="mr-2" />
            Novo Conteúdo
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedView === 'packages' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('packages')}
          className="flex items-center gap-2"
        >
          <Package size={16} />
          Pacotes SCORM
        </Button>
        
        <Button
          variant={selectedView === 'xapi' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('xapi')}
          className="flex items-center gap-2"
        >
          <Activity size={16} />
          xAPI Tracker
        </Button>
        
        <Button
          variant={selectedView === 'analytics' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('analytics')}
          className="flex items-center gap-2"
        >
          <BarChart3 size={16} />
          Analytics
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Package size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{packages.length}</div>
              <div className="text-sm text-grey-600">Pacotes SCORM</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Activity size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{statements.length}</div>
              <div className="text-sm text-grey-600">Atividades xAPI</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle size={24} className="text-gold-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {packages.filter(pkg => pkg.version === '2004').length}
              </div>
              <div className="text-sm text-grey-600">SCORM 2004</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Target size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {statements.filter(stmt => stmt.result?.success === true).length}
              </div>
              <div className="text-sm text-grey-600">Atividades Bem-sucedidas</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Packages View */}
      {selectedView === 'packages' && (
        <SCORMPackageManager
          packages={packages}
          onEdit={handleEditPackage}
          onDelete={handleDeletePackage}
          onView={handleViewPackage}
          onPlay={handlePlayPackage}
          onUpload={handleUploadPackage}
        />
      )}

      {/* xAPI View */}
      {selectedView === 'xapi' && (
        <xAPITracker
          statements={statements}
          onRefresh={handleRefreshxAPI}
          onExport={handleExportxAPI}
          onView={handleViewStatement}
        />
      )}

      {/* Analytics View */}
      {selectedView === 'analytics' && (
        <div className="p-8 text-center">
          <BarChart3 size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Analytics de SCORM e xAPI
          </h3>
          <p className="text-grey-600">
            Dashboard de analytics em desenvolvimento
          </p>
        </div>
      )}
    </div>
  );
}
