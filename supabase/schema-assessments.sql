-- Schema de Sistema de Avaliações - AreLuna INNSiDE
-- Baseado na arquitetura Open LMS

-- ============================================
-- TABELAS PRINCIPAIS
-- ============================================

-- Tabela de bancos de questões
CREATE TABLE question_banks (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    tenant_id UUID REFERENCES tenants(id) ON DELETE CASCADE,
    nome VARCHAR(255) NOT NULL,
    descricao TEXT,
    categoria_id UUID,
    created_by UUID REFERENCES usuarios(id),
    is_public BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de questões
CREATE TABLE questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    bank_id UUID REFERENCES question_banks(id) ON DELETE CASCADE,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('multiple_choice', 'true_false', 'essay', 'matching', 'fill_blank', 'ordering')),
    enunciado TEXT NOT NULL,
    opcoes JSONB, -- para múltipla escolha, matching, etc.
    resposta_correta TEXT, -- para questões objetivas
    resposta_modelo TEXT, -- para questões dissertativas
    pontos DECIMAL(5,2) DEFAULT 1.0,
    feedback TEXT,
    dificuldade VARCHAR(20) DEFAULT 'medium' CHECK (dificuldade IN ('easy', 'medium', 'hard')),
    tempo_estimado INTEGER DEFAULT 60, -- em segundos
    tags TEXT[],
    created_by UUID REFERENCES usuarios(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de quizzes
CREATE TABLE quizzes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
    modulo_id UUID REFERENCES modulos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    instrucoes TEXT,
    tempo_limite INTEGER, -- em minutos
    tentativas_permitidas INTEGER DEFAULT 1,
    nota_minima DECIMAL(5,2) DEFAULT 0.0,
    randomizar_questoes BOOLEAN DEFAULT false,
    randomizar_opcoes BOOLEAN DEFAULT false,
    mostrar_feedback BOOLEAN DEFAULT true,
    mostrar_respostas BOOLEAN DEFAULT false,
    permitir_revisao BOOLEAN DEFAULT true,
    status VARCHAR(20) DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
    created_by UUID REFERENCES usuarios(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de questões do quiz
CREATE TABLE quiz_questions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    pontos DECIMAL(5,2) DEFAULT 1.0,
    ordem INTEGER NOT NULL,
    is_required BOOLEAN DEFAULT true,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de tentativas de quiz
CREATE TABLE quiz_attempts (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    tentativa_numero INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'abandoned', 'graded')),
    nota DECIMAL(5,2),
    nota_percentual DECIMAL(5,2),
    tempo_gasto INTEGER, -- em segundos
    started_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    submitted_at TIMESTAMP WITH TIME ZONE,
    graded_at TIMESTAMP WITH TIME ZONE,
    auto_submit_at TIMESTAMP WITH TIME ZONE, -- para auto-submit por tempo
    respostas JSONB DEFAULT '{}', -- respostas do usuário
    feedback JSONB DEFAULT '{}', -- feedback personalizado
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de respostas individuais
CREATE TABLE quiz_responses (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    attempt_id UUID REFERENCES quiz_attempts(id) ON DELETE CASCADE,
    question_id UUID REFERENCES questions(id) ON DELETE CASCADE,
    resposta JSONB NOT NULL, -- resposta do usuário
    is_correct BOOLEAN,
    pontos_obtidos DECIMAL(5,2) DEFAULT 0.0,
    feedback TEXT,
    tempo_gasto INTEGER, -- em segundos
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de configurações de quiz por usuário
CREATE TABLE quiz_user_overrides (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
    user_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    tentativas_permitidas INTEGER,
    tempo_limite INTEGER,
    nota_minima DECIMAL(5,2),
    disponivel_ate TIMESTAMP WITH TIME ZONE,
    disponivel_desde TIMESTAMP WITH TIME ZONE,
    created_by UUID REFERENCES usuarios(id),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(quiz_id, user_id)
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_question_banks_tenant ON question_banks(tenant_id);
CREATE INDEX idx_question_banks_public ON question_banks(is_public);
CREATE INDEX idx_questions_bank ON questions(bank_id);
CREATE INDEX idx_questions_tipo ON questions(tipo);
CREATE INDEX idx_questions_dificuldade ON questions(dificuldade);
CREATE INDEX idx_quizzes_curso ON quizzes(curso_id);
CREATE INDEX idx_quizzes_modulo ON quizzes(modulo_id);
CREATE INDEX idx_quizzes_status ON quizzes(status);
CREATE INDEX idx_quiz_questions_quiz ON quiz_questions(quiz_id);
CREATE INDEX idx_quiz_questions_question ON quiz_questions(question_id);
CREATE INDEX idx_quiz_attempts_quiz ON quiz_attempts(quiz_id);
CREATE INDEX idx_quiz_attempts_user ON quiz_attempts(user_id);
CREATE INDEX idx_quiz_attempts_status ON quiz_attempts(status);
CREATE INDEX idx_quiz_responses_attempt ON quiz_responses(attempt_id);
CREATE INDEX idx_quiz_responses_question ON quiz_responses(question_id);
CREATE INDEX idx_quiz_user_overrides_quiz ON quiz_user_overrides(quiz_id);
CREATE INDEX idx_quiz_user_overrides_user ON quiz_user_overrides(user_id);

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

CREATE TRIGGER update_question_banks_updated_at
    BEFORE UPDATE ON question_banks
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_questions_updated_at
    BEFORE UPDATE ON questions
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quizzes_updated_at
    BEFORE UPDATE ON quizzes
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_attempts_updated_at
    BEFORE UPDATE ON quiz_attempts
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_quiz_user_overrides_updated_at
    BEFORE UPDATE ON quiz_user_overrides
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Trigger para calcular nota do quiz
CREATE OR REPLACE FUNCTION calculate_quiz_grade()
RETURNS TRIGGER AS $$
DECLARE
    total_points DECIMAL(5,2);
    earned_points DECIMAL(5,2);
    grade_percentage DECIMAL(5,2);
    quiz_min_grade DECIMAL(5,2);
BEGIN
    -- Calcular pontos totais e ganhos
    SELECT 
        COALESCE(SUM(qq.pontos), 0),
        COALESCE(SUM(qr.pontos_obtidos), 0)
    INTO total_points, earned_points
    FROM quiz_questions qq
    LEFT JOIN quiz_responses qr ON qq.question_id = qr.question_id AND qr.attempt_id = NEW.id
    WHERE qq.quiz_id = NEW.quiz_id;

    -- Calcular porcentagem
    IF total_points > 0 THEN
        grade_percentage := (earned_points / total_points) * 100;
    ELSE
        grade_percentage := 0;
    END IF;

    -- Obter nota mínima do quiz
    SELECT nota_minima INTO quiz_min_grade FROM quizzes WHERE id = NEW.quiz_id;

    -- Atualizar tentativa
    UPDATE quiz_attempts 
    SET 
        nota = earned_points,
        nota_percentual = grade_percentage,
        status = CASE 
            WHEN grade_percentage >= quiz_min_grade THEN 'completed'
            ELSE 'completed'
        END,
        submitted_at = CURRENT_TIMESTAMP
    WHERE id = NEW.id;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER calculate_quiz_grade_trigger
    AFTER INSERT OR UPDATE ON quiz_responses
    FOR EACH ROW
    EXECUTE FUNCTION calculate_quiz_grade();

-- ============================================
-- FUNÇÕES DE UTILIDADE
-- ============================================

-- Função para verificar se usuário pode fazer quiz
CREATE OR REPLACE FUNCTION can_take_quiz(
    user_id UUID,
    quiz_id UUID
)
RETURNS BOOLEAN AS $$
DECLARE
    quiz_status VARCHAR(20);
    max_attempts INTEGER;
    current_attempts INTEGER;
    user_override RECORD;
BEGIN
    -- Verificar status do quiz
    SELECT status INTO quiz_status FROM quizzes WHERE id = quiz_id;
    IF quiz_status != 'published' THEN
        RETURN false;
    END IF;

    -- Verificar overrides do usuário
    SELECT * INTO user_override FROM quiz_user_overrides WHERE quiz_id = can_take_quiz.quiz_id AND user_id = can_take_quiz.user_id;
    
    -- Verificar tentativas permitidas
    IF user_override.tentativas_permitidas IS NOT NULL THEN
        max_attempts := user_override.tentativas_permitidas;
    ELSE
        SELECT tentativas_permitidas INTO max_attempts FROM quizzes WHERE id = quiz_id;
    END IF;

    -- Contar tentativas atuais
    SELECT COUNT(*) INTO current_attempts 
    FROM quiz_attempts 
    WHERE quiz_id = can_take_quiz.quiz_id AND user_id = can_take_quiz.user_id;

    -- Verificar se ainda pode tentar
    IF max_attempts > 0 AND current_attempts >= max_attempts THEN
        RETURN false;
    END IF;

    -- Verificar disponibilidade por tempo
    IF user_override.disponivel_desde IS NOT NULL AND CURRENT_TIMESTAMP < user_override.disponivel_desde THEN
        RETURN false;
    END IF;

    IF user_override.disponivel_ate IS NOT NULL AND CURRENT_TIMESTAMP > user_override.disponivel_ate THEN
        RETURN false;
    END IF;

    RETURN true;
END;
$$ LANGUAGE plpgsql;

-- Função para obter estatísticas do quiz
CREATE OR REPLACE FUNCTION get_quiz_stats(quiz_id UUID)
RETURNS TABLE(
    total_attempts BIGINT,
    completed_attempts BIGINT,
    avg_grade DECIMAL(5,2),
    min_grade DECIMAL(5,2),
    max_grade DECIMAL(5,2),
    pass_rate DECIMAL(5,2)
) AS $$
DECLARE
    quiz_min_grade DECIMAL(5,2);
BEGIN
    -- Obter nota mínima do quiz
    SELECT nota_minima INTO quiz_min_grade FROM quizzes WHERE id = quiz_id;

    RETURN QUERY
    SELECT 
        COUNT(*) as total_attempts,
        COUNT(*) FILTER (WHERE status = 'completed') as completed_attempts,
        AVG(nota_percentual) as avg_grade,
        MIN(nota_percentual) as min_grade,
        MAX(nota_percentual) as max_grade,
        (COUNT(*) FILTER (WHERE status = 'completed' AND nota_percentual >= quiz_min_grade)::DECIMAL / 
         NULLIF(COUNT(*) FILTER (WHERE status = 'completed'), 0)) * 100 as pass_rate
    FROM quiz_attempts
    WHERE quiz_id = get_quiz_stats.quiz_id;
END;
$$ LANGUAGE plpgsql;

-- Função para obter relatório de respostas
CREATE OR REPLACE FUNCTION get_quiz_response_report(quiz_id UUID)
RETURNS TABLE(
    question_id UUID,
    question_text TEXT,
    question_type VARCHAR,
    total_responses BIGINT,
    correct_responses BIGINT,
    avg_points DECIMAL(5,2),
    difficulty_rating DECIMAL(3,2)
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        q.id,
        q.enunciado,
        q.tipo,
        COUNT(qr.id) as total_responses,
        COUNT(qr.id) FILTER (WHERE qr.is_correct = true) as correct_responses,
        AVG(qr.pontos_obtidos) as avg_points,
        AVG(qr.tempo_gasto)::DECIMAL(3,2) as difficulty_rating
    FROM questions q
    JOIN quiz_questions qqq ON q.id = qqq.question_id
    LEFT JOIN quiz_responses qr ON q.id = qr.question_id
    WHERE qqq.quiz_id = get_quiz_response_report.quiz_id
    GROUP BY q.id, q.enunciado, q.tipo
    ORDER BY qqq.ordem;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- ROW LEVEL SECURITY (RLS)
-- ============================================

-- Habilitar RLS
ALTER TABLE question_banks ENABLE ROW LEVEL SECURITY;
ALTER TABLE questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_responses ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_user_overrides ENABLE ROW LEVEL SECURITY;

-- Políticas para question_banks
CREATE POLICY "Users can view public question banks" ON question_banks
    FOR SELECT TO authenticated
    USING (is_public = true OR created_by = auth.uid());

CREATE POLICY "Users can manage their own question banks" ON question_banks
    FOR ALL TO authenticated
    USING (created_by = auth.uid());

-- Políticas para questions
CREATE POLICY "Users can view questions from accessible banks" ON questions
    FOR SELECT TO authenticated
    USING (
        bank_id IN (
            SELECT id FROM question_banks 
            WHERE is_public = true OR created_by = auth.uid()
        )
    );

CREATE POLICY "Users can manage questions in their banks" ON questions
    FOR ALL TO authenticated
    USING (
        bank_id IN (
            SELECT id FROM question_banks WHERE created_by = auth.uid()
        )
    );

-- Políticas para quizzes
CREATE POLICY "Users can view published quizzes" ON quizzes
    FOR SELECT TO authenticated
    USING (status = 'published');

CREATE POLICY "Instructors can manage quizzes in their courses" ON quizzes
    FOR ALL TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM cursos c
            WHERE c.id = quizzes.curso_id
            AND c.instrutor_id = auth.uid()
        )
    );

-- Políticas para quiz_attempts
CREATE POLICY "Users can view their own attempts" ON quiz_attempts
    FOR SELECT TO authenticated
    USING (user_id = auth.uid());

CREATE POLICY "Users can create their own attempts" ON quiz_attempts
    FOR INSERT TO authenticated
    WITH CHECK (user_id = auth.uid());

-- Políticas para quiz_responses
CREATE POLICY "Users can view responses to their attempts" ON quiz_responses
    FOR SELECT TO authenticated
    USING (
        attempt_id IN (
            SELECT id FROM quiz_attempts WHERE user_id = auth.uid()
        )
    );

CREATE POLICY "Users can create responses to their attempts" ON quiz_responses
    FOR INSERT TO authenticated
    WITH CHECK (
        attempt_id IN (
            SELECT id FROM quiz_attempts WHERE user_id = auth.uid()
        )
    );

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View para estatísticas de quiz
CREATE VIEW quiz_statistics AS
SELECT 
    q.id,
    q.titulo,
    q.curso_id,
    q.status,
    COUNT(DISTINCT qa.id) as total_attempts,
    COUNT(DISTINCT qa.user_id) as unique_users,
    AVG(qa.nota_percentual) as avg_grade,
    MIN(qa.nota_percentual) as min_grade,
    MAX(qa.nota_percentual) as max_grade,
    COUNT(DISTINCT qa.id) FILTER (WHERE qa.status = 'completed' AND qa.nota_percentual >= q.nota_minima) as passed_attempts
FROM quizzes q
LEFT JOIN quiz_attempts qa ON q.id = qa.quiz_id
GROUP BY q.id, q.titulo, q.curso_id, q.status, q.nota_minima;

-- View para relatório de performance por usuário
CREATE VIEW user_quiz_performance AS
SELECT 
    u.id as user_id,
    u.nome as user_name,
    q.id as quiz_id,
    q.titulo as quiz_title,
    COUNT(qa.id) as total_attempts,
    MAX(qa.nota_percentual) as best_grade,
    AVG(qa.nota_percentual) as avg_grade,
    MIN(qa.tempo_gasto) as fastest_time,
    AVG(qa.tempo_gasto) as avg_time
FROM usuarios u
JOIN quiz_attempts qa ON u.id = qa.user_id
JOIN quizzes q ON qa.quiz_id = q.id
GROUP BY u.id, u.nome, q.id, q.titulo;

-- ============================================
-- COMENTÁRIOS E DOCUMENTAÇÃO
-- ============================================

COMMENT ON TABLE question_banks IS 'Bancos de questões organizados por categoria';
COMMENT ON COLUMN question_banks.is_public IS 'Se o banco é público para outros instrutores';

COMMENT ON TABLE questions IS 'Questões individuais com diferentes tipos';
COMMENT ON COLUMN questions.tipo IS 'Tipo da questão: multiple_choice, true_false, essay, matching, fill_blank, ordering';
COMMENT ON COLUMN questions.opcoes IS 'Opções para questões de múltipla escolha em JSONB';
COMMENT ON COLUMN questions.resposta_correta IS 'Resposta correta para questões objetivas';
COMMENT ON COLUMN questions.resposta_modelo IS 'Resposta modelo para questões dissertativas';

COMMENT ON TABLE quizzes IS 'Quizzes com configurações de tempo, tentativas e feedback';
COMMENT ON COLUMN quizzes.tempo_limite IS 'Tempo limite em minutos (NULL = sem limite)';
COMMENT ON COLUMN quizzes.tentativas_permitidas IS 'Número máximo de tentativas (0 = ilimitado)';
COMMENT ON COLUMN quizzes.randomizar_questoes IS 'Se deve randomizar ordem das questões';
COMMENT ON COLUMN quizzes.randomizar_opcoes IS 'Se deve randomizar ordem das opções';

COMMENT ON TABLE quiz_attempts IS 'Tentativas de realização de quiz pelos usuários';
COMMENT ON COLUMN quiz_attempts.status IS 'Status da tentativa: in_progress, completed, abandoned, graded';
COMMENT ON COLUMN quiz_attempts.respostas IS 'Respostas do usuário em JSONB';
COMMENT ON COLUMN quiz_attempts.auto_submit_at IS 'Timestamp para auto-submit por tempo';

COMMENT ON TABLE quiz_user_overrides IS 'Configurações personalizadas de quiz por usuário';
COMMENT ON COLUMN quiz_user_overrides.tentativas_permitidas IS 'Override do número de tentativas para usuário específico';
COMMENT ON COLUMN quiz_user_overrides.tempo_limite IS 'Override do tempo limite para usuário específico';
