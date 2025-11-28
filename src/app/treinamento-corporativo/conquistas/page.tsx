import React from 'react';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { 
  Trophy, 
  Star, 
  Award, 
  Target,
  ArrowLeft,
  Share2,
  Download
} from 'lucide-react';
import Link from 'next/link';
import { achievements, getCategoryStats } from '@/lib/corporate-training';

// Mock data para demonstração - usando as conquistas expandidas
const userAchievements = achievements.map(achievement => ({
  ...achievement,
  earnedAt: Math.random() > 0.5 ? '2024-01-15' : null,
  isEarned: Math.random() > 0.5
}));

export default function ConquistasPage() {
  const earnedAchievements = userAchievements.filter(a => a.isEarned);
  const totalPoints = earnedAchievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const totalAchievements = userAchievements.length;
  const earnedCount = earnedAchievements.length;
  const progressPercentage = Math.round((earnedCount / totalAchievements) * 100);
  const categoryStats = getCategoryStats();

  // Agrupar conquistas por categoria
  const achievementsByCategory = userAchievements.reduce((acc, achievement) => {
    const category = achievement.category || 'geral';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(achievement);
    return acc;
  }, {} as Record<string, typeof userAchievements>);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-yellow-400 via-orange-500 to-red-500 text-white py-20">
        <div className="container-custom">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/treinamento-corporativo">
              <Button variant="ghost" className="text-white hover:bg-white hover:bg-opacity-20">
                <ArrowLeft size={20} className="mr-2" />
                Voltar ao Treinamento
              </Button>
            </Link>
          </div>
          
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <Trophy size={32} />
              </div>
              <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
                Sistema de Conquistas
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Suas Conquistas
            </h1>
            <p className="text-xl text-yellow-100 mb-8">
              Celebre seu progresso e conquiste novas habilidades. Cada conquista 
              representa um marco importante na sua jornada de aprendizado.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Star size={18} />
                <span>{totalPoints} pontos totais</span>
              </div>
              <div className="flex items-center gap-2">
                <Award size={18} />
                <span>{earnedCount}/{totalAchievements} conquistas</span>
              </div>
              <div className="flex items-center gap-2">
                <Target size={18} />
                <span>{progressPercentage}% completo</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-yellow-600 mb-2">
                {totalPoints}
              </div>
              <div className="text-gray-600">Pontos Totais</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-green-600 mb-2">
                {earnedCount}
              </div>
              <div className="text-gray-600">Conquistas Desbloqueadas</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-brand font-bold text-blue-600 mb-2">
                {progressPercentage}%
              </div>
              <div className="text-gray-600">Progresso Geral</div>
            </div>
          </div>
        </div>
      </section>

      <div className="container-custom py-16">
        {/* Progress Bar */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-brand font-bold text-gray-900">
                Progresso Geral
              </h2>
              <Badge variant="info">
                {earnedCount} de {totalAchievements} conquistas
              </Badge>
            </div>
            <ProgressBar value={progressPercentage} />
            <p className="text-sm text-gray-600 mt-2">
              Continue completando trilhas para desbloquear mais conquistas!
            </p>
          </CardContent>
        </Card>

        {/* Conquistas por Categoria */}
        <Card className="mb-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-brand font-bold text-gray-900 mb-6">
              Conquistas por Categoria
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Object.entries(achievementsByCategory).map(([category, categoryAchievements]) => {
                const earnedInCategory = categoryAchievements.filter(a => a.isEarned).length;
                const totalInCategory = categoryAchievements.length;
                const categoryProgress = Math.round((earnedInCategory / totalInCategory) * 100);
                
                const categoryConfig = {
                  'clinico': { icon: '🦷', color: 'bg-red-100 text-red-700', name: 'Clínicos' },
                  'corporativo': { icon: '🏛️', color: 'bg-blue-100 text-blue-700', name: 'Corporativos' },
                  'tecnologia': { icon: '💻', color: 'bg-cyan-100 text-cyan-700', name: 'Tecnologia' },
                  'onboarding': { icon: '👋', color: 'bg-purple-100 text-purple-700', name: 'Onboarding' },
                  'soft-skills': { icon: '💡', color: 'bg-green-100 text-green-700', name: 'Soft Skills' },
                  'geral': { icon: '🏆', color: 'bg-yellow-100 text-yellow-700', name: 'Geral' }
                };
                
                const config = categoryConfig[category as keyof typeof categoryConfig] || categoryConfig.geral;
                
                return (
                  <div key={category} className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`p-2 rounded-lg ${config.color}`}>
                        <span className="text-xl">{config.icon}</span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{config.name}</h3>
                        <p className="text-sm text-gray-600">{earnedInCategory}/{totalInCategory} conquistas</p>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Progresso</span>
                        <span className="font-semibold text-gray-900">{categoryProgress}%</span>
                      </div>
                      <ProgressBar value={categoryProgress} size="sm" />
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Pontos</span>
                        <span className="font-semibold text-gray-900">
                          {categoryAchievements.filter(a => a.isEarned).reduce((sum, a) => sum + a.points, 0)}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {userAchievements.map((achievement) => (
            <Card 
              key={achievement.id} 
              className={`group hover:shadow-lg transition-all duration-300 ${
                achievement.isEarned 
                  ? 'border-green-200 bg-green-50' 
                  : 'border-gray-200 bg-gray-50'
              }`}
            >
              <CardContent className="p-6">
                {/* Achievement Icon */}
                <div className="text-center mb-4">
                  <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center text-3xl mb-3 ${
                    achievement.isEarned 
                      ? 'bg-green-100 text-green-600' 
                      : 'bg-gray-100 text-gray-400'
                  }`}>
                    {achievement.icon}
                  </div>
                  
                  {achievement.isEarned && (
                    <Badge variant="success" className="mb-2">
                      <Star size={14} className="mr-1" />
                      Conquistada
                    </Badge>
                  )}
                </div>

                {/* Achievement Info */}
                <div className="text-center mb-4">
                  <h3 className="text-lg font-brand font-bold text-gray-900 mb-2">
                    {achievement.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {achievement.description}
                  </p>
                  
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star size={16} className="text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {achievement.points} pontos
                    </span>
                  </div>
                  
                  {achievement.category && (
                    <Badge variant="outline" className="text-xs">
                      {achievement.category}
                    </Badge>
                  )}
                </div>

                {/* Achievement Status */}
                <div className="text-center">
                  {achievement.isEarned ? (
                    <div className="space-y-2">
                      <p className="text-xs text-green-600 font-medium">
                        Conquistada em {achievement.earnedAt}
                      </p>
                      <div className="flex gap-2 justify-center">
                        <Button variant="outline" size="sm">
                          <Share2 size={14} className="mr-1" />
                          Compartilhar
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download size={14} className="mr-1" />
                          Certificado
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <p className="text-xs text-gray-500">
                        Continue treinando para desbloquear
                      </p>
                      <Button variant="ghost" size="sm" disabled>
                        <Target size={14} className="mr-1" />
                        Em Progresso
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
            <CardContent className="p-8">
              <h2 className="text-2xl font-brand font-bold text-gray-900 mb-4">
                Continue sua jornada de aprendizado!
              </h2>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Cada trilha completada te aproxima de novas conquistas. 
                Explore nossos módulos e desenvolva suas competências profissionais.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/treinamento-corporativo">
                  <Button variant="primary" size="lg">
                    <Award size={20} className="mr-2" />
                    Continuar Treinamento
                  </Button>
                </Link>
                <Button variant="outline" size="lg">
                  <Share2 size={20} className="mr-2" />
                  Compartilhar Conquistas
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
