import Image from 'next/image';
import Link from 'next/link';
import { Clock, BookOpen, BarChart3 } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Curso, ProgressoCurso } from '@/types';
import { formatDuration } from '@/lib/utils';

interface CursoCardProps {
  curso: Curso;
  progresso?: ProgressoCurso;
  showProgress?: boolean;
}

export function CursoCard({ curso, progresso, showProgress = false }: CursoCardProps) {
  return (
    <Link href={`/cursos/${curso.id}`}>
      <Card hover className="group cursor-pointer h-full">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={curso.thumbnail}
            alt={curso.titulo}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          {curso.destaque && (
            <div className="absolute top-3 left-3">
              <Badge variant="warning">Destaque</Badge>
            </div>
          )}
          {progresso && progresso.percentual_completo > 0 && (
            <div className="absolute bottom-0 left-0 right-0">
              <ProgressBar value={progresso.percentual_completo} size="sm" />
            </div>
          )}
        </div>

        {/* Conteúdo */}
        <div className="p-5">
          {/* Categoria */}
          {curso.categoria && (
            <Badge variant="primary" className="mb-2">
              {curso.categoria.nome}
            </Badge>
          )}

          {/* Título */}
          <h3 className="text-lg font-brand font-bold text-grey-900 mb-2 line-clamp-2 group-hover:text-gold-500 transition-colors">
            {curso.titulo}
          </h3>

          {/* Descrição curta */}
          <p className="text-sm text-grey-600 mb-4 line-clamp-2">
            {curso.descricao_curta}
          </p>

          {/* Instrutor */}
          {curso.instrutor && (
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gold-500 to-glossy-400 flex items-center justify-center text-white text-xs font-semibold">
                {curso.instrutor.nome.charAt(0)}
              </div>
              <span className="text-sm text-grey-700 font-medium">
                {curso.instrutor.nome}
              </span>
            </div>
          )}

          {/* Meta informações */}
          <div className="flex items-center gap-4 text-sm text-grey-500">
            <div className="flex items-center gap-1">
              <Clock size={16} />
              <span>{formatDuration(curso.duracao_total * 60)}</span>
            </div>
            <div className="flex items-center gap-1">
              <BookOpen size={16} />
              <span>{curso.total_aulas} aulas</span>
            </div>
            <div className="flex items-center gap-1">
              <BarChart3 size={16} />
              <span className="capitalize">{curso.nivel}</span>
            </div>
          </div>

          {/* Progresso */}
          {showProgress && progresso && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-gray-600">Seu progresso</span>
                <span className="font-semibold text-primary-600">
                  {progresso.percentual_completo}%
                </span>
              </div>
              <ProgressBar value={progresso.percentual_completo} />
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
}

