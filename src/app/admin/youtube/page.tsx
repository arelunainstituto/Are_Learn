'use client';

import { useState } from 'react';
import { Search, Youtube, Plus, Link as LinkIcon, List } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { YouTubeSearchModal } from '@/components/youtube/YouTubeSearchModal';
import { extractYouTubeVideoId, getYouTubeVideo, getYouTubeThumbnail, type YouTubeVideo } from '@/lib/youtube';
import { formatDuration } from '@/lib/utils';

export default function AdminYouTubePage() {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedVideos, setSelectedVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleAddByUrl = async () => {
    if (!videoUrl.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const videoId = extractYouTubeVideoId(videoUrl);
      
      if (!videoId) {
        setError('URL inválida do YouTube');
        return;
      }

      const video = await getYouTubeVideo(videoId);
      
      // Verificar se já foi adicionado
      if (selectedVideos.find(v => v.id === video.id)) {
        setError('Vídeo já foi adicionado');
        return;
      }

      setSelectedVideos(prev => [...prev, video]);
      setVideoUrl('');
    } catch (err) {
      setError('Erro ao buscar vídeo. Verifique a URL e sua chave de API.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSelectFromSearch = (video: YouTubeVideo) => {
    // Verificar se já foi adicionado
    if (selectedVideos.find(v => v.id === video.id)) {
      alert('Vídeo já foi adicionado');
      return;
    }

    setSelectedVideos(prev => [...prev, video]);
  };

  const handleRemoveVideo = (videoId: string) => {
    setSelectedVideos(prev => prev.filter(v => v.id !== videoId));
  };

  const handleSaveToCourse = () => {
    // Aqui você implementaria a lógica para salvar os vídeos no curso
    console.log('Salvando vídeos:', selectedVideos);
    alert(`${selectedVideos.length} vídeos serão adicionados ao curso`);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-gray-900 mb-2">
          Integração com YouTube
        </h1>
        <p className="text-gray-600">
          Adicione vídeos do YouTube aos seus cursos
        </p>
      </div>

      {/* Métodos de Adicionar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Adicionar por URL */}
        <Card>
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center gap-2">
              <LinkIcon size={20} className="text-primary-600" />
              <h2 className="text-lg font-display font-bold">
                Adicionar por URL
              </h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <p className="text-sm text-gray-600 mb-4">
              Cole o link do vídeo do YouTube
            </p>
            <div className="flex gap-2">
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleAddByUrl();
                  }
                }}
              />
              <Button onClick={handleAddByUrl} disabled={isLoading}>
                <Plus size={20} />
              </Button>
            </div>
            {error && (
              <p className="text-sm text-red-600 mt-2">{error}</p>
            )}
          </CardContent>
        </Card>

        {/* Buscar no YouTube */}
        <Card>
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center gap-2">
              <Search size={20} className="text-primary-600" />
              <h2 className="text-lg font-display font-bold">
                Buscar no YouTube
              </h2>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <p className="text-sm text-gray-600 mb-4">
              Busque e selecione vídeos diretamente
            </p>
            <Button
              onClick={() => setShowSearchModal(true)}
              className="w-full"
              variant="outline"
            >
              <Youtube size={20} className="mr-2" />
              Abrir Busca do YouTube
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Vídeos Selecionados */}
      {selectedVideos.length > 0 && (
        <Card>
          <CardHeader className="p-6 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <List size={20} className="text-primary-600" />
                <h2 className="text-lg font-display font-bold">
                  Vídeos Selecionados ({selectedVideos.length})
                </h2>
              </div>
              <Button onClick={handleSaveToCourse}>
                Adicionar ao Curso
              </Button>
            </div>
          </CardHeader>
          <CardContent className="p-6 pt-0">
            <div className="space-y-4">
              {selectedVideos.map((video, index) => (
                <div
                  key={video.id}
                  className="flex gap-4 p-4 bg-gray-50 rounded-lg"
                >
                  {/* Número */}
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-600 text-white flex items-center justify-center font-semibold">
                    {index + 1}
                  </div>

                  {/* Thumbnail */}
                  <div className="relative w-40 h-24 flex-shrink-0 bg-gray-200 rounded overflow-hidden">
                    <img
                      src={getYouTubeThumbnail(video.id, 'medium')}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded">
                      {formatDuration(video.duration)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 mb-1 line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">
                      {video.channelTitle}
                    </p>
                    <div className="flex items-center gap-2">
                      <Badge variant="info" className="text-xs">
                        {formatDuration(video.duration)}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {(video.viewCount / 1000).toFixed(0)}k views
                      </Badge>
                    </div>
                  </div>

                  {/* Remover */}
                  <button
                    onClick={() => handleRemoveVideo(video.id)}
                    className="flex-shrink-0 text-red-600 hover:text-red-700 transition-colors"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Instruções */}
      <Card>
        <CardHeader className="p-6 pb-4">
          <h2 className="text-lg font-display font-bold">
            Como usar a integração
          </h2>
        </CardHeader>
        <CardContent className="p-6 pt-0">
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex gap-3">
              <span className="font-semibold text-primary-600">1.</span>
              <p>
                Configure sua chave de API do YouTube no arquivo{' '}
                <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>
              </p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-primary-600">2.</span>
              <p>
                Busque vídeos ou adicione por URL diretamente
              </p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-primary-600">3.</span>
              <p>
                Os vídeos selecionados serão adicionados como aulas do curso
              </p>
            </div>
            <div className="flex gap-3">
              <span className="font-semibold text-primary-600">4.</span>
              <p>
                O player do YouTube será usado automaticamente para reprodução
              </p>
            </div>
          </div>

          <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <p className="text-sm text-yellow-800">
              <strong>⚠️ Importante:</strong> Você precisa de uma chave de API do YouTube
              para usar esta funcionalidade. Obtenha gratuitamente em{' '}
              <a
                href="https://console.cloud.google.com"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google Cloud Console
              </a>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Modal de Busca */}
      <YouTubeSearchModal
        isOpen={showSearchModal}
        onClose={() => setShowSearchModal(false)}
        onSelect={handleSelectFromSearch}
      />
    </div>
  );
}

