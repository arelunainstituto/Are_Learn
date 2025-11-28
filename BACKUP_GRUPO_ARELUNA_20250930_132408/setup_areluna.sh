#!/bin/zsh
set -e

ROOT="Grupo AreLuna"
mkdir -p "$ROOT"

# Escopo geral
cat > "$ROOT/escopo_geral.txt" << 'EOF'
# ERP Grupo AreLuna – Escopo Geral
Holding: Vespasian Ventures, Lda.
Empresas: Instituto AreLuna, Pinklegion, Papagaio Fotogénico, Nuvens Autóctones, ProStoral.

Objetivo: ERP modular (núcleo comum + módulos por empresa).
- Multi-tenant por empresa/unidade; RBAC via Azure AD
- Intercompany Orders, Financeiro leve, Logística & Frota, Agenda Clínica
- Integrações: Microsoft 365, Zoho CRM, Evolution API, Azure Blob
- Observabilidade & Auditoria; conformidade GDPR
EOF

# ========== Vespasian Ventures ==========
mkdir -p "$ROOT/Vespasian Ventures/Departamentos"
cat > "$ROOT/Vespasian Ventures/vespasian.txt" << 'EOF'
# Vespasian Ventures, Lda.
Sociedade gestora e holding do Grupo AreLuna
NIPC: 516313916 | Sede: Porto | Capital Social: €2.250

Sócios:
- Leonardo Costa Saraiva de Oliveira (€1.500)
- Arethuza Carolina Brochado Luna (€750)

Gerência: Leonardo Costa Saraiva de Oliveira

CAE principal: 74992 — Outras atividades de consultoria, científicas, técnicas e similares, diversas, n.e.
CAE secundário: 86230 — Atividades de medicina dentária e odontologia

Função no ERP: núcleo de governança, consolidação financeira, compliance, intercompany control e relatórios de grupo.
EOF
for dep in "Governança & Compliance" "Financeiro Consolidado" "Estratégia & Participações"; do
  mkdir -p "$ROOT/Vespasian Ventures/Departamentos/$dep"
  cat > "$ROOT/Vespasian Ventures/Departamentos/$dep/descricao.txt" << TXT
# $dep – Descrição
Objetivo: (preencher)
Principais processos: (preencher)
Integrações: (preencher)
Métricas/SLAs: (preencher)
TXT
done

# ========== Instituto AreLuna ==========
mkdir -p "$ROOT/Instituto AreLuna/Departamentos"
cat > "$ROOT/Instituto AreLuna/instituto_areluna.txt" << 'EOF'
Atividade: Clínica dentária e estética
CAE: 86230 — Atividades de medicina dentária e odontologia
EOF
for dep in "Comercial & Marketing" "Clínica" "Financeiro" "Recursos Humanos" "Comunicação"; do
  mkdir -p "$ROOT/Instituto AreLuna/Departamentos/$dep"
  cat > "$ROOT/Instituto AreLuna/Departamentos/$dep/descricao.txt" << TXT
# $dep – Descrição
Objetivo: (preencher)
Principais processos: (preencher)
Integrações: (preencher)
Métricas/SLAs: (preencher)
TXT
done

# ========== Pinklegion ==========
mkdir -p "$ROOT/Pinklegion/Departamentos"
cat > "$ROOT/Pinklegion/pinklegion.txt" << 'EOF'
Atividade: Comércio/manutenção de veículos
CAE: 47811 — Comércio a retalho de veículos automóveis ligeiros
EOF
for dep in "Comercial" "Oficina" "Financeiro" "Logística"; do
  mkdir -p "$ROOT/Pinklegion/Departamentos/$dep"
  cat > "$ROOT/Pinklegion/Departamentos/$dep/descricao.txt" << TXT
# $dep – Descrição
Objetivo: (preencher)
Principais processos: (preencher)
Integrações: (preencher)
Métricas/SLAs: (preencher)
TXT
done

# ========== Papagaio Fotogénico ==========
mkdir -p "$ROOT/Papagaio Fotogénico/Departamentos"
cat > "$ROOT/Papagaio Fotogénico/papagaio_fotogenico.txt" << 'EOF'
Atividade: Produção audiovisual, publicidade, TI
CAE: 59110 — Produção de filmes, vídeos e programas de TV
EOF
for dep in "Produção" "Tecnologia & TI" "Criativo" "Financeiro"; do
  mkdir -p "$ROOT/Papagaio Fotogénico/Departamentos/$dep"
  cat > "$ROOT/Papagaio Fotogénico/Departamentos/$dep/descricao.txt" << TXT
# $dep – Descrição
Objetivo: (preencher)
Principais processos: (preencher)
Integrações: (preencher)
Métricas/SLAs: (preencher)
TXT
done

# ========== Nuvens Autóctones ==========
mkdir -p "$ROOT/Nuvens Autóctones/Departamentos"
cat > "$ROOT/Nuvens Autóctones/nuvens_autoctones.txt" << 'EOF'
Atividade: Transporte rodoviário de mercadorias, logística
CAE: 49410 — Transporte rodoviário de mercadorias
EOF
for dep in "Operações de Transporte" "Logística & Armazém" "Manutenção de Veículos" "Financeiro"; do
  mkdir -p "$ROOT/Nuvens Autóctones/Departamentos/$dep"
  cat > "$ROOT/Nuvens Autóctones/Departamentos/$dep/descricao.txt" << TXT
# $dep – Descrição
Objetivo: (preencher)
Principais processos: (preencher)
Integrações: (preencher)
Métricas/SLAs: (preencher)
TXT
done

# ========== ProStoral ==========
mkdir -p "$ROOT/ProStoral/Departamentos"
cat > "$ROOT/ProStoral/prostoral.txt" << 'EOF'
Atividade: Fabricação de dispositivos médicos, próteses, arrendamento
CAE principal: 32502 — Fabricação de material ortopédico e instrumentos médico-cirúrgicos
EOF
for dep in "Produção" "Pesquisa & Desenvolvimento" "Qualidade & Compliance" "Financeiro" "Arrendamento de Imóveis"; do
  mkdir -p "$ROOT/ProStoral/Departamentos/$dep"
  cat > "$ROOT/ProStoral/Departamentos/$dep/descricao.txt" << TXT
# $dep – Descrição
Objetivo: (preencher)
Principais processos: (preencher)
Integrações: (preencher)
Métricas/SLAs: (preencher)
TXT
done

# Instruções gerais
cat > "$ROOT/INSTRUCOES_TRAE_AI.txt" << 'EOF'
# Instruções para Trae.ai
1) Ler primeiro: escopo_geral.txt
2) Cada empresa tem um TXT raiz com CAE e foco ERP
3) Departamentos têm um descricao.txt para detalhar processos
4) Stack: Node (NestJS + Prisma + PostgreSQL), Next.js/Tailwind, Azure AD SSO
5) Padrões: multi-tenant, RBAC, auditoria, OpenAPI, testes, observabilidade
EOF

echo "✅ Estrutura criada em: $ROOT"
