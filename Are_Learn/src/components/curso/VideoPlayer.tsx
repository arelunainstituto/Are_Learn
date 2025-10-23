'use client';

import { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import { Play, Pause, Volume2, VolumeX, Maximize, Settings } from 'lucide-react';
import { Aula } from '@/types';

interface VideoPlayerProps {
  aula: Aula;
  onProgress?: (seconds: number) => void;
  onComplete?: () => void;
  initialTime?: number;
}

export function VideoPlayer({ aula, onProgress, onComplete, initialTime = 0 }: VideoPlayerProps) {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    if (!seeking) {
      setPlayed(state.played);
      if (onProgress) {
        onProgress(state.playedSeconds);
      }
    }
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleEnded = () => {
    if (onComplete) {
      onComplete();
    }
  };

  const formatTime = (seconds: number) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds().toString().padStart(2, '0');
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss}`;
    }
    return `${mm}:${ss}`;
  };

  const getVideoUrl = () => {
    switch (aula.video_provider) {
      case 'vimeo':
        return `https://vimeo.com/${aula.video_id}`;
      case 'youtube':
        return `https://www.youtube.com/watch?v=${aula.video_id}`;
      case 'mux':
        return aula.video_url;
      default:
        return aula.video_url;
    }
  };

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden group">
      {/* Player */}
      <div className="aspect-video">
        <ReactPlayer
          url={getVideoUrl()}
          width="100%"
          height="100%"
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={handleDuration}
          onEnded={handleEnded}
          progressInterval={5000}
          config={{
            vimeo: {
              playerOptions: {
                controls: false,
              },
            },
            youtube: {
              playerVars: {
                controls: 0,
              },
            },
          }}
        />
      </div>

      {/* Controles personalizados */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
        {/* Barra de progresso */}
        <div className="mb-4">
          <input
            type="range"
            min={0}
            max={0.999999}
            step="any"
            value={played}
            onChange={(e) => {
              setPlayed(parseFloat(e.target.value));
            }}
            onMouseDown={() => setSeeking(true)}
            onMouseUp={() => setSeeking(false)}
            className="w-full h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #0ea5e9 ${played * 100}%, rgba(255,255,255,0.3) ${played * 100}%)`,
            }}
          />
          <div className="flex justify-between text-xs text-white mt-1">
            <span>{formatTime(played * duration)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Botões de controle */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Play/Pause */}
            <button
              onClick={() => setPlaying(!playing)}
              className="text-white hover:text-primary-400 transition-colors"
            >
              {playing ? <Pause size={24} /> : <Play size={24} />}
            </button>

            {/* Volume */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setMuted(!muted)}
                className="text-white hover:text-primary-400 transition-colors"
              >
                {muted ? <VolumeX size={20} /> : <Volume2 size={20} />}
              </button>
              <input
                type="range"
                min={0}
                max={1}
                step={0.1}
                value={volume}
                onChange={(e) => setVolume(parseFloat(e.target.value))}
                className="w-20 h-1 bg-white/30 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Configurações */}
            <button className="text-white hover:text-primary-400 transition-colors">
              <Settings size={20} />
            </button>

            {/* Tela cheia */}
            <button className="text-white hover:text-primary-400 transition-colors">
              <Maximize size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Play button no centro (quando pausado) */}
      {!playing && (
        <div className="absolute inset-0 flex items-center justify-center">
          <button
            onClick={() => setPlaying(true)}
            className="w-16 h-16 rounded-full bg-primary-600 flex items-center justify-center text-white hover:bg-primary-700 transition-colors shadow-2xl"
          >
            <Play size={28} className="ml-1" />
          </button>
        </div>
      )}
    </div>
  );
}

