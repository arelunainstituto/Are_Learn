# OmniSupreme — Custom Agent Kit (AreLuna)
## Local-First Development Version

### Local Development Priority

IMPORTANTE: Todo o desenvolvimento inicial será executado
localmente no seu Mac. Migração para bases de dados cloud ou hospedagem
apenas quando explicitamente solicitado pelo utilizador.

***

## 0) Operating Contract (Atualizado)

- Default language: English. Tone: direct, objective, pragmatic.
- Stack: Node.js (TypeScript), NestJS + SQLite local; Next.js (App Router) + Tailwind + shadcn/ui; Prisma; Local development primeiro
- Local-first builds: SPA (modal) + SQLite/IndexedDB local + single localhost entry point (`http://localhost:3000`)
- Cloud migration: Apenas quando solicitado explicitamente — Supabase/Postgres (produção), Vercel (FE), Azure Container Apps (BE)
- Confirmar antes de ações destrutivas. Após cada módulo, propor 3 melhorias e output checklists.

***

## 1) Monorepo Layout (Local-First)

```
/omnisupreme
├─ apps/
│ ├─ api/ # NestJS + SQLite local
│ └─ web/ # Next.js SPA + IndexedDB
├─ packages/
│ ├─ agent-core/ # planner, executors, tool SDK
│ ├─ schemas/ # zod shared contracts
│ ├─ db/ # Prisma (SQLite local + Postgres cloud)
│ ├─ ui-kit/ # shadcn wrappers
│ └─ cli/ # npx omnisupreme create <module>
├─ docs/ # Specs TXT/Markdown (Grupo AreLuna)
├─ data/ # Local SQLite databases
├─ .env.local
├─ .env.example
├─ package.json
├─ pnpm-workspace.yaml
└─ turbo.json
```

***

## 2) Environment (Local-First)

### .env.local (Desenvolvimento Local)
```bash
# SQLite Local (Default)
DATABASE_URL="file:./data/areluna-local.db"
LOCAL_MODE=true

# Local Services
API_URL=http://localhost:3001
WEB_URL=http://localhost:3000

# Optional: apenas quando necessário
# SUPABASE_URL=
# SUPABASE_ANON_KEY=
```

### .env.example (Cloud - apenas para referência)
```bash
# Postgres (Prod/Stage) - APENAS quando migrar
DATABASE_URL=postgresql://user:pass@host:5432/areluna
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=...

# Auth
JWT_SECRET=change-me-local-dev

# Integrations (opcionais)
ZOHO_CLIENT_ID=...
EVOLUTION_API_URL=...
MS_GRAPH_TENANT_ID=...

# Email
FROM_EMAIL=no-reply@areluna.pt
SMTP_HOST=smtp.office365.com
```

***

## 3) Database (Prisma Local-First)

### packages/db/prisma/schema.prisma
```prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url = env("DATABASE_URL")
}

model Company {
  id String @id @default(cuid())
  name String
  nipc String?
  cae String?
  createdAt DateTime @default(now())
  users User[]
  assets InventoryAsset[]
  saftImports SaftImport[]
  agentRuns AgentRun[]
}

model User {
  id String @id @default(cuid())
  email String @unique
  name String?
  role String @default("user")
  companyId String
  company Company @relation(fields: [companyId], references: [id])
}

model AgentRun {
  id String @id @default(cuid())
  startedAt DateTime @default(now())
  finishedAt DateTime?
  status String @default("running")
  plan String? // JSON as string
  output String? // JSON as string
  error String?
  companyId String
  company Company @relation(fields: [companyId], references: [id])
}

model SaftImport {
  id String @id @default(cuid())
  companyId String
  period String
  fileUrl String
  parsedSummary String? // JSON as string
  totals String? // JSON as string
  createdAt DateTime @default(now())
  company Company @relation(fields: [companyId], references: [id])
}

model InventoryAsset {
  id String @id @default(cuid())
  companyId String
  label String
  qrText String
  status String @default("active")
  location String?
  purchaseDate DateTime?
  value Float?
  history String? // JSON as string
  createdAt DateTime @default(now())
  company Company @relation(fields: [companyId], references: [id])
}
```

### Scripts (Local-First)
```bash
# Desenvolvimento local
pnpm dlx prisma migrate dev --name init
pnpm dlx prisma generate
pnpm dlx prisma studio

# Seed dados locais
pnpm dlx prisma db seed
```

***

## 4) API (NestJS Local-First)

### apps/api/src/app.module.ts
```typescript
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { SaftModule } from './saft/saft.module';
import { InventoryModule } from './inventory/inventory.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.local', '.env'],
      isGlobal: true,
    }),
    PrismaModule,
    SaftModule,
    InventoryModule,
  ],
})
export class AppModule {}
```

### Prisma Service (Local SQLite)
```typescript
import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    await this.$connect();
    console.log('Conectado ao SQLite local');
  }
}
```

***

## 5) Web (Next.js SPA + IndexedDB)

### apps/web/src/lib/db.ts (IndexedDB Local)
```typescript
import Dexie, { Table } from 'dexie';

export interface LocalUser {
  id?: number;
  email: string;
  name?: string;
  companyId: string;
}

export interface LocalSettings {
  id?: number;
  key: string;
  value: any;
}

export interface LocalLog {
  id?: number;
  timestamp: Date;
  level: 'info' | 'warn' | 'error';
  message: string;
  data?: any;
}

export class LocalDB extends Dexie {
  users!: Table<LocalUser>;
  settings!: Table<LocalSettings>;
  logs!: Table<LocalLog>;

  constructor() {
    super('OmniSupreme_Local');

    this.version(1).stores({
      users: '++id, email, companyId',
      settings: '++id, key',
      logs: '++id, timestamp, level'
    });
  }
}

export const localDB = new LocalDB();

// Auto-init
localDB.open().then(() => {
  console.log('IndexedDB local inicializada');
});
```

### apps/web/src/app/page.tsx
```typescript
'use client';

import { useEffect, useState } from 'react';
import { localDB } from '@/lib/db';

export default function HomePage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    localDB.open().then(() => {
      setIsReady(true);
    });
  }, []);

  if (!isReady) {
    return <div>Inicializando OmniSupreme Local...</div>;
  }

  return (
    <main className="p-6">
      <h1>OmniSupreme - AreLuna ERP (Local)</h1>
      <p>Modo local ativo - Dados armazenados no seu Mac</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
        <div className="p-4 border rounded">
          <h2>SAF-T Processing</h2>
          <p>Processamento local de ficheiros SAF-T</p>
        </div>

        <div className="p-4 border rounded">
          <h2>QR Inventory</h2>
          <p>Gestão de inventário com QR codes</p>
        </div>

        <div className="p-4 border rounded">
          <h2>Agent Tools</h2>
          <p>Ferramentas de automação local</p>
        </div>
      </div>
    </main>
  );
}
```

***

## 6) Setup Commands (macOS)

### Instalação Inicial
```bash
# Homebrew (se não tiver)
...
```

Sources
