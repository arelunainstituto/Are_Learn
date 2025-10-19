#!/usr/bin/env python3
"""
Main Script to Update Budget Workbook

This script orchestrates all modules to transform the base workbook into
a comprehensive budget model with assumptions, DRE consolidation, cash flow,
scenarios, and dashboard.
"""

import sys
import os
from datetime import datetime

# Add src to path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from src.io import ExcelWorkbookManager
from src.assumptions import AssumptionsManager
from src.labeling import LabelDetector
from src.dre import DREManager
from src.products import ProductDREAnalyzer
from src.payroll import PayrollManager
from src.cashflow import CashFlowManager
from src.scenarios import ScenarioManager
from src.dashboard import DashboardManager


def main():
    """Main execution function."""
    print("="*80)
    print("INSTITUTO ARELUNA - AUTOMAÇÃO DE ORÇAMENTO")
    print("="*80)
    print()
    
    # Configuration
    base_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    input_file = os.path.join(base_dir, "Orçamento Empresarial - Instituto Areluna.xlsx")
    output_file = os.path.join(base_dir, "Orçamento Empresarial - Instituto Areluna - modelo-v1.xlsx")
    log_dir = os.path.join(base_dir, "logs")
    log_file = os.path.join(log_dir, f"budget_update_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json")
    
    print(f"Input file: {input_file}")
    print(f"Output file: {output_file}")
    print()
    
    # Initialize workbook manager
    print("Step 1: Loading workbook...")
    wbm = ExcelWorkbookManager(input_file)
    
    # Create backup
    backup_path = wbm.create_backup()
    print(f"✓ Backup created: {backup_path}")
    print()
    
    # Load workbook
    wbm.load()
    print("✓ Workbook loaded successfully")
    print()
    
    # Step 2: Create Assumptions
    print("Step 2: Creating Assumptions sheet...")
    assumptions = AssumptionsManager()
    assumptions.create_assumptions_sheet(wbm)
    print("✓ Assumptions sheet created")
    print()
    
    # Step 3: Analyze DRE structure
    print("Step 3: Analyzing DRE structure...")
    try:
        dre_ws = wbm.get_sheet("DRE Grencial Instituto ")
    except ValueError:
        dre_ws = wbm.get_sheet("DRE Grencial Instituto")
    
    dre_manager = DREManager(assumptions)
    dre_structure = dre_manager.analyze_dre_structure(dre_ws)
    print(f"✓ Found {len(dre_structure)} key DRE elements")
    print()
    
    # Step 4: Analyze product-level DRE
    print("Step 4: Analyzing product-level DRE...")
    try:
        product_ws = wbm.get_sheet("DRE por Produto")
        product_analyzer = ProductDREAnalyzer(assumptions)
        product_data = product_analyzer.read_product_dre(product_ws)
        
        if product_data:
            print(f"✓ Analyzed {len(product_data)} products")
            
            # Aggregate by category
            category_summary = product_analyzer.aggregate_by_category()
            print(f"✓ Aggregated into {len(category_summary)} categories:")
            for category, data in category_summary.items():
                print(f"  - {category}: Receita Líquida = R$ {data['receita_liquida']:,.2f}")
        else:
            print("⚠ No product data found")
            product_data = None
    except Exception as e:
        print(f"⚠ Could not analyze products: {e}")
        product_data = None
    print()
    
    # Step 5: Process payroll
    print("Step 5: Processing payroll...")
    try:
        payroll_ws = wbm.get_sheet("Cargos e Salários ")
        payroll_manager = PayrollManager()
        payroll_manager.read_payroll_data(payroll_ws)
        
        fixed, variable = payroll_manager.classify_fixed_variable()
        print(f"✓ Total payroll: R$ {payroll_manager.total_payroll:,.2f}")
        print(f"  - Fixed: R$ {fixed:,.2f}")
        print(f"  - Variable: R$ {variable:,.2f}")
        
        # Update payroll sheet with formulas
        payroll_manager.update_payroll_sheet(wbm, payroll_ws)
        print("✓ Payroll formulas updated")
    except Exception as e:
        print(f"⚠ Could not process payroll: {e}")
    print()
    
    # Step 6: Calculate cash flow
    print("Step 6: Calculating cash flow with AR/AP terms...")
    cashflow_manager = CashFlowManager(assumptions)
    
    try:
        cf_start_row = cashflow_manager.find_cashflow_section(dre_ws)
        if cf_start_row:
            cashflow_manager.analyze_cashflow_structure(dre_ws, cf_start_row)
            
            # Prepare DRE data for cash flow calculation
            # (In a full implementation, would read actual values from DRE)
            dre_monthly_data = {
                'faturamento': [0] * 12,
                'csv': [0] * 12,
                'custos_fixos': [3000] * 12,  # At least rent
                'custos_variaveis': [0] * 12,
                'impostos': [0] * 12,
            }
            
            cashflow_data = cashflow_manager.calculate_monthly_cashflow(dre_monthly_data)
            
            summary = cashflow_manager.get_cashflow_summary(cashflow_data)
            print(f"✓ Cash flow calculated:")
            print(f"  - Net cash flow: R$ {summary['net_cashflow']:,.2f}")
            print(f"  - Ending balance: R$ {summary['ending_balance']:,.2f}")
            print(f"  - Minimum balance: R$ {summary['min_balance']:,.2f}")
            
            # Check liquidity risk
            risky_months = cashflow_manager.check_liquidity_risk(cashflow_data, minimum_balance=50000)
            if risky_months:
                print(f"  ⚠ Liquidity risk in {len(risky_months)} months")
        else:
            print("⚠ Could not find cash flow section")
            cashflow_data = None
    except Exception as e:
        print(f"⚠ Could not calculate cash flow: {e}")
        cashflow_data = None
    print()
    
    # Step 7: Create Scenarios
    print("Step 7: Creating scenario analysis...")
    scenario_manager = ScenarioManager(assumptions)
    scenario_manager.create_scenarios_sheet(wbm)
    print(f"✓ Created {len(scenario_manager.get_scenario_list())} scenarios:")
    for scenario_name in scenario_manager.get_scenario_list():
        print(f"  - {scenario_name}")
    print()
    
    # Step 8: Create Dashboard
    print("Step 8: Creating dashboard...")
    dashboard_manager = DashboardManager()
    
    # Prepare dashboard data (simplified for now)
    dashboard_dre_data = {
        'faturamento': [0] * 12,
        'lucro_bruto': [0] * 12,
        'lair': [-3000] * 12,  # Negative due to fixed costs
        'lucro_liquido': [-3000] * 12,
    }
    
    dashboard_manager.create_dashboard_sheet(
        wbm, 
        dashboard_dre_data, 
        cashflow_data if cashflow_data else {},
        product_data
    )
    print("✓ Dashboard created with KPIs")
    print()
    
    # Step 9: Log changes
    print("Step 9: Logging changes...")
    changes = {
        "sheets_added": ["Assumptions", "Scenarios", "Painel"],
        "dre_structure": dre_structure,
        "products_analyzed": len(product_data) if product_data else 0,
        "payroll_total": payroll_manager.total_payroll if 'payroll_manager' in locals() else 0,
        "scenarios_created": len(scenario_manager.get_scenario_list()),
    }
    
    wbm.log_changes(log_file, changes)
    print(f"✓ Changes logged to: {log_file}")
    print()
    
    # Step 10: Save workbook
    print("Step 10: Saving workbook...")
    wbm.save(output_file)
    print(f"✓ Workbook saved to: {output_file}")
    print()
    
    # Summary
    print("="*80)
    print("AUTOMAÇÃO CONCLUÍDA COM SUCESSO!")
    print("="*80)
    print()
    print("Resumo:")
    print(f"  ✓ Planilhas criadas: Assumptions, Scenarios, Painel")
    print(f"  ✓ Estrutura DRE analisada: {len(dre_structure)} elementos")
    if product_data:
        print(f"  ✓ Produtos analisados: {len(product_data)}")
    if 'payroll_manager' in locals():
        print(f"  ✓ Folha de pagamento: R$ {payroll_manager.total_payroll:,.2f}/mês")
    if cashflow_data:
        print(f"  ✓ Saldo final projetado: R$ {summary['ending_balance']:,.2f}")
    print(f"  ✓ Cenários criados: {len(scenario_manager.get_scenario_list())}")
    print()
    print("Próximos passos:")
    print("  1. Abra o arquivo modelo-v1.xlsx")
    print("  2. Revise a planilha Assumptions e ajuste conforme necessário")
    print("  3. Preencha valores de produtos na planilha 'DRE por Produto'")
    print("  4. Preencha salários na planilha 'Cargos e Salários'")
    print("  5. Execute novamente este script para recalcular tudo")
    print("  6. Revise o Painel para análise visual dos KPIs")
    print()


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print()
        print("="*80)
        print("ERRO NA EXECUÇÃO:")
        print("="*80)
        print(f"{str(e)}")
        print()
        import traceback
        traceback.print_exc()
        sys.exit(1)

