'use client';

import { useState } from 'react';
import { Play, Lock } from 'lucide-react';

interface SimpleVideoPlayerProps {
  videoId: string;
  title: string;
  isPreview?: boolean;
  isLocked?: boolean;
  className?: string;
}

export function SimpleVideoPlayer({ 
  videoId, 
  title, 
  isPreview = false,
  isLocked = false,
  className = ""
}: SimpleVideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  // URL do embed do YouTube
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;

  const handlePlay = () => {
    if (isLocked && !isPreview) {
      return;
    }
    setIsPlaying(true);
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {/* YouTube Embed */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title={title}
            className="absolute top-0 left-0 w-full h-full"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
            {/* Thumbnail do YouTube */}
            <div className="relative w-full h-full">
              <img
                src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                alt={title}
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback para thumbnail padrão se a imagem falhar
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIyNSIgZmlsbD0iIzMzMzMzMyIvPjxyZWN0IHg9IjUwIiB5PSI1MCIgd2lkdGg9IjMwMCIgaGVpZ2h0PSIxMjUiIGZpbGw9IiM2NjY2NjYiIHN0cm9rZT0iIzQ0NDQ0NCIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMjAwIiBjeT0iMTEyIiByPSIyMCIgZmlsbD0iIzk5OTk5OSIvPjxwb2x5Z29uIHBvaW50cz0iMTkwLDEwMiAxOTAsMTIyIDIxMCwxMTIiIGZpbGw9IiNjY2NjY2MiLz48dGV4dCB4PSIyMDAiIHk9IjE4MCIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjE0IiBmaWxsPSIjY2NjY2NjIj5Ww61kZW8gZG8gQ3Vyc288L3RleHQ+PC9zdmc+';
                }}
              />
              
              {/* Overlay com botão de play */}
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <button
                  onClick={handlePlay}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full p-4 transition-all duration-200 transform hover:scale-110 shadow-2xl"
                >
                  <Play size={32} className="ml-1" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Overlay para vídeos bloqueados */}
      {isLocked && !isPreview && (
        <div className="absolute inset-0 bg-black bg-opacity-80 flex items-center justify-center">
          <div className="text-center text-white">
            <Lock size={48} className="mx-auto mb-4 opacity-60" />
            <h3 className="text-xl font-semibold mb-2">Conteúdo Bloqueado</h3>
            <p className="text-gray-300 mb-4">
              Este vídeo está disponível apenas para alunos matriculados
            </p>
            <button className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors">
              Matricular-se no Curso
            </button>
          </div>
        </div>
      )}

      {/* Informações do vídeo */}
      <div className="absolute top-4 left-4 right-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {isPreview && (
              <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Preview
              </span>
            )}
            {isLocked && (
              <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                Bloqueado
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-2 text-white text-sm">
            <span>YouTube</span>
            <span>•</span>
            <span>HD</span>
          </div>
        </div>
      </div>

      {/* Título do vídeo */}
      <div className="absolute bottom-4 left-4 right-4">
        <h3 className="text-white font-semibold text-lg mb-1">{title}</h3>
        {isPreview && (
          <p className="text-gray-200 text-sm">Preview disponível</p>
        )}
      </div>
    </div>
  );
}
