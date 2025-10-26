import { Filter, SlidersHorizontal } from 'lucide-react';
import { CursoCard } from '@/components/curso/CursoCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Curso } from '@/types';
import { CATEGORIAS_PADRAO } from '@/lib/constants';

// Mock data com vídeos reais do YouTube
const cursos: Curso[] = [
  {
    id: '1',
    titulo: 'Fundamentos de Implantodontia',
    descricao: 'Curso completo sobre os fundamentos da implantodontia moderna, desde o planejamento até a reabilitação final.',
    descricao_curta: 'Aprenda os fundamentos da implantodontia com técnicas modernas',
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
    categoria: CATEGORIAS_PADRAO[0],
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
    descricao_curta: 'Domine as técnicas mais modernas de ortodontia digital',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    banner: '',
    instrutor_id: '2',
    instrutor: {
      id: '2',
      nome: 'Dra. Ana Paula',
      bio: 'Especialista em Ortodontia Digital e Invisalign',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      especialidade: 'Ortodontia',
      total_cursos: 6,
      total_alunos: 1800,
    },
    categoria_id: '2',
    categoria: CATEGORIAS_PADRAO[1],
    nivel: 'avancado',
    duracao_total: 720,
    total_modulos: 8,
    total_aulas: 32,
    destaque: true,
    publicado: true,
    tags: ['ortodontia', 'digital', 'invisalign'],
    criado_em: '2024-01-01',
    atualizado_em: '2024-01-01',
  },
  {
    id: '3',
    titulo: 'Estética Dental Contemporânea',
    descricao: 'Técnicas modernas de estética dental, laminados cerâmicos e harmonização orofacial.',
    descricao_curta: 'Aprenda as técnicas mais modernas de estética dental',
    thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
    banner: '',
    instrutor_id: '3',
    instrutor: {
      id: '3',
      nome: 'Dr. Roberto Silva',
      bio: 'Especialista em Estética Dental e Harmonização Orofacial',
      avatar: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face',
      especialidade: 'Estética Dental',
      total_cursos: 12,
      total_alunos: 3200,
    },
    categoria_id: '3',
    categoria: CATEGORIAS_PADRAO[2],
    nivel: 'intermediario',
    duracao_total: 600,
    total_modulos: 7,
    total_aulas: 28,
    destaque: false,
    publicado: true,
    tags: ['estetica', 'laminados', 'harmonizacao'],
    criado_em: '2024-01-01',
    atualizado_em: '2024-01-01',
  },
  {
    id: '4',
    titulo: 'Endodontia Microscópica',
    descricao: 'Técnicas de endodontia com auxílio de microscópio operatório para tratamentos de alta precisão.',
    descricao_curta: 'Domine a endodontia microscópica para tratamentos de excelência',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
    banner: '',
    instrutor_id: '4',
    instrutor: {
      id: '4',
      nome: 'Dra. Maria Fernanda',
      bio: 'Especialista em Endodontia Microscópica',
      avatar: 'https://images.unsplash.com/photo-1594824375000-1b7b1b1b1b1b?w=150&h=150&fit=crop&crop=face',
      especialidade: 'Endodontia',
      total_cursos: 5,
      total_alunos: 1200,
    },
    categoria_id: '4',
    categoria: CATEGORIAS_PADRAO[3],
    nivel: 'avancado',
    duracao_total: 540,
    total_modulos: 6,
    total_aulas: 26,
    destaque: false,
    publicado: true,
    tags: ['endodontia', 'microscopio', 'precisao'],
    criado_em: '2024-01-01',
    atualizado_em: '2024-01-01',
  },
  {
    id: '5',
    titulo: 'Periodontia Regenerativa',
    descricao: 'Técnicas regenerativas em periodontia, enxertos ósseos e membranas de barreira.',
    descricao_curta: 'Aprenda as técnicas regenerativas mais avançadas em periodontia',
    thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
    banner: '',
    instrutor_id: '5',
    instrutor: {
      id: '5',
      nome: 'Dr. João Pedro',
      bio: 'Especialista em Periodontia e Implantodontia',
      avatar: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face',
      especialidade: 'Periodontia',
      total_cursos: 7,
      total_alunos: 1900,
    },
    categoria_id: '5',
    categoria: CATEGORIAS_PADRAO[4],
    nivel: 'avancado',
    duracao_total: 660,
    total_modulos: 8,
    total_aulas: 30,
    destaque: true,
    publicado: true,
    tags: ['periodontia', 'regeneracao', 'enxertos'],
    criado_em: '2024-01-01',
    atualizado_em: '2024-01-01',
  },
  {
    id: '6',
    titulo: 'Prótese sobre Implantes',
    descricao: 'Protocolos completos de reabilitação protética sobre implantes, desde planejamento até finalização.',
    descricao_curta: 'Domine os protocolos de reabilitação protética sobre implantes',
    thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
    banner: '',
    instrutor_id: '6',
    instrutor: {
      id: '6',
      nome: 'Dra. Patricia Costa',
      bio: 'Especialista em Prótese e Implantodontia',
      avatar: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face',
      especialidade: 'Prótese',
      total_cursos: 9,
      total_alunos: 2100,
    },
    categoria_id: '6',
    categoria: CATEGORIAS_PADRAO[5],
    nivel: 'intermediario',
    duracao_total: 720,
    total_modulos: 9,
    total_aulas: 36,
    destaque: false,
    publicado: true,
    tags: ['protese', 'implantes', 'reabilitacao'],
    criado_em: '2024-01-01',
    atualizado_em: '2024-01-01',
  }
];

export default function CursosPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-8">
          <h1 className="text-3xl md:text-4xl font-display font-bold text-gray-900 mb-4">
            Todos os Cursos
          </h1>
          <p className="text-gray-600 mb-6">
            Explore nossa biblioteca completa de cursos e encontre o caminho ideal para seu desenvolvimento profissional.
          </p>

          {/* Search e Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar placeholder="Buscar cursos..." />
            </div>
            <Button variant="outline" className="md:w-auto">
              <SlidersHorizontal size={20} className="mr-2" />
              Filtros
            </Button>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar com filtros */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
              <h3 className="font-display font-bold text-gray-900 mb-4">
                Categorias
              </h3>
              <div className="space-y-2">
                {CATEGORIAS_PADRAO.map((categoria) => (
                  <button
                    key={categoria.slug}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-700 text-sm"
                  >
                    <span
                      className="inline-block w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: categoria.cor }}
                    />
                    {categoria.nome}
                  </button>
                ))}
              </div>

              <hr className="my-6 border-gray-200" />

              <h3 className="font-display font-bold text-gray-900 mb-4">
                Nível
              </h3>
              <div className="space-y-2">
                {['Iniciante', 'Intermediário', 'Avançado'].map((nivel) => (
                  <label key={nivel} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">{nivel}</span>
                  </label>
                ))}
              </div>

              <hr className="my-6 border-gray-200" />

              <h3 className="font-display font-bold text-gray-900 mb-4">
                Duração
              </h3>
              <div className="space-y-2">
                {['Menos de 5h', '5-10h', '10-20h', 'Mais de 20h'].map((duracao) => (
                  <label key={duracao} className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="rounded border-gray-300" />
                    <span className="text-sm text-gray-700">{duracao}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Lista de cursos */}
          <div className="flex-1">
            {/* Filtros ativos */}
            <div className="flex items-center gap-2 mb-6 flex-wrap">
              <span className="text-sm text-gray-600">Filtros ativos:</span>
              <Badge variant="primary">
                Implantodontia
                <button className="ml-1 hover:text-primary-900">×</button>
              </Badge>
              <Button variant="ghost" size="sm" className="text-primary-600">
                Limpar todos
              </Button>
            </div>

            {/* Resultados */}
            <div className="mb-4 text-sm text-gray-600">
              Mostrando {cursos.length} cursos
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {cursos.map((curso) => (
                <CursoCard key={curso.id} curso={curso} />
              ))}
            </div>

            {/* Paginação */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" disabled>
                  Anterior
                </Button>
                <Button variant="primary" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">
                  Próximo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

