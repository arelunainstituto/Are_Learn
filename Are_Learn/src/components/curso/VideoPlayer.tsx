'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings, Lock } from 'lucide-react';

interface VideoPlayerProps {
  videoId: string;
  title: string;
  isPreview?: boolean;
  isLocked?: boolean;
  onPlay?: () => void;
  className?: string;
}

export function VideoPlayer({ 
  videoId, 
  title, 
  isPreview = false,
  isLocked = false,
  onPlay,
  className = ""
}: VideoPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // URL do embed do YouTube
  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=0&controls=1&rel=0&modestbranding=1&showinfo=0&iv_load_policy=3`;

  const handlePlay = () => {
    if (isLocked && !isPreview) {
      return; // Não permite reproduzir se estiver bloqueado
    }
    setIsPlaying(true);
    if (onPlay) {
      onPlay();
    }
  };

  const handlePause = () => {
    setIsPlaying(false);
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {/* YouTube Embed */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
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

      {/* Overlay para preview */}
      {isPreview && (
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-white font-semibold text-lg">{title}</h3>
                <p className="text-gray-200 text-sm">Preview disponível</p>
              </div>
              <button
                onClick={handlePlay}
                className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-3 transition-all duration-200 transform hover:scale-110"
              >
                <Play size={24} className="text-gray-800 ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Controles customizados (quando não é preview) */}
      {!isPreview && !isLocked && (
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 hover:opacity-100 transition-opacity">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                onClick={isPlaying ? handlePause : handlePlay}
                className="text-white hover:text-primary-400 transition-colors"
              >
                {isPlaying ? <Pause size={24} /> : <Play size={24} />}
              </button>
              
              <button
                onClick={handleMute}
                className="text-white hover:text-primary-400 transition-colors"
              >
                {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
            </div>

            <div className="flex items-center gap-3">
              <button className="text-white hover:text-primary-400 transition-colors">
                <Settings size={20} />
              </button>
              
              <button
                onClick={handleFullscreen}
                className="text-white hover:text-primary-400 transition-colors"
              >
                <Maximize size={20} />
              </button>
            </div>
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
    </div>
  );
}