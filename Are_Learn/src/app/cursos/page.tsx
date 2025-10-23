import { Filter, SlidersHorizontal } from 'lucide-react';
import { CursoCard } from '@/components/curso/CursoCard';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Curso } from '@/types';
import { CATEGORIAS_PADRAO } from '@/lib/constants';

// Mock data - substituir por dados reais do Supabase
const cursos: Curso[] = Array.from({ length: 9 }, (_, i) => ({
  id: `${i + 1}`,
  titulo: `Curso ${i + 1}`,
  descricao: 'Descrição completa do curso',
  descricao_curta: 'Descrição curta do curso',
  thumbnail: `https://images.unsplash.com/photo-${1588776814546 + i}?w=800&q=80`,
  banner: '',
  instrutor_id: '1',
  instrutor: {
    id: '1',
    nome: 'Dr. Instrutor',
    bio: '',
    avatar: '',
    especialidade: 'Especialidade',
    total_cursos: 5,
    total_alunos: 1000,
  },
  categoria_id: '1',
  categoria: CATEGORIAS_PADRAO[i % CATEGORIAS_PADRAO.length],
  nivel: ['iniciante', 'intermediario', 'avancado'][i % 3] as 'iniciante' | 'intermediario' | 'avancado',
  duracao_total: 360 + i * 60,
  total_modulos: 5 + i,
  total_aulas: 25 + i * 2,
  destaque: i % 3 === 0,
  publicado: true,
  tags: ['tag1', 'tag2'],
  criado_em: '2024-01-01',
  atualizado_em: '2024-01-01',
}));

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

