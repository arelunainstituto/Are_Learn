# Roadmap Local ERP AreLuna

Objetivo: manter todos os serviços rodando em localhost (3000–3004) com estrutura profissional, modular, e pronta para escalar para Supabase e deploys futuros (Vercel + Azure Container Apps).

## Visão Geral
- Monorepo com pnpm workspace ativo e serviços padronizados.
- Orquestração local unificada (`npm run dev:all`) com portas estáveis.
- Base de dados local PostgreSQL via Docker para evolução sem dependência imediata do Supabase.
- Frontend Next.js como hub do ERP, com Tailwind + shadcn/ui.
- Qualidade assegurada com ESLint/Prettier e testes com Vitest.

## Prioridades por Impacto
1) Padronização e organização do monorepo
2) Orquestração local e desenvolvimento unificado
3) Banco de dados e persistência local (PostgreSQL)
4) Migração e sincronização de dados (Prisma)
5) Frontend unificado (Next.js)
6) Testes e qualidade (Vitest, ESLint, Prettier)
7) Evoluções futuras (Supabase, CI/CD, deploys)

---

## 1. Padronização e Organização do Monorepo

Tarefas:
- Confirmar `pnpm-workspace.yaml` cobrindo apps e packages.
  - Atual: já inclui `Grupo AreLuna/*`, subpastas, e `PROJETOS-TECNOLOGICOS`.
- Criar/estruturar `packages/` compartilhados:
  - `packages/ui`: componentes React/Tailwind reutilizáveis.
  - `packages/schemas`: schemas Zod compartilhados.
  - `packages/utils`: funções comuns (datas, formatação, requests, logs).
- Adicionar `tsconfig.base.json` na raiz com `paths` para packages compartilhados.
- Padronizar scripts em `package.json` dos apps:
  - `dev`, `build`, `lint` (`eslint . --ext .js,.ts,.tsx`), `test` (`vitest run`).

Entregáveis:
- `packages/ui`, `packages/schemas`, `packages/utils` criados com README e exemplo.
- `tsconfig.base.json` e ajuste nos `tsconfig.json` dos apps.
- Scripts padronizados nos `package.json` relevantes.

## 2. Orquestração Local e Desenvolvimento Unificado

Tarefas:
- Consolidar `scripts/dev-all.js` usando `concurrently` ou `turbo run dev`.
  - Atual: `scripts/serve-local.js` inicia 3000–3004 com `PORT` estável.
- Adicionar logs coloridos por app para status rápido.
- Garantir que cada serviço respeita `PORT` e CORS dinâmico.

Entregáveis:
- `npm run dev:all` sobe todos os serviços com logs identificados.
- Documentação em `_Index/local-addresses.md` atualizada.

## 3. Banco de Dados e Persistência Local

Tarefas:
- Criar `docker-compose.yml` com PostgreSQL 15:
  - USR: `areluna`, PASS: `dev`, DB: `areluna_dev`, porta `5432`.
- Criar `.env` compartilhado na raiz:
  - `DATABASE_URL=postgres://areluna:dev@localhost:5432/areluna_dev`
  - `SUPABASE_URL=http://localhost:54321`
  - `SUPABASE_KEY=dev_key`
- Introduzir Prisma gradualmente nos serviços (substituir SQLite/local JSON).

Entregáveis:
- `docker-compose.yml` e `.env` raiz.
- Prisma inicializado em serviços alvo.

## 4. Migração e Sincronização de Dados

Tarefas:
- QR-Code Generator:
  - Adicionar `prisma/schema.prisma` com `InventoryItem` (id, name, qrCode, createdAt).
  - Criar comando `npm run migrate` para aplicar migrações.
- Leitor SAF-T:
  - Definir tabelas `SaftFile`, `Company`, `VatPosition`.
  - Persistir JSON estruturado do SAF-T no PostgreSQL.

Entregáveis:
- Schemas Prisma e migrações aplicadas.
- Endpoints ajustados para usar PostgreSQL.

## 5. Frontend Unificado (Next.js)

Tarefas:
- Criar página `Dashboard` com atalhos para módulos (3000–3004).
- Integrar `Tailwind` + `shadcn/ui` para consistência visual.
- Adicionar `SupabaseClient` local com Auth desativado por ora.
- Implementar layout base em `src/app/layout.tsx` com header fixo e menu lateral modular (Apps → Inventário, Faturas, LAB, SAF-T).

Entregáveis:
- `Dashboard` funcional, menu lateral e navegação.
- Estilo unificado via Tailwind/shadcn.

## 6. Testes e Qualidade

Tarefas:
- Adicionar `Vitest` com testes de endpoints básicos (`/health`, `/api/qr-items`).
- Configurar `ESLint + Prettier` compartilhado (`packages/config` opcional).
- Script global: `npx turbo run test`.

Entregáveis:
- Testes rodando com cobertura essencial.
- Lint e formatação consistentes.

## 7. Evoluções Futuras

Tarefas:
- Conectar Supabase real (Auth + DB, RLS) quando local estiver estável.
- CI/CD com GitHub Actions para build e testes automáticos.
- Deploy: Frontend na Vercel; Backends na Azure Container Apps.

Entregáveis:
- Pipelines CI configuradas.
- Deploys documentados e reproduzíveis.

---

## Como Executar Localmente
- Instalar deps na raiz: `pnpm install`.
- Subir todos: `npm run dev:all`.
- Serviços:
  - Frontend: `http://localhost:3000`
  - QR-Code Generator: `http://localhost:3001`
  - Prostoral LAB: `http://localhost:3002`
  - Leitor-De-Faturas: `http://localhost:3003`
  - SAF-T Import: `http://localhost:3004`

## Notas e Pendências Atuaís
- `Prostoral LAB` tem erro de `chart.js` via CDN (SyntaxError). Soluções:
  - Usar versão UMD correta ou `type="module"`.
  - Preferir instalar `chart.js` via npm e importar local.
- Garantir que todos os serviços respeitam `PORT` e CORS dinâmico.
- Adicionar `tsx`/`nodemon` conforme necessário para DX.

## Estrutura Recomendada de Pastas
- `packages/ui`, `packages/schemas`, `packages/utils`
- `packages/config` (opcional): ESLint/Prettier compartilhado.