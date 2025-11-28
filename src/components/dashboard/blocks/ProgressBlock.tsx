'use client';

import { useState, useEffect } from 'react';
import { TrendingUp, Award, Target, Clock, BookOpen, Star } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/Badge';

interface ProgressBlockProps {
  config?: {
    title?: string;
    show_stats?: boolean;
    show_achievements?: boolean;
    show_goals?: boolean;
  };
}

interface ProgressStats {
  total_courses: number;
  completed_courses: number;
  total_programs: number;
  completed_programs: number;
  total_time_watched: number;
  total_xp: number;
  current_level: number;
  level_progress: number;
  achievements_count: number;
  streak_days: number;
}

export function ProgressBlock({ config = {} }: ProgressBlockProps) {
  const [stats, setStats] = useState<ProgressStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data - substituir por dados reais
  const mockStats: ProgressStats = {
    total_courses: 12,
    completed_courses: 8,
    total_programs: 3,
    completed_programs: 1,
    total_time_watched: 45, // horas
    total_xp: 2450,
    current_level: 5,
    level_progress: 75,
    achievements_count: 15,
    streak_days: 7
  };

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setStats(mockStats);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatTime = (hours: number) => {
    if (hours < 1) return `${Math.round(hours * 60)}min`;
    if (hours < 24) return `${Math.round(hours)}h`;
    return `${Math.round(hours / 24)} dias`;
  };

  const getLevelColor = (level: number) => {
    if (level >= 10) return 'text-purple-600';
    if (level >= 5) return 'text-gold-600';
    if (level >= 3) return 'text-green-600';
    return 'text-blue-600';
  };

  if (isLoading) {
    return (
      <Card className="p-4">
        <div className="animate-pulse">
          <div className="h-6 bg-grey-200 rounded mb-4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-grey-200 rounded"></div>
            <div className="h-4 bg-grey-200 rounded"></div>
            <div className="h-4 bg-grey-200 rounded"></div>
          </div>
        </div>
      </Card>
    );
  }

  if (!stats) return null;

  return (
    <Card className="p-4 h-full">
      <div className="flex items-center gap-2 mb-4">
        <TrendingUp size={20} className="text-gold-500" />
        <h3 className="font-medium text-grey-900">
          {config.title || 'Meu Progresso'}
        </h3>
      </div>

      {/* Level Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Star size={16} className="text-gold-500" />
            <span className="text-sm font-medium text-grey-700">Nível {stats.current_level}</span>
          </div>
          <span className="text-sm text-grey-600">{stats.level_progress}%</span>
        </div>
        <ProgressBar value={stats.level_progress} />
        <div className="flex justify-between items-center mt-1 text-xs text-grey-500">
          <span>{stats.total_xp} XP</span>
          <span>Próximo nível: {stats.current_level + 1}</span>
        </div>
      </div>

      {/* Stats Grid */}
      {config.show_stats && (
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="text-center p-3 bg-grey-50 rounded-lg">
            <BookOpen size={20} className="text-blue-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-grey-900">{stats.completed_courses}</div>
            <div className="text-xs text-grey-600">Cursos Concluídos</div>
          </div>
          
          <div className="text-center p-3 bg-grey-50 rounded-lg">
            <Target size={20} className="text-green-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-grey-900">{stats.completed_programs}</div>
            <div className="text-xs text-grey-600">Programas</div>
          </div>
          
          <div className="text-center p-3 bg-grey-50 rounded-lg">
            <Clock size={20} className="text-purple-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-grey-900">{formatTime(stats.total_time_watched)}</div>
            <div className="text-xs text-grey-600">Tempo Assistido</div>
          </div>
          
          <div className="text-center p-3 bg-grey-50 rounded-lg">
            <Award size={20} className="text-gold-500 mx-auto mb-1" />
            <div className="text-lg font-bold text-grey-900">{stats.achievements_count}</div>
            <div className="text-xs text-grey-600">Conquistas</div>
          </div>
        </div>
      )}

      {/* Streak */}
      <div className="flex items-center justify-between p-3 bg-gradient-to-r from-gold-50 to-glossy-50 rounded-lg mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold-500 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-sm">🔥</span>
          </div>
          <div>
            <div className="font-medium text-grey-900">{stats.streak_days} dias</div>
            <div className="text-xs text-grey-600">Sequência de estudos</div>
          </div>
        </div>
        <Badge variant="primary" className="bg-gold-100 text-gold-800">
          Sequência Ativa
        </Badge>
      </div>

      {/* Recent Achievements */}
      {config.show_achievements && (
        <div>
          <h4 className="text-sm font-medium text-grey-700 mb-2">Conquistas Recentes</h4>
          <div className="space-y-2">
            <div className="flex items-center gap-2 p-2 bg-grey-50 rounded">
              <Award size={16} className="text-gold-500" />
              <div className="flex-1">
                <div className="text-sm font-medium text-grey-900">Primeiro Curso</div>
                <div className="text-xs text-grey-600">Concluído há 2 dias</div>
              </div>
            </div>
            
            <div className="flex items-center gap-2 p-2 bg-grey-50 rounded">
              <Star size={16} className="text-gold-500" />
              <div className="flex-1">
                <div className="text-sm font-medium text-grey-900">Nível 5</div>
                <div className="text-xs text-grey-600">Alcançado há 1 semana</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
