'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  Users, 
  BookOpen, 
  TrendingUp, 
  Download,
  Filter,
  Search,
  Calendar,
  Target,
  Award
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { SearchBar } from '@/components/ui/SearchBar';
import { GradeMatrix } from '@/components/gradebook/GradeMatrix';
import { GradeAnalytics } from '@/components/gradebook/GradeAnalytics';
import { User, Quiz, QuizAttempt } from '@/types';

// Mock data - substituir por dados reais
const mockUsers: User[] = [
  {
    id: 'user-1',
    nome: 'João Silva',
    email: 'joao@email.com',
    avatar: '',
    role_id: 'student',
    tenant_id: 'tenant-1',
    created_at: '2024-01-01',
    updated_at: '2024-01-01'
  },
  {
    id: 'user-2',
    nome: 'Maria Santos',
    email: 'maria@email.com',
    avatar: '',
    role_id: 'student',
    tenant_id: 'tenant-1',
    created_at: '2024-01-02',
    updated_at: '2024-01-02'
  },
  {
    id: 'user-3',
    nome: 'Pedro Costa',
    email: 'pedro@email.com',
    avatar: '',
    role_id: 'student',
    tenant_id: 'tenant-1',
    created_at: '2024-01-03',
    updated_at: '2024-01-03'
  }
];

const mockQuizzes: Quiz[] = [
  {
    id: 'quiz-1',
    curso_id: 'curso-1',
    titulo: 'Fundamentos de Implantodontia',
    descricao: 'Quiz sobre fundamentos da implantodontia',
    instrucoes: 'Responda todas as questões com atenção.',
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
    id: 'quiz-2',
    curso_id: 'curso-1',
    titulo: 'Técnicas Avançadas',
    descricao: 'Quiz sobre técnicas avançadas',
    instrucoes: 'Este é um quiz mais complexo.',
    tempo_limite: 45,
    tentativas_permitidas: 2,
    nota_minima: 80,
    randomizar_questoes: false,
    randomizar_opcoes: false,
    mostrar_feedback: true,
    mostrar_respostas: false,
    permitir_revisao: false,
    status: 'published',
    created_at: '2024-01-05',
    updated_at: '2024-01-05'
  }
];

const mockAttempts: QuizAttempt[] = [
  {
    id: 'attempt-1',
    quiz_id: 'quiz-1',
    user_id: 'user-1',
    nota: 85,
    status: 'completed',
    started_at: '2024-01-15T10:00:00Z',
    submitted_at: '2024-01-15T10:25:00Z',
    respostas: {}
  },
  {
    id: 'attempt-2',
    quiz_id: 'quiz-2',
    user_id: 'user-1',
    nota: 92,
    status: 'completed',
    started_at: '2024-01-20T14:00:00Z',
    submitted_at: '2024-01-20T14:35:00Z',
    respostas: {}
  }
];

export default function AdminGradebookPage() {
  const [selectedView, setSelectedView] = useState<'matrix' | 'analytics'>('matrix');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCourse, setSelectedCourse] = useState<string>('all');
  const [selectedQuiz, setSelectedQuiz] = useState<string>('all');
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: '2024-01-01',
    end: '2024-12-31'
  });
  const [isLoading, setIsLoading] = useState(false);

  // Mock courses data
  const mockCourses = [
    { id: 'curso-1', titulo: 'Implantodontia Avançada' },
    { id: 'curso-2', titulo: 'Gestão de Clínicas' },
    { id: 'curso-3', titulo: 'Ortodontia Digital' }
  ];

  const handleGradeUpdate = async (attemptId: string, newGrade: number) => {
    setIsLoading(true);
    try {
      // TODO: Implementar API call para atualizar nota
      console.log('Atualizando nota:', attemptId, newGrade);
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error('Erro ao atualizar nota:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBulkGradeUpdate = async (updates: Array<{ attemptId: string; grade: number }>) => {
    setIsLoading(true);
    try {
      // TODO: Implementar API call para atualização em lote
      console.log('Atualizando notas em lote:', updates);
      // Simular delay
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      console.error('Erro ao atualizar notas em lote:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExport = () => {
    // TODO: Implementar exportação de dados
    console.log('Exportando dados do gradebook...');
  };

  const handleGenerateReport = () => {
    // TODO: Implementar geração de relatório
    console.log('Gerando relatório...');
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Livro de Notas
          </h1>
          <p className="text-grey-600">
            Gerencie notas, progresso e análises dos alunos
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <Download size={16} className="mr-2" />
            Exportar
          </Button>
          
          <Button
            variant="outline"
            onClick={handleGenerateReport}
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <BarChart3 size={16} className="mr-2" />
            Relatório
          </Button>
        </div>
      </div>

      {/* View Toggle */}
      <div className="flex gap-2 mb-6">
        <Button
          variant={selectedView === 'matrix' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('matrix')}
          className="flex items-center gap-2"
        >
          <Users size={16} />
          Matriz de Notas
        </Button>
        
        <Button
          variant={selectedView === 'analytics' ? 'primary' : 'outline'}
          onClick={() => setSelectedView('analytics')}
          className="flex items-center gap-2"
        >
          <BarChart3 size={16} />
          Análises
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-1">
              Buscar Alunos
            </label>
            <SearchBar
              placeholder="Nome ou email..."
              onSearch={setSearchQuery}
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-1">
              Curso
            </label>
            <select
              value={selectedCourse}
              onChange={(e) => setSelectedCourse(e.target.value)}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="all">Todos os Cursos</option>
              {mockCourses.map(course => (
                <option key={course.id} value={course.id}>
                  {course.titulo}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-1">
              Quiz
            </label>
            <select
              value={selectedQuiz}
              onChange={(e) => setSelectedQuiz(e.target.value)}
              className="w-full px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
            >
              <option value="all">Todos os Quizzes</option>
              {mockQuizzes.map(quiz => (
                <option key={quiz.id} value={quiz.id}>
                  {quiz.titulo}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-grey-700 mb-1">
              Período
            </label>
            <div className="flex gap-2">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange(prev => ({ ...prev, start: e.target.value }))}
                className="flex-1 px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange(prev => ({ ...prev, end: e.target.value }))}
                className="flex-1 px-3 py-2 border border-grey-300 rounded-lg text-sm focus:ring-gold-500 focus:border-gold-500"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Users size={24} className="text-blue-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{mockUsers.length}</div>
              <div className="text-sm text-grey-600">Total de Alunos</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <BookOpen size={24} className="text-green-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">{mockQuizzes.length}</div>
              <div className="text-sm text-grey-600">Quizzes Ativos</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Target size={24} className="text-gold-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">78.5%</div>
              <div className="text-sm text-grey-600">Média Geral</div>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Award size={24} className="text-purple-500" />
            <div>
              <div className="text-2xl font-bold text-grey-900">72.1%</div>
              <div className="text-sm text-grey-600">Taxa de Aprovação</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Main Content */}
      {selectedView === 'matrix' && (
        <GradeMatrix
          users={mockUsers}
          quizzes={mockQuizzes}
          attempts={mockAttempts}
          onGradeUpdate={handleGradeUpdate}
          onBulkGradeUpdate={handleBulkGradeUpdate}
        />
      )}

      {selectedView === 'analytics' && (
        <GradeAnalytics
          courseId={selectedCourse !== 'all' ? selectedCourse : undefined}
          quizId={selectedQuiz !== 'all' ? selectedQuiz : undefined}
          dateRange={dateRange}
        />
      )}

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center gap-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gold-500"></div>
            <span className="text-grey-700">Processando...</span>
          </div>
        </div>
      )}
    </div>
  );
}
