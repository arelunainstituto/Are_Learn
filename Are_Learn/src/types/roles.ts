// Sistema de Roles e Permissões - AreLuna INNSiDE
// Baseado na arquitetura Open LMS

export type RoleLevel = 1 | 2 | 3 | 4;

export interface Role {
  id: string;
  nome: string;
  nivel: RoleLevel;
  tenant_id?: string;
  descricao: string;
  is_system_role: boolean;
  created_at: string;
}

export interface Permission {
  id: string;
  nome: string;
  resource: string;
  action: string;
  tenant_id?: string;
  description: string;
  created_at: string;
}

export interface RolePermission {
  role_id: string;
  permission_id: string;
  granted: boolean;
  created_at: string;
}

// Hierarquia de roles
export const ROLE_HIERARCHY = {
  SITE_ADMIN: {
    nivel: 1,
    nome: 'Site Admin',
    descricao: 'Administrador do sistema com acesso total'
  },
  TENANT_ADMIN: {
    nivel: 2,
    nome: 'Tenant Admin', 
    descricao: 'Administrador do tenant com acesso limitado'
  },
  INSTRUTOR: {
    nivel: 3,
    nome: 'Instrutor',
    descricao: 'Criador e gerenciador de cursos'
  },
  ALUNO: {
    nivel: 4,
    nome: 'Aluno',
    descricao: 'Usuário final da plataforma'
  }
} as const;

// Recursos do sistema
export const RESOURCES = {
  TENANT: 'tenant',
  COURSE: 'course',
  USER: 'user',
  REPORT: 'report',
  PROGRAM: 'program',
  QUIZ: 'quiz',
  DASHBOARD: 'dashboard',
  COHORT: 'cohort',
  SITE: 'site'
} as const;

// Ações possíveis
export const ACTIONS = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  MANAGE: 'manage'
} as const;

// Permissões do Site Admin
export const SITE_ADMIN_PERMISSIONS = [
  { resource: RESOURCES.TENANT, action: ACTIONS.MANAGE },
  { resource: RESOURCES.REPORT, action: ACTIONS.READ, cross_tenant: true },
  { resource: RESOURCES.SITE, action: ACTIONS.MANAGE },
  { resource: RESOURCES.USER, action: ACTIONS.MANAGE, cross_tenant: true }
];

// Permissões do Tenant Admin
export const TENANT_ADMIN_PERMISSIONS = [
  { resource: RESOURCES.USER, action: ACTIONS.MANAGE },
  { resource: RESOURCES.COURSE, action: ACTIONS.MANAGE },
  { resource: RESOURCES.PROGRAM, action: ACTIONS.MANAGE },
  { resource: RESOURCES.REPORT, action: ACTIONS.READ },
  { resource: RESOURCES.TENANT, action: ACTIONS.UPDATE },
  { resource: RESOURCES.DASHBOARD, action: ACTIONS.MANAGE },
  { resource: RESOURCES.COHORT, action: ACTIONS.MANAGE }
];

// Permissões do Instrutor
export const INSTRUTOR_PERMISSIONS = [
  { resource: RESOURCES.COURSE, action: ACTIONS.CREATE },
  { resource: RESOURCES.COURSE, action: ACTIONS.UPDATE, own_only: true },
  { resource: RESOURCES.QUIZ, action: ACTIONS.MANAGE },
  { resource: RESOURCES.REPORT, action: ACTIONS.READ, limited: true }
];

// Permissões do Aluno
export const ALUNO_PERMISSIONS = [
  { resource: RESOURCES.COURSE, action: ACTIONS.READ },
  { resource: RESOURCES.PROGRAM, action: ACTIONS.READ },
  { resource: RESOURCES.QUIZ, action: ACTIONS.READ },
  { resource: RESOURCES.DASHBOARD, action: ACTIONS.READ }
];

// Interface para verificação de permissões
export interface PermissionCheck {
  user_id: string;
  resource: string;
  action: string;
  tenant_id?: string;
  resource_id?: string; // Para verificar se é "own_only"
}

// Interface para contexto de usuário
export interface UserContext {
  id: string;
  email: string;
  nome: string;
  role: Role;
  tenant_id?: string;
  permissions: Permission[];
  is_site_admin: boolean;
  is_tenant_admin: boolean;
  can_manage_tenant: boolean;
}

// Funções de utilidade para roles
export const isSiteAdmin = (role: Role): boolean => role.nivel === 1;
export const isTenantAdmin = (role: Role): boolean => role.nivel === 2;
export const isInstrutor = (role: Role): boolean => role.nivel === 3;
export const isAluno = (role: Role): boolean => role.nivel === 4;

// Verificar se role tem nível suficiente
export const hasRoleLevel = (userRole: Role, requiredLevel: RoleLevel): boolean => {
  return userRole.nivel <= requiredLevel;
};

// Verificar se pode gerenciar outro usuário
export const canManageUser = (managerRole: Role, targetRole: Role): boolean => {
  return managerRole.nivel < targetRole.nivel;
};

// Verificar se pode acessar recurso cross-tenant
export const canAccessCrossTenant = (role: Role): boolean => {
  return role.nivel <= 2; // Apenas Site Admin e Tenant Admin
};

// Interface para tenant
export interface Tenant {
  id: string;
  nome: string;
  slug: string;
  database_name: string;
  subdomain?: string;
  logo?: string;
  primary_color: string;
  secondary_color: string;
  favicon?: string;
  max_users: number;
  active_users: number;
  status: 'active' | 'suspended' | 'maintenance';
  site_admin_id?: string;
  created_at: string;
  updated_at: string;
  last_activity: string;
}

// Interface para estatísticas de tenant
export interface TenantStats {
  id: string;
  nome: string;
  slug: string;
  active_users: number;
  max_users: number;
  usage_percentage: number;
  status: string;
  last_activity: string;
  total_users: number;
}

// Interface para matriz de permissões
export interface RolePermissionMatrix {
  role_name: string;
  nivel: number;
  resource: string;
  action: string;
  granted: boolean;
}

// Constantes para validação
export const VALID_ROLES = Object.values(ROLE_HIERARCHY).map(r => r.nome);
export const VALID_RESOURCES = Object.values(RESOURCES);
export const VALID_ACTIONS = Object.values(ACTIONS);

// Função para validar role
export const isValidRole = (role: string): boolean => {
  return VALID_ROLES.includes(role);
};

// Função para validar resource
export const isValidResource = (resource: string): boolean => {
  return VALID_RESOURCES.includes(resource);
};

// Função para validar action
export const isValidAction = (action: string): boolean => {
  return VALID_ACTIONS.includes(action);
};

// Interface para contexto de tenant
export interface TenantContext {
  current_tenant: Tenant | null;
  available_tenants: Tenant[];
  switch_tenant: (tenant_id: string) => Promise<void>;
  is_loading: boolean;
  error: string | null;
}

// Hook para usar contexto de tenant
export interface UseTenantReturn extends TenantContext {
  has_permission: (resource: string, action: string, resource_id?: string) => boolean;
  can_manage_user: (target_user_id: string) => boolean;
  is_site_admin: boolean;
  is_tenant_admin: boolean;
  user_role: Role | null;
}
