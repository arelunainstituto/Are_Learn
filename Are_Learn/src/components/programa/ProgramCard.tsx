'use client';

import { SafeImage } from '@/components/ui/SafeImage';
import Link from 'next/link';
import { Clock, BookOpen, Users, Award, Play, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Button } from '@/components/ui/Button';
import { Program, ProgramEnrollment } from '@/types';

interface ProgramCardProps {
  program: Program;
  enrollment?: ProgramEnrollment;
  showProgress?: boolean;
  onEnroll?: (programId: string) => void;
  isEnrolling?: boolean;
}

export function ProgramCard({ 
  program, 
  enrollment, 
  showProgress = false, 
  onEnroll,
  isEnrolling = false 
}: ProgramCardProps) {
  const isEnrolled = !!enrollment;
  const isCompleted = enrollment?.status === 'completed';
  const progress = enrollment?.progress_percentage || 0;

  return (
    <Card hover className="group cursor-pointer h-full">
      {/* Imagem do Programa */}
      <div className="relative aspect-video overflow-hidden">
        {program.imagem ? (
          <SafeImage
            src={program.imagem}
            alt={program.titulo}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gold-500 to-glossy-400 flex items-center justify-center">
            <BookOpen size={48} className="text-white opacity-80" />
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 left-3">
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
        </div>

        {/* Enrollment Type Badge */}
        <div className="absolute top-3 right-3">
          {program.enrollment_type === 'self' ? (
            <Badge variant="info" className="bg-blue-100 text-blue-800">
              Auto-inscrição
            </Badge>
          ) : program.enrollment_type === 'approval' ? (
            <Badge variant="warning" className="bg-yellow-100 text-yellow-800">
              Aprovação
            </Badge>
          ) : (
            <Badge variant="secondary" className="bg-grey-100 text-grey-800">
              Manual
            </Badge>
          )}
        </div>

        {/* Progress Bar */}
        {showProgress && isEnrolled && (
          <div className="absolute bottom-0 left-0 right-0">
            <ProgressBar value={progress} size="sm" />
          </div>
        )}
      </div>

      {/* Conteúdo */}
      <div className="p-5">
        {/* Título */}
        <h3 className="text-lg font-brand font-bold text-grey-900 mb-2 line-clamp-2 group-hover:text-gold-500 transition-colors">
          {program.titulo}
        </h3>

        {/* Descrição */}
        <p className="text-sm text-grey-600 mb-4 line-clamp-3">
          {program.descricao}
        </p>

        {/* Estatísticas */}
        <div className="flex items-center gap-4 text-sm text-grey-500 mb-4">
          <div className="flex items-center gap-1">
            <BookOpen size={16} />
            <span>Trilha de Aprendizagem</span>
          </div>
          <div className="flex items-center gap-1">
            <Users size={16} />
            <span>Múltiplos Cursos</span>
          </div>
        </div>

        {/* Progress Info */}
        {showProgress && isEnrolled && (
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-grey-700">Progresso</span>
              <span className="text-sm text-grey-600">{Math.round(progress)}%</span>
            </div>
            <div className="flex justify-between items-center text-xs text-grey-500">
              <span>{enrollment.earned_points} pontos conquistados</span>
              <span>{enrollment.total_points} pontos totais</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          {isEnrolled ? (
            <Link href={`/programas/${program.id}`} className="flex-1">
              <Button 
                variant="primary" 
                className="w-full bg-gold-500 hover:bg-gold-600 text-white"
              >
                {isCompleted ? (
                  <>
                    <Award size={16} className="mr-2" />
                    Ver Certificado
                  </>
                ) : (
                  <>
                    <Play size={16} className="mr-2" />
                    Continuar
                  </>
                )}
              </Button>
            </Link>
          ) : (
            <>
              <Link href={`/programas/${program.id}`} className="flex-1">
                <Button variant="outline" className="w-full border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500">
                  Ver Detalhes
                </Button>
              </Link>
              {program.enrollment_type === 'self' && onEnroll && (
                <Button 
                  variant="primary" 
                  size="sm"
                  className="bg-gold-500 hover:bg-gold-600 text-white"
                  onClick={() => onEnroll(program.id)}
                  disabled={isEnrolling}
                >
                  {isEnrolling ? 'Inscrevendo...' : 'Inscrever-se'}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
    </Card>
  );
}
