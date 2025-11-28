// Constantes da aplicação

export const APP_NAME = 'AreLuna INNSiDE';
export const APP_DESCRIPTION = 'AreLuna INNSiDE - Instituto de Educação Corporativa de excelência';

export const NIVEIS_CURSO = {
  iniciante: 'Iniciante',
  intermediario: 'Intermediário',
  avancado: 'Avançado',
} as const;

export const TIPOS_USUARIO = {
  aluno: 'Aluno',
  instrutor: 'Instrutor',
  admin: 'Administrador',
  corporativo: 'Gestor Corporativo',
} as const;

export const PLANOS_EMPRESA = {
  basico: 'Básico',
  profissional: 'Profissional',
  enterprise: 'Enterprise',
} as const;

export const VIDEO_PROVIDERS = {
  vimeo: 'Vimeo',
  mux: 'Mux',
  youtube: 'YouTube',
} as const;

export const TIPOS_MATERIAL = {
  pdf: 'PDF',
  imagem: 'Imagem',
  link: 'Link Externo',
  documento: 'Documento',
} as const;

export const CATEGORIAS_PADRAO = [
  { nome: 'Implantodontia', slug: 'implantodontia', cor: '#3B82F6' },
  { nome: 'Ortodontia', slug: 'ortodontia', cor: '#8B5CF6' },
  { nome: 'Endodontia', slug: 'endodontia', cor: '#EC4899' },
  { nome: 'Periodontia', slug: 'periodontia', cor: '#10B981' },
  { nome: 'Gestão Clínica', slug: 'gestao-clinica', cor: '#F59E0B' },
  { nome: 'Marketing Odontológico', slug: 'marketing', cor: '#EF4444' },
];

export const XP_POR_ACAO = {
  aula_completa: 10,
  curso_completo: 100,
  login_diario: 5,
  sequencia_7_dias: 50,
  sequencia_30_dias: 200,
} as const;

