'use client';

import { useState, useEffect } from 'react';
import { 
  Plus, 
  Upload, 
  Download, 
  Edit, 
  Trash2, 
  Eye, 
  Play, 
  Settings,
  Search,
  Filter,
  FileText,
  Package,
  CheckCircle,
  AlertCircle,
  Clock,
  BarChart3,
  Users,
  TrendingUp,
  TrendingDown
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { ScormPackage } from '@/types';

interface SCORMPackageManagerProps {
  packages: ScormPackage[];
  onEdit: (pkg: ScormPackage) => void;
  onDelete: (packageId: string) => void;
  onView: (pkg: ScormPackage) => void;
  onPlay: (pkg: ScormPackage) => void;
  onUpload: (file: File) => void;
}

export function SCORMPackageManager({ 
  packages, 
  onEdit, 
  onDelete, 
  onView, 
  onPlay,
  onUpload
}: SCORMPackageManagerProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [versionFilter, setVersionFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'created_at' | 'size'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

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

  const getVersionLabel = (version: string) => {
    switch (version) {
      case '1.2': return 'SCORM 1.2';
      case '2004': return 'SCORM 2004';
      default: return version;
    }
  };

  const getVersionColor = (version: string) => {
    switch (version) {
      case '1.2': return 'bg-blue-100 text-blue-800';
      case '2004': return 'bg-green-100 text-green-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const getFileSize = (filePath: string) => {
    // Mock file sizes - substituir por dados reais
    const sizes: Record<string, string> = {
      '/packages/implantodontia-avancada.zip': '15.2 MB',
      '/packages/gestao-clinicas.zip': '8.7 MB'
    };
    return sizes[filePath] || 'N/A';
  };

  const getModuleCount = (manifest: any) => {
    if (!manifest || !manifest.organizations) return 0;
    return manifest.organizations.reduce((total: number, org: any) => {
      return total + (org.items ? org.items.length : 0);
    }, 0);
  };

  const filteredPackages = mockPackages.filter(pkg => {
    const matchesSearch = pkg.titulo.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesVersion = versionFilter === 'all' || pkg.version === versionFilter;
    
    return matchesSearch && matchesVersion;
  });

  const sortedPackages = [...filteredPackages].sort((a, b) => {
    let comparison = 0;
    
    switch (sortBy) {
      case 'name':
        comparison = a.titulo.localeCompare(b.titulo);
        break;
      case 'created_at':
        comparison = new Date(a.created_at).getTime() - new Date(b.created_at).getTime();
        break;
      case 'size':
        // Mock size comparison
        comparison = a.titulo.localeCompare(b.titulo);
        break;
    }
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    try {
      // TODO: Implementar upload de arquivo SCORM
      onUpload(file);
      console.log('Arquivo SCORM enviado:', file.name);
    } catch (error) {
      console.error('Erro ao fazer upload:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeletePackage = async (packageId: string) => {
    if (!confirm('Tem certeza que deseja deletar este pacote SCORM?')) return;
    
    setIsLoading(true);
    try {
      // TODO: Implementar API call para deletar pacote
      onDelete(packageId);
      console.log('Pacote SCORM deletado:', packageId);
    } catch (error) {
      console.error('Erro ao deletar pacote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadPackage = (pkg: ScormPackage) => {
    // TODO: Implementar download do pacote
    console.log('Baixando pacote:', pkg.titulo);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Gerenciar Pacotes SCORM
          </h1>
          <p className="text-grey-600">
            Importe e gerencie conteúdo SCORM para seus cursos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <input
            type="file"
            accept=".zip"
            onChange={handleFileUpload}
            className="hidden"
            id="scorm-upload"
          />
          <label htmlFor="scorm-upload">
            <Button
              variant="outline"
              className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
              disabled={isUploading}
            >
              <Upload size={16} className="mr-2" />
              {isUploading ? 'Enviando...' : 'Importar SCORM'}
            </Button>
          </label>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Package size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{mockPackages.length}</div>
              <div className="text-sm text-grey-600">Total de Pacotes</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <FileText size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {mockPackages.reduce((total, pkg) => total + getModuleCount(pkg.manifest), 0)}
              </div>
              <div className="text-sm text-grey-600">Módulos Totais</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle size={24} className="text-gold-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {mockPackages.filter(pkg => pkg.version === '2004').length}
              </div>
              <div className="text-sm text-grey-600">SCORM 2004</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {mockPackages.filter(pkg => pkg.version === '1.2').length}
              </div>
              <div className="text-sm text-grey-600">SCORM 1.2</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Buscar pacotes SCORM..."
              onSearch={setSearchQuery}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={versionFilter}
              onChange={(e) => setVersionFilter(e.target.value)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="all">Todas as Versões</option>
              <option value="1.2">SCORM 1.2</option>
              <option value="2004">SCORM 2004</option>
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="name">Ordenar por Nome</option>
              <option value="created_at">Ordenar por Data de Criação</option>
              <option value="size">Ordenar por Tamanho</option>
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

      {/* Packages List */}
      <div className="space-y-4">
        {sortedPackages.map((pkg) => {
          const moduleCount = getModuleCount(pkg.manifest);
          const fileSize = getFileSize(pkg.file_path);
          
          return (
            <Card key={pkg.id} className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-lg font-medium text-grey-900">{pkg.titulo}</h3>
                    <Badge variant="secondary" className={getVersionColor(pkg.version)}>
                      {getVersionLabel(pkg.version)}
                    </Badge>
                  </div>
                  
                  {pkg.manifest?.description && (
                    <p className="text-grey-600 mb-4">{pkg.manifest.description}</p>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm text-grey-600 mb-4">
                    <div className="flex items-center gap-2">
                      <FileText size={16} />
                      <span>{moduleCount} módulo(s)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Package size={16} />
                      <span>{fileSize}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} />
                      <span>Criado em {new Date(pkg.created_at).toLocaleDateString('pt-BR')}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle size={16} className="text-green-500" />
                      <span>Validado</span>
                    </div>
                  </div>

                  {/* Manifest Info */}
                  {pkg.manifest && (
                    <div className="mb-4">
                      <div className="text-sm text-grey-600 mb-2">Estrutura do Conteúdo:</div>
                      <div className="bg-grey-50 p-3 rounded-lg">
                        {pkg.manifest.organizations?.map((org: any, orgIndex: number) => (
                          <div key={orgIndex} className="mb-2">
                            <div className="font-medium text-grey-900">{org.title}</div>
                            {org.items?.map((item: any, itemIndex: number) => (
                              <div key={itemIndex} className="ml-4 text-sm text-grey-600">
                                • {item.title}
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onView(pkg)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Eye size={14} />
                  </Button>
                  
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onPlay(pkg)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Play size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownloadPackage(pkg)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Download size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onEdit(pkg)}
                    className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                  >
                    <Edit size={14} />
                  </Button>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDeletePackage(pkg.id)}
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

      {sortedPackages.length === 0 && (
        <Card className="p-8 text-center">
          <Package size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Nenhum pacote SCORM encontrado
          </h3>
          <p className="text-grey-600 mb-4">
            {searchQuery || versionFilter !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Comece importando seu primeiro pacote SCORM'
            }
          </p>
          {!searchQuery && versionFilter === 'all' && (
            <div className="flex items-center justify-center gap-3">
              <input
                type="file"
                accept=".zip"
                onChange={handleFileUpload}
                className="hidden"
                id="scorm-upload-empty"
              />
              <label htmlFor="scorm-upload-empty">
                <Button variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
                  <Upload size={16} className="mr-2" />
                  Importar Primeiro Pacote
                </Button>
              </label>
            </div>
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
