'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Plus, Search, Filter, Eye, Edit, Trash2, Play, BarChart3, Users, Clock } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { Quiz, Question } from '@/types';

// Mock data - substituir por dados reais do Supabase
const mockQuizzes: Quiz[] = [
  {
    id: '1',
    curso_id: 'curso-1',
    titulo: 'Avaliação de Implantodontia',
    descricao: 'Quiz sobre fundamentos da implantodontia',
    instrucoes: 'Responda todas as questões com atenção. Você tem 30 minutos para completar.',
    tempo_limite: 30,
    tentativas_permitidas: 3,
    nota_minima: 70,
    randomizar_questoes: true,
    randomizar_opcoes: false,
    mostrar_feedback: true,
    mostrar_respostas: false,
    permitir_revisao: true,
    status: 'published',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: '2',
    curso_id: 'curso-2',
    titulo: 'Gestão Clínica - Teste Final',
    descricao: 'Avaliação final do curso de gestão clínica',
    instrucoes: 'Este é um teste final. Certifique-se de revisar todo o conteúdo antes de começar.',
    tempo_limite: 60,
    tentativas_permitidas: 1,
    nota_minima: 80,
    randomizar_questoes: false,
    randomizar_opcoes: false,
    mostrar_feedback: false,
    mostrar_respostas: false,
    permitir_revisao: false,
    status: 'published',
    created_at: '2024-01-05',
    updated_at: '2024-01-05'
  },
  {
    id: '3',
    curso_id: 'curso-3',
    titulo: 'Quiz de Ortodontia Digital',
    descricao: 'Avaliação sobre técnicas digitais em ortodontia',
    instrucoes: 'Responda com base no conteúdo estudado.',
    tempo_limite: 45,
    tentativas_permitidas: 2,
    nota_minima: 60,
    randomizar_questoes: true,
    randomizar_opcoes: true,
    mostrar_feedback: true,
    mostrar_respostas: true,
    permitir_revisao: true,
    status: 'draft',
    created_at: '2024-01-10',
    updated_at: '2024-01-10'
  }
];

const mockQuestions: Question[] = [
  {
    id: 'q1',
    bank_id: 'bank-1',
    tipo: 'multiple_choice',
    enunciado: 'Qual é a principal vantagem dos implantes dentários?',
    opcoes: {
      options: [
        'Melhor estética',
        'Preservação do osso alveolar',
        'Menor custo',
        'Procedimento mais rápido'
      ]
    },
    resposta_correta: 'Preservação do osso alveolar',
    pontos: 2,
    feedback: 'Os implantes ajudam a preservar o osso alveolar, evitando sua reabsorção.',
    dificuldade: 'medium',
    created_at: '2024-01-01'
  }
];

export default function AdminQuizzesPage() {
  const [quizzes, setQuizzes] = useState<Quiz[]>(mockQuizzes);
  const [questions, setQuestions] = useState<Question[]>(mockQuestions);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState(false);

  // Filtrar quizzes
  const filteredQuizzes = quizzes.filter(quiz => {
    const matchesSearch = quiz.titulo.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         quiz.descricao?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || quiz.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const handleDeleteQuiz = async (quizId: string) => {
    if (!confirm('Tem certeza que deseja deletar este quiz?')) return;
    
    setIsLoading(true);
    try {
      // TODO: Implementar API call para deletar quiz
      setQuizzes(quizzes.filter(q => q.id !== quizId));
      console.log('Quiz deletado:', quizId);
    } catch (error) {
      console.error('Erro ao deletar quiz:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleStatus = async (quizId: string, newStatus: string) => {
    try {
      // TODO: Implementar API call para atualizar status
      setQuizzes(quizzes.map(q => 
        q.id === quizId ? { ...q, status: newStatus as any } : q
      ));
      console.log('Status do quiz atualizado:', quizId, newStatus);
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-yellow-100 text-yellow-800';
      case 'archived': return 'bg-grey-100 text-grey-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Rascunho';
      case 'archived': return 'Arquivado';
      default: return status;
    }
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Gerenciar Quizzes
          </h1>
          <p className="text-grey-600">
            Crie e gerencie avaliações para seus cursos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/admin/quizzes/novo">
            <Button variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
              <Plus size={16} className="mr-2" />
              Novo Quiz
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BarChart3 size={24} className="text-gold-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{quizzes.length}</div>
              <div className="text-sm text-grey-600">Total de Quizzes</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Play size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {quizzes.filter(q => q.status === 'published').length}
              </div>
              <div className="text-sm text-grey-600">Publicados</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">0</div>
              <div className="text-sm text-grey-600">Tentativas Hoje</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">
                {questions.length}
              </div>
              <div className="text-sm text-grey-600">Questões Totais</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <SearchBar
              placeholder="Buscar quizzes..."
              onSearch={handleSearch}
            />
          </div>
          
          <div className="flex gap-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-grey-300 rounded-lg text-sm"
            >
              <option value="all">Todos os Status</option>
              <option value="draft">Rascunho</option>
              <option value="published">Publicado</option>
              <option value="archived">Arquivado</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Quizzes List */}
      <div className="space-y-4">
        {filteredQuizzes.map((quiz) => (
          <Card key={quiz.id} className="p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-lg font-medium text-grey-900">{quiz.titulo}</h3>
                  <Badge variant="secondary" className={getStatusColor(quiz.status)}>
                    {getStatusLabel(quiz.status)}
                  </Badge>
                </div>
                
                {quiz.descricao && (
                  <p className="text-grey-600 mb-3">{quiz.descricao}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm text-grey-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Clock size={14} />
                    <span>{quiz.tempo_limite ? `${quiz.tempo_limite} min` : 'Sem limite'}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={14} />
                    <span>{quiz.tentativas_permitidas} tentativa(s)</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BarChart3 size={14} />
                    <span>Nota mínima: {quiz.nota_minima}%</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {quiz.randomizar_questoes && (
                    <Badge variant="info" className="bg-blue-100 text-blue-800">
                      Questões Randomizadas
                    </Badge>
                  )}
                  {quiz.randomizar_opcoes && (
                    <Badge variant="info" className="bg-blue-100 text-blue-800">
                      Opções Randomizadas
                    </Badge>
                  )}
                  {quiz.mostrar_feedback && (
                    <Badge variant="success" className="bg-green-100 text-green-800">
                      Feedback Ativo
                    </Badge>
                  )}
                  {quiz.permitir_revisao && (
                    <Badge variant="warning" className="bg-yellow-100 text-yellow-800">
                      Revisão Permitida
                    </Badge>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-2 ml-4">
                <Link href={`/admin/quizzes/${quiz.id}`}>
                  <Button size="sm" variant="outline" className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500">
                    <Eye size={14} />
                  </Button>
                </Link>
                
                <Link href={`/admin/quizzes/${quiz.id}/editar`}>
                  <Button size="sm" variant="outline" className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500">
                    <Edit size={14} />
                  </Button>
                </Link>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleToggleStatus(quiz.id, quiz.status === 'published' ? 'draft' : 'published')}
                  className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
                >
                  {quiz.status === 'published' ? 'Despublicar' : 'Publicar'}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleDeleteQuiz(quiz.id)}
                  disabled={isLoading}
                  className="border-grey-300 text-red-600 hover:border-red-500 hover:text-red-700"
                >
                  <Trash2 size={14} />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredQuizzes.length === 0 && (
        <Card className="p-8 text-center">
          <BarChart3 size={48} className="text-grey-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Nenhum quiz encontrado
          </h3>
          <p className="text-grey-600 mb-4">
            {searchQuery || statusFilter !== 'all'
              ? 'Tente ajustar os filtros de busca'
              : 'Comece criando seu primeiro quiz'
            }
          </p>
          {!searchQuery && statusFilter === 'all' && (
            <Link href="/admin/quizzes/novo">
              <Button variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
                <Plus size={16} className="mr-2" />
                Criar Primeiro Quiz
              </Button>
            </Link>
          )}
        </Card>
      )}
    </div>
  );
}
