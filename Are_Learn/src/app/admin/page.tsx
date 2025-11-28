import { TrendingUp, Users, BookOpen, Award, DollarSign, Eye, Building2, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';

// Mock data
const stats = {
  total_usuarios: 10542,
  usuarios_ativos: 8234,
  crescimento_usuarios: 12.5,
  total_cursos: 156,
  cursos_publicados: 142,
  total_aulas: 3890,
  total_visualizacoes: 125430,
  visualizacoes_mes: 15670,
  crescimento_visualizacoes: 8.3,
  taxa_conclusao: 67.8,
  receita_mes: 87650,
  crescimento_receita: 15.2,
};

const cursosPopulares = [
  { titulo: 'Implantodontia Avançada', alunos: 1250, conclusoes: 856, rating: 4.9 },
  { titulo: 'Gestão de Clínicas', alunos: 890, conclusoes: 623, rating: 4.8 },
  { titulo: 'Ortodontia Digital', alunos: 1100, conclusoes: 742, rating: 4.9 },
  { titulo: 'Marketing Odontológico', alunos: 780, conclusoes: 498, rating: 4.7 },
  { titulo: 'Endodontia Moderna', alunos: 650, conclusoes: 423, rating: 4.8 },
];

const atividadesRecentes = [
  { tipo: 'usuario', acao: 'Novo usuário cadastrado', usuario: 'Maria Silva', tempo: '5 min atrás' },
  { tipo: 'curso', acao: 'Curso publicado', curso: 'Periodontia Avançada', tempo: '1 hora atrás' },
  { tipo: 'conclusao', acao: 'Curso concluído', usuario: 'João Santos', curso: 'Implantodontia', tempo: '2 horas atrás' },
  { tipo: 'empresa', acao: 'Nova empresa cadastrada', empresa: 'Dental Plus', tempo: '3 horas atrás' },
  { tipo: 'usuario', acao: 'Novo usuário cadastrado', usuario: 'Pedro Costa', tempo: '5 horas atrás' },
];

export default function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                <Users className="text-primary-600" size={24} />
              </div>
              <Badge variant="success">
                +{stats.crescimento_usuarios}%
              </Badge>
            </div>
            <div className="text-2xl font-display font-bold text-gray-900 mb-1">
              {stats.total_usuarios.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Total de Usuários</div>
            <div className="mt-2 text-xs text-gray-500">
              {stats.usuarios_ativos.toLocaleString()} ativos
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
                <BookOpen className="text-secondary-600" size={24} />
              </div>
            </div>
            <div className="text-2xl font-display font-bold text-gray-900 mb-1">
              {stats.total_cursos}
            </div>
            <div className="text-sm text-gray-600">Cursos na Plataforma</div>
            <div className="mt-2 text-xs text-gray-500">
              {stats.cursos_publicados} publicados
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <Eye className="text-green-600" size={24} />
              </div>
              <Badge variant="success">
                +{stats.crescimento_visualizacoes}%
              </Badge>
            </div>
            <div className="text-2xl font-display font-bold text-gray-900 mb-1">
              {stats.visualizacoes_mes.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Visualizações este Mês</div>
            <div className="mt-2 text-xs text-gray-500">
              {stats.total_visualizacoes.toLocaleString()} no total
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <DollarSign className="text-orange-600" size={24} />
              </div>
              <Badge variant="success">
                +{stats.crescimento_receita}%
              </Badge>
            </div>
            <div className="text-2xl font-display font-bold text-gray-900 mb-1">
              R$ {stats.receita_mes.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600">Receita deste Mês</div>
            <div className="mt-2 text-xs text-gray-500">
              Taxa de conclusão: {stats.taxa_conclusao}%
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cursos Populares */}
        <Card>
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-display font-bold text-gray-900">
                Cursos Mais Populares
              </h2>
              <a href="/admin/cursos" className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                Ver todos
              </a>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {cursosPopulares.map((curso, index) => (
                <div key={index} className="flex items-center justify-between p-4 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 mb-1">{curso.titulo}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <span>{curso.alunos} alunos</span>
                      <span>•</span>
                      <span>{curso.conclusoes} conclusões</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-yellow-500">★</span>
                    <span className="font-semibold text-gray-900">{curso.rating}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Atividades Recentes */}
        <Card>
          <CardHeader className="p-6 pb-4">
            <h2 className="text-xl font-display font-bold text-gray-900">
              Atividades Recentes
            </h2>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {atividadesRecentes.map((atividade, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0',
                    atividade.tipo === 'usuario' && 'bg-primary-100',
                    atividade.tipo === 'curso' && 'bg-secondary-100',
                    atividade.tipo === 'conclusao' && 'bg-green-100',
                    atividade.tipo === 'empresa' && 'bg-orange-100'
                  )}>
                    {atividade.tipo === 'usuario' && <Users size={20} className="text-primary-600" />}
                    {atividade.tipo === 'curso' && <BookOpen size={20} className="text-secondary-600" />}
                    {atividade.tipo === 'conclusao' && <Award size={20} className="text-green-600" />}
                    {atividade.tipo === 'empresa' && <Building2 size={20} className="text-orange-600" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 mb-1">
                      <span className="font-medium">{atividade.acao}</span>
                      {atividade.usuario && `: ${atividade.usuario}`}
                      {atividade.curso && `: ${atividade.curso}`}
                      {atividade.empresa && `: ${atividade.empresa}`}
                    </p>
                    <p className="text-xs text-gray-500">{atividade.tempo}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Gráfico de Engajamento (placeholder) */}
      <Card>
        <CardHeader className="p-6 pb-4">
          <h2 className="text-xl font-display font-bold text-gray-900">
            Engajamento nos Últimos 30 Dias
          </h2>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
            <div className="text-center text-gray-500">
              <BarChart3 size={48} className="mx-auto mb-2 opacity-50" />
              <p>Gráfico de engajamento</p>
              <p className="text-sm">(Integrar com biblioteca de gráficos como Recharts)</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

