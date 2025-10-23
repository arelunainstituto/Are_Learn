// Tipos principais da aplicação AreLuna

export interface User {
  id: string;
  email: string;
  nome: string;
  avatar?: string;
  tipo: 'aluno' | 'instrutor' | 'admin' | 'corporativo';
  empresa_id?: string;
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

