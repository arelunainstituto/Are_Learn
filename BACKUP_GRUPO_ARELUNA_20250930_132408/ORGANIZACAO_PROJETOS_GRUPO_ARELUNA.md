# Organização dos Projetos - Grupo AreLuna

## 📋 Estrutura Organizacional

### 🏢 **Vespasian Ventures, Lda.** (Holding)
**NIPC:** 516313916 | **Sede:** Porto | **Capital:** €2.250  
**CAE:** 74992 — Outras atividades de consultoria, científicas, técnicas e similares  
**Função:** Núcleo de governança, consolidação financeira, compliance e controle intercompany

#### Departamentos:
- **Estratégia & Participações**
- **Financeiro Consolidado**
- **Governança & Compliance**

---

## 🏥 **Instituto AreLuna**
**Atividade:** Clínica dentária e estética  
**CAE:** 86230 — Atividades de medicina dentária e odontologia

#### Departamentos:
- **Clínica**
- **Comercial & Marketing**
- **Comunicação**
- **Financeiro**
- **Recursos Humanos**

#### Projetos Clínicos Identificados:
- `projeto_all_on_four` - Implantes All-on-Four
- `projeto_alinhadores` - Tratamento ortodôntico com alinhadores
- `projeto_facetas` - Facetas dentárias
- `projeto_capilar` - Tratamentos capilares
- `projeto_implantes_suica` - Implantes especializados

---

## 🚗 **Pinklegion**
**Atividade:** Comércio/manutenção de veículos  
**CAE:** 47811 — Comércio a retalho de veículos automóveis ligeiros

#### Departamentos:
- **Comercial**
- **Financeiro**
- **Logística**
- **Oficina**

---

## 🎬 **Papagaio Fotogénico**
**Atividade:** Produção audiovisual, publicidade, TI  
**CAE:** 59110 — Produção de filmes, vídeos e programas de TV

#### Departamentos:
- **Criativo**
- **Financeiro**
- **Produção**
- **Tecnologia & TI**

---

## 🚛 **Nuvens Autóctones**
**Atividade:** Transporte rodoviário de mercadorias, logística  
**CAE:** 49410 — Transporte rodoviário de mercadorias

#### Departamentos:
- **Financeiro**
- **Logística & Armazém**
- **Manutenção de Veículos**
- **Operações de Transporte**

---

## 🏭 **ProStoral**
**Atividade:** Fabricação de dispositivos médicos, próteses, arrendamento  
**CAE:** 32502 — Fabricação de material ortopédico e instrumentos médico-cirúrgicos

#### Departamentos:
- **Arrendamento de Imóveis**
- **Financeiro**
- **Pesquisa & Desenvolvimento**
- **Produção**
- **Qualidade & Compliance**

---

## 💻 **Projetos Tecnológicos Principais**

### 1. **ERP Grupo AreLuna** 🎯
**Status:** Em desenvolvimento  
**Tecnologia:** Next.js 14 (App Router), TypeScript, Supabase  
**Localização:** `/erp-grupo-areluna/`

**Características:**
- Sistema ERP modular multi-tenant
- Autenticação Azure AD (NextAuth)
- Arquitetura monorepo com Turbo
- Integração com Microsoft 365, Zoho CRM, Evolution API
- Módulos: Intercompany, Financeiro, Logística, Clínica
- Conformidade GDPR e auditoria completa

**Estrutura:**
```
/apps/web              # Next.js + API Routes
/packages/ui           # shadcn components
/packages/core         # schemas, utils, SDK
/prisma               # schema, migrations, seeds
```

### 2. **Sistema de Inventário Patrimonial** 📦
**Status:** Funcional  
**Tecnologia:** Next.js 14, TypeScript, Supabase  
**Localização:** `/Inventario Patrimonio/inventory-app/`

**Funcionalidades:**
- Dashboard interativo com estatísticas
- CRUD completo de ativos patrimoniais
- Controle de acesso por funções (user/manager/admin)
- Impressão de etiquetas QR (Brother QL-810W)
- Scanner QR Code integrado
- Interface responsiva com Tailwind CSS + shadcn/ui

### 3. **Lending Platform** 💰
**Status:** Protótipo  
**Tecnologia:** HTML, CSS, JavaScript (Vanilla)  
**Localização:** `/Lending Platform/`

**Características:**
- Sistema de gestão de empréstimos
- Dashboard com gráficos (Chart.js)
- Interface multilíngue
- Design responsivo

---

## 📁 **Arquivos de Configuração e Automação**

### Scripts de Automação:
- `setup_areluna.sh` - Script de configuração inicial
- `bulk_subfolders.applescript` - Criação em lote de subpastas
- `notes_setup_all.applescript` - Configuração de notas
- `export_notes_single.applescript` - Exportação de notas

### Arquivos de Documentação:
- `escopo_geral.txt` - Escopo geral do ERP
- `aprendizado.txt` - Documentação de aprendizados
- `referencia.txt` - Referências técnicas
- `pessoal.txt` - Informações pessoais/organizacionais

### Configurações:
- `notes_mapping.csv` - Mapeamento de notas
- `package.json` / `package-lock.json` - Dependências Node.js

---

## 🎯 **Objetivos Estratégicos**

### Curto Prazo:
1. **Finalizar ERP Grupo AreLuna** com funcionalidades core
2. **Integrar Sistema de Inventário** ao ERP principal
3. **Implementar autenticação Azure AD** em todos os sistemas

### Médio Prazo:
1. **Desenvolver módulos específicos** por empresa
2. **Implementar integrações** (Microsoft 365, Zoho, Evolution API)
3. **Migrar Lending Platform** para arquitetura moderna

### Longo Prazo:
1. **Consolidação completa** de todos os sistemas
2. **Implementação de BI/Analytics** avançado
3. **Expansão para novas funcionalidades** conforme necessidades do grupo

---

## 🔧 **Stack Tecnológico Padronizado**

### Frontend:
- **Framework:** Next.js 14+ (App Router)
- **Linguagem:** TypeScript
- **UI:** Tailwind CSS + shadcn/ui
- **Animações:** Framer Motion

### Backend:
- **Database:** PostgreSQL (Supabase/Neon)
- **ORM:** Prisma
- **Auth:** NextAuth.js + Azure AD
- **API:** REST + Server Actions

### DevOps:
- **Deploy:** Vercel
- **Monorepo:** Turbo
- **CI/CD:** GitHub Actions
- **Observabilidade:** Sentry + Vercel Analytics

### Integrações:
- **Microsoft 365** (Graph API)
- **Zoho CRM**
- **Evolution API** (WhatsApp)
- **Azure Blob Storage**

---

## 📊 **Status Atual dos Projetos**

| Projeto | Status | Prioridade | Próximos Passos |
|---------|--------|------------|-----------------|
| ERP Grupo AreLuna | 🟡 Em desenvolvimento | Alta | Finalizar módulos core |
| Inventário Patrimonial | 🟢 Funcional | Média | Integração com ERP |
| Lending Platform | 🟠 Protótipo | Baixa | Migração para Next.js |
| Projetos Clínicos | 🔴 Planejamento | Média | Definir especificações |

---

*Documento gerado automaticamente pelo OmniLuner - Última atualização: Janeiro 2025*