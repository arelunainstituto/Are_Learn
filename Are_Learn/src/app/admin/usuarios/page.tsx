import { Plus, Search, Filter, MoreVertical, Mail, Ban, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SearchBar } from '@/components/ui/SearchBar';
import { Badge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

// Mock data
const usuarios = Array.from({ length: 15 }, (_, i) => ({
  id: `${i + 1}`,
  nome: `Usuário ${i + 1}`,
  email: `usuario${i + 1}@example.com`,
  tipo: ['aluno', 'instrutor', 'admin', 'corporativo'][i % 4] as 'aluno' | 'instrutor' | 'admin' | 'corporativo',
  empresa: i % 4 === 3 ? 'Empresa X' : undefined,
  status: i % 5 === 0 ? 'inativo' : 'ativo',
  cursos_iniciados: Math.floor(Math.random() * 10) + 1,
  cursos_concluidos: Math.floor(Math.random() * 5),
  cadastrado_em: '2024-01-15',
  ultimo_acesso: '2024-03-20',
}));

export default function AdminUsuariosPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Gerenciar Usuários
          </h1>
          <p className="text-gray-600 mt-1">
            Gerencie todos os usuários da plataforma
          </p>
        </div>
        <Button>
          <Plus size={20} className="mr-2" />
          Novo Usuário
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-display font-bold text-gray-900 mb-1">
              10,542
            </div>
            <div className="text-sm text-gray-600">Total de Usuários</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-display font-bold text-gray-900 mb-1">
              8,234
            </div>
            <div className="text-sm text-gray-600">Usuários Ativos</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-display font-bold text-gray-900 mb-1">
              156
            </div>
            <div className="text-sm text-gray-600">Instrutores</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="text-2xl font-display font-bold text-gray-900 mb-1">
              45
            </div>
            <div className="text-sm text-gray-600">Empresas</div>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <SearchBar placeholder="Buscar por nome ou email..." />
            </div>
            <div className="flex gap-2">
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todos os tipos</option>
                <option value="aluno">Aluno</option>
                <option value="instrutor">Instrutor</option>
                <option value="admin">Admin</option>
                <option value="corporativo">Corporativo</option>
              </select>
              <select className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500">
                <option value="">Todos os status</option>
                <option value="ativo">Ativo</option>
                <option value="inativo">Inativo</option>
              </select>
              <Button variant="outline">
                <Filter size={20} />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tabela de Usuários */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Usuário
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tipo
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cursos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Último Acesso
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ações
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {usuarios.map((usuario) => (
                  <tr key={usuario.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-3">
                        <Avatar name={usuario.nome} size="sm" />
                        <div>
                          <div className="font-medium text-gray-900">{usuario.nome}</div>
                          <div className="text-sm text-gray-500">{usuario.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge
                        variant={
                          usuario.tipo === 'admin'
                            ? 'danger'
                            : usuario.tipo === 'instrutor'
                            ? 'warning'
                            : usuario.tipo === 'corporativo'
                            ? 'info'
                            : 'primary'
                        }
                      >
                        {usuario.tipo}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usuario.empresa || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={usuario.status === 'ativo' ? 'success' : 'secondary'}>
                        {usuario.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {usuario.cursos_iniciados} / {usuario.cursos_concluidos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {usuario.ultimo_acesso}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end gap-2">
                        <button className="text-primary-600 hover:text-primary-900 transition-colors">
                          <Mail size={18} />
                        </button>
                        {usuario.status === 'ativo' ? (
                          <button className="text-red-600 hover:text-red-900 transition-colors">
                            <Ban size={18} />
                          </button>
                        ) : (
                          <button className="text-green-600 hover:text-green-900 transition-colors">
                            <CheckCircle size={18} />
                          </button>
                        )}
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

