"""
Cash Flow Module with AR/AP Terms

Implements cash flow projections with accounts receivable and payable timing.
"""

from typing import Dict, List, Tuple, Optional
from .labeling import LabelDetector


class CashFlowManager:
    """
    Manages cash flow calculations with payment/collection terms.
    """
    
    def __init__(self, assumptions_manager):
        """
        Initialize cash flow manager.
        
        Args:
            assumptions_manager: AssumptionsManager instance
        """
        self.assumptions = assumptions_manager
        self.label_detector = LabelDetector()
        self.cashflow_structure = {}
        self.initial_balance = 100000.0  # Default
    
    def find_cashflow_section(self, worksheet) -> Optional[int]:
        """
        Find the cash flow section in the worksheet.
        
        Args:
            worksheet: DRE worksheet containing cash flow
            
        Returns:
            Starting row of cash flow section
        """
        for row in range(1, worksheet.max_row + 1):
            for col in range(1, 10):
                cell = worksheet.cell(row=row, column=col)
                if cell.value and "Fluxo de Caixa" in str(cell.value):
                    print(f"Found cash flow section at row {row}")
                    return row
        
        return None
    
    def analyze_cashflow_structure(self, worksheet, cashflow_start_row: int) -> Dict:
        """
        Analyze cash flow structure.
        
        Args:
            worksheet: Worksheet containing cash flow
            cashflow_start_row: Starting row of cash flow section
            
        Returns:
            Dictionary with structure information
        """
        # Find key rows in cash flow section
        search_end = min(cashflow_start_row + 50, worksheet.max_row)
        
        key_labels = {
            'Entradas': 'entradas',
            'Receita com Venda': 'receita_vendas',
            'Aporte': 'aporte_socios',
            'Custo dos Serviços': 'csv_saida',
            'Custos Fixos': 'custos_fixos_saida',
            'Custos Variáveis': 'custos_variaveis_saida',
            'Impostos': 'impostos_saida',
            'Despesas Financeiras': 'financeiras_saida',
            'Investimentos': 'investimentos_saida',
            'Retirada': 'retirada_socios',
            'Saidas Totais': 'saidas_totais',
            'Saldo Mensal': 'saldo_mensal',
            'Saldo Acumulado': 'saldo_acumulado',
            'Saldo Inicial': 'saldo_inicial',
        }
        
        for row in range(cashflow_start_row, search_end):
            cell = worksheet.cell(row=row, column=2)
            if not cell.value:
                continue
            
            cell_text = str(cell.value).strip()
            
            for label, key in key_labels.items():
                if label.lower() in cell_text.lower():
                    self.cashflow_structure[key] = row
                    break
        
        # Get initial balance value
        saldo_inicial_row = self.cashflow_structure.get('saldo_inicial')
        if saldo_inicial_row:
            # Value is typically in the row below
            value_cell = worksheet.cell(row=saldo_inicial_row + 1, column=2)
            if value_cell.value and isinstance(value_cell.value, (int, float)):
                self.initial_balance = float(value_cell.value)
        
        print(f"Cash flow structure: {self.cashflow_structure}")
        print(f"Initial balance: {self.initial_balance:,.2f}")
        
        return self.cashflow_structure
    
    def apply_ar_terms(self, monthly_revenue: List[float]) -> List[List[float]]:
        """
        Apply accounts receivable terms to distribute cash inflows.
        
        Args:
            monthly_revenue: List of 12 monthly revenue values
            
        Returns:
            2D list where each row is a month and columns are cash-in timing
        """
        ar_days = self.assumptions.assumptions["ar_terms"]["days"]
        ar_weights = self.assumptions.assumptions["ar_terms"]["weights"]
        
        # Convert days to months (simplified: 30 days = 1 month)
        ar_months = [days // 30 for days in ar_days]
        
        # Initialize 12x12 matrix for cash inflows
        cash_inflows = [[0.0 for _ in range(12)] for _ in range(12)]
        
        # Distribute each month's revenue according to terms
        for sale_month in range(12):
            revenue = monthly_revenue[sale_month]
            
            for delay_months, weight in zip(ar_months, ar_weights):
                cash_month = sale_month + delay_months
                
                # Handle year-end carryover (simplified - just cap at Dec)
                if cash_month < 12:
                    cash_inflows[cash_month][sale_month] = revenue * weight
        
        # Sum across sale months to get total cash-in per month
        monthly_cash_in = [sum(month_inflows) for month_inflows in cash_inflows]
        
        return monthly_cash_in
    
    def apply_ap_terms(self, monthly_expenses: List[float]) -> List[float]:
        """
        Apply accounts payable terms to distribute cash outflows.
        
        Args:
            monthly_expenses: List of 12 monthly expense values
            
        Returns:
            List of 12 monthly cash-out values
        """
        ap_days = self.assumptions.assumptions["ap_terms"]["days"]
        ap_weights = self.assumptions.assumptions["ap_terms"]["weights"]
        
        # Convert days to months
        ap_months = [days // 30 for days in ap_days]
        
        # Initialize cash outflows
        cash_outflows = [0.0 for _ in range(12)]
        
        # Distribute each month's expenses according to terms
        for expense_month in range(12):
            expense = monthly_expenses[expense_month]
            
            for delay_months, weight in zip(ap_months, ap_weights):
                cash_month = expense_month + delay_months
                
                if cash_month < 12:
                    cash_outflows[cash_month] += expense * weight
        
        return cash_outflows
    
    def calculate_monthly_cashflow(self, dre_data: Dict[str, List[float]]) -> Dict[str, List[float]]:
        """
        Calculate monthly cash flow with AR/AP terms.
        
        Args:
            dre_data: Dictionary with monthly DRE values
            
        Returns:
            Dictionary with cash flow calculations
        """
        # Extract monthly values from DRE
        monthly_revenue = dre_data.get('faturamento', [0] * 12)
        monthly_csv = dre_data.get('csv', [0] * 12)
        monthly_fixed = dre_data.get('custos_fixos', [0] * 12)
        monthly_variable = dre_data.get('custos_variaveis', [0] * 12)
        monthly_taxes = dre_data.get('impostos', [0] * 12)
        
        # Apply AR terms to revenue
        cash_inflows = self.apply_ar_terms(monthly_revenue)
        
        # Apply AP terms to expenses
        cash_outflows_csv = self.apply_ap_terms(monthly_csv)
        cash_outflows_fixed = self.apply_ap_terms(monthly_fixed)
        cash_outflows_variable = self.apply_ap_terms(monthly_variable)
        
        # Taxes typically paid in same month (accrual)
        cash_outflows_taxes = monthly_taxes.copy()
        
        # Total outflows
        total_outflows = []
        for i in range(12):
            total = (cash_outflows_csv[i] + 
                    cash_outflows_fixed[i] + 
                    cash_outflows_variable[i] + 
                    cash_outflows_taxes[i])
            total_outflows.append(total)
        
        # Monthly and accumulated balances
        monthly_balance = []
        accumulated_balance = [self.initial_balance]
        
        for i in range(12):
            monthly = cash_inflows[i] - total_outflows[i]
            monthly_balance.append(monthly)
            
            if i == 0:
                accum = self.initial_balance + monthly
            else:
                accum = accumulated_balance[i] + monthly
            
            accumulated_balance.append(accum)
        
        return {
            'cash_inflows': cash_inflows,
            'cash_outflows_csv': cash_outflows_csv,
            'cash_outflows_fixed': cash_outflows_fixed,
            'cash_outflows_variable': cash_outflows_variable,
            'cash_outflows_taxes': cash_outflows_taxes,
            'total_outflows': total_outflows,
            'monthly_balance': monthly_balance,
            'accumulated_balance': accumulated_balance[1:],  # Skip initial
        }
    
    def write_cashflow_to_sheet(self, workbook_manager, worksheet, 
                               cashflow_data: Dict[str, List[float]], month_cols: Dict[str, int]):
        """
        Write calculated cash flow values to sheet.
        
        Args:
            workbook_manager: ExcelWorkbookManager instance
            worksheet: Worksheet to write to
            cashflow_data: Calculated cash flow data
            month_cols: Dictionary of month names to columns
        """
        if not self.cashflow_structure:
            print("Warning: Cash flow structure not analyzed")
            return
        
        # Sort months
        sorted_months = sorted(month_cols.items(), 
                              key=lambda x: self.label_detector.MONTHS_PT.index(
                                  self.label_detector.normalize_text(x[0])))
        
        # Write cash inflows
        if 'receita_vendas' in self.cashflow_structure:
            row = self.cashflow_structure['receita_vendas']
            for (month, col), value in zip(sorted_months, cashflow_data['cash_inflows']):
                workbook_manager.write_value(worksheet, row, col, value)
        
        # Write total outflows
        if 'saidas_totais' in self.cashflow_structure:
            row = self.cashflow_structure['saidas_totais']
            for (month, col), value in zip(sorted_months, cashflow_data['total_outflows']):
                workbook_manager.write_value(worksheet, row, col, value)
        
        # Write monthly balance
        if 'saldo_mensal' in self.cashflow_structure:
            row = self.cashflow_structure['saldo_mensal']
            for (month, col), value in zip(sorted_months, cashflow_data['monthly_balance']):
                workbook_manager.write_value(worksheet, row, col, value)
        
        # Write accumulated balance
        if 'saldo_acumulado' in self.cashflow_structure:
            row = self.cashflow_structure['saldo_acumulado']
            for (month, col), value in zip(sorted_months, cashflow_data['accumulated_balance']):
                workbook_manager.write_value(worksheet, row, col, value)
        
        print("Cash flow values written to sheet")
    
    def get_cashflow_summary(self, cashflow_data: Dict[str, List[float]]) -> Dict[str, float]:
        """
        Get summary statistics for cash flow.
        
        Args:
            cashflow_data: Calculated cash flow data
            
        Returns:
            Dictionary with summary metrics
        """
        return {
            'total_inflows': sum(cashflow_data['cash_inflows']),
            'total_outflows': sum(cashflow_data['total_outflows']),
            'net_cashflow': sum(cashflow_data['monthly_balance']),
            'ending_balance': cashflow_data['accumulated_balance'][-1],
            'min_balance': min(cashflow_data['accumulated_balance']),
            'max_balance': max(cashflow_data['accumulated_balance']),
            'months_negative': sum(1 for b in cashflow_data['monthly_balance'] if b < 0),
        }
    
    def check_liquidity_risk(self, cashflow_data: Dict[str, List[float]], 
                            minimum_balance: float = 50000.0) -> List[Tuple[int, float]]:
        """
        Check for months with liquidity risk.
        
        Args:
            cashflow_data: Calculated cash flow data
            minimum_balance: Minimum safe balance threshold
            
        Returns:
            List of (month_number, balance) tuples for risky months
        """
        risky_months = []
        
        for i, balance in enumerate(cashflow_data['accumulated_balance'], 1):
            if balance < minimum_balance:
                risky_months.append((i, balance))
        
        return risky_months

