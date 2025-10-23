# 🎓 AreLuna INNSiDE - Plataforma de Educação Corporativa

![AreLuna INNSiDE](https://img.shields.io/badge/version-1.0.0-blue.svg)
![Next.js](https://img.shields.io/badge/Next.js-14-black.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue.svg)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)

Plataforma completa de ensino online inspirada no MasterClass, desenvolvida para o **AreLuna INNSiDE - Instituto de Educação Corporativa**. Uma solução moderna e escalável para educação corporativa com foco em experiência do usuário e resultados mensuráveis.

## ✨ Características Principais

### 🎯 Para Alunos
- **Interface Moderna e Intuitiva** - Design limpo inspirado no MasterClass
- **Player de Vídeo Avançado** - Controles personalizados e marcadores de progresso
- **Sistema de Gamificação** - Conquistas, XP e certificados
- **Trilhas de Aprendizado** - Playlists temáticas e personalizadas
- **Continue Assistindo** - Retome de onde parou
- **Materiais Complementares** - PDFs, documentos e recursos para download
- **Dashboard Pessoal** - Acompanhe seu progresso e estatísticas

### 👨‍🏫 Para Instrutores
- **Criação de Cursos** - Interface intuitiva para upload e organização
- **Gestão de Conteúdo** - Módulos, séries e episódios
- **Analytics** - Métricas de engajamento e performance
- **Materiais de Apoio** - Adicione recursos complementares

### 🏢 Para Empresas (B2B)
- **Dashboard Corporativo** - Visão completa do progresso da equipe
- **Gestão de Licenças** - Controle de usuários e acessos
- **Relatórios Detalhados** - Métricas por colaborador e por curso
- **API de Integração** - Conecte com sistemas de RH
- **Trilhas Personalizadas** - Crie jornadas específicas para sua empresa
- **Certificados Corporativos** - Emita certificados com sua marca

### 🛠️ Para Administradores
- **Painel Administrativo Completo** - Gerencie toda a plataforma
- **CRUD de Cursos** - Criação e edição facilitada
- **Gerenciamento de Usuários** - Controle total de acessos
- **Relatórios e Analytics** - Insights sobre uso e engajamento
- **Gestão de Empresas** - Administração de contas B2B

## 🚀 Stack Tecnológica

### Frontend
- **[Next.js 14](https://nextjs.org/)** - Framework React com App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Tipagem estática
- **[Tailwind CSS](https://tailwindcss.com/)** - Estilização utilitária
- **[Lucide React](https://lucide.dev/)** - Ícones modernos

### Backend
- **[Supabase](https://supabase.com/)** - Backend as a Service
  - PostgreSQL para banco de dados
  - Auth (pronto para implementação futura)
  - Storage para arquivos
  - Real-time subscriptions

### Video Players
- **[React Player](https://www.npmjs.com/package/react-player)** - Player de vídeo versátil
- Suporte para **Vimeo**, **Mux** e **YouTube**

### Estado e Performance
- **[Zustand](https://zustand-demo.pmnd.rs/)** - Gerenciamento de estado
- Image Optimization do Next.js
- Server Components e Streaming SSR

## 📁 Estrutura do Projeto

```
Are_Learn/
├── src/
│   ├── app/                      # App Router (Next.js 14)
│   │   ├── admin/               # Área administrativa
│   │   │   ├── cursos/          # Gestão de cursos
│   │   │   ├── usuarios/        # Gestão de usuários
│   │   │   ├── relatorios/      # Relatórios e analytics
│   │   │   └── page.tsx         # Dashboard admin
│   │   ├── corporativo/         # Área B2B
│   │   │   ├── dashboard/       # Dashboard corporativo
│   │   │   └── page.tsx         # Landing page B2B
│   │   ├── cursos/              # Páginas de cursos
│   │   │   ├── [id]/            # Detalhes do curso
│   │   │   └── page.tsx         # Listagem de cursos
│   │   ├── dashboard/           # Dashboard do usuário
│   │   ├── layout.tsx           # Layout principal
│   │   └── page.tsx             # Página inicial
│   ├── components/              # Componentes React
│   │   ├── ui/                  # Componentes UI reutilizáveis
│   │   │   ├── Button.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Modal.tsx
│   │   │   └── ...
│   │   ├── curso/               # Componentes de curso
│   │   │   ├── CursoCard.tsx
│   │   │   └── VideoPlayer.tsx
│   │   └── layout/              # Componentes de layout
│   │       ├── Header.tsx
│   │       └── Footer.tsx
│   ├── lib/                     # Bibliotecas e utilitários
│   │   ├── supabase.ts          # Cliente Supabase
│   │   ├── constants.ts         # Constantes da aplicação
│   │   └── utils.ts             # Funções utilitárias
│   ├── types/                   # Tipos TypeScript
│   │   └── index.ts             # Definições de tipos
│   └── styles/                  # Estilos globais
│       └── globals.css          # CSS global
├── supabase/                    # Configuração do banco
│   ├── schema.sql               # Schema completo
│   └── README.md                # Documentação do DB
├── public/                      # Arquivos estáticos
├── tailwind.config.ts           # Configuração do Tailwind
├── tsconfig.json                # Configuração do TypeScript
├── next.config.mjs              # Configuração do Next.js
└── package.json                 # Dependências
```

## 🔧 Instalação e Configuração

### Pré-requisitos

- Node.js 18+ instalado
- Conta no Supabase (gratuita)
- Git

### Passo 1: Clone o Repositório

```bash
git clone https://github.com/seu-usuario/areluna-platform.git
cd areluna-platform
```

### Passo 2: Instale as Dependências

```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### Passo 3: Configure as Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_chave_anonima
SUPABASE_SERVICE_ROLE_KEY=sua_service_role_key

# Provedor de Vídeo
NEXT_PUBLIC_VIDEO_PROVIDER=vimeo
VIMEO_ACCESS_TOKEN=seu_token_vimeo

# Aplicação
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=AreLuna
```

### Passo 4: Configure o Banco de Dados

1. Acesse seu projeto no [Supabase Dashboard](https://app.supabase.com)
2. Vá para **SQL Editor**
3. Cole e execute o conteúdo de `supabase/schema.sql`
4. Verifique se todas as tabelas foram criadas

### Passo 5: Inicie o Servidor de Desenvolvimento

```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000) no seu navegador.

## 🎨 Personalização

### Cores e Branding

Edite `tailwind.config.ts` para personalizar as cores:

```typescript
colors: {
  primary: {
    50: '#f0f9ff',
    // ... suas cores
    900: '#0c4a6e',
  },
}
```

### Categorias Padrão

Edite `src/lib/constants.ts` para ajustar categorias:

```typescript
export const CATEGORIAS_PADRAO = [
  { nome: 'Sua Categoria', slug: 'sua-categoria', cor: '#3B82F6' },
  // ...
];
```

## 📊 Funcionalidades Detalhadas

### Sistema de Progresso

- Tracking automático de tempo assistido
- Cálculo de percentual de conclusão
- "Continue Assistindo" inteligente
- Histórico de visualizações

### Gamificação

- **Conquistas**: Sistema de badges desbloqueáveis
- **XP e Níveis**: Progressão do usuário
- **Certificados**: Emissão automática ao concluir cursos
- **Sequências**: Recompensas por dias consecutivos

### Relatórios B2B

- Taxa de conclusão por empresa
- Tempo médio de estudo
- Cursos mais populares
- Performance individual dos colaboradores
- Exportação de dados em CSV/Excel

## 🔐 Segurança

- Row Level Security (RLS) implementado no Supabase
- Validação de dados no backend
- Sanitização de inputs
- CORS configurado
- Variáveis de ambiente protegidas

## 🌐 Internacionalização

A plataforma está preparada para i18n:
- Português (padrão)
- Estrutura pronta para adicionar novos idiomas
- Todas as strings são externalizáveis

## 📱 Responsividade

- **Mobile First**: Design otimizado para mobile
- **Tablets**: Layout adaptativo
- **Desktop**: Experiência completa
- **4K**: Suporte a telas grandes

## 🚀 Deploy

### Vercel (Recomendado)

1. Conecte seu repositório ao [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente
3. Deploy automático a cada push

### Outras Opções

- **Netlify**: Suporte completo para Next.js
- **AWS Amplify**: Hospedagem escalável
- **Docker**: Containerização disponível

## 🧪 Testes (Roadmap)

```bash
# Testes unitários
npm run test

# Testes E2E
npm run test:e2e

# Coverage
npm run test:coverage
```

## 📈 Próximas Funcionalidades

- [ ] Sistema de autenticação completo
- [ ] Sistema de avaliações e reviews
- [ ] Chat ao vivo com instrutores
- [ ] Fórum de discussões
- [ ] Notificações push
- [ ] App mobile nativo (React Native)
- [ ] Modo offline
- [ ] Legendas e múltiplos idiomas nos vídeos
- [ ] Quiz e exercícios interativos
- [ ] Integração com Zoom para lives

## 🤝 Contribuindo

Contribuições são bem-vindas! Por favor:

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Suporte

- **Email**: contato@areluna.com.br
- **Documentação**: [docs.areluna.com.br](https://docs.areluna.com.br)
- **Issues**: [GitHub Issues](https://github.com/seu-usuario/areluna/issues)

## 🙏 Agradecimentos

- Inspirado no design do [MasterClass](https://www.masterclass.com)
- [Shadcn UI](https://ui.shadcn.com) pela inspiração dos componentes
- [Supabase](https://supabase.com) pela infraestrutura

---

**Desenvolvido com ❤️ para o Instituto AreLuna**

🌟 Se este projeto foi útil, considere dar uma estrela!

