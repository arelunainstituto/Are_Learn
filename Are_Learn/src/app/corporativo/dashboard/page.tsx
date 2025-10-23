import { Download, TrendingUp, Users, BookOpen, Clock, Award } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Avatar } from '@/components/ui/Avatar';

// Mock data
const empresa = {
  nome: 'Dental Plus',
  licencas_totais: 150,
  licencas_usadas: 125,
  plano: 'Profissional',
};

const estatisticas = {
  usuarios_ativos: 98,
  cursos_concluidos: 342,
  tempo_total: 1250, // horas
  taxa_conclusao: 72,
};

const topColaboradores = [
  { nome: 'Maria Silva', cursos: 8, tempo: 45, progresso: 85 },
  { nome: 'João Santos', cursos: 7, tempo: 38, progresso: 78 },
  { nome: 'Ana Paula', cursos: 6, tempo: 32, progresso: 72 },
  { nome: 'Carlos Costa', cursos: 6, tempo: 30, progresso: 68 },
  { nome: 'Fernanda Lima', cursos: 5, tempo: 28, progresso: 65 },
];

const cursosPopulares = [
  { titulo: 'Implantodontia Avançada', matriculados: 45, concluidos: 32, media: 85 },
  { titulo: 'Gestão de Clínicas', matriculados: 38, concluidos: 28, media: 82 },
  { titulo: 'Ortodontia Digital', matriculados: 42, concluidos: 30, media: 88 },
  { titulo: 'Marketing Odontológico', matriculados: 35, concluidos: 24, media: 79 },
];

export default function CorporativoDashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-gray-900">
              Dashboard Corporativo
            </h1>
            <p className="text-gray-600 mt-1">{empresa.nome}</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download size={20} className="mr-2" />
              Exportar Relatório
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <Users className="text-primary-600" size={24} />
                </div>
                <Badge variant="success">
                  <TrendingUp size={12} className="mr-1" />
                  +12%
                </Badge>
              </div>
              <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                {estatisticas.usuarios_ativos}
              </div>
              <div className="text-sm text-gray-600 mb-3">Usuários Ativos</div>
              <div className="text-xs text-gray-500">
                {empresa.licencas_usadas} de {empresa.licencas_totais} licenças
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Award className="text-green-600" size={24} />
                </div>
                <Badge variant="success">
                  <TrendingUp size={12} className="mr-1" />
                  +8%
                </Badge>
              </div>
              <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                {estatisticas.cursos_concluidos}
              </div>
              <div className="text-sm text-gray-600 mb-3">Cursos Concluídos</div>
              <div className="text-xs text-gray-500">
                Taxa de conclusão: {estatisticas.taxa_conclusao}%
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
                  <Clock className="text-secondary-600" size={24} />
                </div>
                <Badge variant="success">
                  <TrendingUp size={12} className="mr-1" />
                  +15%
                </Badge>
              </div>
              <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                {estatisticas.tempo_total}h
              </div>
              <div className="text-sm text-gray-600 mb-3">Tempo Total de Estudo</div>
              <div className="text-xs text-gray-500">
                Média: {Math.round(estatisticas.tempo_total / estatisticas.usuarios_ativos)}h/usuário
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <BookOpen className="text-orange-600" size={24} />
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                {empresa.plano}
              </div>
              <div className="text-sm text-gray-600 mb-3">Plano Atual</div>
              <Button variant="ghost" size="sm" className="text-primary-600 p-0 h-auto">
                Gerenciar Plano
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Utilização de Licenças */}
        <Card className="mb-8">
          <CardHeader className="p-6 pb-4">
            <h2 className="text-xl font-display font-bold text-gray-900">
              Utilização de Licenças
            </h2>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="mb-2">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">
                  {empresa.licencas_usadas} de {empresa.licencas_totais} licenças ativas
                </span>
                <span className="font-semibold text-gray-900">
                  {Math.round((empresa.licencas_usadas / empresa.licencas_totais) * 100)}%
                </span>
              </div>
              <ProgressBar 
                value={empresa.licencas_usadas} 
                max={empresa.licencas_totais}
                color={empresa.licencas_usadas / empresa.licencas_totais > 0.9 ? 'warning' : 'primary'}
              />
            </div>
            {empresa.licencas_usadas / empresa.licencas_totais > 0.9 && (
              <p className="text-sm text-orange-600 mt-3">
                ⚠️ Você está próximo do limite de licenças. Considere atualizar seu plano.
              </p>
            )}
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Top Colaboradores */}
          <Card>
            <CardHeader className="p-6 pb-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-display font-bold text-gray-900">
                  Top Colaboradores
                </h2>
                <a href="/corporativo/usuarios" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                  Ver todos
                </a>
              </div>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                {topColaboradores.map((colaborador, index) => (
                  <div key={index} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <Avatar name={colaborador.nome} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-gray-900 mb-1">
                        {colaborador.nome}
                      </div>
                      <div className="text-sm text-gray-600">
                        {colaborador.cursos} cursos • {colaborador.tempo}h
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-primary-600">
                        {colaborador.progresso}%
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Cursos Mais Populares */}
          <Card>
            <CardHeader className="p-6 pb-4">
              <h2 className="text-xl font-display font-bold text-gray-900">
                Cursos Mais Populares
              </h2>
            </CardHeader>
            <CardContent className="p-6 pt-0">
              <div className="space-y-4">
                {cursosPopulares.map((curso, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-medium text-gray-900">{curso.titulo}</h3>
                      <Badge variant="primary">{curso.media}%</Badge>
                    </div>
                    <div className="text-sm text-gray-600 mb-2">
                      {curso.matriculados} matriculados • {curso.concluidos} concluídos
                    </div>
                    <ProgressBar 
                      value={curso.concluidos} 
                      max={curso.matriculados}
                      size="sm"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Engajamento Semanal */}
        <Card>
          <CardHeader className="p-6 pb-4">
            <h2 className="text-xl font-display font-bold text-gray-900">
              Engajamento dos Últimos 7 Dias
            </h2>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-center text-gray-500">
                <TrendingUp size={48} className="mx-auto mb-2 opacity-50" />
                <p>Gráfico de engajamento</p>
                <p className="text-sm">(Integrar com Recharts ou similar)</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

