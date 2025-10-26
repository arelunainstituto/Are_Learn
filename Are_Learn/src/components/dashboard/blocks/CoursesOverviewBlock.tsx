'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { BookOpen, Play, CheckCircle, Clock, TrendingUp } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Curso, ProgressoCurso } from '@/types';

interface CoursesOverviewBlockProps {
  config?: {
    title?: string;
    show_progress?: boolean;
    show_recent?: boolean;
    max_courses?: number;
    show_stats?: boolean;
  };
}

export function CoursesOverviewBlock({ config = {} }: CoursesOverviewBlockProps) {
  const [courses, setCourses] = useState<Curso[]>([]);
  const [progress, setProgress] = useState<ProgressoCurso[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - substituir por dados reais
  const mockCourses: Curso[] = [
    {
      id: '1',
      titulo: 'Implantodontia Avançada',
      descricao: 'Técnicas avançadas de implantodontia',
      descricao_curta: 'Técnicas avançadas de implantodontia',
      thumbnail: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=400&q=80',
      banner: '',
      instrutor_id: '1',
      categoria_id: '1',
      nivel: 'avancado',
      duracao_total: 480,
      total_modulos: 8,
      total_aulas: 42,
      destaque: true,
      publicado: true,
      tags: ['implantes', 'cirurgia'],
      criado_em: '2024-01-01',
      atualizado_em: '2024-01-01'
    },
    {
      id: '2',
      titulo: 'Gestão de Clínicas',
      descricao: 'Aprenda a gerir sua clínica',
      descricao_curta: 'Gestão eficiente para clínicas',
      thumbnail: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&q=80',
      banner: '',
      instrutor_id: '2',
      categoria_id: '2',
      nivel: 'intermediario',
      duracao_total: 360,
      total_modulos: 6,
      total_aulas: 30,
      destaque: false,
      publicado: true,
      tags: ['gestão', 'clínica'],
      criado_em: '2024-01-05',
      atualizado_em: '2024-01-05'
    }
  ];

  const mockProgress: ProgressoCurso[] = [
    {
      id: '1',
      usuario_id: 'user-1',
      curso_id: '1',
      percentual_completo: 65.5,
      aulas_assistidas: 28,
      total_aulas: 42,
      tempo_assistido: 180,
      ultima_aula_assistida: '2024-01-10',
      concluido: false,
      criado_em: '2024-01-01',
      atualizado_em: '2024-01-10'
    },
    {
      id: '2',
      usuario_id: 'user-1',
      curso_id: '2',
      percentual_completo: 100,
      aulas_assistidas: 30,
      total_aulas: 30,
      tempo_assistido: 360,
      ultima_aula_assistida: '2024-01-08',
      concluido: true,
      criado_em: '2024-01-01',
      atualizado_em: '2024-01-08'
    }
  ];

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setCourses(mockCourses);
      setProgress(mockProgress);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const getCourseProgress = (courseId: string) => {
    return progress.find(p => p.curso_id === courseId);
  };

  const getLevelColor = (nivel: string) => {
    switch (nivel) {
      case 'iniciante': return 'bg-green-100 text-green-800';
      case 'intermediario': return 'bg-yellow-100 text-yellow-800';
      case 'avancado': return 'bg-red-100 text-red-800';
      default: return 'bg-grey-100 text-grey-800';
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  };

  const totalCourses = courses.length;
  const completedCourses = progress.filter(p => p.concluido).length;
  const inProgressCourses = progress.filter(p => !p.concluido && p.percentual_completo > 0).length;
  const totalTimeWatched = progress.reduce((total, p) => total + p.tempo_assistido, 0);

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-grey-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-grey-200 rounded"></div>
            <div className="h-4 bg-grey-200 rounded"></div>
            <div className="h-4 bg-grey-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-4 h-full">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <BookOpen size={20} className="text-gold-500" />
          <h3 className="font-medium text-grey-900">
            {config.title || 'Meus Cursos'}
          </h3>
        </div>
        <Link href="/cursos">
          <Button size="sm" variant="outline" className="border-gold-500 text-gold-500 hover:bg-gold-50">
            Ver Todos
          </Button>
        </Link>
      </div>

      {/* Stats */}
      {config.show_stats && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-grey-50 rounded-lg">
            <div className="text-2xl font-bold text-grey-900">{totalCourses}</div>
            <div className="text-xs text-grey-600">Total</div>
          </div>
          <div className="text-center p-3 bg-grey-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">{completedCourses}</div>
            <div className="text-xs text-grey-600">Concluídos</div>
          </div>
        </div>
      )}

      {/* Courses List */}
      <div className="space-y-3">
        {courses.slice(0, config.max_courses || 3).map((course) => {
          const courseProgress = getCourseProgress(course.id);
          const isCompleted = courseProgress?.concluido || false;
          const progressPercent = courseProgress?.percentual_completo || 0;

          return (
            <div key={course.id} className="flex items-center gap-3 p-3 bg-grey-50 rounded-lg">
              <div className="flex-shrink-0">
                <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-glossy-400 rounded-lg flex items-center justify-center">
                  <BookOpen size={20} className="text-white" />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-medium text-grey-900 truncate">
                    {course.titulo}
                  </h4>
                  <Badge variant="secondary" className={getLevelColor(course.nivel)}>
                    {course.nivel}
                  </Badge>
                  {isCompleted && (
                    <CheckCircle size={16} className="text-green-500" />
                  )}
                </div>

                <p className="text-sm text-grey-600 line-clamp-1">
                  {course.descricao_curta}
                </p>

                {config.show_progress && courseProgress && (
                  <div className="mt-2">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs text-grey-600">Progresso</span>
                      <span className="text-xs text-grey-600">{Math.round(progressPercent)}%</span>
                    </div>
                    <ProgressBar value={progressPercent} size="sm" />
                  </div>
                )}

                <div className="flex items-center gap-3 mt-2 text-xs text-grey-500">
                  <div className="flex items-center gap-1">
                    <Clock size={12} />
                    <span>{formatDuration(course.duracao_total)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <BookOpen size={12} />
                    <span>{course.total_aulas} aulas</span>
                  </div>
                </div>
              </div>

              <div className="flex-shrink-0">
                <Link href={`/cursos/${course.id}`}>
                  <Button size="sm" variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
                    {isCompleted ? (
                      <CheckCircle size={14} />
                    ) : progressPercent > 0 ? (
                      <Play size={14} />
                    ) : (
                      <BookOpen size={14} />
                    )}
                  </Button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {courses.length === 0 && (
        <div className="text-center py-8">
          <BookOpen size={32} className="text-grey-400 mx-auto mb-2" />
          <p className="text-grey-600 text-sm mb-4">Nenhum curso encontrado</p>
          <Link href="/cursos">
            <Button size="sm" variant="primary" className="bg-gold-500 hover:bg-gold-600 text-white">
              Explorar Cursos
            </Button>
          </Link>
        </div>
      )}
    </Card>
  );
}
