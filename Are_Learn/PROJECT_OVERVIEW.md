# 📊 Visão Geral do Projeto AreLuna

## 🎯 Objetivo

Plataforma completa de educação corporativa online, inspirada no MasterClass, desenvolvida para o **Instituto AreLuna**. Uma solução moderna, escalável e focada em resultados mensuráveis.

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────────────┐
│                         FRONTEND                             │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐        │
│  │   Next.js   │  │  Tailwind   │  │  TypeScript  │        │
│  │   App Router│  │     CSS     │  │              │        │
│  └─────────────┘  └─────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ API Calls
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         BACKEND                              │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐        │
│  │  Supabase   │  │  PostgreSQL │  │     Auth     │        │
│  │     API     │  │   Database  │  │  (Futuro)    │        │
│  └─────────────┘  └─────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ Storage
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    SERVIÇOS EXTERNOS                         │
│  ┌─────────────┐  ┌─────────────┐  ┌──────────────┐        │
│  │    Vimeo    │  │     Mux     │  │   Storage    │        │
│  │   (Vídeos)  │  │  (Vídeos)   │  │  (Arquivos)  │        │
│  └─────────────┘  └─────────────┘  └──────────────┘        │
└─────────────────────────────────────────────────────────────┘
```

## 📱 Áreas da Plataforma

### 1. 🌐 Área Pública
```
Homepage (/)
├── Hero Section
├── Stats & Numbers
├── Cursos em Destaque
├── Recursos da Plataforma
└── CTA Corporativo

Cursos (/cursos)
├── Listagem Completa
├── Filtros (categoria, nível, duração)
├── Busca
└── Paginação

Curso Detalhes (/cursos/[id])
├── Banner & Informações
├── Player de Vídeo (Preview)
├── Conteúdo do Curso (Módulos/Aulas)
├── Sobre o Instrutor
└── Materiais de Apoio
```

### 2. 👤 Área do Usuário
```
Dashboard (/dashboard)
├── Estatísticas Pessoais
│   ├── Cursos Iniciados
│   ├── Cursos Concluídos
│   ├── Tempo de Estudo
│   └── Sequência de Dias
├── Continue Assistindo
├── Conquistas Recentes
└── Recomendações

Meu Progresso (/meu-progresso)
├── Cursos em Andamento
├── Cursos Concluídos
├── Certificados
└── Estatísticas Detalhadas

Conquistas (/conquistas)
├── Badges Desbloqueados
├── XP e Nível
└── Próximas Conquistas
```

### 3. 🛠️ Área Administrativa
```
Admin Dashboard (/admin)
├── Métricas Gerais
│   ├── Total de Usuários
│   ├── Total de Cursos
│   ├── Visualizações
│   └── Receita
├── Cursos Populares
├── Atividades Recentes
└── Gráficos de Engajamento

Gestão de Cursos (/admin/cursos)
├── Listar Todos os Cursos
├── Criar Novo Curso
├── Editar Curso Existente
├── Gerenciar Módulos/Aulas
└── Upload de Materiais

Gestão de Usuários (/admin/usuarios)
├── Listar Usuários
├── Filtrar por Tipo
├── Editar Usuários
├── Gerenciar Permissões
└── Estatísticas por Usuário

Relatórios (/admin/relatorios)
├── Performance por Categoria
├── Top 5 Cursos
├── Engajamento
├── Métricas de Empresas
└── Exportação de Dados

Gestão de Empresas (/admin/empresas)
├── Listar Empresas B2B
├── Gerenciar Licenças
├── Relatórios por Empresa
└── Configurações de Plano
```

### 4. 🏢 Área Corporativa (B2B)
```
Landing Page B2B (/corporativo)
├── Hero & Benefícios
├── Recursos Exclusivos
├── Planos e Preços
│   ├── Básico (até 50 usuários)
│   ├── Profissional (até 200 usuários)
│   └── Enterprise (ilimitado)
├── Cases de Sucesso
└── CTA para Demonstração

Dashboard Corporativo (/corporativo/dashboard)
├── Estatísticas da Empresa
│   ├── Usuários Ativos
│   ├── Cursos Concluídos
│   ├── Tempo Total de Estudo
│   └── Taxa de Conclusão
├── Utilização de Licenças
├── Top Colaboradores
├── Cursos Mais Populares
└── Gráficos de Engajamento

Gestão de Usuários (/corporativo/usuarios)
├── Adicionar Colaboradores
├── Remover Acesso
├── Atribuir Trilhas
└── Ver Progresso Individual
```

## 🗄️ Modelo de Dados

### Entidades Principais

```
┌─────────────┐       ┌─────────────┐       ┌─────────────┐
│  Empresas   │───────│  Usuários   │───────│ Instrutores │
└─────────────┘       └─────────────┘       └─────────────┘
                             │
                             ├─────────────────┐
                             │                 │
                      ┌──────▼──────┐   ┌─────▼─────────┐
                      │  Progresso  │   │  Conquistas   │
                      │   Cursos    │   │   Usuários    │
                      └─────────────┘   └───────────────┘
                             │
┌─────────────┐       ┌──────▼──────┐
│ Categorias  │───────│   Cursos    │
└─────────────┘       └─────────────┘
                             │
                      ┌──────▼──────┐
                      │   Módulos   │
                      └─────────────┘
                             │
                      ┌──────▼──────┐       ┌─────────────┐
                      │    Aulas    │───────│  Materiais  │
                      └─────────────┘       └─────────────┘
```

## 🎨 Sistema de Design

### Paleta de Cores

```
Primary (Azul):
├── 50:  #f0f9ff  (backgrounds)
├── 100: #e0f2fe
├── 500: #0ea5e9  (principal)
├── 600: #0284c7  (hover)
└── 900: #0c4a6e  (texto escuro)

Secondary (Roxo):
├── 100: #f3e8ff
├── 500: #a855f7  (destaques)
└── 600: #9333ea  (hover)

Funcional:
├── Success: #10B981  (verde)
├── Warning: #F59E0B  (laranja)
├── Danger:  #EF4444  (vermelho)
└── Info:    #3B82F6  (azul claro)
```

### Tipografia

```
Display (Títulos):
├── Font: Plus Jakarta Sans
├── Weights: 700, 800
└── Usage: h1, h2, h3

Body (Texto):
├── Font: Inter
├── Weights: 400, 500, 600
└── Usage: p, span, button
```

### Componentes Base

```
UI Components:
├── Button (5 variantes)
├── Card (com hover)
├── Input (com label e error)
├── Badge (6 variantes)
├── Modal (4 tamanhos)
├── ProgressBar (3 tamanhos)
├── Avatar (4 tamanhos)
└── SearchBar (com clear)
```

## 📊 Métricas e KPIs

### Para Alunos
- Cursos iniciados
- Cursos concluídos
- Tempo total de estudo
- Sequência de dias
- XP e nível
- Conquistas desbloqueadas

### Para Empresas
- Usuários ativos
- Taxa de conclusão
- Tempo médio por usuário
- Cursos mais populares
- ROI de treinamento
- Engajamento mensal

### Para Plataforma
- Total de usuários
- Taxa de crescimento
- Retenção
- Satisfação (NPS)
- Receita recorrente (MRR)
- Churn rate

## 🔐 Segurança

```
Camadas de Segurança:
├── Row Level Security (RLS)
├── Validação de dados (backend)
├── Sanitização de inputs
├── CORS configurado
├── Variáveis de ambiente protegidas
├── HTTPS obrigatório
└── Rate limiting (produção)
```

## 🚀 Performance

### Otimizações

```
Frontend:
├── Image optimization (next/image)
├── Code splitting automático
├── Server Components (RSC)
├── Streaming SSR
└── Font optimization

Backend:
├── Índices no banco de dados
├── Views materializadas
├── Query optimization
└── Connection pooling

Assets:
├── CDN para assets estáticos
├── Compressão de imagens
├── Lazy loading
└── Cache headers
```

### Core Web Vitals (Targets)

- **LCP**: < 2.5s
- **FID**: < 100ms
- **CLS**: < 0.1
- **Lighthouse**: > 90

## 📈 Roadmap de Funcionalidades

### ✅ Fase 1 - MVP (Concluído)
- Interface principal
- Sistema de cursos
- Dashboard usuário
- Painel admin
- Área B2B
- Gamificação básica

### 🔄 Fase 2 - Autenticação (Q2 2024)
- Login/Registro
- OAuth (Google, GitHub)
- Recuperação de senha
- 2FA

### 🔄 Fase 3 - Interação (Q3 2024)
- Reviews e avaliações
- Comentários
- Fórum
- Chat ao vivo

### 🔄 Fase 4 - Mobile (Q4 2024)
- App React Native
- Push notifications
- Modo offline

### 🔄 Fase 5 - Enterprise (2025)
- SSO
- White label
- Advanced analytics
- API pública

## 📚 Documentação

```
Documentação Disponível:
├── README.md (Visão geral e instalação)
├── QUICKSTART.md (Início rápido)
├── CONTRIBUTING.md (Como contribuir)
├── DEPLOYMENT.md (Guia de deploy)
├── API.md (Documentação da API)
├── CHANGELOG.md (Histórico de versões)
└── PROJECT_OVERVIEW.md (Este arquivo)
```

## 🤝 Time e Responsabilidades

### Desenvolvedor Full Stack
- Arquitetura do projeto
- Frontend (Next.js/React)
- Backend (Supabase)
- UI/UX Implementation

### Designer (Recomendado)
- Design system
- Mockups de telas
- Assets visuais
- Branding

### Product Manager (Recomendado)
- Roadmap
- Priorização de features
- Feedback de usuários
- Métricas

## 📞 Contato e Suporte

```
Canais de Comunicação:
├── Email: contato@areluna.com.br
├── GitHub Issues: Bug reports e features
├── GitHub Discussions: Dúvidas gerais
└── Documentation: docs.areluna.com.br (futuro)
```

---

**Versão**: 1.0.0  
**Última Atualização**: 20/03/2024  
**Status**: 🟢 Produção  

🌟 **Instituto AreLuna** - Educação de Excelência

