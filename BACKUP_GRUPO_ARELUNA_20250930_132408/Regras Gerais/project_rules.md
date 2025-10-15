# Project Rules — ERP Grupo AreLuna (Vercel-first)

> Este projeto deve ser gerado e mantido pelo agente **OmniLuner** em **Node.js/Next.js (App Router)**, otimizado para **Vercel**.  
> Objetivo: ERP modular, multi-tenant, com design exquisite, documentação e qualidade de produção.

---

## 1) Arquitetura & Stack (mandatório)
- **App:** Next.js (App Router) + **TypeScript**.
- **Auth:** Auth.js (NextAuth) com **Azure AD (OIDC)**. JWT contém `tenantId`, `roles`, `scopes`.
- **DB:** Postgres (Vercel Postgres / Neon) via **Prisma** com **pooling/Accelerate**.
- **UI:** Tailwind + **shadcn/ui** + Framer Motion; gráficos com **Recharts**.
- **Armazenamento:** **Vercel Blob** (uploads); manter conector opcional p/ Azure Blob.
- **Jobs & Filas:** **Vercel Cron** e **Vercel Queues**.
- **Observabilidade:** **Vercel Analytics** + **Sentry**.
- **Validação:** **Zod**.
- **Docs:** OpenAPI exposto em `/api/docs` + READMEs por módulo + diagramas Mermaid.

---

## 2) Estrutura de Repositório
```
/apps/web              # Next.js + API Routes/Server Actions
/packages/ui           # componentes shadcn, tokens, tema AreLuna
/packages/core         # zod schemas, utils, client SDK
/prisma                # schema.prisma, migrations, seeds multi-tenant
/.github/workflows     # CI: lint, typecheck, test, prisma migrate deploy
```

---

## 3) Multi-tenant & Segurança
- Resolver **tenant** por **subdomínio/host** em `middleware.ts`; injetar `tenantId` na request/session.
- **TODAS** as tabelas de negócio têm `tenantId` (filtro obrigatório nas queries).
- Tabela **AuditLog**: `id`, `userId`, `tenantId`, `action`, `entity`, `entityId`, `before`, `after`, `ip`, `ua`, `ts`.
- **RBAC**: `Role`, `Permission`, *policy checks* em toda mutation.
- **GDPR**: nada de dados clínicos no MVP (apenas status/etapas). Pseudonimização quando aplicável.

---

## 4) Domínios (Core + Módulos)
- **Core:** Company, Unit, Department, User, Role, Permission, AuditLog.
- **Catálogo/Tributos:** CatalogItem, PriceList, Tax.
- **Intercompany:** IntercompanyOrder (header/itens/anexos/SLA/aprovações).
- **Compras/Financeiro leve:** ProcurementRequest, PurchaseOrder, Supplier, AP/AR (resumo), export **CSV/PDF**.
- **Logística & Frota:** LogisticsRequest, Vehicle, Maintenance, agenda de coletas.
- **Clínica (MVP sem PHI):** CalendarSlot, Appointment, orçamentos por etapas.
- **Integrações:** Microsoft Graph (emails/SSO), Zoho CRM (leads/deals), Evolution API (WhatsApp).

**Seeds obrigatórios de tenants:**  
Vespasian Ventures (holding), Instituto AreLuna, Pinklegion, Papagaio Fotogénico, Nuvens Autóctones, ProStoral.

---

## 5) Páginas e APIs mínimas
- **Páginas:** Login/SSO, Dashboard, Intercompany (lista + kanban), Financeiro, Logística, Agenda Clínica.
- **APIs:** CRUDs com validação Zod; rotas **Edge** para leitura; **Node** para Prisma/Graph.

---

## 6) Qualidade, CI/CD e Padrões
- **Lint/Format:** ESLint + Prettier.
- **Tests:** Vitest (unit) + Playwright (e2e). Cobertura ≥ **90%** no Core.
- **CI (GitHub Actions):** `lint → typecheck → test → prisma migrate deploy`.
- **Ambiente:** fornecer `.env.example` e instruções de **Vercel Project Settings**.
- **Commit convention:** Conventional Commits.
- **PRs:** gerar **Preview** na Vercel + checklist automático.

---

## 7) Variáveis de Ambiente (Vercel)
```
DATABASE_URL=
PRISMA_ACCELERATE_URL=           # ou Neon pooling
AUTH_SECRET=
AZURE_AD_CLIENT_ID=
AZURE_AD_CLIENT_SECRET=
AZURE_AD_TENANT_ID=
GRAPH_TENANT=
EVOLUTION_API_KEY=
ZOHO_CLIENT_ID=
ZOHO_CLIENT_SECRET=
VERCEL_BLOB_READ_WRITE_TOKEN=
SENTRY_DSN=
EDGE_CONFIG=
```

---

## 8) Definition of Done (DoD)
- Build **Preview** na Vercel com **SSO Azure AD** funcional.
- **CRUD IntercompanyOrder** completo, leitura cacheada, escrita auditada.
- Seeds aplicados para os 6 tenants do grupo.
- `/api/docs` online; READMEs gerados por módulo; diagrama Mermaid de arquitetura.
- UI **clean + acessível**, com microanimações (Framer Motion).
- CI verde em lint, typecheck, tests e migration deploy.

---

## 9) Não fazer (Do Not)
- Abrir conexão Postgres por request sem pooling.
- Armazenar segredos no código.
- Persistir dados clínicos sensíveis no MVP.
- Criar rotas mutáveis no Edge (usar Node runtime para Prisma/Graph).

---

## 10) Extras criativos (sempre que possível)
- Sugira **3 melhorias de UX** por módulo (ex.: atalhos, vazios ilustrados, toasts).
- Inclua **tour guiado** opcional (onboarding) no dashboard.
- Disponibilize **temas claro/escuro** no pacote `@areluna/ui`.
