import Link from 'next/link';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2, Eye } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { Badge } from '@/components/ui/Badge';

// Mock data
const cursos = Array.from({ length: 10 }, (_, i) => ({
  id: `${i + 1}`,
  titulo: `Curso de Exemplo ${i + 1}`,
  categoria: ['Implantodontia', 'Gestão', 'Ortodontia'][i % 3],
  instrutor: ['Dr. Carlos', 'Dra. Ana', 'Dr. Roberto'][i % 3],
  status: i % 3 === 0 ? 'publicado' : i % 3 === 1 ? 'rascunho' : 'arquivado',
  total_alunos: Math.floor(Math.random() * 1000) + 100,
  total_aulas: Math.floor(Math.random() * 30) + 10,
  criado_em: '2024-01-15',
}));

export default function AdminCursosPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Gerenciar Cursos
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie todos os cursos da plataforma
          </p>
        </div>
        <Link href="/admin/cursos/novo">
          <Button>
            <Plus size={20} className="mr-2" />
            Novo Curso
          </Button>
        </Link>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar placeholder="Buscar cursos..." />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todas as categorias</option>
                <option value="implantodontia">Implantodontia</option>
                <option value="gestao">Gestão</option>
                <option value="ortodontia">Ortodontia</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todos os status</option>
                <option value="publicado">Publicado</option>
                <option value="rascunho">Rascunho</option>
                <option value="arquivado">Arquivado</option>
              </select>
              <Button variant="outline">
                <Filter size={20} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Cursos */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Curso
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Categoria
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Instrutor
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Alunos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Aulas
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {cursos.map((curso) => (
                  <tr key={curso.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{curso.titulo}</div>
                      <div className="text-sm text-gray-500">Criado em {curso.criado_em}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant="primary">{curso.categoria}</Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {curso.instrutor}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          curso.status === 'publicado'
                            ? 'success'
                            : curso.status === 'rascunho'
                            ? 'warning'
                            : 'secondary'
                        }
                      >
                        {curso.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {curso.total_alunos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {curso.total_aulas}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-primary-600 hover:text-primary-900 transition-colors">
                          <Eye size={18} />
                        </button>
                        <button className="text-gray-600 hover:text-gray-900 transition-colors">
                          <Edit size={18} />
                        </button>
                        <button className="text-red-600 hover:text-red-900 transition-colors">
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Paginação */}
      <div className="flex justify-center">
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
  );
}

