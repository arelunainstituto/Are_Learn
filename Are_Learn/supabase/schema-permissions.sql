-- Sistema de Permissões Granulares - AreLuna INNSiDE
-- Baseado na arquitetura Open LMS

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
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de permissões granulares
CREATE TABLE permissions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(100) NOT NULL,
    resource VARCHAR(100) NOT NULL, -- 'tenant', 'course', 'user', 'report', etc.
    action VARCHAR(50) NOT NULL, -- 'create', 'read', 'update', 'delete', 'manage'
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    description TEXT,
    is_system_permission BOOLEAN DEFAULT false,
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

-- Tabela para usuários e seus roles
CREATE TABLE user_roles (
    user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    role_id UUID REFERENCES roles(id) ON DELETE CASCADE,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    assigned_by UUID REFERENCES usuarios(id),
    assigned_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP WITH TIME ZONE,
    is_active BOOLEAN DEFAULT true,
    PRIMARY KEY (user_id, role_id, tenant_id)
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_roles_tenant ON roles(tenant_id);
CREATE INDEX idx_roles_nivel ON roles(nivel);
CREATE INDEX idx_permissions_tenant ON permissions(tenant_id);
CREATE INDEX idx_permissions_resource ON permissions(resource);
CREATE INDEX idx_permissions_action ON permissions(action);
CREATE INDEX idx_user_roles_user ON user_roles(user_id);
CREATE INDEX idx_user_roles_tenant ON user_roles(tenant_id);
CREATE INDEX idx_user_roles_active ON user_roles(is_active);

-- ============================================
-- TRIGGERS PARA AUDITORIA
-- ============================================

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_roles_updated_at
    BEFORE UPDATE ON roles
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DADOS INICIAIS DO SISTEMA
-- ============================================

-- Inserir roles do sistema (Site Admin)
INSERT INTO roles (nome, nivel, descricao, is_system_role) VALUES
('Site Admin', 1, 'Administrador do sistema com acesso total', true),
('Tenant Admin', 2, 'Administrador do tenant com acesso limitado', true),
('Instrutor', 3, 'Criador e gerenciador de cursos', true),
('Aluno', 4, 'Usuário final da plataforma', true);

-- Inserir permissões do sistema
INSERT INTO permissions (nome, resource, action, description, is_system_permission) VALUES
-- Site Admin permissions
('manage_tenants', 'tenant', 'manage', 'Gerenciar todos os tenants', true),
('view_cross_tenant_reports', 'report', 'read', 'Visualizar relatórios cross-tenant', true),
('manage_site_settings', 'site', 'manage', 'Gerenciar configurações do site', true),
('manage_all_users', 'user', 'manage', 'Gerenciar usuários de todos os tenants', true),

-- Tenant Admin permissions
('manage_tenant_users', 'user', 'manage', 'Gerenciar usuários do tenant', true),
('manage_tenant_courses', 'course', 'manage', 'Gerenciar cursos do tenant', true),
('manage_tenant_programs', 'program', 'manage', 'Gerenciar programas do tenant', true),
('view_tenant_reports', 'report', 'read', 'Visualizar relatórios do tenant', true),
('manage_tenant_settings', 'tenant', 'update', 'Gerenciar configurações do tenant', true),
('manage_tenant_dashboards', 'dashboard', 'manage', 'Gerenciar dashboards do tenant', true),
('manage_tenant_cohorts', 'cohort', 'manage', 'Gerenciar cohorts do tenant', true),

-- Instrutor permissions
('create_courses', 'course', 'create', 'Criar novos cursos', true),
('manage_own_courses', 'course', 'update', 'Gerenciar próprios cursos', true),
('view_student_progress', 'progress', 'read', 'Visualizar progresso dos alunos', true),
('manage_quizzes', 'quiz', 'manage', 'Gerenciar quizzes', true),
('view_own_reports', 'report', 'read', 'Visualizar relatórios próprios', true),

-- Aluno permissions
('enroll_courses', 'course', 'read', 'Se inscrever em cursos', true),
('enroll_programs', 'program', 'read', 'Se inscrever em programas', true),
('view_own_progress', 'progress', 'read', 'Visualizar próprio progresso', true),
('access_course_content', 'content', 'read', 'Acessar conteúdo dos cursos', true),
('take_quizzes', 'quiz', 'read', 'Realizar quizzes', true),
('view_own_dashboard', 'dashboard', 'read', 'Visualizar próprio dashboard', true);

-- ============================================
-- ATRIBUIR PERMISSÕES AOS ROLES
-- ============================================

-- Site Admin: todas as permissões
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.nome = 'Site Admin';

-- Tenant Admin: permissões limitadas ao tenant
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.nome = 'Tenant Admin'
AND p.nome IN (
    'manage_tenant_users',
    'manage_tenant_courses',
    'manage_tenant_programs',
    'view_tenant_reports',
    'manage_tenant_settings',
    'manage_tenant_dashboards',
    'manage_tenant_cohorts'
);

-- Instrutor: permissões de criação e gestão de cursos
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.nome = 'Instrutor'
AND p.nome IN (
    'create_courses',
    'manage_own_courses',
    'view_student_progress',
    'manage_quizzes',
    'view_own_reports'
);

-- Aluno: permissões básicas de acesso
INSERT INTO role_permissions (role_id, permission_id)
SELECT r.id, p.id
FROM roles r, permissions p
WHERE r.nome = 'Aluno'
AND p.nome IN (
    'enroll_courses',
    'enroll_programs',
    'view_own_progress',
    'access_course_content',
    'take_quizzes',
    'view_own_dashboard'
);

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE role_permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_roles ENABLE ROW LEVEL SECURITY;

-- Políticas para roles
CREATE POLICY "Users can view roles in their tenant" ON roles
    FOR SELECT TO authenticated
    USING (
        tenant_id IS NULL OR 
        tenant_id = (SELECT tenant_id FROM usuarios WHERE id = auth.uid())
    );

CREATE POLICY "Site admins can manage all roles" ON roles
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid() 
            AND r.nome = 'Site Admin'
            AND ur.is_active = true
        )
    );

-- Políticas para permissions
CREATE POLICY "Users can view permissions in their tenant" ON permissions
    FOR SELECT TO authenticated
    USING (
        tenant_id IS NULL OR 
        tenant_id = (SELECT tenant_id FROM usuarios WHERE id = auth.uid())
    );

-- Políticas para user_roles
CREATE POLICY "Users can view their own roles" ON user_roles
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Tenant admins can manage user roles in their tenant" ON user_roles
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid() 
            AND r.nivel <= 2
            AND ur.tenant_id = user_roles.tenant_id
            AND ur.is_active = true
        )
    );

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
        FROM user_roles ur
        JOIN role_permissions rp ON ur.role_id = rp.role_id
        JOIN permissions p ON rp.permission_id = p.id
        WHERE ur.user_id = user_id
        AND ur.is_active = true
        AND (ur.expires_at IS NULL OR ur.expires_at > CURRENT_TIMESTAMP)
        AND p.resource = resource_name
        AND p.action = action_name
        AND (tenant_uuid IS NULL OR ur.tenant_id = tenant_uuid)
        AND rp.granted = true
    ) INTO has_permission;
    
    RETURN has_permission;
END;
$$ LANGUAGE plpgsql;

-- Função para obter roles do usuário
CREATE OR REPLACE FUNCTION get_user_roles(user_id UUID, tenant_uuid UUID DEFAULT NULL)
RETURNS TABLE(role_id UUID, role_name VARCHAR, nivel INTEGER) AS $$
BEGIN
    RETURN QUERY
    SELECT r.id, r.nome, r.nivel
    FROM user_roles ur
    JOIN roles r ON ur.role_id = r.id
    WHERE ur.user_id = user_id
    AND ur.is_active = true
    AND (ur.expires_at IS NULL OR ur.expires_at > CURRENT_TIMESTAMP)
    AND (tenant_uuid IS NULL OR ur.tenant_id = tenant_uuid);
END;
$$ LANGUAGE plpgsql;

-- Função para verificar se usuário é Site Admin
CREATE OR REPLACE FUNCTION is_site_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = user_id
        AND r.nome = 'Site Admin'
        AND ur.is_active = true
    );
END;
$$ LANGUAGE plpgsql;

-- Função para verificar se usuário é Tenant Admin
CREATE OR REPLACE FUNCTION is_tenant_admin(user_id UUID, tenant_uuid UUID)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1
        FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = user_id
        AND ur.tenant_id = tenant_uuid
        AND r.nivel <= 2
        AND ur.is_active = true
    );
END;
$$ LANGUAGE plpgsql;

-- Função para atribuir role a usuário
CREATE OR REPLACE FUNCTION assign_user_role(
    target_user_id UUID,
    role_name VARCHAR,
    tenant_uuid UUID,
    assigned_by_user_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    role_id UUID;
    success BOOLEAN := false;
BEGIN
    -- Buscar ID do role
    SELECT id INTO role_id FROM roles WHERE nome = role_name;
    
    IF role_id IS NULL THEN
        RETURN false;
    END IF;
    
    -- Verificar se quem está atribuindo tem permissão
    IF NOT user_has_permission(assigned_by_user_id, 'user', 'manage', tenant_uuid) THEN
        RETURN false;
    END IF;
    
    -- Atribuir role
    INSERT INTO user_roles (user_id, role_id, tenant_id, assigned_by)
    VALUES (target_user_id, role_id, tenant_uuid, assigned_by_user_id)
    ON CONFLICT (user_id, role_id, tenant_id) 
    DO UPDATE SET 
        is_active = true,
        assigned_by = assigned_by_user_id,
        assigned_at = CURRENT_TIMESTAMP;
    
    success := true;
    RETURN success;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View para matriz de permissões por role
CREATE VIEW role_permission_matrix AS
SELECT 
    r.nome as role_name,
    r.nivel,
    p.resource,
    p.action,
    rp.granted,
    p.description
FROM roles r
LEFT JOIN role_permissions rp ON r.id = rp.role_id
LEFT JOIN permissions p ON rp.permission_id = p.id
ORDER BY r.nivel, p.resource, p.action;

-- View para usuários e seus roles
CREATE VIEW user_role_details AS
SELECT 
    u.id as user_id,
    u.nome as user_name,
    u.email,
    r.nome as role_name,
    r.nivel,
    ur.tenant_id,
    ur.assigned_at,
    ur.expires_at,
    ur.is_active
FROM usuarios u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE ur.is_active = true;

-- View para permissões do usuário atual
CREATE VIEW current_user_permissions AS
SELECT 
    p.resource,
    p.action,
    p.description,
    r.nome as role_name
FROM user_roles ur
JOIN role_permissions rp ON ur.role_id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
JOIN roles r ON ur.role_id = r.id
WHERE ur.user_id = auth.uid()
AND ur.is_active = true
AND rp.granted = true;

-- ============================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- ============================================

COMMENT ON TABLE roles IS 'Sistema hierárquico de roles: Site Admin > Tenant Admin > Instrutor > Aluno';
COMMENT ON COLUMN roles.nivel IS 'Nível hierárquico: 1=Site Admin, 2=Tenant Admin, 3=Instrutor, 4=Aluno';
COMMENT ON COLUMN roles.is_system_role IS 'Roles do sistema não podem ser deletados';

COMMENT ON TABLE permissions IS 'Permissões granulares por recurso e ação';
COMMENT ON COLUMN permissions.resource IS 'Recurso protegido: tenant, course, user, report, etc.';
COMMENT ON COLUMN permissions.action IS 'Ação permitida: create, read, update, delete, manage';

COMMENT ON TABLE user_roles IS 'Atribuição de roles a usuários por tenant';
COMMENT ON COLUMN user_roles.expires_at IS 'Data de expiração do role (NULL = permanente)';
COMMENT ON COLUMN user_roles.is_active IS 'Se o role está ativo para o usuário';
