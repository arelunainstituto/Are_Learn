-- Schema de Programas e Trilhas de Aprendizagem - AreLuna INNSiDE
-- Baseado na arquitetura Open LMS

-- ============================================
-- TABELAS PRINCIPAIS
-- ============================================

-- Tabela de programas (trilhas de aprendizagem)
CREATE TABLE programs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    imagem TEXT,
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    enrollment_type VARCHAR(20) DEFAULT 'manual' CHECK (enrollment_type IN ('manual', 'self', 'approval')),
    certificate_template_id UUID,
    created_by UUID REFERENCES usuarios(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de course sets (conjuntos de cursos aninhados)
CREATE TABLE course_sets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
    parent_set_id UUID REFERENCES course_sets(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    completion_type VARCHAR(20) DEFAULT 'all_in_order' CHECK (completion_type IN ('all_in_order', 'all_any_order', 'at_least_x', 'min_points')),
    required_count INTEGER,
    required_points INTEGER,
    ordem INTEGER NOT NULL,
    completion_delay_days INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens dentro dos course sets
CREATE TABLE course_set_items (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    course_set_id UUID REFERENCES course_sets(id) ON DELETE CASCADE,
    curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
    points INTEGER DEFAULT 0,
    is_required BOOLEAN DEFAULT true,
    ordem INTEGER NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de enrollments em programas
CREATE TABLE program_enrollments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    program_id UUID REFERENCES programs(id) ON DELETE CASCADE,
    user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'completed', 'suspended')),
    progress_percentage DECIMAL(5,2) DEFAULT 0.00,
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP WITH TIME ZONE,
    total_points INTEGER DEFAULT 0,
    earned_points INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de progresso por course set
CREATE TABLE course_set_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID REFERENCES program_enrollments(id) ON DELETE CASCADE,
    course_set_id UUID REFERENCES course_sets(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de progresso por item do course set
CREATE TABLE course_set_item_progress (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    enrollment_id UUID REFERENCES program_enrollments(id) ON DELETE CASCADE,
    course_set_item_id UUID REFERENCES course_set_items(id) ON DELETE CASCADE,
    is_completed BOOLEAN DEFAULT false,
    completed_at TIMESTAMP WITH TIME ZONE,
    points_earned INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_programs_tenant ON programs(tenant_id);
CREATE INDEX idx_programs_status ON programs(status);
CREATE INDEX idx_programs_created_by ON programs(created_by);
CREATE INDEX idx_course_sets_program ON course_sets(program_id);
CREATE INDEX idx_course_sets_parent ON course_sets(parent_set_id);
CREATE INDEX idx_course_set_items_set ON course_set_items(course_set_id);
CREATE INDEX idx_course_set_items_curso ON course_set_items(curso_id);
CREATE INDEX idx_program_enrollments_program ON program_enrollments(program_id);
CREATE INDEX idx_program_enrollments_user ON program_enrollments(user_id);
CREATE INDEX idx_program_enrollments_status ON program_enrollments(status);
CREATE INDEX idx_course_set_progress_enrollment ON course_set_progress(enrollment_id);
CREATE INDEX idx_course_set_progress_set ON course_set_progress(course_set_id);
CREATE INDEX idx_course_set_item_progress_enrollment ON course_set_item_progress(enrollment_id);
CREATE INDEX idx_course_set_item_progress_item ON course_set_item_progress(course_set_item_id);

-- ============================================
-- TRIGGERS PARA AUDITORIA E CÁLCULOS
-- ============================================

-- Trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_programs_updated_at
    BEFORE UPDATE ON programs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_set_progress_updated_at
    BEFORE UPDATE ON course_set_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_course_set_item_progress_updated_at
    BEFORE UPDATE ON course_set_item_progress
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para calcular progresso do programa
CREATE OR REPLACE FUNCTION calculate_program_progress()
RETURNS TRIGGER AS $$
DECLARE
    program_id UUID;
    total_points INTEGER;
    earned_points INTEGER;
    progress_percentage DECIMAL(5,2);
BEGIN
    -- Obter program_id do enrollment
    SELECT pe.program_id INTO program_id
    FROM program_enrollments pe
    WHERE pe.id = NEW.enrollment_id;
    
    -- Calcular pontos totais e ganhos
    SELECT 
        COALESCE(SUM(csi.points), 0),
        COALESCE(SUM(csip.points_earned), 0)
    INTO total_points, earned_points
    FROM course_set_items csi
    LEFT JOIN course_set_item_progress csip ON csi.id = csip.course_set_item_id
    WHERE csi.course_set_id IN (
        SELECT cs.id FROM course_sets cs WHERE cs.program_id = program_id
    )
    AND csip.enrollment_id = NEW.enrollment_id;
    
    -- Calcular porcentagem
    IF total_points > 0 THEN
        progress_percentage := (earned_points::DECIMAL / total_points::DECIMAL) * 100;
    ELSE
        progress_percentage := 0;
    END IF;
    
    -- Atualizar enrollment
    UPDATE program_enrollments 
    SET 
        total_points = total_points,
        earned_points = earned_points,
        progress_percentage = progress_percentage,
        completed_at = CASE 
            WHEN progress_percentage >= 100 THEN CURRENT_TIMESTAMP 
            ELSE completed_at 
        END,
        status = CASE 
            WHEN progress_percentage >= 100 THEN 'completed'
            ELSE status 
        END
    WHERE id = NEW.enrollment_id;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_program_progress_trigger
    AFTER INSERT OR UPDATE ON course_set_item_progress
    FOR EACH ROW
    EXECUTE FUNCTION calculate_program_progress();

-- ============================================
-- FUNÇÕES DE UTILIDADE
-- ============================================

-- Função para verificar se usuário pode acessar programa
CREATE OR REPLACE FUNCTION can_access_program(
    user_id UUID,
    program_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    enrollment_exists BOOLEAN;
    program_status VARCHAR(20);
    enrollment_type VARCHAR(20);
BEGIN
    -- Verificar se programa existe e está publicado
    SELECT status, enrollment_type INTO program_status, enrollment_type
    FROM programs
    WHERE id = program_id;
    
    IF program_status != 'published' THEN
        RETURN false;
    END IF;
    
    -- Verificar enrollment
    SELECT EXISTS (
        SELECT 1 FROM program_enrollments pe
        WHERE pe.program_id = program_id
        AND pe.user_id = user_id
        AND pe.status = 'active'
    ) INTO enrollment_exists;
    
    -- Se enrollment_type é 'self', permitir acesso
    IF enrollment_type = 'self' THEN
        RETURN true;
    END IF;
    
    -- Se enrollment_type é 'manual' ou 'approval', verificar enrollment
    RETURN enrollment_exists;
END;
$$ LANGUAGE plpgsql;

-- Função para obter progresso do programa
CREATE OR REPLACE FUNCTION get_program_progress(
    user_id UUID,
    program_id UUID
)
RETURNS TABLE(
    total_points INTEGER,
    earned_points INTEGER,
    progress_percentage DECIMAL(5,2),
    completed_sets INTEGER,
    total_sets INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        pe.total_points,
        pe.earned_points,
        pe.progress_percentage,
        (SELECT COUNT(*) FROM course_set_progress csp 
         WHERE csp.enrollment_id = pe.id AND csp.is_completed = true)::INTEGER,
        (SELECT COUNT(*) FROM course_sets cs WHERE cs.program_id = program_id)::INTEGER
    FROM program_enrollments pe
    WHERE pe.program_id = program_id
    AND pe.user_id = user_id;
END;
$$ LANGUAGE plpgsql;

-- Função para obter próximos itens disponíveis
CREATE OR REPLACE FUNCTION get_next_available_items(
    user_id UUID,
    program_id UUID
)
RETURNS TABLE(
    course_set_id UUID,
    course_set_titulo VARCHAR,
    course_set_item_id UUID,
    curso_id UUID,
    curso_titulo VARCHAR,
    ordem INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        csi.course_set_id,
        cs.titulo,
        csi.id,
        csi.curso_id,
        c.titulo,
        csi.ordem
    FROM course_set_items csi
    JOIN course_sets cs ON csi.course_set_id = cs.id
    JOIN cursos c ON csi.curso_id = c.id
    WHERE cs.program_id = program_id
    AND NOT EXISTS (
        SELECT 1 FROM course_set_item_progress csip
        WHERE csip.course_set_item_id = csi.id
        AND csip.enrollment_id IN (
            SELECT pe.id FROM program_enrollments pe
            WHERE pe.program_id = program_id AND pe.user_id = user_id
        )
        AND csip.is_completed = true
    )
    ORDER BY cs.ordem, csi.ordem;
END;
$$ LANGUAGE plpgsql;

-- Função para matricular usuário em programa
CREATE OR REPLACE FUNCTION enroll_in_program(
    user_id UUID,
    program_id UUID,
    enrollment_type VARCHAR DEFAULT 'manual'
)
RETURNS UUID AS $$
DECLARE
    enrollment_id UUID;
    program_exists BOOLEAN;
    already_enrolled BOOLEAN;
BEGIN
    -- Verificar se programa existe
    SELECT EXISTS (
        SELECT 1 FROM programs WHERE id = program_id AND status = 'published'
    ) INTO program_exists;
    
    IF NOT program_exists THEN
        RAISE EXCEPTION 'Programa não encontrado ou não publicado';
    END IF;
    
    -- Verificar se já está matriculado
    SELECT EXISTS (
        SELECT 1 FROM program_enrollments 
        WHERE program_id = program_id AND user_id = user_id
    ) INTO already_enrolled;
    
    IF already_enrolled THEN
        RAISE EXCEPTION 'Usuário já está matriculado neste programa';
    END IF;
    
    -- Criar enrollment
    INSERT INTO program_enrollments (program_id, user_id, status)
    VALUES (program_id, user_id, 'active')
    RETURNING id INTO enrollment_id;
    
    RETURN enrollment_id;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_sets ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_set_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_set_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE course_set_item_progress ENABLE ROW LEVEL SECURITY;

-- Políticas para programs
CREATE POLICY "Users can view published programs in their tenant" ON programs
    FOR SELECT TO authenticated
    USING (
        status = 'published' AND
        (tenant_id IS NULL OR tenant_id = (SELECT tenant_id FROM usuarios WHERE id = auth.uid()))
    );

CREATE POLICY "Tenant admins can manage programs in their tenant" ON programs
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM user_roles ur
            JOIN roles r ON ur.role_id = r.id
            WHERE ur.user_id = auth.uid() 
            AND r.nivel <= 2
            AND ur.tenant_id = programs.tenant_id
            AND ur.is_active = true
        )
    );

-- Políticas para program_enrollments
CREATE POLICY "Users can view their own enrollments" ON program_enrollments
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can enroll in self-enrollment programs" ON program_enrollments
    FOR INSERT TO authenticated
    WITH CHECK (
        user_id = auth.uid() AND
        EXISTS (
            SELECT 1 FROM programs p
            WHERE p.id = program_id
            AND p.enrollment_type = 'self'
            AND p.status = 'published'
        )
    );

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View para programas com estatísticas
CREATE VIEW program_stats AS
SELECT 
    p.id,
    p.titulo,
    p.tenant_id,
    p.status,
    COUNT(DISTINCT pe.id) as total_enrollments,
    COUNT(DISTINCT CASE WHEN pe.status = 'completed' THEN pe.id END) as completed_enrollments,
    AVG(pe.progress_percentage) as avg_progress,
    COUNT(DISTINCT cs.id) as total_course_sets,
    COUNT(DISTINCT csi.id) as total_courses
FROM programs p
LEFT JOIN program_enrollments pe ON p.id = pe.program_id
LEFT JOIN course_sets cs ON p.id = cs.program_id
LEFT JOIN course_set_items csi ON cs.id = csi.course_set_id
GROUP BY p.id, p.titulo, p.tenant_id, p.status;

-- View para progresso detalhado do usuário
CREATE VIEW user_program_progress AS
SELECT 
    pe.user_id,
    pe.program_id,
    p.titulo as program_titulo,
    pe.progress_percentage,
    pe.total_points,
    pe.earned_points,
    pe.status,
    pe.started_at,
    pe.completed_at,
    COUNT(DISTINCT cs.id) as total_sets,
    COUNT(DISTINCT CASE WHEN csp.is_completed THEN csp.course_set_id END) as completed_sets
FROM program_enrollments pe
JOIN programs p ON pe.program_id = p.id
LEFT JOIN course_sets cs ON p.id = cs.program_id
LEFT JOIN course_set_progress csp ON cs.id = csp.course_set_id AND csp.enrollment_id = pe.id
GROUP BY pe.user_id, pe.program_id, p.titulo, pe.progress_percentage, 
         pe.total_points, pe.earned_points, pe.status, pe.started_at, pe.completed_at;

-- ============================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- ============================================

COMMENT ON TABLE programs IS 'Programas de aprendizagem (trilhas) que agrupam cursos';
COMMENT ON COLUMN programs.enrollment_type IS 'Tipo de matrícula: manual (admin), self (público), approval (requer aprovação)';

COMMENT ON TABLE course_sets IS 'Conjuntos de cursos que podem ser aninhados hierarquicamente';
COMMENT ON COLUMN course_sets.completion_type IS 'Critério de conclusão: all_in_order, all_any_order, at_least_x, min_points';
COMMENT ON COLUMN course_sets.completion_delay_days IS 'Dias de espera antes de liberar próximo item';

COMMENT ON TABLE course_set_items IS 'Itens (cursos) dentro dos course sets';
COMMENT ON COLUMN course_set_items.points IS 'Pontos que o curso vale neste programa';
COMMENT ON COLUMN course_set_items.is_required IS 'Se o curso é obrigatório para conclusão';

COMMENT ON TABLE program_enrollments IS 'Matrículas de usuários em programas';
COMMENT ON COLUMN program_enrollments.progress_percentage IS 'Porcentagem de conclusão do programa';
COMMENT ON COLUMN program_enrollments.total_points IS 'Total de pontos possíveis no programa';
COMMENT ON COLUMN program_enrollments.earned_points IS 'Pontos conquistados pelo usuário';
