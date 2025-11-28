// Estrutura de dados para o módulo de Boas Práticas Corporativas
export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface VideoContent {
  id: string;
  title: string;
  duration: number; // em minutos
  url: string;
  thumbnail: string;
  description: string;
}

export interface MaterialContent {
  id: string;
  title: string;
  type: 'pdf' | 'link' | 'image' | 'slide';
  url: string;
  description: string;
}

export interface Trail {
  id: string;
  nome: string;
  description: string;
  icon: string;
  color: string;
  category: string;
  videos: VideoContent[];
  materials: MaterialContent[];
  quiz: QuizQuestion[];
  estimatedTime: number; // em minutos
  order: number;
}

export interface CorporateModule {
  id: string;
  title: string;
  description: string;
  category: string;
  trilhas: Trail[];
  totalEstimatedTime: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  userId: string;
  trailId: string;
  completedVideos: string[];
  completedMaterials: string[];
  quizScore: number;
  completedAt?: string;
  certificateUrl?: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  condition: string;
  points: number;
  category?: string;
}

export interface CertificateData {
  id: string;
  userId: string;
  trailId: string;
  category: string;
  issuedDate: string;
  expiryDate: string;
  score: number;
  certificateUrl: string;
}

// Módulos organizados por categoria
export const clinicalModule: CorporateModule = {
  id: 'modulos-clinicos',
  title: 'Módulos Clínicos e Assistenciais',
  description: 'Capacitação em segurança do paciente, atualização científica e humanização do atendimento',
  category: 'clinico',
  totalEstimatedTime: 360, // 6 horas
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  trilhas: [
    {
      id: 'seguranca-paciente',
      nome: 'Segurança do Paciente',
      description: 'Protocolos de segurança, auditoria e prevenção de eventos adversos',
      icon: '🛡️',
      color: '#EF4444',
      category: 'clinico',
      order: 1,
      estimatedTime: 60,
      videos: [
        {
          id: 'seguranca-01',
          title: 'Fundamentos de Segurança do Paciente',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Conceitos básicos e importância da segurança do paciente'
        },
        {
          id: 'seguranca-02',
          title: 'Protocolos de Prevenção',
          duration: 10,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Protocolos específicos para prevenção de eventos adversos'
        },
        {
          id: 'seguranca-03',
          title: 'Auditoria e Melhoria Contínua',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Processos de auditoria e implementação de melhorias'
        }
      ],
      materials: [
        {
          id: 'seguranca-manual',
          title: 'Manual de Segurança do Paciente',
          type: 'pdf',
          url: '/materials/seguranca-manual.pdf',
          description: 'Protocolos completos de segurança'
        },
        {
          id: 'seguranca-checklist',
          title: 'Checklist de Segurança',
          type: 'pdf',
          url: '/materials/seguranca-checklist.pdf',
          description: 'Lista de verificação para procedimentos'
        }
      ],
      quiz: [
        {
          id: 'seguranca-q1',
          question: 'Qual é o objetivo principal da segurança do paciente?',
          options: [
            'Reduzir custos',
            'Prevenir eventos adversos',
            'Aumentar produtividade',
            'Melhorar a imagem'
          ],
          correctAnswer: 1,
          explanation: 'O objetivo principal é prevenir eventos adversos que possam causar danos ao paciente.'
        },
        {
          id: 'seguranca-q2',
          question: 'O que fazer em caso de evento adverso?',
          options: [
            'Esconder o erro',
            'Comunicar imediatamente',
            'Esperar orientação',
            'Resolver sozinho'
          ],
          correctAnswer: 1,
          explanation: 'Eventos adversos devem ser comunicados imediatamente para análise e correção.'
        }
      ]
    },
    {
      id: 'atualizacao-cientifica',
      nome: 'Atualização Científica em Odontologia',
      description: 'Novas técnicas, pesquisas e evidências científicas em odontologia',
      icon: '🔬',
      color: '#3B82F6',
      category: 'clinico',
      order: 2,
      estimatedTime: 45,
      videos: [
        {
          id: 'cientifica-01',
          title: 'Evidências Científicas em Odontologia',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Como interpretar e aplicar evidências científicas'
        },
        {
          id: 'cientifica-02',
          title: 'Novas Tecnologias Odontológicas',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
          description: 'Tecnologias emergentes e suas aplicações clínicas'
        }
      ],
      materials: [
        {
          id: 'cientifica-revista',
          title: 'Revista Científica AreLuna',
          type: 'pdf',
          url: '/materials/cientifica-revista.pdf',
          description: 'Últimas publicações e pesquisas'
        }
      ],
      quiz: [
        {
          id: 'cientifica-q1',
          question: 'Qual é o nível mais alto de evidência científica?',
          options: [
            'Opinião de especialista',
            'Estudos observacionais',
            'Revisões sistemáticas',
            'Casos clínicos'
          ],
          correctAnswer: 2,
          explanation: 'Revisões sistemáticas representam o mais alto nível de evidência científica.'
        }
      ]
    },
    {
      id: 'prontuario-lgpd',
      nome: 'Prontuário Eletrônico e LGPD',
      description: 'Uso correto do prontuário eletrônico e conformidade com a LGPD',
      icon: '📋',
      color: '#10B981',
      category: 'clinico',
      order: 3,
      estimatedTime: 50,
      videos: [
        {
          id: 'prontuario-01',
          title: 'Sistema de Prontuário Eletrônico',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
          thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
          description: 'Funcionalidades e uso correto do sistema'
        },
        {
          id: 'prontuario-02',
          title: 'LGPD na Prática Clínica',
          duration: 9,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Aplicação da Lei Geral de Proteção de Dados'
        }
      ],
      materials: [
        {
          id: 'prontuario-manual',
          title: 'Manual do Prontuário Eletrônico',
          type: 'pdf',
          url: '/materials/prontuario-manual.pdf',
          description: 'Guia completo de utilização'
        },
        {
          id: 'lgpd-guia',
          title: 'Guia LGPD para Profissionais de Saúde',
          type: 'pdf',
          url: '/materials/lgpd-guia.pdf',
          description: 'Diretrizes de conformidade'
        }
      ],
      quiz: [
        {
          id: 'prontuario-q1',
          question: 'Qual é o prazo para disponibilizar dados do paciente?',
          options: [
            '15 dias',
            '30 dias',
            '45 dias',
            '60 dias'
          ],
          correctAnswer: 0,
          explanation: 'O prazo é de 15 dias úteis para disponibilização dos dados.'
        }
      ]
    },
    {
      id: 'humanizacao-atendimento',
      nome: 'Humanização do Atendimento',
      description: 'Cuidado humanizado, empatia e comunicação efetiva com pacientes',
      icon: '❤️',
      color: '#EC4899',
      category: 'clinico',
      order: 4,
      estimatedTime: 40,
      videos: [
        {
          id: 'humanizacao-01',
          title: 'Cuidado Humanizado',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Princípios do cuidado humanizado em saúde'
        },
        {
          id: 'humanizacao-02',
          title: 'Comunicação com Pacientes',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Técnicas de comunicação efetiva e empática'
        }
      ],
      materials: [
        {
          id: 'humanizacao-guia',
          title: 'Guia de Humanização',
          type: 'pdf',
          url: '/materials/humanizacao-guia.pdf',
          description: 'Diretrizes para atendimento humanizado'
        }
      ],
      quiz: [
        {
          id: 'humanizacao-q1',
          question: 'Qual é o princípio fundamental do cuidado humanizado?',
          options: [
            'Eficiência',
            'Respeito à dignidade',
            'Rapidez',
            'Tecnologia'
          ],
          correctAnswer: 1,
          explanation: 'O respeito à dignidade humana é o princípio fundamental.'
        }
      ]
    },
    {
      id: 'comunicacao-paciente',
      nome: 'Comunicação Efetiva com o Paciente',
      description: 'Técnicas de comunicação, escuta ativa e manejo de situações difíceis',
      icon: '🗣️',
      color: '#8B5CF6',
      category: 'clinico',
      order: 5,
      estimatedTime: 35,
      videos: [
        {
          id: 'comunicacao-01',
          title: 'Escuta Ativa e Empatia',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Desenvolvendo habilidades de escuta e empatia'
        },
        {
          id: 'comunicacao-02',
          title: 'Manejo de Situações Difíceis',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
          description: 'Como lidar com pacientes ansiosos ou insatisfeitos'
        }
      ],
      materials: [
        {
          id: 'comunicacao-técnicas',
          title: 'Técnicas de Comunicação',
          type: 'pdf',
          url: '/materials/comunicacao-tecnicas.pdf',
          description: 'Manual de técnicas de comunicação'
        }
      ],
      quiz: [
        {
          id: 'comunicacao-q1',
          question: 'O que é escuta ativa?',
          options: [
            'Ouvir sem interromper',
            'Escutar com atenção e feedback',
            'Concordar com tudo',
            'Fazer perguntas constantes'
          ],
          correctAnswer: 1,
          explanation: 'Escuta ativa envolve atenção total e feedback para confirmar compreensão.'
        }
      ]
    },
    {
      id: 'cuidados-preventivos',
      nome: 'Cuidados Preventivos e Diagnóstico',
      description: 'Prevenção, diagnóstico precoce e abordagem sistêmica',
      icon: '🔍',
      color: '#F59E0B',
      category: 'clinico',
      order: 6,
      estimatedTime: 50,
      videos: [
        {
          id: 'preventivos-01',
          title: 'Prevenção em Odontologia',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
          thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
          description: 'Estratégias de prevenção e promoção de saúde'
        },
        {
          id: 'preventivos-02',
          title: 'Diagnóstico Precoce',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Importância do diagnóstico precoce e rastreamento'
        }
      ],
      materials: [
        {
          id: 'preventivos-protocolo',
          title: 'Protocolo de Prevenção',
          type: 'pdf',
          url: '/materials/preventivos-protocolo.pdf',
          description: 'Protocolos de cuidados preventivos'
        }
      ],
      quiz: [
        {
          id: 'preventivos-q1',
          question: 'Qual é a principal vantagem do diagnóstico precoce?',
          options: [
            'Reduzir custos',
            'Melhorar prognóstico',
            'Aumentar produtividade',
            'Simplificar tratamento'
          ],
          correctAnswer: 1,
          explanation: 'O diagnóstico precoce melhora significativamente o prognóstico do paciente.'
        }
      ]
    }
  ]
};

export const corporateModule: CorporateModule = {
  id: 'modulos-corporativos',
  title: 'Módulos Corporativos e Gestão',
  description: 'Cultura organizacional, liderança, compliance e gestão de indicadores',
  category: 'corporativo',
  totalEstimatedTime: 300, // 5 horas
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  trilhas: [
    {
      id: 'cultura-organizacional',
      nome: 'Cultura Organizacional AreLuna',
      description: 'Valores, missão, visão e cultura da instituição',
      icon: '🏛️',
      color: '#6366F1',
      category: 'corporativo',
      order: 1,
      estimatedTime: 45,
      videos: [
        {
          id: 'cultura-01',
          title: 'História e Valores AreLuna',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Conheça a trajetória e valores que nos guiam'
        },
        {
          id: 'cultura-02',
          title: 'Missão, Visão e Valores',
          duration: 5,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Nossos pilares organizacionais'
        }
      ],
      materials: [
        {
          id: 'cultura-manual',
          title: 'Manual de Cultura Organizacional',
          type: 'pdf',
          url: '/materials/cultura-manual.pdf',
          description: 'Documento completo sobre nossa cultura'
        }
      ],
      quiz: [
        {
          id: 'cultura-q1',
          question: 'Qual é o valor principal da AreLuna?',
          options: [
            'Excelência',
            'Inovação',
            'Humanização',
            'Todas as anteriores'
          ],
          correctAnswer: 3,
          explanation: 'Todos os valores são fundamentais para nossa cultura organizacional.'
        }
      ]
    },
    {
      id: 'lideranca-gestao',
      nome: 'Liderança e Gestão de Pessoas',
      description: 'Habilidades de liderança, gestão de equipes e desenvolvimento de pessoas',
      icon: '👥',
      color: '#059669',
      category: 'corporativo',
      order: 2,
      estimatedTime: 60,
      videos: [
        {
          id: 'lideranca-01',
          title: 'Fundamentos de Liderança',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Conceitos básicos de liderança eficaz'
        },
        {
          id: 'lideranca-02',
          title: 'Gestão de Equipes',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
          description: 'Como gerenciar e motivar equipes'
        },
        {
          id: 'lideranca-03',
          title: 'Desenvolvimento de Pessoas',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
          thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
          description: 'Estratégias para desenvolvimento profissional'
        }
      ],
      materials: [
        {
          id: 'lideranca-guia',
          title: 'Guia de Liderança',
          type: 'pdf',
          url: '/materials/lideranca-guia.pdf',
          description: 'Manual de liderança e gestão'
        }
      ],
      quiz: [
        {
          id: 'lideranca-q1',
          question: 'Qual é a característica mais importante de um líder?',
          options: [
            'Autoridade',
            'Comunicação',
            'Inteligência',
            'Experiência'
          ],
          correctAnswer: 1,
          explanation: 'A comunicação é fundamental para liderança eficaz.'
        }
      ]
    },
    {
      id: 'compliance-etica',
      nome: 'Compliance e Ética Profissional',
      description: 'Normas regulatórias, ética profissional e conformidade',
      icon: '⚖️',
      color: '#DC2626',
      category: 'corporativo',
      order: 3,
      estimatedTime: 50,
      videos: [
        {
          id: 'compliance-01',
          title: 'Fundamentos de Compliance',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Conceitos de compliance e conformidade'
        },
        {
          id: 'compliance-02',
          title: 'Ética Profissional',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Código de ética e conduta profissional'
        }
      ],
      materials: [
        {
          id: 'compliance-manual',
          title: 'Manual de Compliance',
          type: 'pdf',
          url: '/materials/compliance-manual.pdf',
          description: 'Diretrizes de conformidade'
        }
      ],
      quiz: [
        {
          id: 'compliance-q1',
          question: 'O que é compliance?',
          options: [
            'Conformidade com normas',
            'Competência técnica',
            'Comunicação eficaz',
            'Controle de qualidade'
          ],
          correctAnswer: 0,
          explanation: 'Compliance é a conformidade com normas e regulamentações.'
        }
      ]
    },
    {
      id: 'acreditacoes',
      nome: 'Acreditações (ONA, JCI)',
      description: 'Processos de acreditação, qualidade e melhoria contínua',
      icon: '🏆',
      color: '#7C3AED',
      category: 'corporativo',
      order: 4,
      estimatedTime: 55,
      videos: [
        {
          id: 'acreditacao-01',
          title: 'Processo de Acreditação ONA',
          duration: 9,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Entendendo o processo de acreditação ONA'
        },
        {
          id: 'acreditacao-02',
          title: 'Padrões JCI',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Padrões internacionais de qualidade'
        }
      ],
      materials: [
        {
          id: 'acreditacao-guia',
          title: 'Guia de Acreditação',
          type: 'pdf',
          url: '/materials/acreditacao-guia.pdf',
          description: 'Manual de processos de acreditação'
        }
      ],
      quiz: [
        {
          id: 'acreditacao-q1',
          question: 'Qual é o objetivo da acreditação?',
          options: [
            'Reduzir custos',
            'Garantir qualidade',
            'Aumentar lucros',
            'Simplificar processos'
          ],
          correctAnswer: 1,
          explanation: 'A acreditação tem como objetivo garantir a qualidade dos serviços.'
        }
      ]
    },
    {
      id: 'indicadores-operacionais',
      nome: 'Gestão de Indicadores Operacionais',
      description: 'KPIs, métricas de performance e análise de dados',
      icon: '📊',
      color: '#0891B2',
      category: 'corporativo',
      order: 5,
      estimatedTime: 50,
      videos: [
        {
          id: 'indicadores-01',
          title: 'Fundamentos de KPIs',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
          description: 'Conceitos de indicadores de performance'
        },
        {
          id: 'indicadores-02',
          title: 'Análise de Dados',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
          thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
          description: 'Como analisar e interpretar dados operacionais'
        }
      ],
      materials: [
        {
          id: 'indicadores-dashboard',
          title: 'Dashboard de Indicadores',
          type: 'link',
          url: '/dashboard/indicadores',
          description: 'Acesso ao dashboard de métricas'
        }
      ],
      quiz: [
        {
          id: 'indicadores-q1',
          question: 'O que significa KPI?',
          options: [
            'Key Performance Indicator',
            'Key Process Indicator',
            'Key Profit Indicator',
            'Key Product Indicator'
          ],
          correctAnswer: 0,
          explanation: 'KPI significa Key Performance Indicator (Indicador-Chave de Performance).'
        }
      ]
    }
  ]
};

export const technologyModule: CorporateModule = {
  id: 'modulos-tecnologia',
  title: 'Módulos de Tecnologia e Inovação',
  description: 'Sistemas digitais, telemedicina, cibersegurança e softwares de gestão',
  category: 'tecnologia',
  totalEstimatedTime: 240, // 4 horas
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  trilhas: [
    {
      id: 'sistema-pixeon',
      nome: 'Sistema Pixeon - Introdução',
      description: 'Funcionalidades básicas e uso do sistema de gestão Pixeon',
      icon: '💻',
      color: '#0EA5E9',
      category: 'tecnologia',
      order: 1,
      estimatedTime: 60,
      videos: [
        {
          id: 'pixeon-01',
          title: 'Introdução ao Sistema Pixeon',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Visão geral do sistema e suas funcionalidades'
        },
        {
          id: 'pixeon-02',
          title: 'Navegação e Interface',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Como navegar pela interface do sistema'
        },
        {
          id: 'pixeon-03',
          title: 'Funcionalidades Principais',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Principais recursos e como utilizá-los'
        }
      ],
      materials: [
        {
          id: 'pixeon-manual',
          title: 'Manual do Sistema Pixeon',
          type: 'pdf',
          url: '/materials/pixeon-manual.pdf',
          description: 'Guia completo de utilização'
        },
        {
          id: 'pixeon-tutoriais',
          title: 'Tutoriais Interativos',
          type: 'link',
          url: '/tutoriais/pixeon',
          description: 'Tutoriais práticos do sistema'
        }
      ],
      quiz: [
        {
          id: 'pixeon-q1',
          question: 'Qual é a principal função do sistema Pixeon?',
          options: [
            'Gestão financeira',
            'Gestão clínica e administrativa',
            'Marketing',
            'Recursos humanos'
          ],
          correctAnswer: 1,
          explanation: 'O Pixeon é um sistema de gestão clínica e administrativa.'
        }
      ]
    },
    {
      id: 'telemedicina',
      nome: 'Telemedicina: Operação e Ética',
      description: 'Uso de telemedicina, aspectos éticos e regulamentação',
      icon: '📱',
      color: '#10B981',
      category: 'tecnologia',
      order: 2,
      estimatedTime: 50,
      videos: [
        {
          id: 'telemedicina-01',
          title: 'Fundamentos de Telemedicina',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Conceitos e aplicações da telemedicina'
        },
        {
          id: 'telemedicina-02',
          title: 'Aspectos Éticos e Legais',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
          description: 'Considerações éticas e regulamentação'
        }
      ],
      materials: [
        {
          id: 'telemedicina-guia',
          title: 'Guia de Telemedicina',
          type: 'pdf',
          url: '/materials/telemedicina-guia.pdf',
          description: 'Diretrizes para uso da telemedicina'
        }
      ],
      quiz: [
        {
          id: 'telemedicina-q1',
          question: 'Qual é a principal vantagem da telemedicina?',
          options: [
            'Reduzir custos',
            'Aumentar acesso',
            'Melhorar qualidade',
            'Simplificar processos'
          ],
          correctAnswer: 1,
          explanation: 'A telemedicina aumenta o acesso aos serviços de saúde.'
        }
      ]
    },
    {
      id: 'ciberseguranca',
      nome: 'Cibersegurança e Integridade de Dados',
      description: 'Proteção de dados, segurança digital e integridade de informações',
      icon: '🔐',
      color: '#EF4444',
      category: 'tecnologia',
      order: 3,
      estimatedTime: 65,
      videos: [
        {
          id: 'cyber-01',
          title: 'Fundamentos de Cibersegurança',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
          thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
          description: 'Conceitos básicos de segurança digital'
        },
        {
          id: 'cyber-02',
          title: 'Proteção de Dados Sensíveis',
          duration: 9,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Como proteger dados de pacientes e informações sensíveis'
        },
        {
          id: 'cyber-03',
          title: 'Boas Práticas de Segurança',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Práticas essenciais para segurança digital'
        }
      ],
      materials: [
        {
          id: 'cyber-politica',
          title: 'Política de Cibersegurança',
          type: 'pdf',
          url: '/materials/cyber-politica.pdf',
          description: 'Diretrizes de segurança digital'
        },
        {
          id: 'cyber-checklist',
          title: 'Checklist de Segurança',
          type: 'pdf',
          url: '/materials/cyber-checklist.pdf',
          description: 'Lista de verificação de segurança'
        }
      ],
      quiz: [
        {
          id: 'cyber-q1',
          question: 'Qual é a melhor prática para senhas?',
          options: [
            'Usar a mesma senha',
            'Senhas complexas e únicas',
            'Anotar em papel',
            'Compartilhar com colegas'
          ],
          correctAnswer: 1,
          explanation: 'Senhas devem ser complexas, únicas e não compartilhadas.'
        }
      ]
    },
    {
      id: 'softwares-gestao',
      nome: 'Softwares de Gestão - Tutoriais',
      description: 'Tutoriais práticos de softwares utilizados na instituição',
      icon: '🛠️',
      color: '#F59E0B',
      category: 'tecnologia',
      order: 4,
      estimatedTime: 65,
      videos: [
        {
          id: 'softwares-01',
          title: 'Tutoriais Básicos',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Tutoriais básicos dos softwares utilizados'
        },
        {
          id: 'softwares-02',
          title: 'Funcionalidades Avançadas',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Recursos avançados e dicas de produtividade'
        },
        {
          id: 'softwares-03',
          title: 'Resolução de Problemas',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
          description: 'Como resolver problemas comuns'
        }
      ],
      materials: [
        {
          id: 'softwares-manual',
          title: 'Manual de Softwares',
          type: 'pdf',
          url: '/materials/softwares-manual.pdf',
          description: 'Manual completo dos softwares'
        },
        {
          id: 'softwares-faq',
          title: 'FAQ - Perguntas Frequentes',
          type: 'link',
          url: '/faq/softwares',
          description: 'Perguntas e respostas comuns'
        }
      ],
      quiz: [
        {
          id: 'softwares-q1',
          question: 'O que fazer quando um software não funciona?',
          options: [
            'Reiniciar o computador',
            'Verificar conexão e contatar suporte',
            'Desinstalar e reinstalar',
            'Usar outro software'
          ],
          correctAnswer: 1,
          explanation: 'Primeiro verificar conexão e contatar o suporte técnico.'
        }
      ]
    }
  ]
};

export const onboardingModule: CorporateModule = {
  id: 'modulos-onboarding',
  title: 'Módulos de Onboarding e Desenvolvimento',
  description: 'Treinamento para novos colaboradores e trilhas personalizadas por área',
  category: 'onboarding',
  totalEstimatedTime: 200, // 3.5 horas
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  trilhas: [
    {
      id: 'novos-colaboradores',
      nome: 'Novos Colaboradores: Boas-Vindas',
      description: 'Apresentação da instituição, cultura e processos básicos',
      icon: '👋',
      color: '#8B5CF6',
      category: 'onboarding',
      order: 1,
      estimatedTime: 60,
      videos: [
        {
          id: 'boas-vindas-01',
          title: 'Bem-vindo à AreLuna',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Apresentação da instituição e equipe'
        },
        {
          id: 'boas-vindas-02',
          title: 'Cultura e Valores',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Nossa cultura organizacional e valores'
        },
        {
          id: 'boas-vindas-03',
          title: 'Processos Básicos',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Processos essenciais para novos colaboradores'
        }
      ],
      materials: [
        {
          id: 'boas-vindas-guia',
          title: 'Guia do Novo Colaborador',
          type: 'pdf',
          url: '/materials/boas-vindas-guia.pdf',
          description: 'Manual completo para novos colaboradores'
        },
        {
          id: 'boas-vindas-checklist',
          title: 'Checklist de Onboarding',
          type: 'pdf',
          url: '/materials/boas-vindas-checklist.pdf',
          description: 'Lista de tarefas para primeiros dias'
        }
      ],
      quiz: [
        {
          id: 'boas-vindas-q1',
          question: 'Qual é o primeiro passo no onboarding?',
          options: [
            'Conhecer a equipe',
            'Ler o manual',
            'Configurar equipamentos',
            'Assistir vídeos de boas-vindas'
          ],
          correctAnswer: 3,
          explanation: 'Os vídeos de boas-vindas são o primeiro passo no processo.'
        }
      ]
    },
    {
      id: 'trilha-recepcao',
      nome: 'Trilha Recepção',
      description: 'Específica para colaboradores da recepção e atendimento',
      icon: '🏢',
      color: '#059669',
      category: 'onboarding',
      order: 2,
      estimatedTime: 50,
      videos: [
        {
          id: 'recepcao-01',
          title: 'Atendimento ao Cliente',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Técnicas de atendimento e relacionamento com clientes'
        },
        {
          id: 'recepcao-02',
          title: 'Sistemas de Agendamento',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
          description: 'Como usar os sistemas de agendamento'
        }
      ],
      materials: [
        {
          id: 'recepcao-manual',
          title: 'Manual da Recepção',
          type: 'pdf',
          url: '/materials/recepcao-manual.pdf',
          description: 'Procedimentos específicos da recepção'
        }
      ],
      quiz: [
        {
          id: 'recepcao-q1',
          question: 'Qual é a prioridade no atendimento?',
          options: [
            'Velocidade',
            'Qualidade',
            'Eficiência',
            'Satisfação do cliente'
          ],
          correctAnswer: 3,
          explanation: 'A satisfação do cliente é sempre a prioridade.'
        }
      ]
    },
    {
      id: 'trilha-clinica',
      nome: 'Trilha Clínica',
      description: 'Específica para profissionais da área clínica',
      icon: '🦷',
      color: '#0EA5E9',
      category: 'onboarding',
      order: 3,
      estimatedTime: 50,
      videos: [
        {
          id: 'clinica-01',
          title: 'Protocolos Clínicos',
          duration: 9,
          url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
          thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
          description: 'Protocolos e procedimentos clínicos'
        },
        {
          id: 'clinica-02',
          title: 'Equipamentos e Instrumentos',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Conhecendo equipamentos e instrumentos'
        }
      ],
      materials: [
        {
          id: 'clinica-protocolos',
          title: 'Protocolos Clínicos',
          type: 'pdf',
          url: '/materials/clinica-protocolos.pdf',
          description: 'Manual de protocolos clínicos'
        }
      ],
      quiz: [
        {
          id: 'clinica-q1',
          question: 'Qual é o protocolo mais importante?',
          options: [
            'Segurança do paciente',
            'Eficiência',
            'Custos',
            'Tempo'
          ],
          correctAnswer: 0,
          explanation: 'A segurança do paciente é sempre o protocolo mais importante.'
        }
      ]
    },
    {
      id: 'trilha-administrativa',
      nome: 'Trilha Administrativa',
      description: 'Específica para colaboradores da área administrativa',
      icon: '📋',
      color: '#F59E0B',
      category: 'onboarding',
      order: 4,
      estimatedTime: 40,
      videos: [
        {
          id: 'admin-01',
          title: 'Processos Administrativos',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Processos e procedimentos administrativos'
        },
        {
          id: 'admin-02',
          title: 'Sistemas de Gestão',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Como usar os sistemas de gestão administrativa'
        }
      ],
      materials: [
        {
          id: 'admin-manual',
          title: 'Manual Administrativo',
          type: 'pdf',
          url: '/materials/admin-manual.pdf',
          description: 'Procedimentos administrativos'
        }
      ],
      quiz: [
        {
          id: 'admin-q1',
          question: 'Qual é o foco da área administrativa?',
          options: [
            'Atendimento direto',
            'Suporte operacional',
            'Vendas',
            'Marketing'
          ],
          correctAnswer: 1,
          explanation: 'A área administrativa foca no suporte operacional.'
        }
      ]
    }
  ]
};

export const softSkillsModule: CorporateModule = {
  id: 'modulos-soft-skills',
  title: 'Módulos de Soft Skills',
  description: 'Comunicação interna, gestão de conflitos e inovação corporativa',
  category: 'soft-skills',
  totalEstimatedTime: 150, // 2.5 horas
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  trilhas: [
    {
      id: 'comunicacao-interna-avancada',
      nome: 'Comunicação Interna Avançada',
      description: 'Técnicas avançadas de comunicação, apresentações e reuniões',
      icon: '💬',
      color: '#10B981',
      category: 'soft-skills',
      order: 1,
      estimatedTime: 50,
      videos: [
        {
          id: 'comunicacao-av-01',
          title: 'Comunicação Assertiva',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Desenvolvendo comunicação assertiva e eficaz'
        },
        {
          id: 'comunicacao-av-02',
          title: 'Apresentações Eficazes',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
          description: 'Como fazer apresentações impactantes'
        }
      ],
      materials: [
        {
          id: 'comunicacao-av-guia',
          title: 'Guia de Comunicação Avançada',
          type: 'pdf',
          url: '/materials/comunicacao-av-guia.pdf',
          description: 'Técnicas avançadas de comunicação'
        }
      ],
      quiz: [
        {
          id: 'comunicacao-av-q1',
          question: 'O que é comunicação assertiva?',
          options: [
            'Falar alto',
            'Expressar opiniões de forma clara e respeitosa',
            'Ser agressivo',
            'Concordar com tudo'
          ],
          correctAnswer: 1,
          explanation: 'Comunicação assertiva é expressar opiniões de forma clara e respeitosa.'
        }
      ]
    },
    {
      id: 'gestao-conflitos',
      nome: 'Gestão de Conflitos',
      description: 'Identificação, prevenção e resolução de conflitos no ambiente de trabalho',
      icon: '🤝',
      color: '#EF4444',
      category: 'soft-skills',
      order: 2,
      estimatedTime: 50,
      videos: [
        {
          id: 'conflitos-01',
          title: 'Identificando Conflitos',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
          thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
          description: 'Como identificar e prevenir conflitos'
        },
        {
          id: 'conflitos-02',
          title: 'Técnicas de Resolução',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Estratégias para resolver conflitos'
        }
      ],
      materials: [
        {
          id: 'conflitos-guia',
          title: 'Guia de Gestão de Conflitos',
          type: 'pdf',
          url: '/materials/conflitos-guia.pdf',
          description: 'Manual de resolução de conflitos'
        }
      ],
      quiz: [
        {
          id: 'conflitos-q1',
          question: 'Qual é o primeiro passo na resolução de conflitos?',
          options: [
            'Escolher um lado',
            'Entender as partes envolvidas',
            'Impor uma solução',
            'Evitar o conflito'
          ],
          correctAnswer: 1,
          explanation: 'Primeiro é necessário entender as partes envolvidas no conflito.'
        }
      ]
    },
    {
      id: 'inovacao-gestao-mudancas',
      nome: 'Inovação e Gestão de Mudanças',
      description: 'Cultura de inovação, adaptação a mudanças e criatividade',
      icon: '💡',
      color: '#8B5CF6',
      category: 'soft-skills',
      order: 3,
      estimatedTime: 50,
      videos: [
        {
          id: 'inovacao-01',
          title: 'Cultura de Inovação',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Desenvolvendo uma cultura de inovação'
        },
        {
          id: 'inovacao-02',
          title: 'Gestão de Mudanças',
          duration: 8,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Como gerenciar e se adaptar a mudanças'
        }
      ],
      materials: [
        {
          id: 'inovacao-guia',
          title: 'Guia de Inovação',
          type: 'pdf',
          url: '/materials/inovacao-guia.pdf',
          description: 'Manual de inovação e mudanças'
        }
      ],
      quiz: [
        {
          id: 'inovacao-q1',
          question: 'O que é essencial para a inovação?',
          options: [
            'Recursos financeiros',
            'Criatividade e abertura',
            'Tecnologia avançada',
            'Equipe grande'
          ],
          correctAnswer: 1,
          explanation: 'Criatividade e abertura são essenciais para a inovação.'
        }
      ]
    }
  ]
};

// Módulo original de Boas Práticas Corporativas (mantido para compatibilidade)
export const corporateTrainingModule: CorporateModule = {
  id: 'boas-praticas-corporativas',
  title: 'Boas Práticas Corporativas',
  description: 'Capacitação completa em conduta profissional, cultura da empresa e normas institucionais',
  category: 'corporativo',
  totalEstimatedTime: 180, // 3 horas
  createdAt: '2024-01-01',
  updatedAt: '2024-01-01',
  trilhas: [
    {
      id: 'etica-conduta',
      nome: 'Ética e Conduta',
      description: 'Fundamentos éticos e código de conduta profissional',
      icon: '⚖️',
      color: '#3B82F6',
      category: 'corporativo',
      order: 1,
      estimatedTime: 45,
      videos: [
        {
          id: 'etica-01',
          title: 'Introdução à Ética Profissional',
          duration: 5,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Conceitos fundamentais de ética no ambiente de trabalho'
        },
        {
          id: 'etica-02',
          title: 'Código de Conduta AreLuna',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Detalhes do código de conduta e exemplos práticos'
        },
        {
          id: 'etica-03',
          title: 'Casos Práticos de Dilemas Éticos',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Análise de situações reais e tomada de decisões'
        }
      ],
      materials: [
        {
          id: 'etica-guia',
          title: 'Guia de Ética Profissional',
          type: 'pdf',
          url: '/materials/etica-guia.pdf',
          description: 'Manual completo com diretrizes éticas'
        },
        {
          id: 'etica-casos',
          title: 'Casos de Estudo',
          type: 'pdf',
          url: '/materials/etica-casos.pdf',
          description: 'Exercícios práticos para reflexão'
        }
      ],
      quiz: [
        {
          id: 'etica-q1',
          question: 'Qual é o principal objetivo do código de conduta?',
          options: [
            'Estabelecer regras rígidas',
            'Orientar o comportamento ético',
            'Punir infrações',
            'Controlar funcionários'
          ],
          correctAnswer: 1,
          explanation: 'O código de conduta tem como objetivo principal orientar o comportamento ético dos colaboradores, fornecendo diretrizes claras sobre como agir em situações profissionais.'
        },
        {
          id: 'etica-q2',
          question: 'Em caso de conflito de interesses, o que deve ser feito?',
          options: [
            'Ignorar a situação',
            'Comunicar imediatamente ao superior',
            'Resolver sozinho',
            'Esperar passar'
          ],
          correctAnswer: 1,
          explanation: 'Conflitos de interesse devem ser comunicados imediatamente ao superior hierárquico para análise e resolução adequada.'
        }
      ]
    },
    {
      id: 'identidade-institucional',
      nome: 'Identidade Institucional',
      description: 'Uso correto da marca, comunicação e valores AreLuna',
      icon: '🎨',
      color: '#8B5CF6',
      category: 'corporativo',
      order: 2,
      estimatedTime: 30,
      videos: [
        {
          id: 'branding-01',
          title: 'História e Valores AreLuna',
          duration: 4,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Conheça a trajetória e os valores que nos guiam'
        },
        {
          id: 'branding-02',
          title: 'Manual de Identidade Visual',
          duration: 5,
          url: 'https://www.youtube.com/watch?v=jNQXAC9IVRw',
          thumbnail: 'https://img.youtube.com/vi/jNQXAC9IVRw/maxresdefault.jpg',
          description: 'Como usar corretamente a marca AreLuna'
        }
      ],
      materials: [
        {
          id: 'manual-normas',
          title: 'Manual de Normas Visuais',
          type: 'pdf',
          url: '/materials/manual-normas.pdf',
          description: 'Diretrizes completas para uso da identidade visual'
        },
        {
          id: 'templates',
          title: 'Templates Oficiais',
          type: 'link',
          url: '/templates',
          description: 'Modelos padronizados para documentos'
        }
      ],
      quiz: [
        {
          id: 'branding-q1',
          question: 'Qual é a cor principal da identidade AreLuna?',
          options: [
            'Azul',
            'Dourado',
            'Verde',
            'Vermelho'
          ],
          correctAnswer: 1,
          explanation: 'O dourado é a cor principal da identidade AreLuna, representando excelência e qualidade.'
        }
      ]
    },
    {
      id: 'comunicacao-interna',
      nome: 'Comunicação Interna',
      description: 'Eficácia na comunicação entre equipes e com clientes',
      icon: '💬',
      color: '#10B981',
      category: 'corporativo',
      order: 3,
      estimatedTime: 35,
      videos: [
        {
          id: 'comunicacao-01',
          title: 'Comunicação Eficaz',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=M7lc1UVf-VE',
          thumbnail: 'https://img.youtube.com/vi/M7lc1UVf-VE/maxresdefault.jpg',
          description: 'Técnicas para melhorar a comunicação no trabalho'
        },
        {
          id: 'comunicacao-02',
          title: 'Atendimento ao Cliente',
          duration: 5,
          url: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
          thumbnail: 'https://img.youtube.com/vi/9bZkp7q19f0/maxresdefault.jpg',
          description: 'Como oferecer um atendimento excepcional'
        }
      ],
      materials: [
        {
          id: 'comunicacao-guia',
          title: 'Guia de Comunicação',
          type: 'pdf',
          url: '/materials/comunicacao-guia.pdf',
          description: 'Protocolos e boas práticas de comunicação'
        }
      ],
      quiz: [
        {
          id: 'comunicacao-q1',
          question: 'Qual é o primeiro passo para uma comunicação eficaz?',
          options: [
            'Falar alto',
            'Escutar ativamente',
            'Usar gestos',
            'Ser direto'
          ],
          correctAnswer: 1,
          explanation: 'Escutar ativamente é fundamental para uma comunicação eficaz, pois permite entender completamente a mensagem do interlocutor.'
        }
      ]
    },
    {
      id: 'seguranca-dados',
      nome: 'Segurança da Informação',
      description: 'Proteção de dados e informações confidenciais',
      icon: '🔒',
      color: '#EF4444',
      category: 'corporativo',
      order: 4,
      estimatedTime: 40,
      videos: [
        {
          id: 'seguranca-01',
          title: 'Fundamentos de Segurança',
          duration: 7,
          url: 'https://www.youtube.com/watch?v=L_jWHffIx5E',
          thumbnail: 'https://img.youtube.com/vi/L_jWHffIx5E/maxresdefault.jpg',
          description: 'Conceitos básicos de proteção de informações'
        },
        {
          id: 'seguranca-02',
          title: 'LGPD e Privacidade',
          duration: 6,
          url: 'https://www.youtube.com/watch?v=ZXsQAXx_ao0',
          thumbnail: 'https://img.youtube.com/vi/ZXsQAXx_ao0/maxresdefault.jpg',
          description: 'Lei Geral de Proteção de Dados aplicada ao trabalho'
        }
      ],
      materials: [
        {
          id: 'seguranca-politica',
          title: 'Política de Segurança',
          type: 'pdf',
          url: '/materials/seguranca-politica.pdf',
          description: 'Diretrizes de segurança da informação'
        }
      ],
      quiz: [
        {
          id: 'seguranca-q1',
          question: 'O que fazer ao receber um email suspeito?',
          options: [
            'Abrir imediatamente',
            'Deletar sem abrir',
            'Encaminhar para todos',
            'Responder questionando'
          ],
          correctAnswer: 1,
          explanation: 'Emails suspeitos devem ser deletados sem abertura para evitar riscos de segurança.'
        }
      ]
    },
    {
      id: 'rotinas-operacionais',
      nome: 'Rotinas Operacionais',
      description: 'Processos internos e procedimentos padrão',
      icon: '⚙️',
      color: '#F59E0B',
      category: 'corporativo',
      order: 5,
      estimatedTime: 30,
      videos: [
        {
          id: 'rotinas-01',
          title: 'Processos Internos',
          duration: 5,
          url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
          thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
          description: 'Conhecendo os processos da AreLuna'
        }
      ],
      materials: [
        {
          id: 'rotinas-manual',
          title: 'Manual de Procedimentos',
          type: 'pdf',
          url: '/materials/rotinas-manual.pdf',
          description: 'Procedimentos operacionais padronizados'
        }
      ],
      quiz: [
        {
          id: 'rotinas-q1',
          question: 'Qual é o horário de funcionamento padrão?',
          options: [
            '8h às 17h',
            '9h às 18h',
            '8h às 18h',
            'Flexível'
          ],
          correctAnswer: 2,
          explanation: 'O horário padrão é das 8h às 18h, com flexibilidade conforme necessidade do serviço.'
        }
      ]
    }
  ]
};

// Array com todos os módulos
export const allModules: CorporateModule[] = [
  clinicalModule,
  corporateModule,
  technologyModule,
  onboardingModule,
  softSkillsModule,
  corporateTrainingModule
];

// Sistema de conquistas expandido
export const achievements: Achievement[] = [
  // Conquistas gerais
  {
    id: 'primeira-trilha',
    name: 'Primeira Trilha',
    description: 'Complete sua primeira trilha de treinamento',
    icon: '🎯',
    condition: 'complete_trail',
    points: 10
  },
  {
    id: 'completo',
    name: 'Treinamento Completo',
    description: 'Complete todas as trilhas do módulo',
    icon: '🏆',
    condition: 'complete_all_trails',
    points: 100
  },
  
  // Conquistas por categoria - Clínicos
  {
    id: 'clinico-master',
    name: 'Mestre Clínico',
    description: 'Complete todas as trilhas clínicas',
    icon: '🦷',
    condition: 'complete_clinical_category',
    points: 50,
    category: 'clinico'
  },
  {
    id: 'seguranca-expert',
    name: 'Especialista em Segurança',
    description: 'Complete a trilha de Segurança do Paciente',
    icon: '🛡️',
    condition: 'complete_security_trail',
    points: 25,
    category: 'clinico'
  },
  
  // Conquistas por categoria - Corporativos
  {
    id: 'corporativo-master',
    name: 'Mestre Corporativo',
    description: 'Complete todas as trilhas corporativas',
    icon: '🏛️',
    condition: 'complete_corporate_category',
    points: 50,
    category: 'corporativo'
  },
  {
    id: 'lider-nato',
    name: 'Líder Nato',
    description: 'Complete a trilha de Liderança e Gestão',
    icon: '👥',
    condition: 'complete_leadership_trail',
    points: 30,
    category: 'corporativo'
  },
  
  // Conquistas por categoria - Tecnologia
  {
    id: 'tech-master',
    name: 'Mestre da Tecnologia',
    description: 'Complete todas as trilhas de tecnologia',
    icon: '💻',
    condition: 'complete_technology_category',
    points: 50,
    category: 'tecnologia'
  },
  {
    id: 'cyber-guardian',
    name: 'Guardião Cibernético',
    description: 'Complete a trilha de Cibersegurança',
    icon: '🔐',
    condition: 'complete_cybersecurity_trail',
    points: 35,
    category: 'tecnologia'
  },
  
  // Conquistas por categoria - Onboarding
  {
    id: 'onboarding-master',
    name: 'Mestre do Onboarding',
    description: 'Complete todas as trilhas de onboarding',
    icon: '👋',
    condition: 'complete_onboarding_category',
    points: 40,
    category: 'onboarding'
  },
  {
    id: 'novato-expert',
    name: 'Novato Expert',
    description: 'Complete a trilha de Novos Colaboradores',
    icon: '🌟',
    condition: 'complete_new_employee_trail',
    points: 20,
    category: 'onboarding'
  },
  
  // Conquistas por categoria - Soft Skills
  {
    id: 'soft-skills-master',
    name: 'Mestre das Soft Skills',
    description: 'Complete todas as trilhas de soft skills',
    icon: '💡',
    condition: 'complete_soft_skills_category',
    points: 40,
    category: 'soft-skills'
  },
  {
    id: 'comunicador-excelente',
    name: 'Comunicador Excelente',
    description: 'Complete a trilha de Comunicação Interna Avançada',
    icon: '💬',
    condition: 'complete_communication_trail',
    points: 25,
    category: 'soft-skills'
  },
  
  // Conquistas especiais
  {
    id: 'master-geral',
    name: 'Mestre Geral',
    description: 'Complete todas as trilhas de todas as categorias',
    icon: '👑',
    condition: 'complete_all_categories',
    points: 200
  },
  {
    id: 'perfeccionista',
    name: 'Perfeccionista',
    description: 'Acerte 100% em todos os quizzes',
    icon: '💯',
    condition: 'perfect_all_quizzes',
    points: 150
  }
];

// Funções utilitárias
export function calculateProgress(userProgress: UserProgress[], trailId: string): number {
  const progress = userProgress.find(p => p.trailId === trailId);
  if (!progress) return 0;
  
  const trail = getAllTrails().find(t => t.id === trailId);
  if (!trail) return 0;
  
  const totalItems = trail.videos.length + trail.materials.length;
  const completedItems = progress.completedVideos.length + progress.completedMaterials.length;
  
  return Math.round((completedItems / totalItems) * 100);
}

export function getAllTrails(): Trail[] {
  return allModules.flatMap(module => module.trilhas);
}

export function getTrailsByCategory(category: string): Trail[] {
  return getAllTrails().filter(trail => trail.category === category);
}

export function getModuleByCategory(category: string): CorporateModule | undefined {
  return allModules.find(module => module.category === category);
}

export function getUserAchievements(userProgress: UserProgress[]): Achievement[] {
  const userAchievements: Achievement[] = [];
  
  // Verificar conquistas básicas
  if (userProgress.length > 0) {
    userAchievements.push(achievements[0]); // Primeira trilha
  }
  
  // Verificar conquistas por categoria
  const categories = ['clinico', 'corporativo', 'tecnologia', 'onboarding', 'soft-skills'];
  
  categories.forEach(category => {
    const categoryTrails = getTrailsByCategory(category);
    const completedCategoryTrails = userProgress.filter(p => 
      categoryTrails.some(trail => trail.id === p.trailId)
    );
    
    if (completedCategoryTrails.length === categoryTrails.length) {
      const categoryAchievement = achievements.find(a => a.condition === `complete_${category}_category`);
      if (categoryAchievement) {
        userAchievements.push(categoryAchievement);
      }
    }
  });
  
  // Verificar conquista master geral
  if (userProgress.length === getAllTrails().length) {
    const masterAchievement = achievements.find(a => a.condition === 'complete_all_categories');
    if (masterAchievement) {
      userAchievements.push(masterAchievement);
    }
  }
  
  return userAchievements;
}

export function generateCertificate(userId: string, trailId: string): string {
  // Simular geração de certificado
  return `/certificates/${userId}-${trailId}-${Date.now()}.pdf`;
}

export function getCategoryStats() {
  const stats = allModules.map(module => ({
    category: module.category,
    title: module.title,
    totalTrails: module.trilhas.length,
    totalTime: module.totalEstimatedTime,
    completedTrails: 0, // Mock data - seria calculado com dados reais
    completionRate: Math.floor(Math.random() * 100) // Mock data
  }));
  
  return stats;
}