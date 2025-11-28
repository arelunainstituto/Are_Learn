'use client';

import { useState, useEffect } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Award, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Target,
  BookOpen
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ProgressBar } from '@/components/ui/ProgressBar';

interface GradeAnalyticsProps {
  courseId?: string;
  quizId?: string;
  dateRange?: {
    start: string;
    end: string;
  };
}

interface AnalyticsData {
  overview: {
    totalStudents: number;
    totalQuizzes: number;
    averageGrade: number;
    completionRate: number;
    passRate: number;
  };
  gradeDistribution: {
    range: string;
    count: number;
    percentage: number;
  }[];
  performanceTrends: {
    date: string;
    averageGrade: number;
    attempts: number;
  }[];
  topPerformers: {
    userId: string;
    userName: string;
    averageGrade: number;
    completedQuizzes: number;
  }[];
  strugglingStudents: {
    userId: string;
    userName: string;
    averageGrade: number;
    missingQuizzes: number;
  }[];
  quizStats: {
    quizId: string;
    quizTitle: string;
    averageGrade: number;
    attempts: number;
    passRate: number;
    difficulty: 'easy' | 'medium' | 'hard';
  }[];
}

export function GradeAnalytics({ courseId, quizId, dateRange }: GradeAnalyticsProps) {
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedView, setSelectedView] = useState<'overview' | 'distribution' | 'trends' | 'performance'>('overview');

  // Mock data - substituir por dados reais
  const mockAnalyticsData: AnalyticsData = {
    overview: {
      totalStudents: 45,
      totalQuizzes: 8,
      averageGrade: 78.5,
      completionRate: 85.2,
      passRate: 72.1
    },
    gradeDistribution: [
      { range: '90-100', count: 8, percentage: 17.8 },
      { range: '80-89', count: 12, percentage: 26.7 },
      { range: '70-79', count: 15, percentage: 33.3 },
      { range: '60-69', count: 7, percentage: 15.6 },
      { range: '0-59', count: 3, percentage: 6.7 }
    ],
    performanceTrends: [
      { date: '2024-01-01', averageGrade: 75.2, attempts: 12 },
      { date: '2024-01-08', averageGrade: 78.1, attempts: 15 },
      { date: '2024-01-15', averageGrade: 76.8, attempts: 18 },
      { date: '2024-01-22', averageGrade: 79.3, attempts: 22 },
      { date: '2024-01-29', averageGrade: 78.5, attempts: 25 }
    ],
    topPerformers: [
      { userId: 'user-1', userName: 'João Silva', averageGrade: 94.2, completedQuizzes: 8 },
      { userId: 'user-2', userName: 'Maria Santos', averageGrade: 91.8, completedQuizzes: 8 },
      { userId: 'user-3', userName: 'Pedro Costa', averageGrade: 89.5, completedQuizzes: 7 }
    ],
    strugglingStudents: [
      { userId: 'user-4', userName: 'Ana Lima', averageGrade: 45.2, missingQuizzes: 3 },
      { userId: 'user-5', userName: 'Carlos Oliveira', averageGrade: 52.1, missingQuizzes: 2 },
      { userId: 'user-6', userName: 'Fernanda Rocha', averageGrade: 48.7, missingQuizzes: 4 }
    ],
    quizStats: [
      { quizId: 'quiz-1', quizTitle: 'Fundamentos de Implantodontia', averageGrade: 82.3, attempts: 42, passRate: 85.7, difficulty: 'medium' },
      { quizId: 'quiz-2', quizTitle: 'Técnicas Avançadas', averageGrade: 68.9, attempts: 38, passRate: 63.2, difficulty: 'hard' },
      { quizId: 'quiz-3', quizTitle: 'Gestão de Casos', averageGrade: 91.2, attempts: 45, passRate: 95.6, difficulty: 'easy' }
    ]
  };

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setAnalyticsData(mockAnalyticsData);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [courseId, quizId, dateRange]);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const getDifficultyLabel = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Médio';
      case 'hard': return 'Difícil';
      default: return difficulty;
    }
  };

  const getGradeColor = (grade: number) => {
    if (grade >= 90) return 'text-green-600';
    if (grade >= 80) return 'text-blue-600';
    if (grade >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-grey-200 rounded mb-4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-32 bg-grey-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!analyticsData) return null;

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Análise de Notas
          </h1>
          <p className="text-grey-600">
            Insights e métricas de desempenho dos alunos
          </p>
        </div>

        <div className="flex gap-2">
          <Button
            variant={selectedView === 'overview' ? 'primary' : 'outline'}
            onClick={() => setSelectedView('overview')}
            size="sm"
          >
            Visão Geral
          </Button>
          <Button
            variant={selectedView === 'distribution' ? 'primary' : 'outline'}
            onClick={() => setSelectedView('distribution')}
            size="sm"
          >
            Distribuição
          </Button>
          <Button
            variant={selectedView === 'trends' ? 'primary' : 'outline'}
            onClick={() => setSelectedView('trends')}
            size="sm"
          >
            Tendências
          </Button>
          <Button
            variant={selectedView === 'performance' ? 'primary' : 'outline'}
            onClick={() => setSelectedView('performance')}
            size="sm"
          >
            Performance
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      {selectedView === 'overview' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Users size={24} className="text-blue-500" />
              <div>
                <div className="text-2xl font-bold text-grey-900">{analyticsData.overview.totalStudents}</div>
                <div className="text-sm text-grey-600">Total de Alunos</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <BookOpen size={24} className="text-green-500" />
              <div>
                <div className="text-2xl font-bold text-grey-900">{analyticsData.overview.totalQuizzes}</div>
                <div className="text-sm text-grey-600">Quizzes Disponíveis</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Target size={24} className="text-gold-500" />
              <div>
                <div className="text-2xl font-bold text-grey-900">{analyticsData.overview.averageGrade.toFixed(1)}%</div>
                <div className="text-sm text-grey-600">Média Geral</div>
              </div>
            </div>
          </Card>

          <Card className="p-4">
            <div className="flex items-center gap-3">
              <Award size={24} className="text-purple-500" />
              <div>
                <div className="text-2xl font-bold text-grey-900">{analyticsData.overview.passRate.toFixed(1)}%</div>
                <div className="text-sm text-grey-600">Taxa de Aprovação</div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Grade Distribution */}
      {selectedView === 'distribution' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-grey-900 mb-4">Distribuição de Notas</h3>
            <div className="space-y-3">
              {analyticsData.gradeDistribution.map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-16 text-sm font-medium text-grey-700">{item.range}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-grey-200 rounded-full h-2">
                        <div 
                          className="bg-gold-500 h-2 rounded-full"
                          style={{ width: `${item.percentage}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-grey-900">{item.percentage.toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-grey-500">{item.count} alunos</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-grey-900 mb-4">Estatísticas por Quiz</h3>
            <div className="space-y-4">
              {analyticsData.quizStats.map((quiz, index) => (
                <div key={index} className="border border-grey-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-grey-900">{quiz.quizTitle}</h4>
                    <Badge variant="secondary" className={getDifficultyColor(quiz.difficulty)}>
                      {getDifficultyLabel(quiz.difficulty)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-grey-600">Média: </span>
                      <span className={`font-medium ${getGradeColor(quiz.averageGrade)}`}>
                        {quiz.averageGrade.toFixed(1)}%
                      </span>
                    </div>
                    <div>
                      <span className="text-grey-600">Tentativas: </span>
                      <span className="font-medium text-grey-900">{quiz.attempts}</span>
                    </div>
                    <div>
                      <span className="text-grey-600">Taxa de Aprovação: </span>
                      <span className="font-medium text-grey-900">{quiz.passRate.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Performance Trends */}
      {selectedView === 'trends' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-grey-900 mb-4">Tendência de Notas</h3>
            <div className="space-y-4">
              {analyticsData.performanceTrends.map((trend, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className="w-20 text-sm text-grey-600">{trend.date}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 bg-grey-200 rounded-full h-2">
                        <div 
                          className="bg-gold-500 h-2 rounded-full"
                          style={{ width: `${trend.averageGrade}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-grey-900">{trend.averageGrade.toFixed(1)}%</span>
                    </div>
                    <div className="text-xs text-grey-500">{trend.attempts} tentativas</div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-grey-900 mb-4">Taxa de Conclusão</h3>
            <div className="flex items-center gap-4 mb-4">
              <div className="text-3xl font-bold text-grey-900">{analyticsData.overview.completionRate.toFixed(1)}%</div>
              <div className="flex-1">
                <ProgressBar value={analyticsData.overview.completionRate} size="lg" />
              </div>
            </div>
            <div className="text-sm text-grey-600">
              {analyticsData.overview.totalStudents} alunos matriculados
            </div>
          </Card>
        </div>
      )}

      {/* Performance Analysis */}
      {selectedView === 'performance' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-grey-900 mb-4">Top Performers</h3>
            <div className="space-y-3">
              {analyticsData.topPerformers.map((performer, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-green-50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-grey-900">{performer.userName}</div>
                    <div className="text-sm text-grey-600">{performer.completedQuizzes} quizzes completos</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${getGradeColor(performer.averageGrade)}`}>
                      {performer.averageGrade.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-grey-900 mb-4">Alunos em Dificuldade</h3>
            <div className="space-y-3">
              {analyticsData.strugglingStudents.map((student, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-red-50 rounded-lg">
                  <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    <AlertTriangle size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-grey-900">{student.userName}</div>
                    <div className="text-sm text-grey-600">{student.missingQuizzes} quizzes em falta</div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${getGradeColor(student.averageGrade)}`}>
                      {student.averageGrade.toFixed(1)}%
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-end gap-3">
        <Button variant="outline" className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500">
          <BarChart3 size={16} className="mr-2" />
          Gerar Relatório
        </Button>
        <Button variant="outline" className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500">
          <TrendingUp size={16} className="mr-2" />
          Exportar Dados
        </Button>
      </div>
    </div>
  );
}
