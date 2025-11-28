'use client';

import { useState, useEffect } from 'react';
import { DashboardBlock } from '@/types';
import { CalendarBlock } from './blocks/CalendarBlock';
import { CoursesOverviewBlock } from './blocks/CoursesOverviewBlock';
import { ProgressBlock } from './blocks/ProgressBlock';

interface DashboardRendererProps {
  blocks: DashboardBlock[];
  isEditable?: boolean;
  onBlockUpdate?: (blockId: string, updates: Partial<DashboardBlock>) => void;
  onBlockRemove?: (blockId: string) => void;
}

export function DashboardRenderer({ 
  blocks, 
  isEditable = false, 
  onBlockUpdate, 
  onBlockRemove 
}: DashboardRendererProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const renderBlock = (block: DashboardBlock) => {
    const commonProps = {
      config: block.config,
      key: block.id
    };

    switch (block.block_type) {
      case 'calendar':
        return <CalendarBlock {...commonProps} />;
      
      case 'courses':
        return <CoursesOverviewBlock {...commonProps} />;
      
      case 'progress':
        return <ProgressBlock {...commonProps} />;
      
      case 'notifications':
        return <NotificationsBlock {...commonProps} />;
      
      case 'programs':
        return <ProgramsBlock {...commonProps} />;
      
      case 'achievements':
        return <AchievementsBlock {...commonProps} />;
      
      case 'recent_activity':
        return <RecentActivityBlock {...commonProps} />;
      
      case 'upcoming_events':
        return <UpcomingEventsBlock {...commonProps} />;
      
      case 'stats':
        return <StatsBlock {...commonProps} />;
      
      default:
        return (
          <div className="p-4 border-2 border-dashed border-grey-300 rounded-lg text-center">
            <p className="text-grey-500">Bloco não implementado: {block.block_type}</p>
          </div>
        );
    }
  };

  const getGridCols = (width: number) => {
    const cols = Math.min(12, Math.max(1, width));
    return `col-span-${cols}`;
  };

  const getGridRows = (height: number) => {
    const rows = Math.min(6, Math.max(1, height));
    return `row-span-${rows}`;
  };

  if (isLoading) {
    return (
      <div className="grid grid-cols-12 gap-4 p-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="col-span-4">
            <div className="animate-pulse">
              <div className="h-32 bg-grey-200 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (blocks.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="w-16 h-16 bg-grey-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">📊</span>
          </div>
          <h3 className="text-lg font-medium text-grey-900 mb-2">
            Nenhum bloco configurado
          </h3>
          <p className="text-grey-600">
            Adicione blocos para personalizar seu dashboard
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-12 gap-4 p-4">
      {blocks
        .filter(block => block.is_visible)
        .sort((a, b) => a.ordem - b.ordem)
        .map((block) => (
          <div
            key={block.id}
            className={`
              ${getGridCols(block.width)}
              ${getGridRows(block.height)}
              ${isEditable ? 'relative group' : ''}
            `}
            style={{
              gridColumnStart: block.position_x + 1,
              gridRowStart: block.position_y + 1
            }}
          >
            {isEditable && (
              <div className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="flex gap-1">
                  <button
                    onClick={() => onBlockUpdate?.(block.id, { is_visible: !block.is_visible })}
                    className="w-6 h-6 bg-white rounded shadow-sm flex items-center justify-center text-xs hover:bg-grey-50"
                    title={block.is_visible ? 'Ocultar' : 'Mostrar'}
                  >
                    {block.is_visible ? '👁️' : '🙈'}
                  </button>
                  <button
                    onClick={() => onBlockRemove?.(block.id)}
                    className="w-6 h-6 bg-red-100 text-red-600 rounded shadow-sm flex items-center justify-center text-xs hover:bg-red-200"
                    title="Remover"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
            
            {renderBlock(block)}
          </div>
        ))}
    </div>
  );
}

// Placeholder components - implementar conforme necessário
function NotificationsBlock({ config }: { config?: any }) {
  return (
    <div className="p-4 border-2 border-dashed border-grey-300 rounded-lg text-center">
      <p className="text-grey-500">Notifications Block - {JSON.stringify(config)}</p>
    </div>
  );
}

function ProgramsBlock({ config }: { config?: any }) {
  return (
    <div className="p-4 border-2 border-dashed border-grey-300 rounded-lg text-center">
      <p className="text-grey-500">Programs Block - {JSON.stringify(config)}</p>
    </div>
  );
}

function AchievementsBlock({ config }: { config?: any }) {
  return (
    <div className="p-4 border-2 border-dashed border-grey-300 rounded-lg text-center">
      <p className="text-grey-500">Achievements Block - {JSON.stringify(config)}</p>
    </div>
  );
}

function RecentActivityBlock({ config }: { config?: any }) {
  return (
    <div className="p-4 border-2 border-dashed border-grey-300 rounded-lg text-center">
      <p className="text-grey-500">Recent Activity Block - {JSON.stringify(config)}</p>
    </div>
  );
}

function UpcomingEventsBlock({ config }: { config?: any }) {
  return (
    <div className="p-4 border-2 border-dashed border-grey-300 rounded-lg text-center">
      <p className="text-grey-500">Upcoming Events Block - {JSON.stringify(config)}</p>
    </div>
  );
}

function StatsBlock({ config }: { config?: any }) {
  return (
    <div className="p-4 border-2 border-dashed border-grey-300 rounded-lg text-center">
      <p className="text-grey-500">Stats Block - {JSON.stringify(config)}</p>
    </div>
  );
}
