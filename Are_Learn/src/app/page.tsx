import Link from 'next/link';
import { Play, BookOpen, Award, TrendingUp, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { CursoCard } from '@/components/curso/CursoCard';
import { Curso } from '@/types';

// Mock data com vídeos reais do YouTube
const cursosDestaque: Curso[] = [
  {
    id: '1',
    titulo: 'Fundamentos de Implantodontia',
    descricao: 'Domine os fundamentos da implantodontia moderna com casos reais e demonstrações práticas.',
    descricao_curta: 'Fundamentos da implantodontia moderna',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    banner: '',
    instrutor_id: '1',
    instrutor: {
      id: '1',
      nome: 'Dr. Carlos Eduardo',
      bio: 'Especialista em Implantodontia com 15 anos de experiência',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      especialidade: 'Implantodontia',
      total_cursos: 8,
      total_alunos: 2500,
    },
    categoria_id: '1',
    categoria: {
      id: '1',
      nome: 'Implantodontia',
      slug: 'implantodontia',
      descricao: '',
      cor: '#3B82F6',
    },
    nivel: 'iniciante',
    duracao_total: 480,
    total_modulos: 6,
    total_aulas: 24,
    destaque: true,
    publicado: true,
    tags: ['implantodontia', 'fundamentos', 'cirurgia'],
    criado_em: '2024-01-01',
    atualizado_em: '2024-01-01',
  },
  {
    id: '2',
    titulo: 'Ortodontia Digital Avançada',
    descricao: 'Técnicas avançadas de ortodontia digital, incluindo planejamento 3D e alinhadores transparentes.',
    descricao_curta: 'Ortodontia digital moderna',
    thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
    banner: '',
    instrutor_id: '2',
    instrutor: {
      id: '2',
      nome: 'Dra. Ana Paula',
      bio: '',
      avatar: '',
      especialidade: 'Gestão',
      total_cursos: 3,
      total_alunos: 890,
    },
    categoria_id: '2',
    categoria: {
      id: '2',
      nome: 'Gestão Clínica',
      slug: 'gestao-clinica',
      descricao: '',
      cor: '#F59E0B',
    },
    nivel: 'intermediario',
    duracao_total: 360,
    total_modulos: 6,
    total_aulas: 28,
    destaque: true,
    publicado: true,
    tags: ['gestão', 'administração', 'negócios'],
    criado_em: '2024-01-01',
    atualizado_em: '2024-01-01',
  },
  {
    id: '3',
    titulo: 'Ortodontia Digital',
    descricao: 'O futuro da ortodontia com tecnologia digital de ponta.',
    descricao_curta: 'Ortodontia com tecnologia digital',
    thumbnail: 'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?w=800&q=80',
    banner: '',
    instrutor_id: '3',
    instrutor: {
      id: '3',
      nome: 'Dr. Roberto Silva',
      bio: '',
      avatar: '',
      especialidade: 'Ortodontia',
      total_cursos: 4,
      total_alunos: 1100,
    },
    categoria_id: '3',
    categoria: {
      id: '3',
      nome: 'Ortodontia',
      slug: 'ortodontia',
      descricao: '',
      cor: '#8B5CF6',
    },
    nivel: 'intermediario',
    duracao_total: 420,
    total_modulos: 7,
    total_aulas: 35,
    destaque: true,
    publicado: true,
    tags: ['ortodontia', 'digital', 'tecnologia'],
    criado_em: '2024-01-01',
    atualizado_em: '2024-01-01',
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-gold-500 via-gold-600 to-glossy-400 text-white">
        <div className="container-custom py-20 md:py-28">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-6xl font-brand font-bold mb-6 animate-fade-in">
              Aprenda com os Melhores.
              <br />
              Transforme sua Carreira.
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gold-100 animate-fade-in">
              Cursos online de excelência ministrados por especialistas renomados.
              Estude no seu ritmo e alcance novos patamares profissionais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
              <Link href="/cursos">
                <Button size="lg" className="bg-white text-gold-600 hover:bg-grey-100 shadow-xl">
                  <Play className="mr-2" size={20} />
                  Explorar Cursos
                </Button>
              </Link>
              <Link href="/demo-video">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Play className="mr-2" size={20} />
                  Demo Vídeo
                </Button>
              </Link>
              <Link href="/sobre">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  Saiba Mais
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white border-b border-grey-200">
        <div className="container-custom py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">
                100+
              </div>
              <div className="text-grey-600">Cursos Disponíveis</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">
                50+
              </div>
              <div className="text-grey-600">Instrutores Especialistas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">
                10k+
              </div>
              <div className="text-grey-600">Alunos Ativos</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-gold-500 mb-2">
                95%
              </div>
              <div className="text-grey-600">Satisfação</div>
            </div>
          </div>
        </div>
      </section>

      {/* Cursos em Destaque */}
      <section className="py-16 bg-grey-50">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-brand font-bold text-grey-900 mb-2">
                Cursos em Destaque
              </h2>
              <p className="text-grey-600">
                Os cursos mais populares e recomendados da plataforma
              </p>
            </div>
            <Link href="/cursos" className="hidden md:flex items-center gap-2 text-gold-500 hover:text-gold-600 font-medium">
              Ver todos
              <ArrowRight size={20} />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cursosDestaque.map((curso) => (
              <CursoCard key={curso.id} curso={curso} />
            ))}
          </div>

          <div className="mt-8 text-center md:hidden">
            <Link href="/cursos">
              <Button variant="outline" className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500">
                Ver Todos os Cursos
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold text-gray-900 mb-4">
              Por que escolher AreLuna?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Uma plataforma completa para seu desenvolvimento profissional contínuo
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-primary-100 flex items-center justify-center mx-auto mb-4">
                <BookOpen className="text-primary-600" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">
                Conteúdo de Qualidade
              </h3>
              <p className="text-gray-600">
                Cursos desenvolvidos por especialistas reconhecidos com experiência
                comprovada em suas áreas de atuação.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-secondary-100 flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="text-secondary-600" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">
                Aprenda no Seu Ritmo
              </h3>
              <p className="text-gray-600">
                Acesso ilimitado aos cursos 24/7. Estude quando e onde quiser,
                no seu próprio ritmo de aprendizado.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                <Award className="text-green-600" size={32} />
              </div>
              <h3 className="text-xl font-display font-bold mb-3">
                Certificados Reconhecidos
              </h3>
              <p className="text-gray-600">
                Receba certificados ao concluir os cursos e destaque-se no mercado
                com credenciais validadas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Corporativo */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-4">
            Soluções para sua Empresa
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Capacite sua equipe com nossa plataforma corporativa.
            Planos personalizados e relatórios detalhados de progresso.
          </p>
          <Link href="/corporativo">
            <Button size="lg" className="bg-primary-600 hover:bg-primary-700">
              Conhecer Planos Corporativos
              <ArrowRight className="ml-2" size={20} />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}

