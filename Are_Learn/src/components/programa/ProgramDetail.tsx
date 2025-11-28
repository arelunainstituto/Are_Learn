'use client';

import { useState } from 'react';
import { SafeImage } from '@/components/ui/SafeImage';
import Link from 'next/link';
import { 
  Clock, 
  BookOpen, 
  Users, 
  Award, 
  Play, 
  CheckCircle, 
  Lock, 
  Unlock,
  Star,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Program, CourseSet, CourseSetItem, ProgramEnrollment, Curso } from '@/types';

interface ProgramDetailProps {
  program: Program;
  courseSets: CourseSet[];
  courseSetItems: CourseSetItem[];
  courses: Curso[];
  enrollment?: ProgramEnrollment;
  onEnroll?: (programId: string) => void;
  isEnrolling?: boolean;
}

interface CourseSetTreeProps {
  courseSet: CourseSet;
  items: CourseSetItem[];
  courses: Curso[];
  enrollment?: ProgramEnrollment;
  level?: number;
}

function CourseSetTree({ 
  courseSet, 
  items, 
  courses, 
  enrollment, 
  level = 0 
}: CourseSetTreeProps) {
  const [isExpanded, setIsExpanded] = useState(level < 2); // Auto-expand first 2 levels
  
  const getCourseById = (courseId: string) => 
    courses.find(c => c.id === courseId);
  
  const isItemCompleted = (item: CourseSetItem) => {
    // TODO: Implementar verificação real de conclusão
    return false;
  };
  
  const isItemLocked = (item: CourseSetItem) => {
    // TODO: Implementar lógica de liberação baseada em completion_type
    return false;
  };

  return (
    <div className="ml-4">
      {/* Course Set Header */}
      <div 
        className="flex items-center gap-3 p-3 bg-grey-50 rounded-lg cursor-pointer hover:bg-grey-100 transition-colors"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex items-center gap-2">
          {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <BookOpen size={16} className="text-gold-500" />
        </div>
        <div className="flex-1">
          <h4 className="font-medium text-grey-900">{courseSet.titulo}</h4>
          <p className="text-sm text-grey-600">
            {courseSet.completion_type === 'all_in_order' && 'Todos em ordem'}
            {courseSet.completion_type === 'all_any_order' && 'Todos em qualquer ordem'}
            {courseSet.completion_type === 'at_least_x' && `Pelo menos ${courseSet.required_count} cursos`}
            {courseSet.completion_type === 'min_points' && `Mínimo ${courseSet.required_points} pontos`}
          </p>
        </div>
        <Badge variant="secondary" className="bg-glossy-100 text-glossy-800">
          {items.length} cursos
        </Badge>
      </div>

      {/* Course Set Items */}
      {isExpanded && (
        <div className="mt-2 space-y-2">
          {items.map((item) => {
            const course = getCourseById(item.curso_id);
            const isCompleted = isItemCompleted(item);
            const isLocked = isItemLocked(item);
            
            if (!course) return null;

            return (
              <Card key={item.id} className="p-4">
                <div className="flex items-center gap-3">
                  {/* Status Icon */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <CheckCircle size={20} className="text-green-500" />
                    ) : isLocked ? (
                      <Lock size={20} className="text-grey-400" />
                    ) : (
                      <Unlock size={20} className="text-gold-500" />
                    )}
                  </div>

                  {/* Course Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h5 className="font-medium text-grey-900 truncate">
                        {course.titulo}
                      </h5>
                      {item.points > 0 && (
                        <Badge variant="primary" className="bg-gold-100 text-gold-800 text-xs">
                          {item.points} pts
                        </Badge>
                      )}
                      {item.is_required && (
                        <Badge variant="warning" className="bg-yellow-100 text-yellow-800 text-xs">
                          Obrigatório
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-grey-600 line-clamp-2">
                      {course.descricao_curta}
                    </p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-grey-500">
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{Math.round(course.duracao_total / 60)}h</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen size={12} />
                        <span>{course.total_aulas} aulas</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star size={12} />
                        <span>{course.nivel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    {isCompleted ? (
                      <Badge variant="success" className="bg-green-100 text-green-800">
                        Concluído
                      </Badge>
                    ) : isLocked ? (
                      <Button variant="outline" size="sm" disabled>
                        <Lock size={14} className="mr-1" />
                        Bloqueado
                      </Button>
                    ) : (
                      <Link href={`/cursos/${course.id}`}>
                        <Button variant="primary" size="sm" className="bg-gold-500 hover:bg-gold-600 text-white">
                          <Play size={14} className="mr-1" />
                          Iniciar
                        </Button>
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

export function ProgramDetail({ 
  program, 
  courseSets, 
  courseSetItems, 
  courses, 
  enrollment, 
  onEnroll,
  isEnrolling = false 
}: ProgramDetailProps) {
  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.status === 'completed';
  const progress = enrollment?.progress_percentage || 0;

  // Agrupar items por course set
  const itemsBySet = courseSetItems.reduce((acc, item) => {
    if (!acc[item.course_set_id]) {
      acc[item.course_set_id] = [];
    }
    acc[item.course_set_id].push(item);
    return acc;
  }, {} as Record<string, CourseSetItem[]>);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="relative aspect-video overflow-hidden rounded-lg mb-6">
          {program.imagem ? (
            <SafeImage
              src={program.imagem}
              alt={program.titulo}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 60vw"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gold-500 to-glossy-400 flex items-center justify-center">
              <BookOpen size={64} className="text-white opacity-80" />
            </div>
          )}
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-3xl font-brand font-bold text-grey-900 mb-2">
              {program.titulo}
            </h1>
            <p className="text-lg text-grey-600 mb-4">
              {program.descricao}
            </p>

            {/* Status Badges */}
            <div className="flex flex-wrap gap-2 mb-4">
              {isCompleted ? (
                <Badge variant="success" className="bg-green-100 text-green-800">
                  <CheckCircle size={14} className="mr-1" />
                  Concluído
                </Badge>
              ) : isEnrolled ? (
                <Badge variant="primary" className="bg-gold-100 text-gold-800">
                  Em Andamento
                </Badge>
              ) : (
                <Badge variant="secondary" className="bg-glossy-100 text-glossy-800">
                  Disponível
                </Badge>
              )}
              
              <Badge variant="info" className="bg-blue-100 text-blue-800">
                {program.enrollment_type === 'self' ? 'Auto-inscrição' : 
                 program.enrollment_type === 'approval' ? 'Aprovação' : 'Manual'}
              </Badge>
            </div>

            {/* Progress */}
            {isEnrolled && (
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-grey-700">Progresso do Programa</span>
                  <span className="text-grey-600">{Math.round(progress)}%</span>
                </div>
                <ProgressBar value={progress} />
                <div className="flex justify-between items-center mt-2 text-sm text-grey-500">
                  <span>{enrollment.earned_points} pontos conquistados</span>
                  <span>{enrollment.total_points} pontos totais</span>
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            {isEnrolled ? (
              <Button 
                variant="primary" 
                size="lg"
                className="bg-gold-500 hover:bg-gold-600 text-white"
              >
                {isCompleted ? (
                  <>
                    <Award size={20} className="mr-2" />
                    Ver Certificado
                  </>
                ) : (
                  <>
                    <Play size={20} className="mr-2" />
                    Continuar Programa
                  </>
                )}
              </Button>
            ) : (
              <>
                {program.enrollment_type === 'self' && onEnroll && (
                  <Button 
                    variant="primary" 
                    size="lg"
                    className="bg-gold-500 hover:bg-gold-600 text-white"
                    onClick={() => onEnroll(program.id)}
                    disabled={isEnrolling}
                  >
                    {isEnrolling ? 'Inscrevendo...' : 'Inscrever-se no Programa'}
                  </Button>
                )}
                {program.enrollment_type === 'approval' && (
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-gold-500 text-gold-500 hover:bg-gold-50"
                  >
                    Solicitar Aprovação
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Course Sets Tree */}
      <div className="space-y-6">
        <h2 className="text-2xl font-brand font-bold text-grey-900">
          Estrutura do Programa
        </h2>
        
        {courseSets.map((courseSet) => (
          <CourseSetTree
            key={courseSet.id}
            courseSet={courseSet}
            items={itemsBySet[courseSet.id] || []}
            courses={courses}
            enrollment={enrollment}
          />
        ))}
      </div>

      {/* Program Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 text-center">
          <BookOpen size={24} className="text-gold-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-grey-900 mb-1">
            {courseSets.length}
          </div>
          <div className="text-sm text-grey-600">Conjuntos de Cursos</div>
        </Card>
        
        <Card className="p-4 text-center">
          <BookOpen size={24} className="text-gold-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-grey-900 mb-1">
            {courseSetItems.length}
          </div>
          <div className="text-sm text-grey-600">Cursos Totais</div>
        </Card>
        
        <Card className="p-4 text-center">
          <Clock size={24} className="text-gold-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-grey-900 mb-1">
            {Math.round(courseSetItems.reduce((total, item) => {
              const course = courses.find(c => c.id === item.curso_id);
              return total + (course?.duracao_total || 0);
            }, 0) / 60)}h
          </div>
          <div className="text-sm text-grey-600">Duração Total</div>
        </Card>
      </div>
    </div>
  );
}
