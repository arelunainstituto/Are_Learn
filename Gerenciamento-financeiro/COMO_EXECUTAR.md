# 🚀 Como Executar o Sistema de Orçamento

## ⚡ Execução Rápida (Copie e Cole no Terminal)

```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
python3 scripts/run_update.py
```

---

## 📋 Passo a Passo Detalhado

### 1️⃣ Abrir o Terminal
- Pressione `Cmd + Espaço`
- Digite "Terminal"
- Pressione Enter

### 2️⃣ Navegar até a Pasta do Projeto
```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
```

### 3️⃣ Verificar que está no lugar certo
```bash
pwd
# Deve mostrar: /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro

ls
# Deve mostrar: README.md, src/, scripts/, etc.
```

### 4️⃣ Executar o Script
```bash
python3 scripts/run_update.py
```

---

## 🎯 Execução Completa em Uma Linha

Se você estiver em qualquer pasta, pode executar tudo de uma vez:

```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro && python3 scripts/run_update.py
```

---

## 📁 Abrir Dashboard no Navegador

### Opção 1: Via Terminal
```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
open dashboard.html
```

### Opção 2: Via Finder
1. Abra o Finder
2. Navegue até: `Documents/TRAe-Projects/Gerenciamento-financeiro`
3. Clique duplo em `dashboard.html`

---

## 📊 Abrir Planilha Excel

### Via Terminal
```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
open "Orçamento Empresarial - Instituto Areluna - modelo-v1.xlsx"
```

### Via Finder
1. Abra o Finder
2. Navegue até: `Documents/TRAe-Projects/Gerenciamento-financeiro`
3. Clique duplo em `Orçamento Empresarial - Instituto Areluna - modelo-v1.xlsx`

---

## 🧪 Executar Testes

```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
python3 tests/test_labeling.py
python3 tests/test_assumptions.py
python3 tests/test_dre.py
python3 tests/test_cashflow.py
```

---

## ❓ Resolução de Problemas

### Erro: "No such file or directory"
**Causa:** Você não está na pasta correta

**Solução:**
```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
pwd  # Verificar o diretório atual
```

### Erro: "Permission denied"
**Solução:**
```bash
chmod +x scripts/run_update.py
```

### Erro: "Module not found"
**Solução:** Instalar dependências
```bash
pip3 install --user openpyxl unidecode
```

---

## 📱 Atalhos Úteis

### Criar Atalho no Desktop

#### Script para Desktop:
```bash
# Criar um script executável
cat > ~/Desktop/Executar_Orcamento.command << 'EOF'
#!/bin/bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
python3 scripts/run_update.py
echo ""
echo "Pressione qualquer tecla para fechar..."
read -n 1
EOF

# Tornar executável
chmod +x ~/Desktop/Executar_Orcamento.command
```

Agora você terá um ícone no Desktop que executa tudo com duplo clique!

#### Dashboard no Desktop:
```bash
ln -s "/Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro/dashboard.html" ~/Desktop/Dashboard_Areluna.html
```

---

## 🔄 Workflow Completo

### 1. Preencher Dados
- Abrir Excel original
- Preencher "DRE por Produto"
- Preencher "Cargos e Salários"
- Salvar

### 2. Executar Automação
```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
python3 scripts/run_update.py
```

### 3. Visualizar Resultados
```bash
# Opção A: Dashboard Web
open dashboard.html

# Opção B: Excel Modelo
open "Orçamento Empresarial - Instituto Areluna - modelo-v1.xlsx"
```

---

## 📞 Comandos de Verificação

### Verificar instalação Python
```bash
python3 --version
# Deve mostrar: Python 3.8 ou superior
```

### Verificar dependências
```bash
python3 -c "import openpyxl; print('openpyxl OK')"
python3 -c "import unidecode; print('unidecode OK')"
```

### Listar arquivos do projeto
```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
ls -la
```

---

## 🎯 Comando Único (Recomendado)

**Copie e cole este comando completo no Terminal:**

```bash
cd /Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro && python3 scripts/run_update.py && echo "" && echo "✅ Concluído! Abrir dashboard? (s/n)" && read resposta && [[ "$resposta" == "s" ]] && open dashboard.html
```

Este comando:
1. ✅ Navega para o diretório correto
2. ✅ Executa o script de atualização
3. ✅ Pergunta se quer abrir o dashboard
4. ✅ Abre o dashboard automaticamente (se responder 's')

---

## 💡 Dicas

- 💾 Sempre faça backup antes de executar (o script já faz automaticamente)
- 🔄 Execute sempre que atualizar dados nas planilhas base
- 📊 Verifique o dashboard para visualização rápida
- 📈 Use o Excel para análise detalhada
- 📝 Consulte os logs em `logs/` se houver erros

---

**Caminho Completo do Projeto:**
```
/Users/dr.saraiva/Documents/TRAe-Projects/Gerenciamento-financeiro
```

**Arquivos Principais:**
- 📊 `dashboard.html` - Dashboard interativo
- 🐍 `scripts/run_update.py` - Script principal
- 📈 `Orçamento Empresarial - Instituto Areluna - modelo-v1.xlsx` - Resultado
- 📖 `README.md` - Documentação completa

