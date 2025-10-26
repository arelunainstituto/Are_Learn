'use client';

import { useMemo } from 'react';

interface LocalAvatarProps {
  name: string;
  size?: number;
  className?: string;
}

export function LocalAvatar({ name, size = 40, className = '' }: LocalAvatarProps) {
  const initials = useMemo(() => {
    return name
      .split(' ')
      .map(n => n.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  }, [name]);

  const backgroundColor = useMemo(() => {
    // Gerar cor baseada no nome para consistência
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const colors = [
      '#ffd700', '#a295b3', '#ff6b6b', '#4ecdc4', '#45b7d1', 
      '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'
    ];
    
    return colors[Math.abs(hash) % colors.length];
  }, [name]);

  return (
    <div
      className={`rounded-full flex items-center justify-center text-white font-bold ${className}`}
      style={{
        width: size,
        height: size,
        backgroundColor,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}
