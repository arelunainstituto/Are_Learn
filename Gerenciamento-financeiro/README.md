# Sistema de Orçamento Automatizado - Instituto Areluna

Sistema de automação financeira para transformar a planilha de orçamento base do Instituto Areluna em um modelo completo e integrado com DRE consolidada, análise por produto, fluxo de caixa, cenários e dashboard de KPIs.

## 🎯 Objetivo

Transformar o orçamento empresarial em um sistema robusto que:
- **Automatiza cálculos** de DRE, margens e fluxo de caixa
- **Integra dados** de produtos, folha de pagamento e despesas
- **Aplica premissas** de crescimento, sazonalidade e prazos de pagamento/recebimento
- **Projeta fluxo de caixa** com AR/AP terms (prazos)
- **Cria cenários** de análise (otimista, pessimista, conservador)
- **Visualiza KPIs** em um painel executivo

## 📁 Estrutura do Projeto

```
Gerenciamento-financeiro/
├── src/                           # Módulos Python
│   ├── __init__.py
│   ├── io.py                      # Leitura/escrita Excel
│   ├── labeling.py                # Detecção de rótulos PT-BR
│   ├── assumptions.py             # Gestão de premissas
│   ├── dre.py                     # DRE consolidada
│   ├── products.py                # DRE por produto
│   ├── payroll.py                 # Cargos e salários
│   ├── cashflow.py                # Fluxo de caixa com AR/AP
│   ├── scenarios.py               # Cenários de análise
│   └── dashboard.py               # Dashboard de KPIs
├── tests/                         # Testes unitários
│   └── test_*.py
├── scripts/                       # Scripts de execução
│   └── run_update.py              # Script principal
├── logs/                          # Logs de execução
├── backups/                       # Backups automáticos
├── requirements.txt               # Dependências Python
└── README.md                      # Este arquivo
```

## 🚀 Instalação e Uso

### Pré-requisitos

- Python 3.8 ou superior
- pip (gerenciador de pacotes Python)

### Instalação

```bash
# Clone ou baixe o repositório
cd Gerenciamento-financeiro

# Instale as dependências
pip install -r requirements.txt
```

### Execução

```bash
# Execute o script principal
python3 scripts/run_update.py
```

O script irá:
1. ✅ Criar backup automático do arquivo original
2. ✅ Criar planilha "Assumptions" com todas as premissas
3. ✅ Analisar estrutura da DRE e identificar elementos-chave
4. ✅ Processar DRE por produto e agregar por categoria
5. ✅ Integrar folha de pagamento
6. ✅ Calcular fluxo de caixa com prazos de recebimento/pagamento
7. ✅ Criar cenários de análise (Base, Otimista, Pessimista, Conservador)
8. ✅ Criar dashboard "Painel" com KPIs visuais
9. ✅ Gerar arquivo final: `...-modelo-v1.xlsx`

## 📊 Planilhas Criadas

### 1. Assumptions (Premissas)
Centraliza todas as premissas do modelo:
- **Taxa de crescimento 2025**: 15% (padrão)
- **Sazonalidade mensal**: Pesos para distribuir receita ao longo do ano
- **Alíquotas de impostos**: Sales tax e income tax
- **Prazos de recebimento (AR)**: [0, 30, 60 dias] com pesos [70%, 20%, 10%]
- **Prazos de pagamento (AP)**: [0, 30 dias] com pesos [80%, 20%]
- **Comissões padrão**: 10% (vendas), 5% (padrão)
- **Marketing**: 5% da receita
- **Mapeamento Produto → Categoria**: Define qual categoria cada produto pertence

### 2. Scenarios (Cenários)
Permite análise de sensibilidade com 4 cenários pré-definidos:

| Cenário | Crescimento | Preços | Volume | Comissão | Marketing |
|---------|-------------|---------|---------|----------|-----------|
| **Base** | 15% | 100% | 100% | 10% | 5% |
| **Otimista** | 20% | +10% | +5% | 12% | 4% |
| **Pessimista** | 5% | -5% | 100% | 8% | 7% |
| **Conservador** | 10% | 100% | 100% | 10% | 6% |

### 3. Painel (Dashboard)
Dashboard executivo com:
- **Resumo Financeiro Anual**: Receita, Lucro Bruto, LAIR, Lucro Líquido
- **Margens**: Margem Bruta %, Margem LAIR %, Margem Líquida %
- **Fluxo de Caixa**: Saldo inicial, geração de caixa, saldo final, saldo mínimo
- **Desempenho Mensal**: Tabela com todos os meses
- **Top Produtos**: Os 10 produtos com maior receita

## 🔧 Módulos Principais

### labeling.py - Detecção Resiliente de Rótulos
Detecta rótulos em português com:
- Normalização de acentos (café = cafe)
- Case insensitive
- Fuzzy matching para variantes
- Suporte a meses em PT-BR

**Exemplo:**
```python
from src.labeling import LabelDetector

detector = LabelDetector()
pos = detector.find_label(worksheet, 'faturamento')
# Encontra "Faturamento", "FATURAMENTO", "Receita Total", etc.
```

### assumptions.py - Gestão de Premissas
Centraliza e gerencia todas as premissas do modelo.

**Exemplo:**
```python
from src.assumptions import AssumptionsManager

assumptions = AssumptionsManager()
assumptions.set_growth_rate(0.20)  # 20%
assumptions.set_seasonality([0.08, 0.08, 0.09, ...])  # 12 pesos
assumptions.create_assumptions_sheet(workbook_manager)
```

### dre.py - DRE Consolidada
Calcula e consolida a DRE com distribuição mensal.

**Exemplo:**
```python
from src.dre import DREManager

dre = DREManager(assumptions)
dre.analyze_dre_structure(worksheet)
monthly_values = dre.distribute_monthly(1265000)  # Distribui meta anual
```

### products.py - DRE por Produto
Agrega produtos por categoria e calcula margens.

**Exemplo:**
```python
from src.products import ProductDREAnalyzer

analyzer = ProductDREAnalyzer(assumptions)
product_data = analyzer.read_product_dre(worksheet)
category_summary = analyzer.aggregate_by_category()
```

### cashflow.py - Fluxo de Caixa com AR/AP
Projeta fluxo de caixa aplicando prazos de recebimento e pagamento.

**Exemplo:**
```python
from src.cashflow import CashFlowManager

cf = CashFlowManager(assumptions)
cashflow_data = cf.calculate_monthly_cashflow(dre_data)
summary = cf.get_cashflow_summary(cashflow_data)
print(f"Saldo final: R$ {summary['ending_balance']:,.2f}")
```

### scenarios.py - Cenários de Análise
Cria e compara múltiplos cenários.

**Exemplo:**
```python
from src.scenarios import ScenarioManager

scenarios = ScenarioManager(assumptions)
scenarios.add_scenario('Agressivo', 'Crescimento acelerado', {
    'growth_rate_2025': 0.30,
    'price_adjustment': 1.15,
})
```

### dashboard.py - Dashboard de KPIs
Cria painel visual com indicadores-chave.

**Exemplo:**
```python
from src.dashboard import DashboardManager

dashboard = DashboardManager()
dashboard.create_dashboard_sheet(wbm, dre_data, cashflow_data, product_data)
```

## 📈 Funcionalidades Principais

### 1. Detecção Inteligente por Rótulos
❌ **Não fazemos:** Endereços fixos como `C8`, `D12`  
✅ **Fazemos:** Busca por "Janeiro", "Faturamento", "CSV", etc.

Isso torna o sistema resiliente a mudanças na estrutura da planilha.

### 2. Distribuição Mensal com Sazonalidade
Distribui meta anual considerando sazonalidade:
```python
# Meta anual: R$ 1.265.000
# Com sazonalidade [1/12, 1/12, ...] distribui uniformemente
# Ou aplica pesos customizados: [0.08, 0.09, 0.10, ...]
```

### 3. Fluxo de Caixa com Prazos Reais
Não copia DRE direto para caixa. Aplica prazos:
- **Receitas**: 70% à vista, 20% em 30 dias, 10% em 60 dias
- **Despesas**: 80% à vista, 20% em 30 dias

Isso reflete a realidade de pagamentos/recebimentos.

### 4. Integração Automática
- Folha de pagamento → DRE (já existe fórmula, validamos)
- Produtos → Categorias via mapeamento
- DRE → Fluxo de Caixa com prazos
- Tudo → Dashboard

### 5. Cenários Múltiplos
Compare rapidamente 4 cenários diferentes para análise de sensibilidade.

## 🧪 Testes

Execute os testes unitários:

```bash
# Instale pytest se necessário
pip install pytest pytest-cov

# Execute todos os testes
pytest tests/

# Execute com cobertura
pytest --cov=src tests/
```

## 📝 Logs e Auditoria

Cada execução gera um log JSON em `logs/` com:
- Timestamp
- Planilhas adicionadas
- Estrutura DRE identificada
- Produtos analisados
- Total de folha de pagamento
- Cenários criados

**Exemplo de log:**
```json
{
  "timestamp": "2025-01-17T10:30:45",
  "workbook": "Orçamento Empresarial - Instituto Areluna.xlsx",
  "changes": {
    "sheets_added": ["Assumptions", "Scenarios", "Painel"],
    "dre_structure": {...},
    "products_analyzed": 17,
    "payroll_total": 0,
    "scenarios_created": 4
  }
}
```

## ⚙️ Configuração Avançada

### Customizar Premissas
Edite diretamente na planilha "Assumptions" ou via código:

```python
assumptions = AssumptionsManager()

# Taxa de crescimento
assumptions.set_growth_rate(0.18)  # 18%

# Sazonalidade customizada
weights = [0.06, 0.07, 0.08, 0.09, 0.10, 0.11,
           0.11, 0.10, 0.09, 0.08, 0.07, 0.06]
assumptions.set_seasonality(weights)

# Prazos de recebimento
assumptions.set_ar_terms(days=[0, 30, 60, 90], 
                         weights=[0.5, 0.3, 0.15, 0.05])

# Impostos
assumptions.set_tax_rates(sales_tax=0.10, income_tax=0.15)
```

### Adicionar Novo Cenário
```python
scenarios = ScenarioManager(assumptions)
scenarios.add_scenario(
    name='Black Friday',
    description='Promoção especial com volume alto e preços baixos',
    deltas={
        'price_adjustment': 0.85,     # -15% preços
        'volume_adjustment': 1.50,    # +50% volume
        'marketing_pct': 0.12,        # 12% em marketing
    }
)
```

### Classificar Cargos como Variável
```python
payroll = PayrollManager()
payroll.read_payroll_data(worksheet)

# Definir quais cargos são custos variáveis
variable_roles = [
    'Supervisor Comercial',
    'Assessora Comercial',
    'Marketing e Comunicação',
]
fixed, variable = payroll.classify_fixed_variable(variable_roles)
```

## 🔍 Troubleshooting

### Erro: "Sheet not found"
- Verifique espaços extras no nome da planilha
- O código tenta match exato e com trim automático

### Erro: "Could not find month row"
- Certifique-se que existe uma linha com pelo menos 10 meses escritos
- Os nomes devem estar em português: "Janeiro", "Fevereiro", etc.

### Valores zerados no dashboard
- Execute o script após preencher dados nas planilhas base
- O dashboard reflete os valores existentes nas planilhas DRE e produtos

### Cash flow não atualiza
- Verifique se o bloco "Projeção de Fluxo de Caixa" existe na DRE
- Confirme que há valores de receita e despesas na DRE

## 📚 Referências Técnicas

### Formato de Números PT-BR
- Decimal: vírgula (`,`)
- Milhares: ponto (`.`)
- Exemplo: `1.234.567,89`

### Estrutura DRE Esperada
```
Faturamento (soma das categorias)
├── Odonto e Estética
├── Cursos  
└── Implante Capilar

(-) CSV
(=) Lucro Bruto
(-) Despesas Operacionais
    ├── Custos Fixos
    └── Custos Variáveis
(-) Despesas Financeiras
(=) LAIR
(-) Impostos
(=) Lucro Líquido
```

## 🤝 Contribuindo

Para adicionar novos módulos:

1. Crie arquivo em `src/nome_modulo.py`
2. Implemente classe manager
3. Adicione ao `run_update.py`
4. Crie testes em `tests/test_nome_modulo.py`
5. Documente no README

## 📄 Licença

Este projeto é proprietário do Instituto Areluna.

## 📧 Suporte

Para dúvidas ou suporte:
- Email: [contato do instituto]
- Documentação técnica: Este README
- Logs: Verifique pasta `logs/`

---

**Versão:** 1.0.0  
**Última atualização:** Janeiro 2025  
**Desenvolvido para:** Instituto Areluna

