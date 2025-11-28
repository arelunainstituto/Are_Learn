import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  Clock, 
  BookOpen, 
  Download, 
  ExternalLink,
  PlayCircle,
  CheckCircle,
  Lock,
  ArrowLeft,
  Star,
  Award
} from 'lucide-react';
import { corporateTrainingModule } from '@/lib/corporate-training';

interface TrailPageProps {
  params: {
    trilhaId: string;
  };
}

export default function TrailPage({ params }: TrailPageProps) {
  const trilha = corporateTrainingModule.trilhas.find(t => t.id === params.trilhaId);
  
  if (!trilha) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Trilha não encontrada</h1>
          <Link href="/treinamento-corporativo">
            <Button variant="outline">Voltar ao Treinamento</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="container-custom py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/treinamento-corporativo">
                <Button variant="ghost" size="sm">
                  <ArrowLeft size={18} className="mr-2" />
                  Voltar
                </Button>
              </Link>
              <div>
                <h1 className="text-2xl font-brand font-bold text-gray-900">
                  {trilha.nome}
                </h1>
                <p className="text-gray-600">{trilha.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm text-gray-600">Progresso</div>
                <div className="text-lg font-semibold text-gray-900">
                  0%
                </div>
              </div>
              <div className="w-32">
                <ProgressBar value={0} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo Principal */}
          <div className="lg:col-span-2">
            {/* Vídeo Atual */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-brand font-bold text-gray-900">
                    {trilha.videos[0]?.title || 'Vídeo de Introdução'}
                  </h2>
                  <div className="flex items-center gap-2">
                    <Badge variant="info">
                      1 de {trilha.videos.length}
                    </Badge>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white">
                        <div className="text-6xl mb-4">🎥</div>
                        <h3 className="text-xl font-semibold mb-2">
                          {trilha.videos[0]?.title || 'Vídeo de Introdução'}
                        </h3>
                        <p className="text-gray-300 mb-4">
                          {trilha.videos[0]?.description || 'Descrição do vídeo'}
                        </p>
                        <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
                          <span>Duração: {trilha.videos[0]?.duration || 5} min</span>
                          <span>•</span>
                          <span>Vídeo 1</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700 mb-6">
                  {trilha.videos[0]?.description || 'Descrição do vídeo'}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{trilha.videos[0]?.duration || 5} min</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <PlayCircle size={16} />
                      <span>Vídeo 1</span>
                    </div>
                  </div>
                  
                  <Button variant="primary" size="sm">
                    Marcar como Concluído
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Materiais Complementares */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <h2 className="text-xl font-brand font-bold text-gray-900 mb-4">
                  Materiais Complementares
                </h2>
                <div className="space-y-3">
                  {trilha.materials.map((material) => (
                    <div key={material.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <div className="flex items-center gap-3">
                        {material.type === 'pdf' ? (
                          <BookOpen size={20} className="text-red-500" />
                        ) : material.type === 'link' ? (
                          <ExternalLink size={20} className="text-blue-500" />
                        ) : (
                          <Download size={20} className="text-green-500" />
                        )}
                        <div>
                          <div className="font-medium text-gray-900">{material.title}</div>
                          <div className="text-sm text-gray-600">{material.description}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm">
                          {material.type === 'link' ? 'Acessar' : 'Baixar'}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quiz */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-brand font-bold text-gray-900">
                    Avaliação Final
                  </h2>
                  <Badge variant="warning">
                    {trilha.quiz.length} questões
                  </Badge>
                </div>
                
                <p className="text-gray-700 mb-6">
                  Teste seus conhecimentos com nossa avaliação interativa. 
                  Você precisa acertar pelo menos 70% para concluir a trilha.
                </p>

                <Button variant="primary" className="w-full">
                  <Award size={18} className="mr-2" />
                  Iniciar Avaliação
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Progresso da Trilha */}
            <Card className="mb-6">
              <CardContent className="p-6">
                <h3 className="text-lg font-brand font-bold text-gray-900 mb-4">
                  Progresso da Trilha
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Vídeos</span>
                      <span>0/{trilha.videos.length}</span>
                    </div>
                    <ProgressBar value={0} size="sm" />
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Materiais</span>
                      <span>0/{trilha.materials.length}</span>
                    </div>
                    <ProgressBar value={0} size="sm" />
                  </div>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={16} className="text-blue-600" />
                    <span className="font-medium text-blue-900">Tempo Estimado</span>
                  </div>
                  <div className="text-sm text-blue-700">
                    {trilha.estimatedTime} minutos para completar
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Vídeos */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-brand font-bold text-gray-900 mb-4">
                  Conteúdo da Trilha
                </h3>
                
                <div className="space-y-3">
                  {trilha.videos.map((video, index) => (
                    <div
                      key={video.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                        index === 0
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex-shrink-0">
                          <PlayCircle size={20} className="text-gray-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-medium text-gray-900 text-sm">
                            {video.title}
                          </div>
                          <div className="text-xs text-gray-600">
                            {video.duration} min
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}