'use client';

import React from 'react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  categoryStats: Array<{
    category: string;
    title: string;
    totalTrails: number;
    completedTrails: number;
    completionRate: number;
  }>;
}

const categoryConfig = {
  'todos': {
    label: 'Todos',
    icon: '📚',
    color: 'bg-gray-100 text-gray-700 hover:bg-gray-200'
  },
  'clinico': {
    label: 'Clínicos',
    icon: '🦷',
    color: 'bg-red-100 text-red-700 hover:bg-red-200'
  },
  'corporativo': {
    label: 'Corporativos',
    icon: '🏛️',
    color: 'bg-blue-100 text-blue-700 hover:bg-blue-200'
  },
  'tecnologia': {
    label: 'Tecnologia',
    icon: '💻',
    color: 'bg-cyan-100 text-cyan-700 hover:bg-cyan-200'
  },
  'onboarding': {
    label: 'Onboarding',
    icon: '👋',
    color: 'bg-purple-100 text-purple-700 hover:bg-purple-200'
  },
  'soft-skills': {
    label: 'Soft Skills',
    icon: '💡',
    color: 'bg-green-100 text-green-700 hover:bg-green-200'
  }
};

export function CategoryFilter({ selectedCategory, onCategoryChange, categoryStats }: CategoryFilterProps) {
  return (
    <div className="mb-8">
      <h2 className="text-2xl font-brand font-bold text-grey-900 mb-6">
        Categorias de Treinamento
      </h2>
      
      <div className="flex flex-wrap gap-3 mb-6">
        {Object.entries(categoryConfig).map(([category, config]) => {
          const isSelected = selectedCategory === category;
          const stats = categoryStats.find(s => s.category === category);
          
          return (
            <Button
              key={category}
              onClick={() => onCategoryChange(category)}
              variant={isSelected ? 'primary' : 'outline'}
              className={`
                flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200
                ${isSelected 
                  ? 'bg-gold-500 text-white hover:bg-gold-600' 
                  : config.color
                }
                border-0
              `}
            >
              <span className="text-lg">{config.icon}</span>
              <span className="font-medium">{config.label}</span>
              {stats && (
                <Badge 
                  variant={isSelected ? 'secondary' : 'outline'}
                  className="ml-1 text-xs"
                >
                  {stats.totalTrails}
                </Badge>
              )}
            </Button>
          );
        })}
      </div>

      {/* Estatísticas da categoria selecionada */}
      {selectedCategory !== 'todos' && (
        <div className="bg-white rounded-lg border border-grey-200 p-4">
          {(() => {
            const stats = categoryStats.find(s => s.category === selectedCategory);
            const config = categoryConfig[selectedCategory as keyof typeof categoryConfig];
            
            if (!stats || !config) return null;
            
            return (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{config.icon}</span>
                  <div>
                    <h3 className="font-semibold text-grey-900">{config.label}</h3>
                    <p className="text-sm text-grey-600">
                      {stats.completedTrails} de {stats.totalTrails} trilhas concluídas
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gold-600">
                    {stats.completionRate}%
                  </div>
                  <div className="text-sm text-grey-600">Taxa de Conclusão</div>
                </div>
              </div>
            );
          })()}
        </div>
      )}
    </div>
  );
}
