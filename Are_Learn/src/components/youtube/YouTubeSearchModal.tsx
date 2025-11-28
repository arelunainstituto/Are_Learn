'use client';

import { useState } from 'react';
import { Search, X, Clock, Eye } from 'lucide-react';
import { Modal } from '@/components/ui/Modal';
import { SearchBar } from '@/components/ui/SearchBar';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { searchYouTubeVideos, YouTubeVideo } from '@/lib/youtube';
import { formatDuration } from '@/lib/utils';

interface YouTubeSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (video: YouTubeVideo) => void;
}

export function YouTubeSearchModal({ isOpen, onClose, onSelect }: YouTubeSearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nextPageToken, setNextPageToken] = useState<string | undefined>();

  const handleSearch = async (query: string, pageToken?: string) => {
    if (!query.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await searchYouTubeVideos(query, 12, pageToken);
      
      if (pageToken) {
        setVideos(prev => [...prev, ...result.videos]);
      } else {
        setVideos(result.videos);
      }
      
      setNextPageToken(result.nextPageToken);
    } catch (err) {
      setError('Erro ao buscar vídeos. Verifique sua chave de API do YouTube.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = () => {
    handleSearch(searchQuery);
  };

  const handleLoadMore = () => {
    if (nextPageToken) {
      handleSearch(searchQuery, nextPageToken);
    }
  };

  const handleSelectVideo = (video: YouTubeVideo) => {
    onSelect(video);
    onClose();
    setSearchQuery('');
    setVideos([]);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Buscar Vídeo no YouTube"
      size="xl"
    >
      <div className="space-y-6">
        {/* Barra de Busca */}
        <div className="flex gap-2">
          <SearchBar
            placeholder="Buscar vídeos no YouTube..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onClear={() => setSearchQuery('')}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                handleSearchSubmit();
              }
            }}
            className="flex-1"
          />
          <Button onClick={handleSearchSubmit} disabled={isLoading}>
            <Search size={20} />
          </Button>
        </div>

        {/* Erro */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-700">
            {error}
          </div>
        )}

        {/* Loading */}
        {isLoading && videos.length === 0 && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Buscando vídeos...</p>
          </div>
        )}

        {/* Resultados */}
        {videos.length > 0 && (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-[500px] overflow-y-auto">
              {videos.map((video) => (
                <button
                  key={video.id}
                  onClick={() => handleSelectVideo(video)}
                  className="flex flex-col bg-white border border-gray-200 rounded-lg overflow-hidden hover:border-primary-500 hover:shadow-md transition-all text-left"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video bg-gray-200">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-2 py-1 rounded">
                      {formatDuration(video.duration)}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-3">
                    <h3 className="font-semibold text-sm text-gray-900 line-clamp-2 mb-2">
                      {video.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                      <span>{video.channelTitle}</span>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Eye size={12} />
                        <span>{(video.viewCount / 1000).toFixed(0)}k</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock size={12} />
                        <span>{formatDuration(video.duration)}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Carregar Mais */}
            {nextPageToken && (
              <div className="text-center">
                <Button
                  variant="outline"
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? 'Carregando...' : 'Carregar Mais'}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* Estado Vazio */}
        {!isLoading && videos.length === 0 && !error && (
          <div className="text-center py-12">
            <Search size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-gray-600">
              Busque vídeos no YouTube para adicionar ao seu curso
            </p>
          </div>
        )}
      </div>
    </Modal>
  );
}

