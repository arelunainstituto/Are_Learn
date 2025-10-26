'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Tenant, TenantContext as TenantContextType, UserContext, UseTenantReturn } from '@/types/roles';
import { getTenantBySubdomain, switchTenantDatabase, getTenantConnection } from '@/lib/tenant';

// Context para gerenciar tenant atual
const TenantContext = createContext<TenantContextType | null>(null);

// Context para informações do usuário e permissões
const UserContext = createContext<UserContext | null>(null);

// Provider principal que combina ambos os contextos
export function TenantProvider({ children }: { children: React.ReactNode }) {
  const [current_tenant, setCurrentTenant] = useState<Tenant | null>(null);
  const [available_tenants, setAvailableTenants] = useState<Tenant[]>([]);
  const [user_context, setUserContext] = useState<UserContext | null>(null);
  const [is_loading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  // Carregar tenants disponíveis
  const loadAvailableTenants = useCallback(async () => {
    try {
      // TODO: Implementar API call para buscar tenants
      // Por enquanto, mock data
      const mockTenants: Tenant[] = [
        {
          id: 'default-tenant',
          nome: 'AreLuna Padrão',
          slug: 'default',
          database_name: 'areluna_default',
          subdomain: undefined,
          primary_color: '#ffd700',
          secondary_color: '#a295b3',
          max_users: 1000,
          active_users: 0,
          status: 'active',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          last_activity: new Date().toISOString()
        }
      ];
      setAvailableTenants(mockTenants);
      
      // Definir tenant padrão imediatamente
      const defaultTenant = mockTenants[0];
      setCurrentTenant(defaultTenant);
      
      // Simular switch de database (sem localStorage no servidor)
      if (typeof window !== 'undefined') {
        await switchTenantDatabase(defaultTenant.id);
      }
      
      setIsLoading(false);
    } catch (err) {
      console.error('Erro ao carregar tenants:', err);
      setError('Erro ao carregar tenant');
      setIsLoading(false);
    }
  }, []);

  // Carregar contexto do usuário
  const loadUserContext = useCallback(async (tenantId?: string) => {
    try {
      // TODO: Implementar API call para buscar dados do usuário
      // Por enquanto, mock data
      const mockUserContext: UserContext = {
        id: 'user-1',
        email: 'admin@areluna.com',
        nome: 'Administrador',
        role: {
          id: 'role-1',
          nome: 'Site Admin',
          nivel: 1,
          descricao: 'Administrador do sistema',
          is_system_role: true,
          created_at: new Date().toISOString()
        },
        tenant_id: tenantId || current_tenant?.id,
        permissions: [],
        is_site_admin: true,
        is_tenant_admin: false,
        can_manage_tenant: true
      };
      setUserContext(mockUserContext);
    } catch (err) {
      console.error('Erro ao carregar contexto do usuário:', err);
    }
  }, [current_tenant?.id]);

  // Switch para outro tenant
  const switchTenant = useCallback(async (tenant_id: string) => {
    try {
      setIsLoading(true);
      setError(null);

      const tenant = available_tenants.find(t => t.id === tenant_id);
      if (!tenant) {
        throw new Error('Tenant não encontrado');
      }

      // Verificar se usuário tem permissão para acessar este tenant
      if (user_context && !user_context.is_site_admin && user_context.tenant_id !== tenant_id) {
        throw new Error('Sem permissão para acessar este tenant');
      }

      // Fazer switch do database
      await switchTenantDatabase(tenant_id);
      
      // Atualizar tenant atual
      setCurrentTenant(tenant);
      
      // Recarregar contexto do usuário
      await loadUserContext();
    } catch (err) {
      console.error('Erro ao fazer switch de tenant:', err);
      setError(err instanceof Error ? err.message : 'Erro ao trocar tenant');
    } finally {
      setIsLoading(false);
    }
  }, [available_tenants, user_context]);

  // Inicializar contextos
  useEffect(() => {
    const initialize = async () => {
      await loadAvailableTenants();
    };
    
    initialize();
  }, []); // Remover dependências que causam loop


  // Recarregar contexto do usuário quando tenant mudar
  useEffect(() => {
    if (current_tenant?.id) {
      loadUserContext(current_tenant.id);
    }
  }, [current_tenant?.id]);

  const tenantContextValue: TenantContextType = {
    current_tenant,
    available_tenants,
    switch_tenant: switchTenant,
    is_loading,
    error
  };

  return (
    <TenantContext.Provider value={tenantContextValue}>
      <UserContext.Provider value={user_context}>
        {children}
      </UserContext.Provider>
    </TenantContext.Provider>
  );
}

// Hook para usar contexto de tenant
export function useTenant(): UseTenantReturn {
  const tenantContext = useContext(TenantContext);
  const userContext = useContext(UserContext);

  if (!tenantContext) {
    throw new Error('useTenant deve ser usado dentro de TenantProvider');
  }

  // Verificar se usuário tem permissão
  const has_permission = useCallback((resource: string, action: string, resource_id?: string): boolean => {
    if (!userContext) return false;

    // Site Admin tem todas as permissões
    if (userContext.is_site_admin) return true;

    // Verificar permissões específicas
    // TODO: Implementar lógica de verificação de permissões
    return true; // Mock por enquanto
  }, [userContext]);

  // Verificar se pode gerenciar outro usuário
  const can_manage_user = useCallback((target_user_id: string): boolean => {
    if (!userContext) return false;
    
    // Site Admin pode gerenciar qualquer usuário
    if (userContext.is_site_admin) return true;
    
    // Tenant Admin pode gerenciar usuários do mesmo tenant
    if (userContext.is_tenant_admin) return true;
    
    return false;
  }, [userContext]);

  return {
    ...tenantContext,
    has_permission,
    can_manage_user,
    is_site_admin: userContext?.is_site_admin || false,
    is_tenant_admin: userContext?.is_tenant_admin || false,
    user_role: userContext?.role || null
  };
}

// Hook para usar apenas contexto de usuário
export function useUser(): UserContext | null {
  return useContext(UserContext);
}

// Hook para verificar se está carregando
export function useTenantLoading(): boolean {
  const context = useContext(TenantContext);
  return context?.is_loading || false;
}

// Hook para obter erro do tenant
export function useTenantError(): string | null {
  const context = useContext(TenantContext);
  return context?.error || null;
}

// Componente para mostrar loading
export function TenantLoadingFallback({ children }: { children: React.ReactNode }) {
  const isLoading = useTenantLoading();
  const error = useTenantError();

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey-50">
        <div className="text-center">
          <div className="text-red-500 text-xl mb-4">⚠️</div>
          <h2 className="text-xl font-bold text-grey-900 mb-2">Erro ao carregar tenant</h2>
          <p className="text-grey-600 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="bg-gold-500 text-white px-4 py-2 rounded-lg hover:bg-gold-600"
          >
            Tentar novamente
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-grey-50">
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-4 border-gold-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-grey-600">Carregando tenant...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
