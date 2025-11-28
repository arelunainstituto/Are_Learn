import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  Users, 
  BookOpen, 
  Award, 
  TrendingUp,
  Download,
  Eye,
  Edit,
  Plus,
  Filter,
  Search
} from 'lucide-react';
import { 
  allModules, 
  getCategoryStats, 
  getTrailsByCategory,
  getAllTrails 
} from '@/lib/corporate-training';

// Mock data para demonstração
const mockUserProgress = [
  {
    id: 'user-1',
    name: 'Dr. Leonardo',
    email: 'drsaraiva@institutoareluna.pt',
    department: 'Diretoria',
    role: 'CEO',
    trailsCompleted: 3,
    totalTrails: 5,
    lastActivity: '2024-01-15',
    score: 92,
    achievements: 4
  },
  {
    id: 'user-2',
    name: 'Dra. Arethuza',
    email: 'draarethuza@institutoareluna.pt',
    department: 'Diretoria',
    role: 'Diretora Clínica',
    trailsCompleted: 5,
    totalTrails: 5,
    lastActivity: '2024-01-14',
    score: 98,
    achievements: 5
  },
  {
    id: 'user-3',
    name: 'Gisele Prudêncio',
    email: 'gisele.prudencio@institutoareluna.pt',
    department: 'Recursos Humanos',
    role: 'Coordenadora',
    trailsCompleted: 2,
    totalTrails: 5,
    lastActivity: '2024-01-13',
    score: 85,
    achievements: 2
  },
  {
    id: 'user-4',
    name: 'Eduardo Souza',
    email: 'eduardo.souza@institutoareluna.pt',
    department: 'TI',
    role: 'Analista',
    trailsCompleted: 1,
    totalTrails: 5,
    lastActivity: '2024-01-12',
    score: 78,
    achievements: 1
  }
];

export default function AdminTreinamentoPage() {
  const totalUsers = mockUserProgress.length;
  const totalTrails = getAllTrails().length;
  const averageScore = Math.round(mockUserProgress.reduce((sum, user) => sum + user.score, 0) / totalUsers);
  const completionRate = Math.round((mockUserProgress.reduce((sum, user) => sum + user.trailsCompleted, 0) / (totalUsers * totalTrails)) * 100);
  const categoryStats = getCategoryStats();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-brand font-bold text-gray-900">
                Grade Curricular Completa - Admin
              </h1>
              <p className="text-gray-600 mt-2">
                Gerencie o progresso dos colaboradores e monitore o desempenho em todas as categorias
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline">
                <Download size={18} className="mr-2" />
                Exportar Relatório
              </Button>
              <Button variant="primary">
                <Plus size={18} className="mr-2" />
                Novo Módulo
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total de Colaboradores</p>
                  <p className="text-2xl font-bold text-gray-900">{totalUsers}</p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <Users size={24} className="text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Trilhas Disponíveis</p>
                  <p className="text-2xl font-bold text-gray-900">{totalTrails}</p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <BookOpen size={24} className="text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Taxa de Conclusão</p>
                  <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <TrendingUp size={24} className="text-purple-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Pontuação Média</p>
                  <p className="text-2xl font-bold text-gray-900">{averageScore}%</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <Award size={24} className="text-yellow-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Métricas por Categoria */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-brand font-bold text-gray-900 mb-6">
              Métricas por Categoria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categoryStats.map((category) => {
                const categoryConfig = {
                  'clinico': { icon: '🦷', color: 'bg-red-100 text-red-700' },
                  'corporativo': { icon: '🏛️', color: 'bg-blue-100 text-blue-700' },
                  'tecnologia': { icon: '💻', color: 'bg-cyan-100 text-cyan-700' },
                  'onboarding': { icon: '👋', color: 'bg-purple-100 text-purple-700' },
                  'soft-skills': { icon: '💡', color: 'bg-green-100 text-green-700' }
                };
                
                const config = categoryConfig[category.category as keyof typeof categoryConfig] || { icon: '📚', color: 'bg-gray-100 text-gray-700' };
                
                return (
                  <div key={category.category} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${config.color}`}>
                        <span className="text-xl">{config.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{category.title}</h3>
                        <p className="text-sm text-gray-600">{category.totalTrails} trilhas</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Taxa de Conclusão</span>
                        <span className="font-semibold text-gray-900">{category.completionRate}%</span>
                      </div>
                      <ProgressBar value={category.completionRate} size="sm" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Tempo Total</span>
                        <span className="font-semibold text-gray-900">{category.totalTime} min</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Certificados</span>
                        <span className="font-semibold text-gray-900">{category.completedTrails}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar colaborador..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Filter size={18} className="mr-2" />
                Filtrar
              </Button>
              <Button variant="outline">
                <Download size={18} className="mr-2" />
                Exportar
              </Button>
            </div>
          </div>
        </div>

        {/* Progress by Trail */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-brand font-bold text-gray-900 mb-6">
              Progresso por Trilha
            </h2>
            <div className="space-y-4">
              {getAllTrails().map((trail) => {
                const completedUsers = mockUserProgress.filter(user => 
                  user.trailsCompleted >= trail.order
                ).length;
                const completionPercentage = Math.round((completedUsers / totalUsers) * 100);

                return (
                  <div key={trail.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${trail.color}20`, color: trail.color }}
                      >
                        {trail.icon}
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{trail.nome}</h3>
                        <p className="text-sm text-gray-600">{trail.description}</p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {trail.category}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {completionPercentage}%
                        </div>
                        <div className="text-sm text-gray-600">Concluído</div>
                      </div>
                      <div className="w-32">
                        <ProgressBar value={completionPercentage} />
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* User Progress Table */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-brand font-bold text-gray-900">
                Progresso dos Colaboradores
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  CSV
                </Button>
                <Button variant="outline" size="sm">
                  <Download size={16} className="mr-2" />
                  Excel
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Colaborador</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Departamento</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Progresso</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Pontuação</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Conquistas</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Última Atividade</th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-900">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {mockUserProgress.map((user) => {
                    const progressPercentage = Math.round((user.trailsCompleted / user.totalTrails) * 100);
                    
                    return (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-4 px-4">
                          <div>
                            <div className="font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-600">{user.email}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.department}</div>
                            <div className="text-sm text-gray-600">{user.role}</div>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-24">
                              <ProgressBar value={progressPercentage} size="sm" />
                            </div>
                            <span className="text-sm font-medium text-gray-900">
                              {user.trailsCompleted}/{user.totalTrails}
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <Badge 
                            variant={user.score >= 80 ? "success" : user.score >= 60 ? "warning" : "error"}
                          >
                            {user.score}%
                          </Badge>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-1">
                            <Award size={16} className="text-yellow-500" />
                            <span className="text-sm font-medium text-gray-900">{user.achievements}</span>
                          </div>
                        </td>
                        <td className="py-4 px-4">
                          <span className="text-sm text-gray-600">{user.lastActivity}</span>
                        </td>
                        <td className="py-4 px-4">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Eye size={16} />
                            </Button>
                            <Button variant="ghost" size="sm">
                              <Edit size={16} />
                            </Button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
