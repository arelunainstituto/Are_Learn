-- AreLuna Platform Database Schema
-- Supabase PostgreSQL Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- TABELAS DE USUÁRIOS E EMPRESAS
-- ============================================

-- Tabela de Empresas (para B2B)
CREATE TABLE empresas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    cnpj VARCHAR(18) UNIQUE NOT NULL,
    logo TEXT,
    plano VARCHAR(50) NOT NULL CHECK (plano IN ('basico', 'profissional', 'enterprise')),
    licencas_totais INTEGER NOT NULL DEFAULT 0,
    licencas_usadas INTEGER NOT NULL DEFAULT 0,
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Usuários
CREATE TABLE usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email VARCHAR(255) UNIQUE NOT NULL,
    nome VARCHAR(255) NOT NULL,
    avatar TEXT,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('aluno', 'instrutor', 'admin', 'corporativo')),
    empresa_id UUID REFERENCES empresas(id) ON DELETE SET NULL,
    total_xp INTEGER NOT NULL DEFAULT 0,
    nivel INTEGER NOT NULL DEFAULT 1,
    ativo BOOLEAN NOT NULL DEFAULT true,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ultimo_acesso TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Instrutores (extensão de usuários)
CREATE TABLE instrutores (
    id UUID PRIMARY KEY REFERENCES usuarios(id) ON DELETE CASCADE,
    bio TEXT,
    especialidade VARCHAR(255),
    total_cursos INTEGER NOT NULL DEFAULT 0,
    total_alunos INTEGER NOT NULL DEFAULT 0,
    rating DECIMAL(3, 2) DEFAULT 0.00,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABELAS DE CONTEÚDO
-- ============================================

-- Tabela de Categorias
CREATE TABLE categorias (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    nome VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    descricao TEXT,
    icone VARCHAR(255),
    cor VARCHAR(7),
    ordem INTEGER DEFAULT 0,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Cursos
CREATE TABLE cursos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    descricao_curta TEXT NOT NULL,
    thumbnail TEXT NOT NULL,
    banner TEXT,
    instrutor_id UUID REFERENCES instrutores(id) ON DELETE SET NULL,
    categoria_id UUID REFERENCES categorias(id) ON DELETE SET NULL,
    nivel VARCHAR(50) NOT NULL CHECK (nivel IN ('iniciante', 'intermediario', 'avancado')),
    duracao_total INTEGER NOT NULL DEFAULT 0, -- em minutos
    total_modulos INTEGER NOT NULL DEFAULT 0,
    total_aulas INTEGER NOT NULL DEFAULT 0,
    destaque BOOLEAN NOT NULL DEFAULT false,
    publicado BOOLEAN NOT NULL DEFAULT false,
    tags TEXT[], -- array de strings
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Módulos
CREATE TABLE modulos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    ordem INTEGER NOT NULL,
    duracao_total INTEGER NOT NULL DEFAULT 0, -- em minutos
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Aulas
CREATE TABLE aulas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    modulo_id UUID REFERENCES modulos(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    video_url TEXT NOT NULL,
    video_provider VARCHAR(50) NOT NULL CHECK (video_provider IN ('vimeo', 'mux', 'youtube')),
    video_id VARCHAR(255) NOT NULL,
    duracao INTEGER NOT NULL, -- em segundos
    ordem INTEGER NOT NULL,
    disponivel_preview BOOLEAN NOT NULL DEFAULT false,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Materiais de Apoio
CREATE TABLE materiais (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    aula_id UUID REFERENCES aulas(id) ON DELETE CASCADE,
    titulo VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('pdf', 'imagem', 'link', 'documento')),
    url TEXT NOT NULL,
    tamanho BIGINT, -- em bytes
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- ============================================
-- TABELAS DE PROGRESSO E ENGAJAMENTO
-- ============================================

-- Tabela de Progresso do Curso
CREATE TABLE progresso_cursos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
    percentual_completo INTEGER NOT NULL DEFAULT 0 CHECK (percentual_completo >= 0 AND percentual_completo <= 100),
    tempo_assistido INTEGER NOT NULL DEFAULT 0, -- em minutos
    ultima_aula_id UUID REFERENCES aulas(id) ON DELETE SET NULL,
    ultima_visualizacao TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    concluido BOOLEAN NOT NULL DEFAULT false,
    concluido_em TIMESTAMP WITH TIME ZONE,
    iniciado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, curso_id)
);

-- Tabela de Progresso de Aula
CREATE TABLE progresso_aulas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    aula_id UUID REFERENCES aulas(id) ON DELETE CASCADE,
    tempo_assistido INTEGER NOT NULL DEFAULT 0, -- em segundos
    percentual_completo INTEGER NOT NULL DEFAULT 0 CHECK (percentual_completo >= 0 AND percentual_completo <= 100),
    concluido BOOLEAN NOT NULL DEFAULT false,
    concluido_em TIMESTAMP WITH TIME ZONE,
    ultima_posicao INTEGER NOT NULL DEFAULT 0, -- posição do vídeo em segundos
    atualizado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, aula_id)
);

-- ============================================
-- TABELAS DE GAMIFICAÇÃO
-- ============================================

-- Tabela de Conquistas
CREATE TABLE conquistas (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT NOT NULL,
    icone VARCHAR(255) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('curso_completo', 'tempo_plataforma', 'sequencia', 'especial')),
    criterio JSONB NOT NULL, -- critérios para desbloquear
    xp INTEGER NOT NULL DEFAULT 0,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Conquistas dos Usuários
CREATE TABLE conquistas_usuarios (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    conquista_id UUID REFERENCES conquistas(id) ON DELETE CASCADE,
    desbloqueado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(usuario_id, conquista_id)
);

-- ============================================
-- TABELAS DE CERTIFICADOS E TRILHAS
-- ============================================

-- Tabela de Certificados
CREATE TABLE certificados (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    usuario_id UUID REFERENCES usuarios(id) ON DELETE CASCADE,
    curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
    codigo VARCHAR(255) UNIQUE NOT NULL,
    emitido_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    valido BOOLEAN NOT NULL DEFAULT true,
    UNIQUE(usuario_id, curso_id)
);

-- Tabela de Playlists/Trilhas
CREATE TABLE playlists (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    titulo VARCHAR(255) NOT NULL,
    descricao TEXT,
    thumbnail TEXT,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('tematica', 'trilha', 'personalizada')),
    publica BOOLEAN NOT NULL DEFAULT true,
    criado_por UUID REFERENCES usuarios(id) ON DELETE SET NULL,
    criado_em TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Cursos nas Playlists
CREATE TABLE playlists_cursos (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    playlist_id UUID REFERENCES playlists(id) ON DELETE CASCADE,
    curso_id UUID REFERENCES cursos(id) ON DELETE CASCADE,
    ordem INTEGER NOT NULL,
    UNIQUE(playlist_id, curso_id)
);

-- ============================================
-- ÍNDICES PARA PERFORMANCE
-- ============================================

CREATE INDEX idx_usuarios_email ON usuarios(email);
CREATE INDEX idx_usuarios_empresa ON usuarios(empresa_id);
CREATE INDEX idx_usuarios_tipo ON usuarios(tipo);

CREATE INDEX idx_cursos_categoria ON cursos(categoria_id);
CREATE INDEX idx_cursos_instrutor ON cursos(instrutor_id);
CREATE INDEX idx_cursos_publicado ON cursos(publicado);
CREATE INDEX idx_cursos_destaque ON cursos(destaque);

CREATE INDEX idx_modulos_curso ON modulos(curso_id);
CREATE INDEX idx_aulas_modulo ON aulas(modulo_id);
CREATE INDEX idx_materiais_aula ON materiais(aula_id);

CREATE INDEX idx_progresso_cursos_usuario ON progresso_cursos(usuario_id);
CREATE INDEX idx_progresso_cursos_curso ON progresso_cursos(curso_id);
CREATE INDEX idx_progresso_aulas_usuario ON progresso_aulas(usuario_id);
CREATE INDEX idx_progresso_aulas_aula ON progresso_aulas(aula_id);

CREATE INDEX idx_conquistas_usuarios_usuario ON conquistas_usuarios(usuario_id);
CREATE INDEX idx_certificados_usuario ON certificados(usuario_id);

-- ============================================
-- TRIGGERS E FUNÇÕES
-- ============================================

-- Função para atualizar o campo atualizado_em
CREATE OR REPLACE FUNCTION atualizar_timestamp()
RETURNS TRIGGER AS $$
BEGIN
    NEW.atualizado_em = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers para atualizar timestamps
CREATE TRIGGER trigger_usuarios_atualizado
    BEFORE UPDATE ON usuarios
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();

CREATE TRIGGER trigger_empresas_atualizado
    BEFORE UPDATE ON empresas
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();

CREATE TRIGGER trigger_cursos_atualizado
    BEFORE UPDATE ON cursos
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_timestamp();

-- Função para calcular progresso do curso
CREATE OR REPLACE FUNCTION calcular_progresso_curso(p_usuario_id UUID, p_curso_id UUID)
RETURNS INTEGER AS $$
DECLARE
    total_aulas INTEGER;
    aulas_concluidas INTEGER;
    percentual INTEGER;
BEGIN
    -- Conta total de aulas do curso
    SELECT COUNT(a.id) INTO total_aulas
    FROM aulas a
    INNER JOIN modulos m ON a.modulo_id = m.id
    WHERE m.curso_id = p_curso_id;
    
    -- Conta aulas concluídas pelo usuário
    SELECT COUNT(pa.id) INTO aulas_concluidas
    FROM progresso_aulas pa
    INNER JOIN aulas a ON pa.aula_id = a.id
    INNER JOIN modulos m ON a.modulo_id = m.id
    WHERE pa.usuario_id = p_usuario_id 
    AND m.curso_id = p_curso_id 
    AND pa.concluido = true;
    
    -- Calcula percentual
    IF total_aulas > 0 THEN
        percentual := (aulas_concluidas * 100) / total_aulas;
    ELSE
        percentual := 0;
    END IF;
    
    RETURN percentual;
END;
$$ LANGUAGE plpgsql;

-- Função para atualizar contadores de instrutores
CREATE OR REPLACE FUNCTION atualizar_contador_instrutor()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE instrutores 
        SET total_cursos = total_cursos + 1
        WHERE id = NEW.instrutor_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE instrutores 
        SET total_cursos = total_cursos - 1
        WHERE id = OLD.instrutor_id;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_curso_instrutor
    AFTER INSERT OR DELETE ON cursos
    FOR EACH ROW
    EXECUTE FUNCTION atualizar_contador_instrutor();

-- ============================================
-- VIEWS ÚTEIS
-- ============================================

-- View de cursos com informações completas
CREATE VIEW vw_cursos_completos AS
SELECT 
    c.*,
    cat.nome as categoria_nome,
    cat.slug as categoria_slug,
    cat.cor as categoria_cor,
    i.nome as instrutor_nome,
    i.avatar as instrutor_avatar,
    i.especialidade as instrutor_especialidade,
    COUNT(DISTINCT pc.usuario_id) as total_alunos_matriculados
FROM cursos c
LEFT JOIN categorias cat ON c.categoria_id = cat.id
LEFT JOIN usuarios i ON c.instrutor_id = i.id
LEFT JOIN progresso_cursos pc ON c.id = pc.curso_id
GROUP BY c.id, cat.id, i.id;

-- View de estatísticas por empresa
CREATE VIEW vw_estatisticas_empresas AS
SELECT 
    e.id,
    e.nome,
    COUNT(DISTINCT u.id) as total_usuarios,
    COUNT(DISTINCT pc.curso_id) as total_cursos_iniciados,
    COUNT(DISTINCT CASE WHEN pc.concluido THEN pc.curso_id END) as total_cursos_concluidos,
    SUM(pc.tempo_assistido) as tempo_total_assistido,
    CASE 
        WHEN COUNT(DISTINCT pc.curso_id) > 0 
        THEN (COUNT(DISTINCT CASE WHEN pc.concluido THEN pc.curso_id END) * 100) / COUNT(DISTINCT pc.curso_id)
        ELSE 0 
    END as taxa_conclusao,
    COUNT(DISTINCT CASE WHEN u.ultimo_acesso >= CURRENT_DATE - INTERVAL '30 days' THEN u.id END) as usuarios_ativos_mes
FROM empresas e
LEFT JOIN usuarios u ON e.id = u.empresa_id
LEFT JOIN progresso_cursos pc ON u.id = pc.usuario_id
GROUP BY e.id, e.nome;

-- ============================================
-- DADOS INICIAIS (SEEDS)
-- ============================================

-- Inserir categorias padrão
INSERT INTO categorias (nome, slug, descricao, cor, ordem) VALUES
('Implantodontia', 'implantodontia', 'Cursos de Implantodontia', '#3B82F6', 1),
('Ortodontia', 'ortodontia', 'Cursos de Ortodontia', '#8B5CF6', 2),
('Endodontia', 'endodontia', 'Cursos de Endodontia', '#EC4899', 3),
('Periodontia', 'periodontia', 'Cursos de Periodontia', '#10B981', 4),
('Gestão Clínica', 'gestao-clinica', 'Gestão e Administração de Clínicas', '#F59E0B', 5),
('Marketing Odontológico', 'marketing', 'Marketing para Dentistas', '#EF4444', 6);

-- Inserir conquistas padrão
INSERT INTO conquistas (titulo, descricao, icone, tipo, criterio, xp) VALUES
('Primeiro Passo', 'Complete sua primeira aula', '🎯', 'especial', '{"aulas_concluidas": 1}', 10),
('Aprendiz', 'Complete seu primeiro curso', '🎓', 'curso_completo', '{"cursos_concluidos": 1}', 100),
('Dedicado', 'Estude por 7 dias consecutivos', '🔥', 'sequencia', '{"dias_consecutivos": 7}', 50),
('Maratonista', 'Assista mais de 5 horas em um dia', '⚡', 'tempo_plataforma', '{"horas_dia": 5}', 75),
('Mestre', 'Complete 10 cursos', '🏆', 'curso_completo', '{"cursos_concluidos": 10}', 500);

-- ============================================
-- POLÍTICAS DE SEGURANÇA (RLS)
-- ============================================

-- Habilitar RLS nas tabelas principais
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso_cursos ENABLE ROW LEVEL SECURITY;
ALTER TABLE progresso_aulas ENABLE ROW LEVEL SECURITY;

-- Políticas básicas (ajustar conforme necessidade)
-- Usuários podem ver seus próprios dados
CREATE POLICY "Usuários podem ver seus próprios dados"
    ON usuarios FOR SELECT
    USING (auth.uid() = id);

-- Todos podem ver cursos publicados
CREATE POLICY "Todos podem ver cursos publicados"
    ON cursos FOR SELECT
    USING (publicado = true);

-- Usuários podem ver seu próprio progresso
CREATE POLICY "Usuários podem ver seu próprio progresso"
    ON progresso_cursos FOR SELECT
    USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem atualizar seu próprio progresso"
    ON progresso_cursos FOR UPDATE
    USING (auth.uid() = usuario_id);

