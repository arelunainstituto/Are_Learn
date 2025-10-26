-- Schema de Dashboards Customizáveis - AreLuna INNSiDE
-- Baseado na arquitetura Open LMS

-- ============================================
-- TABELAS PRINCIPAIS
-- ============================================

-- Tabela de templates de dashboard
CREATE TABLE dashboard_templates (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    role VARCHAR(50) DEFAULT 'all' CHECK (role IN ('all', 'aluno', 'instrutor', 'admin')),
    is_default BOOLEAN DEFAULT false,
    is_system BOOLEAN DEFAULT false, -- templates do sistema não podem ser deletados
    created_by UUID REFERENCES usuarios(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de blocos do dashboard
CREATE TABLE dashboard_blocks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    dashboard_id UUID REFERENCES dashboard_templates(id) ON DELETE CASCADE,
    block_type VARCHAR(50) NOT NULL CHECK (block_type IN (
        'calendar', 'courses', 'progress', 'notifications', 'programs', 
        'achievements', 'recent_activity', 'upcoming_events', 'stats'
    )),
    config JSONB DEFAULT '{}', -- configurações específicas do bloco
    position_x INTEGER DEFAULT 0,
    position_y INTEGER DEFAULT 0,
    width INTEGER DEFAULT 4, -- em colunas (grid de 12)
    height INTEGER DEFAULT 3, -- em linhas
    ordem INTEGER DEFAULT 0,
    is_visible BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de dashboards personalizados por usuário
CREATE TABLE user_dashboards (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    dashboard_id UUID REFERENCES dashboard_templates(id) ON DELETE CASCADE,
    is_active BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações de bloco por usuário
CREATE TABLE user_block_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    block_id UUID REFERENCES dashboard_blocks(id) ON DELETE CASCADE,
    config JSONB DEFAULT '{}', -- configurações personalizadas do usuário
    is_visible BOOLEAN DEFAULT true,
    position_x INTEGER,
    position_y INTEGER,
    width INTEGER,
    height INTEGER,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, block_id)
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_dashboard_templates_tenant ON dashboard_templates(tenant_id);
CREATE INDEX idx_dashboard_templates_role ON dashboard_templates(role);
CREATE INDEX idx_dashboard_blocks_dashboard ON dashboard_blocks(dashboard_id);
CREATE INDEX idx_dashboard_blocks_type ON dashboard_blocks(block_type);
CREATE INDEX idx_user_dashboards_user ON user_dashboards(user_id);
CREATE INDEX idx_user_dashboards_active ON user_dashboards(is_active);
CREATE INDEX idx_user_block_settings_user ON user_block_settings(user_id);
CREATE INDEX idx_user_block_settings_block ON user_block_settings(block_id);

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

CREATE TRIGGER update_dashboard_templates_updated_at
    BEFORE UPDATE ON dashboard_templates
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_dashboard_blocks_updated_at
    BEFORE UPDATE ON dashboard_blocks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_user_block_settings_updated_at
    BEFORE UPDATE ON user_block_settings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- DADOS INICIAIS DO SISTEMA
-- ============================================

-- Inserir templates padrão do sistema
INSERT INTO dashboard_templates (nome, role, is_default, is_system) VALUES
('Dashboard Aluno', 'aluno', true, true),
('Dashboard Instrutor', 'instrutor', true, true),
('Dashboard Admin', 'admin', true, true);

-- Obter IDs dos templates criados
DO $$
DECLARE
    aluno_dashboard_id UUID;
    instrutor_dashboard_id UUID;
    admin_dashboard_id UUID;
BEGIN
    SELECT id INTO aluno_dashboard_id FROM dashboard_templates WHERE role = 'aluno' AND is_system = true;
    SELECT id INTO instrutor_dashboard_id FROM dashboard_templates WHERE role = 'instrutor' AND is_system = true;
    SELECT id INTO admin_dashboard_id FROM dashboard_templates WHERE role = 'admin' AND is_system = true;

    -- Blocos para Dashboard Aluno
    INSERT INTO dashboard_blocks (dashboard_id, block_type, config, position_x, position_y, width, height, ordem) VALUES
    (aluno_dashboard_id, 'courses', '{"title": "Meus Cursos", "show_progress": true}', 0, 0, 6, 4, 1),
    (aluno_dashboard_id, 'progress', '{"title": "Meu Progresso", "show_stats": true}', 6, 0, 6, 4, 2),
    (aluno_dashboard_id, 'programs', '{"title": "Programas", "show_enrolled": true}', 0, 4, 8, 3, 3),
    (aluno_dashboard_id, 'achievements', '{"title": "Conquistas", "show_recent": true}', 8, 4, 4, 3, 4),
    (aluno_dashboard_id, 'calendar', '{"title": "Calendário", "show_events": true}', 0, 7, 6, 3, 5),
    (aluno_dashboard_id, 'notifications', '{"title": "Notificações", "show_unread": true}', 6, 7, 6, 3, 6);

    -- Blocos para Dashboard Instrutor
    INSERT INTO dashboard_blocks (dashboard_id, block_type, config, position_x, position_y, width, height, ordem) VALUES
    (instrutor_dashboard_id, 'courses', '{"title": "Meus Cursos", "show_created": true}', 0, 0, 6, 4, 1),
    (instrutor_dashboard_id, 'stats', '{"title": "Estatísticas", "show_students": true}', 6, 0, 6, 4, 2),
    (instrutor_dashboard_id, 'recent_activity', '{"title": "Atividade Recente", "show_student_progress": true}', 0, 4, 8, 3, 3),
    (instrutor_dashboard_id, 'notifications', '{"title": "Notificações", "show_system": true}', 8, 4, 4, 3, 4),
    (instrutor_dashboard_id, 'calendar', '{"title": "Calendário", "show_events": true}', 0, 7, 12, 3, 5);

    -- Blocos para Dashboard Admin
    INSERT INTO dashboard_blocks (dashboard_id, block_type, config, position_x, position_y, width, height, ordem) VALUES
    (admin_dashboard_id, 'stats', '{"title": "Estatísticas Gerais", "show_users": true, "show_courses": true}', 0, 0, 6, 4, 1),
    (admin_dashboard_id, 'courses', '{"title": "Todos os Cursos", "show_all": true}', 6, 0, 6, 4, 2),
    (admin_dashboard_id, 'programs', '{"title": "Programas", "show_all": true}', 0, 4, 6, 3, 3),
    (admin_dashboard_id, 'recent_activity', '{"title": "Atividade Recente", "show_all": true}', 6, 4, 6, 3, 4),
    (admin_dashboard_id, 'notifications', '{"title": "Notificações", "show_system": true}', 0, 7, 6, 3, 5),
    (admin_dashboard_id, 'calendar', '{"title": "Calendário", "show_events": true}', 6, 7, 6, 3, 6);
END $$;

-- ============================================
-- FUNÇÕES DE UTILIDADE
-- ============================================

-- Função para obter dashboard do usuário
CREATE OR REPLACE FUNCTION get_user_dashboard(user_id UUID)
RETURNS TABLE(
    dashboard_id UUID,
    template_name VARCHAR,
    role VARCHAR,
    blocks JSONB
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        dt.id,
        dt.nome,
        dt.role,
        COALESCE(
            jsonb_agg(
                jsonb_build_object(
                    'id', db.id,
                    'type', db.block_type,
                    'config', db.config,
                    'position_x', db.position_x,
                    'position_y', db.position_y,
                    'width', db.width,
                    'height', db.height,
                    'order', db.ordem,
                    'visible', COALESCE(ubs.is_visible, db.is_visible),
                    'user_config', ubs.config
                ) ORDER BY db.ordem
            ) FILTER (WHERE db.id IS NOT NULL),
            '[]'::jsonb
        )
    FROM dashboard_templates dt
    LEFT JOIN dashboard_blocks db ON dt.id = db.dashboard_id
    LEFT JOIN user_block_settings ubs ON db.id = ubs.block_id AND ubs.user_id = get_user_dashboard.user_id
    WHERE dt.role = (
        SELECT r.nome FROM user_roles ur
        JOIN roles r ON ur.role_id = r.id
        WHERE ur.user_id = get_user_dashboard.user_id
        AND ur.is_active = true
        ORDER BY r.nivel
        LIMIT 1
    )
    AND dt.is_default = true
    GROUP BY dt.id, dt.nome, dt.role;
END;
$$ LANGUAGE plpgsql;

-- Função para criar dashboard personalizado
CREATE OR REPLACE FUNCTION create_custom_dashboard(
    user_id UUID,
    template_name VARCHAR,
    blocks_config JSONB
)
RETURNS UUID AS $$
DECLARE
    new_dashboard_id UUID;
    block_config JSONB;
    block_record RECORD;
BEGIN
    -- Criar novo template
    INSERT INTO dashboard_templates (nome, role, is_default, is_system, created_by)
    VALUES (
        template_name,
        (SELECT r.nome FROM user_roles ur JOIN roles r ON ur.role_id = r.id 
         WHERE ur.user_id = create_custom_dashboard.user_id AND ur.is_active = true 
         ORDER BY r.nivel LIMIT 1),
        false,
        false,
        user_id
    )
    RETURNING id INTO new_dashboard_id;

    -- Criar blocos
    FOR block_record IN SELECT * FROM jsonb_to_recordset(blocks_config) AS x(
        type VARCHAR,
        config JSONB,
        position_x INTEGER,
        position_y INTEGER,
        width INTEGER,
        height INTEGER,
        "order" INTEGER
    )
    LOOP
        INSERT INTO dashboard_blocks (
            dashboard_id, block_type, config, 
            position_x, position_y, width, height, ordem
        ) VALUES (
            new_dashboard_id,
            block_record.type,
            COALESCE(block_record.config, '{}'),
            COALESCE(block_record.position_x, 0),
            COALESCE(block_record.position_y, 0),
            COALESCE(block_record.width, 4),
            COALESCE(block_record.height, 3),
            COALESCE(block_record."order", 0)
        );
    END LOOP;

    -- Ativar dashboard para o usuário
    INSERT INTO user_dashboards (user_id, dashboard_id, is_active)
    VALUES (user_id, new_dashboard_id, true);

    RETURN new_dashboard_id;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar configurações de bloco do usuário
CREATE OR REPLACE FUNCTION update_user_block_settings(
    user_id UUID,
    block_id UUID,
    new_config JSONB,
    new_visible BOOLEAN DEFAULT NULL,
    new_position_x INTEGER DEFAULT NULL,
    new_position_y INTEGER DEFAULT NULL,
    new_width INTEGER DEFAULT NULL,
    new_height INTEGER DEFAULT NULL
)
RETURNS BOOLEAN AS $$
BEGIN
    INSERT INTO user_block_settings (
        user_id, block_id, config, is_visible, 
        position_x, position_y, width, height
    ) VALUES (
        user_id, block_id, new_config,
        COALESCE(new_visible, true),
        COALESCE(new_position_x, 0),
        COALESCE(new_position_y, 0),
        COALESCE(new_width, 4),
        COALESCE(new_height, 3)
    )
    ON CONFLICT (user_id, block_id)
    DO UPDATE SET
        config = COALESCE(update_user_block_settings.new_config, user_block_settings.config),
        is_visible = COALESCE(update_user_block_settings.new_visible, user_block_settings.is_visible),
        position_x = COALESCE(update_user_block_settings.new_position_x, user_block_settings.position_x),
        position_y = COALESCE(update_user_block_settings.new_position_y, user_block_settings.position_y),
        width = COALESCE(update_user_block_settings.new_width, user_block_settings.width),
        height = COALESCE(update_user_block_settings.new_height, user_block_settings.height),
        updated_at = CURRENT_TIMESTAMP;

    RETURN true;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE dashboard_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE dashboard_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_dashboards ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_block_settings ENABLE ROW LEVEL SECURITY;

-- Políticas para dashboard_templates
CREATE POLICY "Users can view templates in their tenant" ON dashboard_templates
    FOR SELECT TO authenticated
    USING (
        tenant_id IS NULL OR 
        tenant_id = (SELECT tenant_id FROM usuarios WHERE id = auth.uid())
    );

CREATE POLICY "Admins can manage templates in their tenant" ON dashboard_templates
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid() 
            AND r.nivel <= 2
            AND ur.tenant_id = dashboard_templates.tenant_id
            AND ur.is_active = true
        )
    );

-- Políticas para dashboard_blocks
CREATE POLICY "Users can view blocks of their dashboards" ON dashboard_blocks
    FOR SELECT TO authenticated
    USING (
        dashboard_id IN (
            SELECT id FROM dashboard_templates 
            WHERE tenant_id IS NULL OR tenant_id = (SELECT tenant_id FROM usuarios WHERE id = auth.uid())
        )
    );

-- Políticas para user_dashboards
CREATE POLICY "Users can view their own dashboards" ON user_dashboards
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own dashboards" ON user_dashboards
    FOR ALL TO authenticated
    USING (user_id = auth.uid());

-- Políticas para user_block_settings
CREATE POLICY "Users can view their own block settings" ON user_block_settings
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can manage their own block settings" ON user_block_settings
    FOR ALL TO authenticated
    USING (user_id = auth.uid());

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View para dashboard completo do usuário
CREATE VIEW user_dashboard_complete AS
SELECT 
    ud.user_id,
    dt.id as dashboard_id,
    dt.nome as dashboard_name,
    dt.role,
    jsonb_agg(
        jsonb_build_object(
            'id', db.id,
            'type', db.block_type,
            'config', COALESCE(ubs.config, db.config),
            'position_x', COALESCE(ubs.position_x, db.position_x),
            'position_y', COALESCE(ubs.position_y, db.position_y),
            'width', COALESCE(ubs.width, db.width),
            'height', COALESCE(ubs.height, db.height),
            'order', db.ordem,
            'visible', COALESCE(ubs.is_visible, db.is_visible)
        ) ORDER BY db.ordem
    ) as blocks
FROM user_dashboards ud
JOIN dashboard_templates dt ON ud.dashboard_id = dt.id
LEFT JOIN dashboard_blocks db ON dt.id = db.dashboard_id
LEFT JOIN user_block_settings ubs ON db.id = ubs.block_id AND ubs.user_id = ud.user_id
WHERE ud.is_active = true
GROUP BY ud.user_id, dt.id, dt.nome, dt.role;

-- View para estatísticas de uso de dashboards
CREATE VIEW dashboard_usage_stats AS
SELECT 
    dt.id,
    dt.nome,
    dt.role,
    dt.tenant_id,
    COUNT(DISTINCT ud.user_id) as active_users,
    COUNT(DISTINCT db.id) as total_blocks,
    AVG(jsonb_array_length(COALESCE(ubs.config, '{}'))) as avg_customizations
FROM dashboard_templates dt
LEFT JOIN user_dashboards ud ON dt.id = ud.dashboard_id AND ud.is_active = true
LEFT JOIN dashboard_blocks db ON dt.id = db.dashboard_id
LEFT JOIN user_block_settings ubs ON db.id = ubs.block_id
GROUP BY dt.id, dt.nome, dt.role, dt.tenant_id;

-- ============================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- ============================================

COMMENT ON TABLE dashboard_templates IS 'Templates de dashboard por role e tenant';
COMMENT ON COLUMN dashboard_templates.role IS 'Role que pode usar este dashboard: all, aluno, instrutor, admin';
COMMENT ON COLUMN dashboard_templates.is_system IS 'Templates do sistema não podem ser deletados';

COMMENT ON TABLE dashboard_blocks IS 'Blocos que compõem um dashboard';
COMMENT ON COLUMN dashboard_blocks.block_type IS 'Tipo do bloco: calendar, courses, progress, notifications, etc.';
COMMENT ON COLUMN dashboard_blocks.config IS 'Configurações específicas do bloco em JSONB';
COMMENT ON COLUMN dashboard_blocks.position_x IS 'Posição X no grid (0-11)';
COMMENT ON COLUMN dashboard_blocks.position_y IS 'Posição Y no grid';
COMMENT ON COLUMN dashboard_blocks.width IS 'Largura em colunas (1-12)';
COMMENT ON COLUMN dashboard_blocks.height IS 'Altura em linhas';

COMMENT ON TABLE user_dashboards IS 'Dashboards ativos por usuário';
COMMENT ON TABLE user_block_settings IS 'Configurações personalizadas de blocos por usuário';
