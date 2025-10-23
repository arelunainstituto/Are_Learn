import { Play, TrendingUp, Award, Clock, BookOpen } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { CursoCard } from '@/components/curso/CursoCard';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

// Mock data - substituir por dados reais
const usuario = {
  nome: 'João Silva',
  avatar: '',
  total_xp: 1250,
  nivel: 5,
  proxima_conquista: 'Especialista em Implantodontia',
};

const cursosEmAndamento = [
  {
    curso: {
      id: '1',
      titulo: 'Implantodontia Avançada',
      thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&q=80',
      descricao_curta: 'Técnicas avançadas de implantodontia',
      nivel: 'avancado' as const,
      duracao_total: 480,
      total_modulos: 8,
      total_aulas: 42,
      categoria: { nome: 'Implantodontia', cor: '#3B82F6' },
    },
    progresso: 65,
    ultima_aula: 'Planejamento Digital',
    tempo_assistido: 312,
  },
  {
    curso: {
      id: '2',
      titulo: 'Gestão de Clínicas',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=800&q=80',
      descricao_curta: 'Gestão eficiente para clínicas',
      nivel: 'intermediario' as const,
      duracao_total: 360,
      total_modulos: 6,
      total_aulas: 28,
      categoria: { nome: 'Gestão', cor: '#F59E0B' },
    },
    progresso: 30,
    ultima_aula: 'Marketing Digital',
    tempo_assistido: 108,
  },
];

const conquistasRecentes = [
  {
    id: '1',
    titulo: 'Primeiro Curso Completo',
    descricao: 'Completou seu primeiro curso na plataforma',
    icone: '🎓',
    xp: 100,
    desbloqueado_em: '2024-01-15',
  },
  {
    id: '2',
    titulo: 'Sequência de 7 Dias',
    descricao: 'Estudou por 7 dias consecutivos',
    icone: '🔥',
    xp: 50,
    desbloqueado_em: '2024-01-20',
  },
  {
    id: '3',
    titulo: 'Maratonista',
    descricao: 'Assistiu mais de 5 horas em um dia',
    icone: '⚡',
    xp: 75,
    desbloqueado_em: '2024-01-22',
  },
];

const estatisticas = {
  total_cursos_iniciados: 5,
  total_cursos_concluidos: 2,
  tempo_total: 856, // minutos
  sequencia_dias: 7,
};

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container-custom py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <Avatar name={usuario.nome} src={usuario.avatar} size="xl" />
              <div>
                <h1 className="text-3xl font-display font-bold text-gray-900">
                  Olá, {usuario.nome.split(' ')[0]}! 👋
                </h1>
                <p className="text-gray-600">
                  Continue seu aprendizado de onde parou
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-display font-bold text-primary-600">
                  Nível {usuario.nivel}
                </div>
                <div className="text-sm text-gray-600">{usuario.total_xp} XP</div>
              </div>
            </div>
          </div>
        </div>

        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-primary-100 flex items-center justify-center">
                  <BookOpen className="text-primary-600" size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                {estatisticas.total_cursos_iniciados}
              </div>
              <div className="text-sm text-gray-600">Cursos Iniciados</div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                  <Award className="text-green-600" size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                {estatisticas.total_cursos_concluidos}
              </div>
              <div className="text-sm text-gray-600">Cursos Concluídos</div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-secondary-100 flex items-center justify-center">
                  <Clock className="text-secondary-600" size={24} />
                </div>
                <TrendingUp className="text-green-500" size={20} />
              </div>
              <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                {Math.round(estatisticas.tempo_total / 60)}h
              </div>
              <div className="text-sm text-gray-600">Tempo de Estudo</div>
            </CardContent>
          </Card>

          <Card hover>
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
              </div>
              <div className="text-2xl font-display font-bold text-gray-900 mb-1">
                {estatisticas.sequencia_dias} dias
              </div>
              <div className="text-sm text-gray-600">Sequência Atual</div>
            </CardContent>
          </Card>
        </div>

        {/* Continue Assistindo */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-display font-bold text-gray-900">
              Continue Assistindo
            </h2>
          </div>
          <div className="space-y-6">
            {cursosEmAndamento.map(({ curso, progresso, ultima_aula }) => (
              <Card key={curso.id} hover className="cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="md:w-64 h-40 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                      <img
                        src={curso.thumbnail}
                        alt={curso.titulo}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 hover:opacity-100 transition-opacity">
                        <Play className="text-white" size={48} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <Badge variant="primary" className="mb-2">
                            {curso.categoria?.nome}
                          </Badge>
                          <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                            {curso.titulo}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            Última aula: {ultima_aula}
                          </p>
                        </div>
                      </div>
                      <div className="mb-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Progresso</span>
                          <span className="font-semibold text-primary-600">
                            {progresso}%
                          </span>
                        </div>
                        <ProgressBar value={progresso} />
                      </div>
                      <div className="flex items-center gap-6 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <BookOpen size={16} />
                          <span>{curso.total_aulas} aulas</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock size={16} />
                          <span>{Math.round(curso.duracao_total / 60)}h</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Conquistas Recentes */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-display font-bold text-gray-900">
                Conquistas Recentes
              </h2>
              <a href="/conquistas" className="text-primary-600 hover:text-primary-700 font-medium text-sm">
                Ver todas
              </a>
            </div>
            <div className="space-y-4">
              {conquistasRecentes.map((conquista) => (
                <Card key={conquista.id} hover>
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-2xl flex-shrink-0">
                        {conquista.icone}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-display font-bold text-gray-900 mb-1">
                          {conquista.titulo}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {conquista.descricao}
                        </p>
                        <Badge variant="warning">+{conquista.xp} XP</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Próxima Conquista */}
          <div>
            <h2 className="text-2xl font-display font-bold text-gray-900 mb-6">
              Próxima Conquista
            </h2>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-4xl mb-4 opacity-50">
                  🏆
                </div>
                <h3 className="text-xl font-display font-bold text-gray-900 mb-2">
                  {usuario.proxima_conquista}
                </h3>
                <p className="text-gray-600 mb-4">
                  Complete 3 cursos de Implantodontia
                </p>
                <ProgressBar value={66} showLabel />
                <p className="text-sm text-gray-600 mt-4">
                  Falta 1 curso para desbloquear
                </p>
              </CardContent>
            </Card>

            {/* Recomendações */}
            <div className="mt-8">
              <h3 className="text-xl font-display font-bold text-gray-900 mb-4">
                Recomendado para Você
              </h3>
              <Card hover className="cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex gap-4">
                    <div className="w-32 h-20 relative rounded-lg overflow-hidden flex-shrink-0 bg-gray-200">
                      <img
                        src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=400&q=80"
                        alt="Ortodontia Digital"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <Badge variant="primary" className="mb-1">Ortodontia</Badge>
                      <h4 className="font-display font-bold text-gray-900 mb-1">
                        Ortodontia Digital
                      </h4>
                      <p className="text-xs text-gray-600">
                        42 aulas • 7h
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

