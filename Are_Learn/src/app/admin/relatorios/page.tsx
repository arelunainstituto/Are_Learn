import { Download, TrendingUp, TrendingDown, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AdminRelatoriosPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-display font-bold text-gray-900">
            Relatórios e Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Visualize métricas e insights da plataforma
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Calendar size={20} className="mr-2" />
            Filtrar Período
          </Button>
          <Button>
            <Download size={20} className="mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Taxa de Conclusão</span>
              <Badge variant="success" className="flex items-center gap-1">
                <TrendingUp size={12} />
                +5.2%
              </Badge>
            </div>
            <div className="text-3xl font-display font-bold text-gray-900">
              67.8%
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Tempo Médio</span>
              <Badge variant="success" className="flex items-center gap-1">
                <TrendingUp size={12} />
                +12%
              </Badge>
            </div>
            <div className="text-3xl font-display font-bold text-gray-900">
              42min
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Satisfação</span>
              <Badge variant="success" className="flex items-center gap-1">
                <TrendingUp size={12} />
                +2.1%
              </Badge>
            </div>
            <div className="text-3xl font-display font-bold text-gray-900">
              4.8
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">Retenção</span>
              <Badge variant="danger" className="flex items-center gap-1">
                <TrendingDown size={12} />
                -1.5%
              </Badge>
            </div>
            <div className="text-3xl font-display font-bold text-gray-900">
              85.3%
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Relatórios por Categoria */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="p-6 pb-4">
            <h2 className="text-xl font-display font-bold text-gray-900">
              Desempenho por Categoria
            </h2>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {[
                { nome: 'Implantodontia', alunos: 3245, conclusao: 72, cor: 'bg-blue-500' },
                { nome: 'Gestão Clínica', alunos: 2890, conclusao: 68, cor: 'bg-orange-500' },
                { nome: 'Ortodontia', alunos: 2650, conclusao: 65, cor: 'bg-purple-500' },
                { nome: 'Marketing', alunos: 1980, conclusao: 70, cor: 'bg-pink-500' },
                { nome: 'Endodontia', alunos: 1540, conclusao: 64, cor: 'bg-green-500' },
              ].map((categoria, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <div className={`w-3 h-3 rounded-full ${categoria.cor}`} />
                      <span className="font-medium text-gray-900">{categoria.nome}</span>
                    </div>
                    <div className="text-sm text-gray-600">
                      {categoria.alunos} alunos
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${categoria.cor}`}
                        style={{ width: `${categoria.conclusao}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-gray-900 w-12 text-right">
                      {categoria.conclusao}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="p-6 pb-4">
            <h2 className="text-xl font-display font-bold text-gray-900">
              Top 5 Cursos Mais Acessados
            </h2>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {[
                { titulo: 'Implantodontia Avançada', visualizacoes: 15670, crescimento: 12.5 },
                { titulo: 'Gestão de Clínicas', visualizacoes: 13420, crescimento: 8.3 },
                { titulo: 'Ortodontia Digital', visualizacoes: 12890, crescimento: 15.7 },
                { titulo: 'Marketing Odontológico', visualizacoes: 11230, crescimento: -2.4 },
                { titulo: 'Endodontia Moderna', visualizacoes: 9870, crescimento: 5.8 },
              ].map((curso, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center font-bold text-primary-600">
                      {index + 1}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{curso.titulo}</div>
                      <div className="text-sm text-gray-500">
                        {curso.visualizacoes.toLocaleString()} visualizações
                      </div>
                    </div>
                  </div>
                  <Badge variant={curso.crescimento > 0 ? 'success' : 'danger'}>
                    {curso.crescimento > 0 ? '+' : ''}{curso.crescimento}%
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Engajamento por Período */}
      <Card>
        <CardHeader className="p-6 pb-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-display font-bold text-gray-900">
              Engajamento nos Últimos 7 Dias
            </h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">7 dias</Button>
              <Button variant="ghost" size="sm">30 dias</Button>
              <Button variant="ghost" size="sm">90 dias</Button>
            </div>
          </div>
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

      {/* Tabela de Empresas */}
      <Card>
        <CardHeader className="p-6 pb-4">
          <h2 className="text-xl font-display font-bold text-gray-900">
            Performance por Empresa (B2B)
          </h2>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Empresa
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Usuários Ativos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Cursos Concluídos
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Tempo Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Taxa de Conclusão
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { empresa: 'Dental Plus', usuarios: 125, concluidos: 342, tempo: '1.250h', taxa: 72 },
                  { empresa: 'Odonto Excellence', usuarios: 98, concluidos: 287, tempo: '980h', taxa: 68 },
                  { empresa: 'Clínica Sorriso', usuarios: 76, concluidos: 198, tempo: '720h', taxa: 65 },
                  { empresa: 'MegaDental', usuarios: 145, concluidos: 423, tempo: '1.540h', taxa: 75 },
                ].map((item, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                      {item.empresa}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.usuarios}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.concluidos}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {item.tempo}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge variant={item.taxa >= 70 ? 'success' : 'warning'}>
                        {item.taxa}%
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

