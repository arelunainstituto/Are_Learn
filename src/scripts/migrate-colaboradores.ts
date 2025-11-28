import { readFileSync } from 'fs';
import { join } from 'path';

interface Colaborador {
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  cidade: string;
  pais: string;
  criado_em: string;
}

interface Usuario {
  id: string;
  nome: string;
  email: string;
  cargo: string;
  departamento: string;
  cidade: string;
  pais: string;
  role: 'admin' | 'instrutor' | 'colaborador' | 'aluno';
  is_instrutor: boolean;
  is_admin: boolean;
  avatar?: string | null;
  bio?: string;
  especialidade?: string;
  total_cursos?: number;
  total_alunos?: number;
  created_at: string;
}

// Função para determinar se é liderança (instrutor)
function isLideranca(cargo: string, departamento: string): boolean {
  const cargosLideranca = [
    'CEO', 'Diretora Clínica', 'Coordenadora', 'Gestor', 'Consultor',
    'Analista', 'Secretária Executiva'
  ];
  
  const departamentosLideranca = [
    'Diretoria', 'TI', 'Gestão de Projetos', 'Recursos Humanos'
  ];
  
  return cargosLideranca.some(c => cargo.toLowerCase().includes(c.toLowerCase())) ||
         departamentosLideranca.includes(departamento);
}

// Função para determinar se é admin
function isAdmin(cargo: string, email: string): boolean {
  const cargosAdmin = ['CEO', 'Diretora Clínica'];
  const emailsAdmin = ['admin@institutoareluna.pt', 'drsaraiva@institutoareluna.pt', 'draarethuza@institutoareluna.pt'];
  
  return cargosAdmin.some(c => cargo.toLowerCase().includes(c.toLowerCase())) ||
         emailsAdmin.includes(email);
}

// Função para gerar avatar baseado no nome (retorna null para usar LocalAvatar)
function generateAvatar(nome: string): string | null {
  // Retorna null para usar o componente LocalAvatar
  return null;
}

// Função para gerar bio baseada no cargo
function generateBio(cargo: string, departamento: string): string {
  if (cargo.includes('CEO') || cargo.includes('Diretora')) {
    return `Liderança executiva com vasta experiência em gestão e desenvolvimento estratégico.`;
  }
  if (cargo.includes('Coordenadora') || cargo.includes('Gestor')) {
    return `Profissional experiente em coordenação e gestão de equipes.`;
  }
  if (departamento === 'Apoio Clínico') {
    return `Especialista em apoio clínico com foco em excelência no atendimento.`;
  }
  if (departamento === 'Laboratório') {
    return `Técnico especializado em laboratório com expertise em protética.`;
  }
  if (departamento === 'Comercial') {
    return `Profissional comercial com experiência em gestão de pacientes e vendas.`;
  }
  return `Colaborador dedicado com foco em excelência e desenvolvimento profissional.`;
}

// Função para determinar especialidade
function getEspecialidade(cargo: string, departamento: string): string {
  if (departamento === 'Apoio Clínico') return 'Apoio Clínico';
  if (departamento === 'Laboratório') return 'Protética';
  if (departamento === 'Comercial') return 'Gestão Comercial';
  if (departamento === 'TI') return 'Tecnologia da Informação';
  if (departamento === 'Financeiro') return 'Gestão Financeira';
  if (departamento === 'Marketing') return 'Marketing';
  if (departamento === 'Recursos Humanos') return 'Recursos Humanos';
  if (departamento === 'Diretoria') return 'Gestão Executiva';
  return 'Administração';
}

export function parseColaboradores(): Usuario[] {
  const colaboradores: Colaborador[] = [
    {
      nome: 'Adminstrador Areluna',
      email: 'admin@institutoareluna.pt',
      cargo: '-',
      departamento: '-',
      cidade: '-',
      pais: '-',
      criado_em: '2025-03-19'
    },
    {
      nome: 'Ana Claudia Moraes',
      email: 'ana.moraes@institutoareluna.pt',
      cargo: 'Assistente Dentária',
      departamento: 'Apoio Clínico',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Analyce da Silva',
      email: 'analyce.silva@institutoareluna.pt',
      cargo: 'Assistente Dentária',
      departamento: 'Apoio Clínico',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Awais Bashir',
      email: 'awais.bashir@institutoareluna.pt',
      cargo: 'Protésico',
      departamento: 'Laboratório',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-07-15'
    },
    {
      nome: 'Caroline Gomez',
      email: 'caroline.gomez@institutoareluna.pt',
      cargo: 'Assistente Financeiro',
      departamento: 'Financeiro',
      cidade: '-',
      pais: '-',
      criado_em: '2025-06-26'
    },
    {
      nome: 'Cleiton Uchoa Prata',
      email: 'cleiton.prata@institutoareluna.pt',
      cargo: 'Ceramista',
      departamento: 'Laboratório',
      cidade: '-',
      pais: '-',
      criado_em: '2025-08-18'
    },
    {
      nome: 'Contas a Receber',
      email: 'contasareceber@institutoareluna.pt',
      cargo: 'Auxiliar Financeiro',
      departamento: 'Financeiro',
      cidade: '-',
      pais: '-',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Danielly Motta',
      email: 'danielly.motta@institutoareluna.pt',
      cargo: 'Secretária Executiva',
      departamento: 'Gestão de Projetos',
      cidade: 'Diretoria',
      pais: 'Portugal',
      criado_em: '2024-11-25'
    },
    {
      nome: 'Dr. Leonardo',
      email: 'drsaraiva@institutoareluna.pt',
      cargo: 'CEO',
      departamento: 'Diretoria',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-01'
    },
    {
      nome: 'Dra. Arethuza',
      email: 'draarethuza@institutoareluna.pt',
      cargo: 'Diretora Clínica',
      departamento: 'Diretoria',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Eduardo Souza',
      email: 'eduardo.souza@institutoareluna.pt',
      cargo: 'Analista',
      departamento: 'TI',
      cidade: 'Florianópolis',
      pais: 'Brasil',
      criado_em: '2024-10-30'
    },
    {
      nome: 'Eliane Almeida',
      email: 'eliane.almeida@institutoareluna.pt',
      cargo: 'Enfermeira',
      departamento: 'Apoio Clínico',
      cidade: '-',
      pais: '-',
      criado_em: '2025-05-20'
    },
    {
      nome: 'Federica Laporta',
      email: 'federica.laporta@institutoareluna.pt',
      cargo: 'Assistente Dentária',
      departamento: 'Apoio Clínico',
      cidade: '-',
      pais: '-',
      criado_em: '2025-08-25'
    },
    {
      nome: 'Felipe Valentin',
      email: 'felipe.valentin@institutoareluna.pt',
      cargo: 'Gestor de Pacientes',
      departamento: 'Comercial',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-06-16'
    },
    {
      nome: 'Gabrielle Fernandez',
      email: 'gabrielle.fernandez@institutoareluna.pt',
      cargo: 'Assistente Dentária',
      departamento: 'Apoio Clínico',
      cidade: '-',
      pais: '-',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Gisele Prudêncio',
      email: 'gisele.prudencio@institutoareluna.pt',
      cargo: 'Coordenadora',
      departamento: 'Recursos Humanos',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-11-27'
    },
    {
      nome: 'Graziele Bassi',
      email: 'graziele.bassi@institutoareluna.pt',
      cargo: 'Rececionista',
      departamento: 'Receção',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-05-12'
    },
    {
      nome: 'Helda Natal',
      email: 'helda.natal@institutoareluna.pt',
      cargo: 'Protésica',
      departamento: 'Laboratório',
      cidade: '-',
      pais: '-',
      criado_em: '2025-08-18'
    },
    {
      nome: 'Ian Thives',
      email: 'ian.thives@institutoareluna.pt',
      cargo: 'Assistente',
      departamento: 'Facilities',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Júlia Cavazini',
      email: 'julia.cavazini@institutoareluna.pt',
      cargo: 'Assistente Dentária',
      departamento: 'Apoio Clínico',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-07-08'
    },
    {
      nome: 'Julia Nara',
      email: 'julia.nara@institutoareluna.pt',
      cargo: 'Assistente Dentária',
      departamento: 'Apoio Clínico',
      cidade: '-',
      pais: '-',
      criado_em: '2025-08-18'
    },
    {
      nome: 'Juliana Brito',
      email: 'juliana.brito@institutoareluna.pt',
      cargo: 'Assistente de Laboratório',
      departamento: 'Laboratório',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-05-21'
    },
    {
      nome: 'Kenya Lampert',
      email: 'kenya.lampert@institutoareluna.pt',
      cargo: 'Coordenadora',
      departamento: 'Financeiro',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Letícia Bastos',
      email: 'leticia.bastos@institutoareluna.pt',
      cargo: 'Rececionista',
      departamento: 'Receção',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-07-15'
    },
    {
      nome: 'Liana Hoeller',
      email: 'liana.hoeller@institutoareluna.pt',
      cargo: 'Rececionista',
      departamento: 'Receção',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-02-17'
    },
    {
      nome: 'Lucilene Xavier',
      email: 'lucilene.xavier@institutoareluna.pt',
      cargo: 'Higienista',
      departamento: 'Apoio Clínico',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Maria Júlia Ferreira',
      email: 'maria.ferreira@institutoareluna.pt',
      cargo: 'Assistente Dentária',
      departamento: 'Apoio Clínico',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Nelson Silva',
      email: 'nelson.silva@institutoareluna.pt',
      cargo: 'Consultor',
      departamento: 'Diretoria',
      cidade: 'Curitba',
      pais: 'Brasil',
      criado_em: '2025-03-20'
    },
    {
      nome: 'Nicaela Cabral',
      email: 'nicaela.cabral@institutoareluna.pt',
      cargo: 'Gestora de Pacientes',
      departamento: 'Comercial',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Raphael Santana',
      email: 'raphael.santana@institutoareluna.pt',
      cargo: 'Protésico',
      departamento: 'Laboratório',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-04-16'
    },
    {
      nome: 'Rebeca Ribeiro Alves',
      email: 'rebeca.alves@institutoareluna.pt',
      cargo: 'Gestora de Pacientes',
      departamento: 'Comercial',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-04-01'
    },
    {
      nome: 'Roberta Justino',
      email: 'roberta.justino@institutoareluna.pt',
      cargo: 'Assistente de Pós-Vendas',
      departamento: 'Comercial',
      cidade: 'Laguna',
      pais: 'Brasil',
      criado_em: '2025-05-19'
    },
    {
      nome: 'Sofia Falcato',
      email: 'sofia.falcato@institutoareluna.pt',
      cargo: 'Gestora de Pacientes',
      departamento: 'Comercial',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Suzan Silva',
      email: 'suzan.silva@institutoareluna.pt',
      cargo: 'Coordenadora',
      departamento: 'Marketing',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    },
    {
      nome: 'Tais Valeria Souza',
      email: 'tais.souza@institutoareluna.pt',
      cargo: 'Assistente Dentária',
      departamento: 'Apoio Clínico',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-07-02'
    },
    {
      nome: 'Talita Alves',
      email: 'talita.alves@institutoareluna.pt',
      cargo: 'Gestora de Pacientes',
      departamento: 'Receção',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-04-21'
    },
    {
      nome: 'Vinicius Novato',
      email: 'vinicius.novato@institutoareluna.pt',
      cargo: 'Analista de TI',
      departamento: 'TI',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-07-21'
    },
    {
      nome: 'Wellen Novato',
      email: 'wellen.novato@institutoareluna.pt',
      cargo: 'Gestora de Pacientes',
      departamento: 'Comercial',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2025-07-07'
    },
    {
      nome: 'Zaira Barros',
      email: 'zaira.barros@institutoareluna.pt',
      cargo: 'Rececionista',
      departamento: 'Receção',
      cidade: 'Porto',
      pais: 'Portugal',
      criado_em: '2024-10-28'
    }
  ];

  return colaboradores.map((colaborador, index) => {
    const isAdminUser = isAdmin(colaborador.cargo, colaborador.email);
    const isInstrutor = isLideranca(colaborador.cargo, colaborador.departamento) || isAdminUser;
    
    return {
      id: `user-${index + 1}`,
      nome: colaborador.nome,
      email: colaborador.email,
      cargo: colaborador.cargo,
      departamento: colaborador.departamento,
      cidade: colaborador.cidade,
      pais: colaborador.pais,
      role: isAdminUser ? 'admin' : isInstrutor ? 'instrutor' : 'colaborador',
      is_instrutor: isInstrutor,
      is_admin: isAdminUser,
      avatar: generateAvatar(colaborador.nome),
      bio: generateBio(colaborador.cargo, colaborador.departamento),
      especialidade: getEspecialidade(colaborador.cargo, colaborador.departamento),
      total_cursos: isInstrutor ? Math.floor(Math.random() * 10) + 1 : 0,
      total_alunos: isInstrutor ? Math.floor(Math.random() * 1000) + 100 : 0,
      created_at: colaborador.criado_em
    };
  });
}

// Função para obter apenas instrutores
export function getInstrutores(): Usuario[] {
  return parseColaboradores().filter(user => user.is_instrutor);
}

// Função para obter apenas admins
export function getAdmins(): Usuario[] {
  return parseColaboradores().filter(user => user.is_admin);
}

// Função para obter todos os usuários
export function getAllUsers(): Usuario[] {
  return parseColaboradores();
}
