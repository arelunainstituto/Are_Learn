'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { YouTubePlayer } from '@/components/youtube/YouTubePlayer';
import { YouTubeSearchModal } from '@/components/youtube/YouTubeSearchModal';
import { Badge } from '@/components/ui/Badge';
import type { YouTubeVideo } from '@/lib/youtube';
import { formatDuration } from '@/lib/utils';

export default function ExemploYouTubePage() {
  const [selectedVideo, setSelectedVideo] = useState<YouTubeVideo | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [progress, setProgress] = useState(0);
  const [completed, setCompleted] = useState(false);

  // Vídeo de exemplo (substitua por dados reais do banco)
  const exampleVideo = {
    id: 'dQw4w9WgXcQ',
    title: 'Vídeo de Exemplo',
    description: 'Este é um vídeo de exemplo para demonstrar a integração',
    thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg',
    duration: 212,
    channelTitle: 'Canal Exemplo',
    channelId: 'UC_x5XG1OV2P6uZZ5FSM9Ttw',
    publishedAt: '2024-01-01',
    viewCount: 1000000,
    likeCount: 50000,
    tags: ['exemplo', 'tutorial'],
  };

  const handleVideoSelect = (video: YouTubeVideo) => {
    setSelectedVideo(video);
    setProgress(0);
    setCompleted(false);
  };

  const handleProgress = (seconds: number) => {
    if (selectedVideo) {
      const percentage = (seconds / selectedVideo.duration) * 100;
      setProgress(Math.min(percentage, 100));
    }
  };

  const handleComplete = () => {
    setCompleted(true);
    alert('🎉 Parabéns! Você concluiu esta aula!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-display font-bold text-gray-900 mb-2">
              Exemplo de Integração com YouTube
            </h1>
            <p className="text-gray-600">
              Demonstração de como usar vídeos do YouTube na plataforma AreLuna
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Player */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardContent className="p-6">
                  {selectedVideo ? (
                    <div>
                      <h2 className="text-xl font-display font-bold mb-4">
                        {selectedVideo.title}
                      </h2>
                      <YouTubePlayer
                        videoId={selectedVideo.id}
                        onProgress={handleProgress}
                        onComplete={handleComplete}
                      />
                      <div className="mt-4">
                        <div className="flex items-center justify-between text-sm mb-2">
                          <span className="text-gray-600">Seu progresso</span>
                          <span className="font-semibold text-primary-600">
                            {Math.round(progress)}%
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                      </div>
                      {completed && (
                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                          <p className="text-green-800 font-semibold">
                            ✅ Aula concluída!
                          </p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <div className="text-6xl mb-4">📺</div>
                      <p className="text-gray-600 mb-4">
                        Nenhum vídeo selecionado
                      </p>
                      <Button onClick={() => setShowModal(true)}>
                        Buscar Vídeo do YouTube
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Informações do Vídeo */}
              {selectedVideo && (
                <Card>
                  <CardHeader className="p-6 pb-4">
                    <h3 className="text-lg font-display font-bold">
                      Sobre este vídeo
                    </h3>
                  </CardHeader>
                  <CardContent className="p-6 pt-0">
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Canal:</span>
                        <p className="font-medium">{selectedVideo.channelTitle}</p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Duração:</span>
                        <p className="font-medium">
                          {formatDuration(selectedVideo.duration)}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Visualizações:</span>
                        <p className="font-medium">
                          {selectedVideo.viewCount.toLocaleString()}
                        </p>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Descrição:</span>
                        <p className="text-sm text-gray-700 line-clamp-3">
                          {selectedVideo.description}
                        </p>
                      </div>
                      {selectedVideo.tags.length > 0 && (
                        <div>
                          <span className="text-sm text-gray-600 block mb-2">
                            Tags:
                          </span>
                          <div className="flex flex-wrap gap-2">
                            {selectedVideo.tags.slice(0, 5).map((tag) => (
                              <Badge key={tag} variant="secondary">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Ações */}
              <Card>
                <CardHeader className="p-6 pb-4">
                  <h3 className="text-lg font-display font-bold">Ações</h3>
                </CardHeader>
                <CardContent className="p-6 pt-0 space-y-3">
                  <Button
                    onClick={() => setShowModal(true)}
                    className="w-full"
                    variant="primary"
                  >
                    Buscar Outro Vídeo
                  </Button>
                  <Button
                    onClick={() => setSelectedVideo(exampleVideo)}
                    className="w-full"
                    variant="outline"
                  >
                    Carregar Vídeo de Exemplo
                  </Button>
                  {selectedVideo && (
                    <Button
                      onClick={() => setProgress(100)}
                      className="w-full"
                      variant="ghost"
                    >
                      Simular Conclusão
                    </Button>
                  )}
                </CardContent>
              </Card>

              {/* Instruções */}
              <Card>
                <CardHeader className="p-6 pb-4">
                  <h3 className="text-lg font-display font-bold">
                    Como Funciona
                  </h3>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <ol className="space-y-2 text-sm text-gray-700">
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary-600">1.</span>
                      <span>Clique em "Buscar Vídeo do YouTube"</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary-600">2.</span>
                      <span>Busque e selecione um vídeo</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary-600">3.</span>
                      <span>O vídeo será reproduzido</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="font-semibold text-primary-600">4.</span>
                      <span>Progresso é salvo automaticamente</span>
                    </li>
                  </ol>

                  <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <p className="text-xs text-blue-800">
                      <strong>💡 Dica:</strong> Configure sua API Key do YouTube
                      no arquivo .env.local para usar esta funcionalidade.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Status */}
              <Card>
                <CardHeader className="p-6 pb-4">
                  <h3 className="text-lg font-display font-bold">Status</h3>
                </CardHeader>
                <CardContent className="p-6 pt-0">
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Vídeo:</span>
                      <Badge variant={selectedVideo ? 'success' : 'secondary'}>
                        {selectedVideo ? 'Carregado' : 'Nenhum'}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Progresso:</span>
                      <span className="font-semibold">
                        {Math.round(progress)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <Badge variant={completed ? 'success' : 'warning'}>
                        {completed ? 'Concluído' : 'Em Andamento'}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Documentação */}
          <Card className="mt-6">
            <CardContent className="p-6">
              <h3 className="text-lg font-display font-bold mb-4">
                📚 Documentação
              </h3>
              <p className="text-gray-700 mb-4">
                Esta é uma página de exemplo mostrando como usar a integração com
                YouTube na plataforma AreLuna.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">🎮 Para Desenvolvedores</h4>
                  <p className="text-sm text-gray-600">
                    Veja o código fonte desta página em:
                  </p>
                  <code className="text-xs bg-white px-2 py-1 rounded mt-2 block">
                    src/app/exemplo-youtube/page.tsx
                  </code>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold mb-2">📖 Documentação</h4>
                  <p className="text-sm text-gray-600">
                    Guia completo de integração:
                  </p>
                  <code className="text-xs bg-white px-2 py-1 rounded mt-2 block">
                    docs/YOUTUBE_INTEGRATION.md
                  </code>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal de Busca */}
      <YouTubeSearchModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSelect={handleVideoSelect}
      />
    </div>
  );
}

