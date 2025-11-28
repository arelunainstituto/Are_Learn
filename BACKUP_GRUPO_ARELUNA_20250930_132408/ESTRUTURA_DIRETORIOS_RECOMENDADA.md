# Estrutura de Diretórios Recomendada - Grupo AreLuna

## 📁 Proposta de Reorganização

### Estrutura Atual vs. Proposta

```
📂 Grupo AreLuna/
├── 🏢 01-HOLDING/
│   └── Vespasian-Ventures/
│       ├── documentos/
│       ├── contratos/
│       └── relatorios-consolidados/
│
├── 🏥 02-EMPRESAS/
│   ├── Instituto-AreLuna/
│   │   ├── departamentos/
│   │   ├── projetos-clinicos/
│   │   │   ├── all-on-four/
│   │   │   ├── alinhadores/
│   │   │   ├── facetas/
│   │   │   ├── capilar/
│   │   │   └── implantes-suica/
│   │   └── documentos/
│   │
│   ├── Pinklegion/
│   │   ├── departamentos/
│   │   ├── inventario-veiculos/
│   │   └── documentos/
│   │
│   ├── Papagaio-Fotogenico/
│   │   ├── departamentos/
│   │   ├── projetos-audiovisuais/
│   │   └── documentos/
│   │
│   ├── Nuvens-Autoctones/
│   │   ├── departamentos/
│   │   ├── frota-veiculos/
│   │   └── documentos/
│   │
│   └── ProStoral/
│       ├── departamentos/
│       ├── produtos-medicos/
│       └── documentos/
│
├── 💻 03-PROJETOS-TECNOLOGICOS/
│   ├── ERP-Grupo-AreLuna/          # Projeto principal
│   │   ├── apps/
│   │   ├── packages/
│   │   ├── prisma/
│   │   ├── docs/
│   │   └── deployment/
│   │
│   ├── Sistema-Inventario/         # Renomeado de "Inventario Patrimonio"
│   │   ├── inventory-app/
│   │   ├── docs/
│   │   └── deployment/
│   │
│   ├── Lending-Platform/           # Modernização planejada
│   │   ├── legacy/                 # Versão atual HTML/JS
│   │   ├── nextjs-migration/       # Nova versão
│   │   └── docs/
│   │
│   └── Projetos-Futuros/
│       ├── bi-analytics/
│       ├── mobile-apps/
│       └── integrações/
│
├── 📋 04-DOCUMENTACAO/
│   ├── organizacao/
│   │   ├── ORGANIZACAO_PROJETOS_GRUPO_ARELUNA.md
│   │   ├── ESTRUTURA_DIRETORIOS_RECOMENDADA.md
│   │   └── organogramas/
│   │
│   ├── tecnica/
│   │   ├── arquitetura/
│   │   ├── apis/
│   │   └── deployment/
│   │
│   ├── processos/
│   │   ├── workflows/
│   │   ├── compliance/
│   │   └── auditoria/
│   │
│   └── templates/
│       ├── contratos/
│       ├── relatorios/
│       └── apresentacoes/
│
├── 🔧 05-FERRAMENTAS/
│   ├── scripts/
│   │   ├── setup_areluna.sh
│   │   ├── bulk_subfolders.applescript
│   │   └── automation/
│   │
│   ├── configuracoes/
│   │   ├── .env.examples/
│   │   ├── docker-configs/
│   │   └── ci-cd/
│   │
│   └── utilitarios/
│       ├── notes-management/
│       ├── export-tools/
│       └── backup-scripts/
│
├── 📊 06-DADOS/
│   ├── backups/
│   ├── exports/
│   ├── imports/
│   └── analytics/
│
└── 🗃️ 07-ARQUIVO/
    ├── projetos-descontinuados/
    ├── versoes-antigas/
    └── documentos-historicos/
```

## 🎯 Benefícios da Reorganização

### 1. **Clareza Organizacional**
- Separação clara entre empresas, projetos e documentação
- Hierarquia lógica e intuitiva
- Facilita navegação e localização de arquivos

### 2. **Escalabilidade**
- Estrutura preparada para novos projetos
- Espaço dedicado para crescimento futuro
- Organização modular

### 3. **Manutenibilidade**
- Backup e versionamento mais eficientes
- Controle de acesso granular
- Auditoria simplificada

### 4. **Colaboração**
- Estrutura padronizada para toda a equipe
- Documentação centralizada
- Processos bem definidos

## 🚀 Plano de Migração

### Fase 1: Preparação (1-2 dias)
1. **Backup completo** da estrutura atual
2. **Criação da nova estrutura** de diretórios
3. **Documentação do processo** de migração

### Fase 2: Migração Gradual (3-5 dias)
1. **Mover documentação** para nova estrutura
2. **Reorganizar projetos tecnológicos**
3. **Atualizar referências** e links

### Fase 3: Validação (1-2 dias)
1. **Verificar integridade** dos arquivos
2. **Testar funcionalidades** dos projetos
3. **Atualizar documentação**

### Fase 4: Limpeza (1 dia)
1. **Remover estrutura antiga**
2. **Finalizar documentação**
3. **Comunicar mudanças** à equipe

## 📋 Checklist de Migração

### Preparação
- [ ] Backup completo realizado
- [ ] Nova estrutura criada
- [ ] Plano de migração aprovado

### Migração de Arquivos
- [ ] Documentos empresariais movidos
- [ ] Projetos tecnológicos reorganizados
- [ ] Scripts e ferramentas relocalizados
- [ ] Arquivos de configuração atualizados

### Atualização de Referências
- [ ] Links internos atualizados
- [ ] Paths em scripts corrigidos
- [ ] Documentação atualizada
- [ ] READMEs revisados

### Validação
- [ ] Projetos funcionando corretamente
- [ ] Todos os arquivos acessíveis
- [ ] Estrutura validada pela equipe
- [ ] Backup da nova estrutura realizado

## 🔄 Manutenção Contínua

### Regras de Organização
1. **Novos projetos** devem seguir a estrutura padrão
2. **Documentação** deve ser atualizada regularmente
3. **Arquivos obsoletos** devem ser movidos para arquivo
4. **Backup regular** da estrutura completa

### Responsabilidades
- **OmniLuner (Agent):** Manutenção da estrutura técnica
- **Leonardo:** Aprovação de mudanças estruturais
- **Equipe:** Seguir padrões estabelecidos

---

*Proposta gerada pelo OmniLuner - Janeiro 2025*