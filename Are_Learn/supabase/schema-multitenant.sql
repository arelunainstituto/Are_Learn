-- AreLuna Multi-Tenant Database Schema
-- Database de controle central para gerenciar múltiplos tenants

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELA DE TENANTS (Database Central)
-- ============================================

CREATE TABLE tenants (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    slug VARCHAR(100) UNIQUE NOT NULL,
    database_name VARCHAR(100) UNIQUE NOT NULL,
    subdomain VARCHAR(100) UNIQUE,
    logo TEXT,
    primary_color VARCHAR(7) DEFAULT '#ffd700',
    secondary_color VARCHAR(7) DEFAULT '#a295b3',
    favicon TEXT,
    max_users INTEGER DEFAULT 1000,
    active_users INTEGER DEFAULT 0,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'suspended', 'maintenance')),
    site_admin_id UUID,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_activity TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- SISTEMA DE ROLES E PERMISSÕES
-- ============================================

-- Tabela de roles hierárquicos
CREATE TABLE roles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    nivel INTEGER NOT NULL, -- 1=Site Admin, 2=Tenant Admin, 3=Instrutor, 4=Aluno
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    descricao TEXT,
    is_system_role BOOLEAN DEFAULT false, -- roles do sistema não podem ser deletados
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de permissões granulares
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL, -- 'tenant', 'course', 'user', 'report', etc.
    action VARCHAR(50) NOT NULL, -- 'create', 'read', 'update', 'delete', 'manage'
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Relacionamento entre roles e permissões
CREATE TABLE role_permissions (
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES permissions(id) ON DELETE CASCADE,
    granted BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (role_id, permission_id)
);

-- ============================================
-- FUNÇÕES PARA PROVISIONAMENTO DE TENANT
-- ============================================

-- Função para criar novo tenant database
CREATE OR REPLACE FUNCTION create_tenant_database(tenant_slug VARCHAR, tenant_name VARCHAR)
RETURNS UUID AS $$
DECLARE
    tenant_id UUID;
    db_name VARCHAR;
    sql_command TEXT;
BEGIN
    -- Gerar ID do tenant
    tenant_id := uuid_generate_v4();
    
    -- Nome do database (prefixo + slug)
    db_name := 'areluna_tenant_' || replace(tenant_slug, '-', '_');
    
    -- Inserir tenant na tabela central
    INSERT INTO tenants (id, nome, slug, database_name, subdomain)
    VALUES (tenant_id, tenant_name, tenant_slug, db_name, tenant_slug);
    
    -- Criar database para o tenant
    sql_command := 'CREATE DATABASE ' || quote_ident(db_name);
    EXECUTE sql_command;
    
    -- Conectar ao novo database e criar schema
    -- (Esta parte seria executada via script externo ou função administrativa)
    
    RETURN tenant_id;
END;
$$ LANGUAGE plpgsql;

-- Função para deletar tenant database
CREATE OR REPLACE FUNCTION delete_tenant_database(tenant_uuid UUID)
RETURNS BOOLEAN AS $$
DECLARE
    db_name VARCHAR;
    sql_command TEXT;
BEGIN
    -- Buscar nome do database
    SELECT database_name INTO db_name FROM tenants WHERE id = tenant_uuid;
    
    IF db_name IS NULL THEN
        RETURN false;
    END IF;
    
    -- Marcar tenant como deletado
    UPDATE tenants SET status = 'suspended' WHERE id = tenant_uuid;
    
    -- Dropar database (cuidado em produção!)
    sql_command := 'DROP DATABASE IF EXISTS ' || quote_ident(db_name);
    EXECUTE sql_command;
    
    -- Deletar registro do tenant
    DELETE FROM tenants WHERE id = tenant_uuid;
    
    RETURN true;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ÍNDICES E TRIGGERS
-- ============================================

-- Índices para performance
CREATE INDEX idx_tenants_slug ON tenants(slug);
CREATE INDEX idx_tenants_subdomain ON tenants(subdomain);
CREATE INDEX idx_tenants_status ON tenants(status);
CREATE INDEX idx_roles_tenant ON roles(tenant_id);
CREATE INDEX idx_permissions_tenant ON permissions(tenant_id);

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_tenants_updated_at
    BEFORE UPDATE ON tenants
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DADOS INICIAIS
-- ============================================

-- Inserir roles do sistema
INSERT INTO roles (nome, nivel, descricao, is_system_role) VALUES
('Site Admin', 1, 'Administrador do sistema com acesso total', true),
('Tenant Admin', 2, 'Administrador do tenant com acesso limitado', true),
('Instrutor', 3, 'Criador e gerenciador de cursos', true),
('Aluno', 4, 'Usuário final da plataforma', true);

-- Inserir permissões básicas
INSERT INTO permissions (nome, resource, action, description) VALUES
-- Site Admin permissions
('manage_tenants', 'tenant', 'manage', 'Gerenciar todos os tenants'),
('view_cross_tenant_reports', 'report', 'read', 'Visualizar relatórios cross-tenant'),
('manage_site_settings', 'site', 'manage', 'Gerenciar configurações do site'),

-- Tenant Admin permissions
('manage_tenant_users', 'user', 'manage', 'Gerenciar usuários do tenant'),
('manage_tenant_courses', 'course', 'manage', 'Gerenciar cursos do tenant'),
('view_tenant_reports', 'report', 'read', 'Visualizar relatórios do tenant'),
('manage_tenant_settings', 'tenant', 'update', 'Gerenciar configurações do tenant'),

-- Instrutor permissions
('create_courses', 'course', 'create', 'Criar novos cursos'),
('manage_own_courses', 'course', 'update', 'Gerenciar próprios cursos'),
('view_student_progress', 'progress', 'read', 'Visualizar progresso dos alunos'),

-- Aluno permissions
('enroll_courses', 'course', 'read', 'Se inscrever em cursos'),
('view_own_progress', 'progress', 'read', 'Visualizar próprio progresso'),
('access_course_content', 'content', 'read', 'Acessar conteúdo dos cursos');

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS nas tabelas
ALTER TABLE tenants ENABLE ROW LEVEL SECURITY;
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;

-- Políticas de segurança para tenants
CREATE POLICY "Site admins can view all tenants" ON tenants
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON r.nome = 'Site Admin'
            WHERE u.id = auth.uid() AND r.nivel = 1
        )
    );

-- Políticas para roles (apenas Site Admin pode gerenciar)
CREATE POLICY "Site admins can manage roles" ON roles
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM usuarios u
            JOIN roles r ON r.nome = 'Site Admin'
            WHERE u.id = auth.uid() AND r.nivel = 1
        )
    );

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View para estatísticas de tenants
CREATE VIEW tenant_stats AS
SELECT 
    t.id,
    t.nome,
    t.slug,
    t.active_users,
    t.max_users,
    ROUND((t.active_users::DECIMAL / t.max_users) * 100, 2) as usage_percentage,
    t.status,
    t.last_activity,
    COUNT(DISTINCT u.id) as total_users
FROM tenants t
LEFT JOIN usuarios u ON u.tenant_id = t.id
GROUP BY t.id, t.nome, t.slug, t.active_users, t.max_users, t.status, t.last_activity;

-- View para permissões por role
CREATE VIEW role_permission_matrix AS
SELECT 
    r.nome as role_name,
    r.nivel,
    p.resource,
    p.action,
    rp.granted
FROM roles r
LEFT JOIN role_permissions rp ON r.id = rp.role_id
LEFT JOIN permissions p ON rp.permission_id = p.id
ORDER BY r.nivel, p.resource, p.action;

-- ============================================
-- FUNÇÕES DE UTILIDADE
-- ============================================

-- Função para verificar se usuário tem permissão
CREATE OR REPLACE FUNCTION user_has_permission(
    user_id UUID,
    resource_name VARCHAR,
    action_name VARCHAR,
    tenant_uuid UUID DEFAULT NULL
)
RETURNS BOOLEAN AS $$
DECLARE
    has_permission BOOLEAN := false;
BEGIN
    SELECT EXISTS (
        SELECT 1
        FROM usuarios u
        JOIN roles r ON r.id = u.role_id
        JOIN role_permissions rp ON r.id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE u.id = user_id
        AND p.resource = resource_name
        AND p.action = action_name
        AND (tenant_uuid IS NULL OR p.tenant_id = tenant_uuid)
        AND rp.granted = true
    ) INTO has_permission;
    
    RETURN has_permission;
END;
$$ LANGUAGE plpgsql;

-- Função para obter tenant do usuário
CREATE OR REPLACE FUNCTION get_user_tenant(user_id UUID)
RETURNS UUID AS $$
DECLARE
    tenant_id UUID;
BEGIN
    SELECT u.tenant_id INTO tenant_id
    FROM usuarios u
    WHERE u.id = user_id;
    
    RETURN tenant_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- ============================================

COMMENT ON TABLE tenants IS 'Tabela central de controle de tenants - cada tenant tem seu próprio database';
COMMENT ON COLUMN tenants.database_name IS 'Nome do database PostgreSQL para este tenant';
COMMENT ON COLUMN tenants.subdomain IS 'Subdomínio para acesso ao tenant (ex: empresa.areluna.com)';
COMMENT ON COLUMN tenants.max_users IS 'Limite máximo de usuários ativos para este tenant';
COMMENT ON COLUMN tenants.active_users IS 'Contador de usuários ativos (atualizado via trigger)';

COMMENT ON TABLE roles IS 'Sistema hierárquico de roles: Site Admin > Tenant Admin > Instrutor > Aluno';
COMMENT ON COLUMN roles.nivel IS 'Nível hierárquico: 1=Site Admin, 2=Tenant Admin, 3=Instrutor, 4=Aluno';

COMMENT ON TABLE permissions IS 'Permissões granulares por recurso e ação';
COMMENT ON COLUMN permissions.resource IS 'Recurso protegido: tenant, course, user, report, etc.';
COMMENT ON COLUMN permissions.action IS 'Ação permitida: create, read, update, delete, manage';
