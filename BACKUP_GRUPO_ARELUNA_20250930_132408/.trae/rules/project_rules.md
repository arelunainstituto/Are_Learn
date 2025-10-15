# Project Rules — ERP Grupo AreLuna (Vercel-first)

> This project must be generated and maintained by the **OmniLuner** agent in **Node.js/Next.js (App Router)**, optimized for **Vercel**.  
> Goal: Modular, multi-tenant ERP with exquisite design, full documentation, and production-grade quality.

---

## 1) Architecture & Stack (mandatory)
- **App:** Next.js (App Router) + **TypeScript**.  
- **Auth:** Auth.js (NextAuth) with **Azure AD (OIDC)**. JWT includes `tenantId`, `roles`, `scopes`.  
- **DB:** Postgres (Vercel Postgres / Neon) via **Prisma** with **pooling/Accelerate**.  
- **UI:** Tailwind + **shadcn/ui** + Framer Motion; charts with **Recharts**.  
- **Storage:** **Vercel Blob** (uploads); optional connector for Azure Blob.  
- **Jobs & Queues:** **Vercel Cron** and **Vercel Queues**.  
- **Observability:** **Vercel Analytics** + **Sentry**.  
- **Validation:** **Zod**.  
- **Docs:** OpenAPI exposed at `/api/docs` + per-module READMEs + Mermaid diagrams.

---

## 2) Repository Structure
```
/apps/web              # Next.js + API Routes/Server Actions
/packages/ui           # shadcn components, tokens, AreLuna theme
/packages/core         # zod schemas, utils, client SDK
/prisma                # schema.prisma, migrations, multi-tenant seeds
/.github/workflows     # CI: lint, typecheck, test, prisma migrate deploy
```

---

## 3) Multi-tenant & Security
- Resolve **tenant** by **subdomain/host** in `middleware.ts`; inject `tenantId` in request/session.  
- **ALL** business tables include `tenantId` (mandatory filter).  
- **AuditLog** table: `id`, `userId`, `tenantId`, `action`, `entity`, `entityId`, `before`, `after`, `ip`, `ua`, `ts`.  
- **RBAC:** `Role`, `Permission`, enforce policy checks in every mutation.  
- **GDPR:** no clinical data in MVP (only statuses/stages). Pseudonymize when needed.

---

## 4) Domains (Core + Modules)
- **Core:** Company, Unit, Department, User, Role, Permission, AuditLog.  
- **Catalog/Tax:** CatalogItem, PriceList, Tax.  
- **Intercompany:** IntercompanyOrder (header/items/attachments/SLA/approvals).  
- **Procurement/Light Finance:** ProcurementRequest, PurchaseOrder, Supplier, AP/AR (summary), export **CSV/PDF**.  
- **Logistics & Fleet:** LogisticsRequest, Vehicle, Maintenance, pickup/delivery scheduling.  
- **Clinic (MVP no PHI):** CalendarSlot, Appointment, staged budgets.  
- **Integrations:** Microsoft Graph (emails/SSO), Zoho CRM (leads/deals), Evolution API (WhatsApp).

**Required tenant seeds:**  
Vespasian Ventures (holding), Instituto AreLuna, Pinklegion, Papagaio Fotogénico, Nuvens Autóctones, ProStoral.

---

## 5) Minimum Pages & APIs
- **Pages:** Login/SSO, Dashboard, Intercompany (list + kanban), Finance, Logistics, Clinic Schedule.  
- **APIs:** CRUDs validated with Zod; **Edge** routes for reads; **Node** routes for Prisma/Graph.

---

## 6) Quality, CI/CD & Standards
- **Lint/Format:** ESLint + Prettier.  
- **Tests:** Vitest (unit) + Playwright (e2e). Coverage ≥ **90%** for Core.  
- **CI (GitHub Actions):** `lint → typecheck → test → prisma migrate deploy`.  
- **Environment:** provide `.env.example` and Vercel Project Settings guide.  
- **Commit convention:** Conventional Commits.  
- **PRs:** generate **Preview** on Vercel + automatic checklist.

---

## 7) Environment Variables (Vercel)
```
DATABASE_URL=
PRISMA_ACCELERATE_URL=           # or Neon pooling
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
- **Preview build** on Vercel with functional **Azure AD SSO**.  
- **IntercompanyOrder CRUD** complete, cached reads, audited writes.  
- Seeds applied for the 6 group tenants.  
- `/api/docs` online; per-module READMEs; architecture Mermaid diagram.  
- UI **clean + accessible**, with micro-animations (Framer Motion).  
- CI green on lint, typecheck, tests, and migration deploy.

---

## 9) Do Not
- Open Postgres connections per request without pooling.  
- Hardcode secrets.  
- Persist sensitive clinical data in MVP.  
- Create mutable routes in Edge (use Node runtime for Prisma/Graph).

---

## 10) Creative Extras (when possible)
- Suggest **3 UX improvements** per module (e.g., shortcuts, empty states, toasts).  
- Include optional **guided tour** (onboarding) in dashboard.  
- Provide **light/dark themes** in `@areluna/ui` package.
