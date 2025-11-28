'use client';

import { useState, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';

interface YouTubePlayerProps {
  videoId: string;
  title?: string;
  autoplay?: boolean;
  controls?: boolean;
  className?: string;
}

export function YouTubePlayer({ 
  videoId, 
  title = "Vídeo do Curso",
  autoplay = false,
  controls = true,
  className = ""
}: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const embedUrl = `https://www.youtube.com/embed/${videoId}?autoplay=${autoplay ? 1 : 0}&controls=${controls ? 1 : 0}&rel=0&modestbranding=1`;

  return (
    <div className={`relative bg-black rounded-lg overflow-hidden ${className}`}>
      {/* YouTube Embed */}
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <iframe
          src={embedUrl}
          title={title}
          className="absolute top-0 left-0 w-full h-full"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>

      {/* Overlay com controles customizados (opcional) */}
      {!controls && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="bg-white bg-opacity-90 hover:bg-opacity-100 rounded-full p-4 transition-all duration-200 transform hover:scale-110"
          >
            {isPlaying ? (
              <Pause size={32} className="text-gray-800" />
            ) : (
              <Play size={32} className="text-gray-800 ml-1" />
            )}
          </button>
        </div>
      )}

      {/* Informações do vídeo */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
        <h3 className="text-white font-medium text-lg mb-2">{title}</h3>
        <div className="flex items-center gap-4 text-white text-sm">
          <div className="flex items-center gap-2">
            <Play size={16} />
            <span>YouTube</span>
          </div>
          <div className="flex items-center gap-2">
            <Settings size={16} />
            <span>HD</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default YouTubePlayer;
