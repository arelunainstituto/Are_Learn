'use client';

import { useState, useEffect } from 'react';
import { Settings, Plus, Edit, Eye } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { DashboardRenderer } from '@/components/dashboard/DashboardRenderer';
import { DashboardTemplate, DashboardBlock } from '@/types';
import { useTenant } from '@/contexts/TenantContext';

export default function DashboardPage() {
  const { user_role, is_tenant_admin } = useTenant();
  const [dashboard, setDashboard] = useState<DashboardTemplate | null>(null);
  const [blocks, setBlocks] = useState<DashboardBlock[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  // Mock data - substituir por dados reais do Supabase
  const mockDashboard: DashboardTemplate = {
    id: 'dashboard-1',
    nome: 'Dashboard Principal',
    tenant_id: 'default-tenant',
    role: 'aluno',
    is_default: true,
    created_at: '2024-01-01'
  };

  const mockBlocks: DashboardBlock[] = [
    {
      id: 'block-1',
      dashboard_id: 'dashboard-1',
      block_type: 'courses',
      config: {
        title: 'Meus Cursos',
        show_progress: true,
        show_stats: true,
        max_courses: 3
      },
      position_x: 0,
      position_y: 0,
      width: 6,
      height: 4,
      ordem: 1,
      is_visible: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: 'block-2',
      dashboard_id: 'dashboard-1',
      block_type: 'progress',
      config: {
        title: 'Meu Progresso',
        show_stats: true,
        show_achievements: true
      },
      position_x: 6,
      position_y: 0,
      width: 6,
      height: 4,
      ordem: 2,
      is_visible: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: 'block-3',
      dashboard_id: 'dashboard-1',
      block_type: 'calendar',
      config: {
        title: 'Calendário',
        show_events: true,
        show_calendar: false,
        max_events: 5
      },
      position_x: 0,
      position_y: 4,
      width: 8,
      height: 3,
      ordem: 3,
      is_visible: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    },
    {
      id: 'block-4',
      dashboard_id: 'dashboard-1',
      block_type: 'notifications',
      config: {
        title: 'Notificações',
        show_unread: true,
        max_notifications: 5
      },
      position_x: 8,
      position_y: 4,
      width: 4,
      height: 3,
      ordem: 4,
      is_visible: true,
      created_at: '2024-01-01',
      updated_at: '2024-01-01'
    }
  ];

  useEffect(() => {
    // Simular carregamento
    const timer = setTimeout(() => {
      setDashboard(mockDashboard);
      setBlocks(mockBlocks);
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleBlockUpdate = (blockId: string, updates: Partial<DashboardBlock>) => {
    setBlocks(blocks.map(block => 
      block.id === blockId ? { ...block, ...updates } : block
    ));
  };

  const handleBlockRemove = (blockId: string) => {
    setBlocks(blocks.filter(block => block.id !== blockId));
  };

  const handleSaveDashboard = async () => {
    try {
      // TODO: Implementar API call para salvar dashboard
      console.log('Salvando dashboard:', { dashboard, blocks });
      setIsEditMode(false);
    } catch (error) {
      console.error('Erro ao salvar dashboard:', error);
    }
  };

  const canEdit = is_tenant_admin || user_role?.nivel === 1; // Site Admin ou Tenant Admin

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse">
          <div className="h-8 bg-grey-200 rounded mb-6"></div>
          <div className="grid grid-cols-12 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="col-span-4">
                <div className="h-32 bg-grey-200 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-brand font-bold text-grey-900">
            Dashboard
          </h1>
          <p className="text-grey-600">
            {dashboard?.nome || 'Seu painel personalizado'}
          </p>
        </div>

        <div className="flex items-center gap-3">
          {canEdit && (
            <>
              <Button
                variant="outline"
                onClick={() => setIsEditMode(!isEditMode)}
                className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
              >
                {isEditMode ? (
                  <>
                    <Eye size={16} className="mr-2" />
                    Visualizar
                  </>
                ) : (
                  <>
                    <Edit size={16} className="mr-2" />
                    Editar
                  </>
                )}
              </Button>

              {isEditMode && (
                <Button
                  variant="primary"
                  onClick={handleSaveDashboard}
                  className="bg-gold-500 hover:bg-gold-600 text-white"
                >
                  Salvar Alterações
                </Button>
              )}
            </>
          )}

          <Button
            variant="outline"
            className="border-grey-300 text-grey-700 hover:border-gold-500 hover:text-gold-500"
          >
            <Settings size={16} className="mr-2" />
            Configurações
          </Button>
        </div>
      </div>

      {/* Dashboard Content */}
      <DashboardRenderer
        blocks={blocks}
        isEditable={isEditMode}
        onBlockUpdate={handleBlockUpdate}
        onBlockRemove={handleBlockRemove}
      />

      {/* Add Block Button (Edit Mode) */}
      {isEditMode && (
        <div className="mt-6 text-center">
          <Button
            variant="outline"
            className="border-dashed border-grey-300 text-grey-600 hover:border-gold-500 hover:text-gold-500"
          >
            <Plus size={16} className="mr-2" />
            Adicionar Bloco
          </Button>
        </div>
      )}
    </div>
  );
}