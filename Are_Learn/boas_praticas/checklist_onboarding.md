# 🚀 Checklist de Onboarding - Desenvolvedores Areluna

> **Guia completo para novos desenvolvedores iniciarem em projetos Areluna**

Checklist passo-a-passo para configurar ambiente de desenvolvimento e começar a contribuir.

---

## 📋 Pré-requisitos

### Software Necessário

- [ ] **Node.js 20+** - [Download](https://nodejs.org/)
- [ ] **Git** - [Download](https://git-scm.com/)
- [ ] **VS Code** - [Download](https://code.visualstudio.com/)
- [ ] **Conta GitHub** - [Criar conta](https://github.com/)

### Verificação de Instalação

```bash
# Verificar versões
node --version    # Deve ser v20+
npm --version     # Deve ser v10+
git --version     # Qualquer versão recente
```

---

## 🛠️ Setup Inicial

### 1. Clonar Repositório

```bash
# Clonar o projeto
git clone https://github.com/areluna/[nome-do-projeto].git
cd [nome-do-projeto]

# Verificar estrutura
ls -la
```

### 2. Instalar Dependências

```bash
# Instalar dependências
npm install

# Verificar se instalou corretamente
npm list --depth=0
```

### 3. Configurar Variáveis de Ambiente

```bash
# Copiar arquivo de exemplo
cp .env.example .env

# Editar variáveis necessárias
code .env
```

**Variáveis essenciais:**
```env
# Database
DATABASE_URL=postgresql://...
SUPABASE_URL=https://...
SUPABASE_ANON_KEY=...

# API Keys
OPENAI_API_KEY=sk-...
OPENAI_ASSISTANT_ID=asst_...

# App
NODE_ENV=development
PORT=3000
```

### 4. Configurar Banco de Dados

```bash
# Executar migrações (se aplicável)
npm run db:migrate

# Popular dados de teste (se aplicável)
npm run db:seed
```

---

## 🧪 Verificação do Setup

### 1. Executar Testes

```bash
# Executar todos os testes
npm test

# Executar testes com coverage
npm run test:coverage

# Executar testes em modo watch
npm run test:watch
```

### 2. Verificar Linting

```bash
# Verificar código
npm run lint

# Corrigir automaticamente
npm run lint:fix

# Verificar formatação
npm run format
```

### 3. Iniciar Servidor de Desenvolvimento

```bash
# Frontend + Backend
npm run dev

# Apenas frontend
npm run dev:frontend

# Apenas backend
npm run dev:backend
```

**URLs esperadas:**
- Frontend: http://localhost:3000
- Backend API: http://localhost:3001/api
- Health Check: http://localhost:3001/health

---

## 📚 Comandos Úteis

### Desenvolvimento

```bash
# Iniciar desenvolvimento
npm run dev                 # Frontend + Backend
npm run dev:frontend       # Apenas frontend
npm run dev:backend        # Apenas backend

# Build para produção
npm run build              # Build completo
npm run build:frontend     # Build frontend
npm run build:backend      # Build backend

# Preview de produção
npm run preview            # Preview do build
```

### Qualidade de Código

```bash
# Linting
npm run lint               # Verificar código
npm run lint:fix           # Corrigir automaticamente

# Formatação
npm run format             # Formatar código
npm run format:check       # Verificar formatação

# Type checking
npm run type-check         # Verificar tipos TypeScript
```

### Testes

```bash
# Testes
npm test                   # Executar testes
npm run test:watch         # Modo watch
npm run test:ui            # Interface visual
npm run test:coverage      # Com coverage
npm run test:e2e           # Testes end-to-end
```

### Banco de Dados

```bash
# Migrações
npm run db:migrate         # Executar migrações
npm run db:rollback        # Reverter migrações
npm run db:reset           # Reset completo

# Seeds
npm run db:seed            # Popular dados
npm run db:seed:dev        # Dados de desenvolvimento
```

---

## 🔄 Workflow de Desenvolvimento

### 1. Criar Branch

```bash
# Atualizar main
git checkout main
git pull origin main

# Criar nova branch
git checkout -b feature/nova-funcionalidade
# ou
git checkout -b fix/correcao-bug
```

### 2. Desenvolver

```bash
# Fazer alterações no código
# Testar localmente
npm run dev
npm test

# Commit frequentes
git add .
git commit -m "feat: adiciona componente UserCard"
```

### 3. Padrão de Commits

```bash
# Convenção: tipo(escopo): descrição

# Tipos principais
feat: nova funcionalidade
fix: correção de bug
docs: documentação
style: formatação
refactor: refatoração
test: testes
chore: tarefas de manutenção

# Exemplos
git commit -m "feat(auth): adiciona login com Google"
git commit -m "fix(api): corrige endpoint de usuários"
git commit -m "docs(readme): atualiza instruções de setup"
git commit -m "style(components): formata código com prettier"
```

### 4. Push e Pull Request

```bash
# Push da branch
git push origin feature/nova-funcionalidade

# Criar Pull Request no GitHub
# Aguardar review e aprovação
# Merge após aprovação
```

---

## 📖 Documentação Essencial

### Arquivos Importantes

- [ ] **README.md** - Visão geral do projeto
- [ ] **GETTING_STARTED.md** - Guia de início
- [ ] **API.md** - Documentação da API
- [ ] **CONTRIBUTING.md** - Guia de contribuição
- [ ] **boas_praticas/** - Padrões da empresa

### Conhecimento Técnico

- [ ] **Estrutura do Projeto** - `estrutura_projeto.md`
- [ ] **Estilo de Código** - `estilo_codigo.md`
- [ ] **Branding** - `branding.md`
- [ ] **Base de Conhecimento** - `conhecimento/base_resumos.md`

---

## 🎯 Primeiras Tarefas

### Tarefa 1: Configurar Ambiente

- [ ] Instalar software necessário
- [ ] Clonar repositório
- [ ] Instalar dependências
- [ ] Configurar .env
- [ ] Executar `npm run dev`
- [ ] Acessar http://localhost:3000

### Tarefa 2: Explorar Código

- [ ] Ler README.md
- [ ] Explorar estrutura de pastas
- [ ] Entender componentes principais
- [ ] Verificar testes existentes
- [ ] Executar `npm test`

### Tarefa 3: Primeira Contribuição

- [ ] Escolher issue/tarefa simples
- [ ] Criar branch feature/
- [ ] Implementar solução
- [ ] Escrever testes
- [ ] Fazer commit seguindo convenção
- [ ] Criar Pull Request

---

## 🐛 Troubleshooting

### Problemas Comuns

#### Erro: "Module not found"

```bash
# Solução: Reinstalar dependências
rm -rf node_modules package-lock.json
npm install
```

#### Erro: "Port already in use"

```bash
# Solução: Matar processo na porta
lsof -ti:3000 | xargs kill -9
# ou
npx kill-port 3000
```

#### Erro: "Database connection failed"

```bash
# Verificar variáveis de ambiente
cat .env | grep DATABASE

# Testar conexão
npm run db:test
```

#### Erro: "TypeScript errors"

```bash
# Verificar tipos
npm run type-check

# Limpar cache
rm -rf node_modules/.cache
npm run dev
```

### Comandos de Diagnóstico

```bash
# Verificar processos rodando
ps aux | grep node

# Verificar portas em uso
lsof -i :3000
lsof -i :3001

# Verificar logs
npm run dev 2>&1 | tee dev.log
```

---

## 📞 Suporte

### Quando Pedir Ajuda

- [ ] Seguiu todos os passos do checklist
- [ ] Tentou soluções de troubleshooting
- [ ] Pesquisou no Google/Stack Overflow
- [ ] Verificou documentação do projeto
- [ ] Ainda não conseguiu resolver

### Como Pedir Ajuda

1. **Descreva o problema** claramente
2. **Inclua logs de erro** completos
3. **Mencione o que já tentou**
4. **Inclua informações do ambiente**:
   - OS (Windows/Mac/Linux)
   - Node.js version
   - NPM version
   - Erro específico

### Canais de Suporte

- **Slack**: #dev-help
- **Email**: dev@areluna.com
- **GitHub Issues**: Para bugs do projeto
- **Documentação**: `docs/` folder

---

## ✅ Checklist Final

### Antes de Começar a Desenvolver

- [ ] Ambiente configurado e funcionando
- [ ] Testes passando
- [ ] Linting sem erros
- [ ] Documentação lida
- [ ] Primeira tarefa escolhida
- [ ] Branch criada
- [ ] IDE configurada com extensões

### Antes de Fazer Commit

- [ ] Código testado localmente
- [ ] Testes passando
- [ ] Linting sem erros
- [ ] Commit message seguindo convenção
- [ ] Código revisado

### Antes de Fazer Push

- [ ] Branch atualizada com main
- [ ] Conflitos resolvidos
- [ ] Testes passando
- [ ] Código revisado
- [ ] Pull Request descrito

---

## 🎉 Próximos Passos

Após completar este checklist:

1. **Explore o código** - Entenda a arquitetura
2. **Leia a documentação** - Especialmente `boas_praticas/`
3. **Contribua** - Escolha uma tarefa simples
4. **Aprenda** - Participe de code reviews
5. **Evolua** - Tome tarefas mais complexas

---

## 📚 Recursos Adicionais

- **Base de Conhecimento**: `conhecimento/base_resumos.md`
- **Padrões de Código**: `estilo_codigo.md`
- **Estrutura de Projeto**: `estrutura_projeto.md`
- **Branding**: `branding.md`
- **Design Tokens**: `tokens_design.json`

---

**Versão**: 1.0.0  
**Última atualização**: Outubro 2025  
**Para**: Novos desenvolvedores Areluna
