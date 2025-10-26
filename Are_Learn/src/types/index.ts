// Tipos principais da aplicação AreLuna

export interface User {
  id: string;
  email: string;
  nome: string;
  avatar?: string;
  tipo: 'aluno' | 'instrutor' | 'admin' | 'corporativo';
  empresa_id?: string;
  tenant_id?: string;
  role_id?: string;
  criado_em: string;
  atualizado_em: string;
}

export interface Curso {
  id: string;
  titulo: string;
  descricao: string;
  descricao_curta: string;
  thumbnail: string;
  banner: string;
  instrutor_id: string;
  instrutor?: Instrutor;
  categoria_id: string;
  categoria?: Categoria;
  nivel: 'iniciante' | 'intermediario' | 'avancado';
  duracao_total: number; // em minutos
  total_modulos: number;
  total_aulas: number;
  destaque: boolean;
  publicado: boolean;
  tags: string[];
  criado_em: string;
  atualizado_em: string;
}

export interface Instrutor {
  id: string;
  nome: string;
  bio: string;
  avatar: string;
  especialidade: string;
  total_cursos: number;
  total_alunos: number;
}

export interface Categoria {
  id: string;
  nome: string;
  slug: string;
  descricao: string;
  icone?: string;
  cor?: string;
}

export interface Modulo {
  id: string;
  curso_id: string;
  titulo: string;
  descricao: string;
  ordem: number;
  duracao_total: number;
  aulas?: Aula[];
}

export interface Aula {
  id: string;
  modulo_id: string;
  titulo: string;
  descricao: string;
  video_url: string;
  video_provider: 'vimeo' | 'mux' | 'youtube';
  video_id: string;
  duracao: number; // em segundos
  ordem: number;
  materiais?: Material[];
  disponivel_preview: boolean;
}

export interface Material {
  id: string;
  aula_id: string;
  titulo: string;
  tipo: 'pdf' | 'imagem' | 'link' | 'documento';
  url: string;
  tamanho?: number; // em bytes
}

export interface ProgressoCurso {
  id: string;
  usuario_id: string;
  curso_id: string;
  curso?: Curso;
  percentual_completo: number;
  tempo_assistido: number; // em minutos
  ultima_aula_id?: string;
  ultima_aula?: Aula;
  ultima_visualizacao: string;
  concluido: boolean;
  concluido_em?: string;
  iniciado_em: string;
}

export interface ProgressoAula {
  id: string;
  usuario_id: string;
  aula_id: string;
  tempo_assistido: number; // em segundos
  percentual_completo: number;
  concluido: boolean;
  concluido_em?: string;
  ultima_posicao: number; // posição do vídeo em segundos
}

export interface Playlist {
  id: string;
  titulo: string;
  descricao: string;
  thumbnail: string;
  tipo: 'tematica' | 'trilha' | 'personalizada';
  cursos: Curso[];
  publica: boolean;
  criado_por?: string;
  criado_em: string;
}

export interface Conquista {
  id: string;
  titulo: string;
  descricao: string;
  icone: string;
  tipo: 'curso_completo' | 'tempo_plataforma' | 'sequencia' | 'especial';
  criterio: Record<string, any>;
  xp: number;
}

export interface ConquistaUsuario {
  id: string;
  usuario_id: string;
  conquista_id: string;
  conquista?: Conquista;
  desbloqueado_em: string;
}

export interface Certificado {
  id: string;
  usuario_id: string;
  curso_id: string;
  curso?: Curso;
  codigo: string;
  emitido_em: string;
  valido: boolean;
}

export interface Empresa {
  id: string;
  nome: string;
  cnpj: string;
  logo?: string;
  plano: 'basico' | 'profissional' | 'enterprise';
  licencas_totais: number;
  licencas_usadas: number;
  ativo: boolean;
  criado_em: string;
}

export interface RelatorioEmpresa {
  empresa_id: string;
  total_usuarios: number;
  total_cursos_iniciados: number;
  total_cursos_concluidos: number;
  tempo_total_assistido: number;
  taxa_conclusao: number;
  usuarios_ativos_mes: number;
}

export interface RelatorioUsuario {
  usuario_id: string;
  usuario?: User;
  total_cursos_iniciados: number;
  total_cursos_concluidos: number;
  tempo_total_assistido: number;
  total_conquistas: number;
  total_xp: number;
  ultima_atividade: string;
}

export interface SearchResult {
  cursos: Curso[];
  instrutores: Instrutor[];
  categorias: Categoria[];
}

// ============================================
// TIPOS PARA MULTI-TENANCY
// ============================================

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

// ============================================
// TIPOS PARA PROGRAMAS E TRILHAS
// ============================================

export interface Program {
  id: string;
  titulo: string;
  descricao: string;
  imagem?: string;
  tenant_id: string;
  status: 'draft' | 'published' | 'archived';
  enrollment_type: 'manual' | 'self' | 'approval';
  certificate_template_id?: string;
  created_at: string;
  updated_at: string;
}

export interface CourseSet {
  id: string;
  program_id: string;
  parent_set_id?: string;
  titulo: string;
  completion_type: 'all_in_order' | 'all_any_order' | 'at_least_x' | 'min_points';
  required_count?: number;
  required_points?: number;
  ordem: number;
  completion_delay_days: number;
}

export interface CourseSetItem {
  id: string;
  course_set_id: string;
  curso_id: string;
  points: number;
  is_required: boolean;
  ordem: number;
}

export interface ProgramEnrollment {
  id: string;
  program_id: string;
  user_id: string;
  status: 'active' | 'completed' | 'suspended';
  progress_percentage: number;
  started_at: string;
  completed_at?: string;
}

// ============================================
// TIPOS PARA SISTEMA DE AVALIAÇÕES
// ============================================

export interface QuestionBank {
  id: string;
  tenant_id: string;
  nome: string;
  categoria_id?: string;
  created_at: string;
}

export interface Question {
  id: string;
  bank_id: string;
  tipo: 'multiple_choice' | 'true_false' | 'essay' | 'matching';
  enunciado: string;
  opcoes?: any; // JSONB para múltipla escolha
  resposta_correta?: string;
  pontos: number;
  feedback?: string;
  dificuldade: 'easy' | 'medium' | 'hard';
  created_at: string;
}

export interface Quiz {
  id: string;
  curso_id?: string;
  modulo_id?: string;
  titulo: string;
  instrucoes?: string;
  tempo_limite?: number; // em minutos
  tentativas_permitidas?: number;
  nota_minima?: number;
  randomizar_questoes: boolean;
  mostrar_feedback: boolean;
  created_at: string;
  updated_at: string;
}

export interface QuizAttempt {
  id: string;
  quiz_id: string;
  user_id: string;
  nota?: number;
  status: 'in_progress' | 'completed' | 'graded';
  started_at: string;
  submitted_at?: string;
  respostas: any; // JSONB com respostas
}

// ============================================
// TIPOS PARA DASHBOARDS
// ============================================

export interface DashboardTemplate {
  id: string;
  nome: string;
  tenant_id: string;
  role: 'all' | 'aluno' | 'instrutor' | 'admin';
  is_default: boolean;
  created_at: string;
}

export interface DashboardBlock {
  id: string;
  dashboard_id: string;
  block_type: 'calendar' | 'courses' | 'progress' | 'notifications' | 'programs' | 'achievements';
  config: any; // JSONB com configurações
  position_x: number;
  position_y: number;
  width: number;
  height: number;
  ordem: number;
}

// ============================================
// TIPOS PARA COHORTS
// ============================================

export interface Cohort {
  id: string;
  tenant_id: string;
  nome: string;
  descricao?: string;
  tipo: 'manual' | 'dynamic' | 'sync';
  criterios?: any; // JSONB para cohorts dinâmicos
  created_at: string;
}

export interface CohortMember {
  cohort_id: string;
  user_id: string;
  added_at: string;
}

export interface CohortAccess {
  id: string;
  cohort_id: string;
  resource_type: 'course' | 'program' | 'dashboard';
  resource_id: string;
  access_type: 'view' | 'edit' | 'manage';
}

// ============================================
// TIPOS PARA RELATÓRIOS
// ============================================

export interface ReportTemplate {
  id: string;
  tenant_id: string;
  nome: string;
  tipo: 'completion' | 'performance' | 'engagement' | 'cross_tenant';
  query_config: any; // JSONB
  visualization_config: any; // JSONB
  filters: any; // JSONB
  created_by: string;
  is_site_wide: boolean;
  created_at: string;
}

export interface ScheduledReport {
  id: string;
  report_id: string;
  frequency: 'daily' | 'weekly' | 'monthly';
  recipients: string[]; // array de emails
  next_run?: string;
  last_run?: string;
  active: boolean;
}

// ============================================
// TIPOS PARA SCORM/xAPI
// ============================================

export interface ScormPackage {
  id: string;
  tenant_id: string;
  titulo: string;
  version: '1.2' | '2004';
  file_path: string;
  manifest: any; // JSONB com manifest
  created_at: string;
}

export interface XapiStatement {
  id: string;
  tenant_id: string;
  actor: any; // JSONB
  verb: any; // JSONB
  object: any; // JSONB
  result?: any; // JSONB
  context?: any; // JSONB
  timestamp: string;
  stored: string;
}

