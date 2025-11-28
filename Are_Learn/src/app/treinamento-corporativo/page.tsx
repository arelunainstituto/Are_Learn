'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SafeImage } from '@/components/ui/SafeImage';
import { Card, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { ProgressBar } from '@/components/ui/ProgressBar';
import { CategoryFilter } from '@/components/treinamento/CategoryFilter';
import { 
  Clock, 
  BookOpen, 
  Award, 
  Users, 
  PlayCircle,
  CheckCircle,
  Star,
  Trophy
} from 'lucide-react';
import { 
  allModules, 
  achievements, 
  getTrailsByCategory, 
  getCategoryStats,
  calculateProgress 
} from '@/lib/corporate-training';

export default function TreinamentoCorporativoPage() {
  const [selectedCategory, setSelectedCategory] = useState('todos');

  // Mock data - substituir por dados reais do usuário
  const userProgress = [
    {
      userId: 'user-1',
      trailId: 'etica-conduta',
      completedVideos: ['etica-01', 'etica-02'],
      completedMaterials: ['etica-guia'],
      quizScore: 85,
      completedAt: undefined
    },
    {
      userId: 'user-1',
      trailId: 'seguranca-paciente',
      completedVideos: ['seguranca-01'],
      completedMaterials: ['seguranca-manual'],
      quizScore: 90,
      completedAt: undefined
    }
  ];

  const userAchievements = [
    achievements[0], // Primeira trilha
    achievements[1]  // Mestre da Ética
  ];

  const totalPoints = userAchievements.reduce((sum, achievement) => sum + achievement.points, 0);
  const categoryStats = getCategoryStats();

  // Filtrar trilhas baseado na categoria selecionada
  const filteredTrails = selectedCategory === 'todos' 
    ? allModules.flatMap(module => module.trilhas)
    : getTrailsByCategory(selectedCategory);

  // Calcular estatísticas gerais
  const totalTrails = allModules.flatMap(module => module.trilhas).length;
  const totalTime = allModules.reduce((sum, module) => sum + module.totalEstimatedTime, 0);
  const completedTrails = userProgress.length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-20">
        <div className="container-custom">
          <div className="max-w-4xl">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-white bg-opacity-20 rounded-full p-3">
                <Award size={32} />
              </div>
              <Badge variant="secondary" className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
                Módulo Corporativo
              </Badge>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-brand font-bold mb-6">
              Grade Curricular Completa AreLuna
            </h1>
            <p className="text-xl text-blue-100 mb-8">
              Capacitação completa em todas as áreas: clínica, corporativa, tecnologia, onboarding e soft skills. 
              Desenvolva suas competências e contribua para um ambiente de trabalho excelente.
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm">
              <div className="flex items-center gap-2">
                <Clock size={18} />
                <span>{totalTime} min total</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={18} />
                <span>{totalTrails} trilhas</span>
              </div>
              <div className="flex items-center gap-2">
                <Users size={18} />
                <span>Para todos os colaboradores</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Progress Overview */}
      <section className="bg-white border-b border-gray-200">
        <div className="container-custom py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-3xl font-brand font-bold text-blue-600 mb-2">
                {completedTrails}/{totalTrails}
              </div>
              <div className="text-gray-600">Trilhas Iniciadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-brand font-bold text-green-600 mb-2">
                {userAchievements.length}
              </div>
              <div className="text-gray-600">Conquistas Desbloqueadas</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-brand font-bold text-purple-600 mb-2">
                {totalPoints}
              </div>
              <div className="text-gray-600">Pontos Totais</div>
            </div>
          </div>
        </div>
      </section>

      {/* Conquistas */}
      {userAchievements.length > 0 && (
        <section className="bg-gradient-to-r from-yellow-50 to-orange-50 border-b border-gray-200">
          <div className="container-custom py-12">
            <h2 className="text-2xl font-brand font-bold text-gray-900 mb-6 text-center">
              🏆 Suas Conquistas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {userAchievements.map((achievement) => (
                <div key={achievement.id} className="bg-white rounded-lg p-4 shadow-sm border border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="text-2xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <div className="flex items-center gap-1 mt-2">
                        <Star size={14} className="text-yellow-500" />
                        <span className="text-sm font-medium text-gray-700">{achievement.points} pontos</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Filtros por Categoria */}
      <section className="container-custom py-8">
        <CategoryFilter 
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          categoryStats={categoryStats}
        />
      </section>

      {/* Trilhas de Aprendizado */}
      <section className="container-custom py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-brand font-bold text-gray-900 mb-4">
            {selectedCategory === 'todos' ? 'Todas as Trilhas' : `Trilhas ${categoryStats.find(s => s.category === selectedCategory)?.title || ''}`}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {selectedCategory === 'todos' 
              ? 'Explore todos os nossos módulos organizados por temas. Cada trilha foi cuidadosamente desenvolvida para maximizar seu aprendizado e aplicação prática.'
              : `Explore as trilhas específicas da categoria ${categoryStats.find(s => s.category === selectedCategory)?.title || ''}.`
            }
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTrails.map((trilha, index) => {
            const progress = userProgress.find(p => p.trailId === trilha.id);
            const isCompleted = progress?.completedVideos.length === trilha.videos.length;
            const progressPercentage = progress ? 
              Math.round(((progress.completedVideos.length + progress.completedMaterials.length) / 
                (trilha.videos.length + trilha.materials.length)) * 100) : 0;

            return (
              <Card key={trilha.id} className="group hover:shadow-lg transition-all duration-300">
                <CardContent className="p-6">
                  {/* Header da Trilha */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                        style={{ backgroundColor: `${trilha.color}20`, color: trilha.color }}
                      >
                        {trilha.icon}
                      </div>
                      <div>
                        <h3 className="font-brand font-bold text-gray-900 text-lg">
                          {trilha.nome}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {trilha.estimatedTime} min • {trilha.videos.length} vídeos
                        </p>
                        <Badge variant="outline" className="text-xs mt-1">
                          {trilha.category}
                        </Badge>
                      </div>
                    </div>
                    
                    {isCompleted && (
                      <div className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        <CheckCircle size={14} className="inline mr-1" />
                        Concluída
                      </div>
                    )}
                  </div>

                  {/* Descrição */}
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2">
                    {trilha.description}
                  </p>

                  {/* Progress Bar */}
                  {progress && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                        <span>Progresso</span>
                        <span>{progressPercentage}%</span>
                      </div>
                      <ProgressBar value={progressPercentage} size="sm" />
                    </div>
                  )}

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {progress?.completedVideos.length || 0}/{trilha.videos.length}
                      </div>
                      <div className="text-xs text-gray-600">Vídeos</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-semibold text-gray-900">
                        {progress?.completedMaterials.length || 0}/{trilha.materials.length}
                      </div>
                      <div className="text-xs text-gray-600">Materiais</div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <Link href={`/treinamento-corporativo/${trilha.id}`}>
                    <Button 
                      variant={isCompleted ? "outline" : "primary"} 
                      className="w-full"
                    >
                      {isCompleted ? (
                        <>
                          <CheckCircle size={18} className="mr-2" />
                          Revisar Conteúdo
                        </>
                      ) : progress ? (
                        <>
                          <PlayCircle size={18} className="mr-2" />
                          Continuar Trilha
                        </>
                      ) : (
                        <>
                          <PlayCircle size={18} className="mr-2" />
                          Iniciar Trilha
                        </>
                      )}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-brand font-bold mb-4">
            Pronto para começar sua jornada?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Desenvolva suas competências profissionais e contribua para um ambiente 
            de trabalho cada vez melhor.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/treinamento-corporativo/conquistas">
              <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
                <Trophy size={20} className="mr-2" />
                Ver Conquistas
              </Button>
            </Link>
            <Link href="/treinamento-corporativo/certificados">
              <Button variant="outline" size="lg" className="border-white text-white hover:bg-white hover:text-blue-600">
                <Award size={20} className="mr-2" />
                Ver Certificados
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
