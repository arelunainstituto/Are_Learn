# 📁 Estrutura de Projeto - Padrões Areluna

> **Organização consistente de código e arquivos para todos os projetos**

Guia de estrutura de pastas, nomenclatura e organização para manter consistência entre projetos Areluna.

---

## 🗂️ Estrutura Base de Pastas

### Estrutura Padrão (Monorepo)

```
projeto-areluna/
├── 📁 src/                          # Código-fonte principal
│   ├── 📁 components/               # Componentes React reutilizáveis
│   │   ├── 📁 ui/                  # Componentes base (Button, Input, Modal)
│   │   ├── 📁 forms/               # Formulários específicos
│   │   └── 📁 layout/              # Layouts e estruturas
│   ├── 📁 pages/                   # Páginas/rotas da aplicação
│   ├── 📁 hooks/                   # Custom React hooks
│   ├── 📁 services/                # Serviços e integrações (API, Supabase)
│   ├── 📁 utils/                   # Funções utilitárias
│   ├── 📁 types/                   # Definições TypeScript
│   ├── 📁 constants/               # Constantes da aplicação
│   └── 📁 assets/                  # Assets estáticos (imagens, ícones)
├── 📁 public/                      # Arquivos públicos (favicon, manifest)
├── 📁 docs/                        # Documentação do projeto
├── 📁 tests/                       # Testes automatizados
├── 📁 scripts/                     # Scripts de build, deploy, etc
├── 📁 .github/                     # GitHub Actions, templates
└── 📄 Configurações (package.json, tsconfig.json, etc)
```

### Estrutura por Feature (Alternativa)

```
projeto-areluna/
├── 📁 src/
│   ├── 📁 features/                # Organização por funcionalidade
│   │   ├── 📁 auth/                # Autenticação
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   └── types.ts
│   │   ├── 📁 dashboard/           # Dashboard principal
│   │   ├── 📁 orders/             # Ordens de serviço
│   │   └── 📁 inventory/          # Estoque
│   ├── 📁 shared/                 # Código compartilhado
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── utils/
│   │   └── types/
│   └── 📁 app/                    # Configuração da aplicação
└── 📁 public/
```

---

## 📝 Nomenclatura de Arquivos

### Convenções por Tipo

| Tipo | Padrão | Exemplo | Uso |
|------|--------|---------|-----|
| **Componentes React** | PascalCase | `UserProfile.tsx` | Componentes principais |
| **Hooks** | camelCase + use | `useAuth.ts` | Custom hooks |
| **Serviços** | camelCase | `apiService.ts` | Serviços e APIs |
| **Utilitários** | camelCase | `formatDate.ts` | Funções auxiliares |
| **Tipos** | PascalCase | `UserTypes.ts` | Definições TypeScript |
| **Constantes** | UPPER_SNAKE_CASE | `API_ENDPOINTS.ts` | Constantes globais |
| **Páginas** | PascalCase | `LoginPage.tsx` | Páginas/rotas |
| **Assets** | kebab-case | `logo-instituto.png` | Imagens, ícones |
| **Configurações** | kebab-case | `vite.config.ts` | Arquivos de config |

### Estrutura de Nomes

```
[contexto]-[descrição]-[tipo].[extensão]

Exemplos:
- user-profile-card.tsx
- auth-login-form.tsx
- api-supabase-client.ts
- types-user-interface.ts
```

---

## 🔗 Imports e Paths

### Configuração de Paths Absolutos

**tsconfig.json**
```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@/components/*": ["src/components/*"],
      "@/hooks/*": ["src/hooks/*"],
      "@/services/*": ["src/services/*"],
      "@/utils/*": ["src/utils/*"],
      "@/types/*": ["src/types/*"]
    }
  }
}
```

### Padrões de Import

```typescript
// ✅ CORRETO - Imports organizados
// 1. Bibliotecas externas
import React from 'react';
import { useState, useEffect } from 'react';
import styled from 'styled-components';

// 2. Imports internos (absolutos)
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { UserService } from '@/services/UserService';
import { User } from '@/types/User';

// 3. Imports relativos (quando necessário)
import './UserProfile.css';
import { validateEmail } from '../utils/validation';
```

### Estrutura de Imports

```typescript
// Ordem recomendada:
// 1. React e bibliotecas
// 2. Imports absolutos (@/)
// 3. Imports relativos (./)
// 4. Imports de tipos (type)
```

---

## 🏗️ Organização por Domínio

### Estrutura por Negócio

```
src/
├── 📁 domains/                    # Domínios de negócio
│   ├── 📁 auth/                   # Autenticação e usuários
│   │   ├── components/
│   │   ├── services/
│   │   ├── hooks/
│   │   └── types.ts
│   ├── 📁 inventory/              # Gestão de estoque
│   ├── 📁 orders/                 # Ordens de serviço
│   ├── 📁 reports/                # Relatórios e analytics
│   └── 📁 settings/               # Configurações
├── 📁 shared/                     # Código compartilhado
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── types/
└── 📁 app/                        # Configuração da aplicação
```

### Benefícios da Organização por Domínio

- ✅ **Coesão**: Código relacionado fica junto
- ✅ **Escalabilidade**: Fácil adicionar novos domínios
- ✅ **Manutenção**: Mudanças isoladas por área
- ✅ **Colaboração**: Times podem trabalhar em domínios específicos

---

## 📦 Estrutura de Componentes

### Hierarquia de Componentes

```
components/
├── 📁 ui/                         # Componentes base
│   ├── Button/
│   │   ├── Button.tsx
│   │   ├── Button.test.tsx
│   │   ├── Button.stories.tsx
│   │   └── index.ts
│   ├── Input/
│   └── Modal/
├── 📁 forms/                      # Formulários
│   ├── LoginForm/
│   ├── UserForm/
│   └── OrderForm/
├── 📁 layout/                     # Layouts
│   ├── Header/
│   ├── Sidebar/
│   └── Footer/
└── 📁 features/                   # Componentes específicos
    ├── UserProfile/
    ├── OrderCard/
    └── InventoryTable/
```

### Estrutura de um Componente

```
Button/
├── Button.tsx                     # Componente principal
├── Button.test.tsx               # Testes unitários
├── Button.stories.tsx            # Storybook (opcional)
├── Button.types.ts               # Tipos específicos
├── Button.styles.ts              # Estilos (se separado)
└── index.ts                      # Export principal
```

---

## 🔧 Configurações de Projeto

### Arquivos de Configuração Essenciais

```
projeto-areluna/
├── 📄 package.json                # Dependências e scripts
├── 📄 tsconfig.json              # Configuração TypeScript
├── 📄 vite.config.ts             # Configuração Vite
├── 📄 .eslintrc.js                # Linting
├── 📄 .prettierrc                 # Formatação
├── 📄 .gitignore                  # Arquivos ignorados
├── 📄 .env.example                # Variáveis de ambiente
├── 📄 README.md                   # Documentação
└── 📄 docker-compose.yml         # Containerização (opcional)
```

### Scripts Padrão no package.json

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "lint": "eslint src --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "lint:fix": "eslint src --ext ts,tsx --fix",
    "format": "prettier --write src/**/*.{ts,tsx,js,jsx}",
    "type-check": "tsc --noEmit"
  }
}
```

---

## 🗃️ Estrutura de Dados

### Organização de Tipos

```
types/
├── 📄 index.ts                    # Exports principais
├── 📄 User.ts                     # Tipos de usuário
├── 📄 Order.ts                    # Tipos de ordem
├── 📄 Product.ts                  # Tipos de produto
├── 📄 Api.ts                      # Tipos de API
└── 📄 Common.ts                   # Tipos comuns
```

### Padrão de Definição de Tipos

```typescript
// types/User.ts
export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = 'admin' | 'technician' | 'client';

export interface CreateUserRequest {
  name: string;
  email: string;
  role: UserRole;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: UserRole;
}
```

---

## 🧪 Estrutura de Testes

### Organização de Testes

```
tests/
├── 📁 unit/                       # Testes unitários
│   ├── components/
│   ├── hooks/
│   ├── utils/
│   └── services/
├── 📁 integration/                # Testes de integração
├── 📁 e2e/                        # Testes end-to-end
└── 📁 fixtures/                   # Dados de teste
```

### Convenções de Nome para Testes

```typescript
// ✅ CORRETO
UserProfile.test.tsx
useAuth.test.ts
formatDate.test.ts

// ❌ EVITAR
UserProfile.spec.tsx
test-user-profile.tsx
```

---

## 📚 Documentação

### Estrutura de Docs

```
docs/
├── 📄 README.md                   # Visão geral do projeto
├── 📄 GETTING_STARTED.md          # Guia de início
├── 📄 API.md                      # Documentação da API
├── 📄 DEPLOYMENT.md               # Guia de deploy
├── 📄 CONTRIBUTING.md             # Guia de contribuição
└── 📁 architecture/               # Documentação técnica
    ├── system-design.md
    ├── database-schema.md
    └── api-endpoints.md
```

---

## 🚀 Monorepo (Opcional)

### Estrutura para Múltiplos Projetos

```
areluna-workspace/
├── 📁 apps/                       # Aplicações
│   ├── 📁 web-app/               # Aplicação web principal
│   ├── 📁 mobile-app/            # App mobile
│   └── 📁 admin-panel/           # Painel administrativo
├── 📁 packages/                   # Pacotes compartilhados
│   ├── 📁 ui-components/         # Componentes UI
│   ├── 📁 api-client/            # Cliente da API
│   ├── 📁 shared-types/          # Tipos compartilhados
│   └── 📁 utils/                 # Utilitários
├── 📁 tools/                      # Ferramentas de build
└── 📄 package.json               # Workspace root
```

### Configuração do Workspace

```json
// package.json (root)
{
  "name": "areluna-workspace",
  "private": true,
  "workspaces": [
    "apps/*",
    "packages/*"
  ],
  "scripts": {
    "dev": "turbo run dev",
    "build": "turbo run build",
    "test": "turbo run test"
  }
}
```

---

## ✅ Checklist de Estrutura

### Antes de Começar um Projeto

- [ ] Definir estrutura de pastas (monorepo vs single app)
- [ ] Configurar paths absolutos no tsconfig.json
- [ ] Criar estrutura base de pastas
- [ ] Configurar ESLint e Prettier
- [ ] Definir convenções de nomenclatura
- [ ] Configurar scripts no package.json
- [ ] Criar .env.example
- [ ] Configurar .gitignore

### Durante o Desenvolvimento

- [ ] Manter imports organizados
- [ ] Usar paths absolutos (@/)
- [ ] Seguir convenções de nomenclatura
- [ ] Organizar por domínio quando aplicável
- [ ] Documentar componentes complexos
- [ ] Manter estrutura consistente

### Antes do Deploy

- [ ] Verificar se todos os imports estão corretos
- [ ] Executar linting e formatação
- [ ] Testar build de produção
- [ ] Atualizar documentação
- [ ] Revisar estrutura final

---

## 🔗 Referências

- **Exemplo Real**: Estrutura atual em `src/` deste projeto
- **TypeScript**: [tsconfig paths](https://www.typescriptlang.org/docs/handbook/module-resolution.html#path-mapping)
- **Vite**: [Vite config](https://vitejs.dev/config/)
- **Monorepo**: [Turborepo](https://turbo.build/repo/docs)

---

**Versão**: 1.0.0  
**Última atualização**: Outubro 2025  
**Aplicável a**: Todos os projetos Areluna
