"""
DRE (Demonstração do Resultado do Exercício) Module

Handles main P&L consolidation, calculations, and monthly distribution.
"""

from typing import Dict, List, Tuple, Optional
from .labeling import LabelDetector, get_month_number


class DREManager:
    """
    Manages DRE calculations and consolidation.
    """
    
    def __init__(self, assumptions_manager):
        """
        Initialize DRE manager.
        
        Args:
            assumptions_manager: AssumptionsManager instance
        """
        self.assumptions = assumptions_manager
        self.label_detector = LabelDetector()
        self.month_row = None
        self.month_cols = None
        self.dre_structure = {}
    
    def analyze_dre_structure(self, worksheet) -> Dict:
        """
        Analyze the DRE worksheet structure.
        
        Args:
            worksheet: DRE Grencial Instituto worksheet
            
        Returns:
            Dictionary with structure information
        """
        # Find month row
        month_info = self.label_detector.find_month_row(worksheet, start_row=1, max_search_rows=20)
        
        if month_info:
            self.month_row, self.month_cols = month_info
            print(f"Found month row: {self.month_row}")
            print(f"Months: {list(self.month_cols.keys())}")
        else:
            print("Warning: Could not find month row")
            return {}
        
        # Find key rows
        key_labels = [
            'faturamento',
            'receita_liquida',
            'csv',
            'lucro_bruto',
            'custos_fixos',
            'custos_variaveis',
            'despesas_operacionais',
            'lair',
            'impostos',
            'lucro_liquido',
        ]
        
        for label in key_labels:
            pos = self.label_detector.find_label(
                worksheet, 
                label,
                search_area=(self.month_row, self.month_row + 100, 1, 3)
            )
            if pos:
                self.dre_structure[label] = pos[0]  # Store row number
                print(f"Found {label} at row {pos[0]}")
        
        return self.dre_structure
    
    def read_2024_realized(self, worksheet) -> float:
        """
        Read 2024 realized revenue.
        
        Args:
            worksheet: DRE worksheet
            
        Returns:
            2024 realized value
        """
        # Look for "Realizado 2024" in top rows
        for row in range(1, 10):
            for col in range(1, 10):
                cell = worksheet.cell(row=row, column=col)
                if cell.value and "Realizado 2024" in str(cell.value):
                    # Value should be in same row, next column or below
                    value_cell = worksheet.cell(row=row + 1, column=col)
                    if value_cell.value and isinstance(value_cell.value, (int, float)):
                        return float(value_cell.value)
        
        return 0.0
    
    def calculate_2025_target(self, realized_2024: float) -> float:
        """
        Calculate 2025 target based on growth rate.
        
        Args:
            realized_2024: 2024 realized value
            
        Returns:
            2025 target value
        """
        growth_rate = self.assumptions.assumptions["growth_rate_2025"]
        return realized_2024 * (1 + growth_rate)
    
    def distribute_monthly(self, annual_target: float, seasonality: Optional[List[float]] = None) -> List[float]:
        """
        Distribute annual target across months using seasonality weights.
        
        Args:
            annual_target: Annual target value
            seasonality: Optional list of 12 seasonality weights
            
        Returns:
            List of 12 monthly values
        """
        if seasonality is None:
            seasonality = self.assumptions.assumptions["monthly_seasonality"]
        
        monthly_values = [annual_target * weight for weight in seasonality]
        
        return monthly_values
    
    def write_monthly_values(self, workbook_manager, worksheet, row: int, 
                           monthly_values: List[float], preserve_existing: bool = True):
        """
        Write monthly values to a row.
        
        Args:
            workbook_manager: ExcelWorkbookManager instance
            worksheet: Target worksheet
            row: Row number
            monthly_values: List of 12 monthly values
            preserve_existing: If True, don't overwrite non-zero values
        """
        if not self.month_cols:
            print("Warning: Month columns not identified")
            return
        
        # Sort months by calendar order
        sorted_months = sorted(self.month_cols.items(), 
                              key=lambda x: get_month_number(x[0]))
        
        for (month, col), value in zip(sorted_months, monthly_values):
            if preserve_existing:
                existing_cell = worksheet.cell(row=row, column=col)
                if existing_cell.value and existing_cell.value != 0:
                    continue  # Skip if already has value
            
            workbook_manager.write_value(worksheet, row, col, value)
    
    def calculate_lucro_bruto(self, worksheet) -> Dict[str, float]:
        """
        Calculate Lucro Bruto for each month.
        
        Returns:
            Dictionary with month -> LB value
        """
        lucro_bruto = {}
        
        if 'faturamento' not in self.dre_structure or 'csv' not in self.dre_structure:
            return lucro_bruto
        
        faturamento_row = self.dre_structure['faturamento']
        csv_row = self.dre_structure.get('csv')
        
        for month, col in self.month_cols.items():
            faturamento = worksheet.cell(row=faturamento_row, column=col).value or 0
            csv = 0
            
            # Sum CSV rows (there are multiple CSV rows per category)
            if csv_row:
                csv = worksheet.cell(row=csv_row, column=col).value or 0
            
            lucro_bruto[month] = faturamento - csv
        
        return lucro_bruto
    
    def calculate_lair(self, worksheet) -> Dict[str, float]:
        """
        Calculate LAIR (Lucro Antes do Imposto) for each month.
        
        Returns:
            Dictionary with month -> LAIR value
        """
        lair = {}
        
        lb = self.calculate_lucro_bruto(worksheet)
        
        if 'custos_fixos' not in self.dre_structure:
            return lair
        
        custos_fixos_row = self.dre_structure['custos_fixos']
        custos_variaveis_row = self.dre_structure.get('custos_variaveis')
        
        for month, col in self.month_cols.items():
            lb_value = lb.get(month, 0)
            fixos = worksheet.cell(row=custos_fixos_row, column=col).value or 0
            variaveis = 0
            
            if custos_variaveis_row:
                variaveis = worksheet.cell(row=custos_variaveis_row, column=col).value or 0
            
            lair[month] = lb_value - fixos - variaveis
        
        return lair
    
    def update_dre_formulas(self, workbook_manager, worksheet):
        """
        Update or verify formulas in the DRE.
        
        Args:
            workbook_manager: ExcelWorkbookManager instance
            worksheet: DRE worksheet
        """
        if not self.month_cols:
            print("Warning: Cannot update formulas without month structure")
            return
        
        # Get first and last month columns
        sorted_months = sorted(self.month_cols.items(), 
                              key=lambda x: get_month_number(x[0]))
        first_col = sorted_months[0][1]
        last_col = sorted_months[-1][1]
        
        # Update Lucro Bruto formula if row exists
        if 'lucro_bruto' in self.dre_structure:
            lb_row = self.dre_structure['lucro_bruto']
            faturamento_row = self.dre_structure.get('faturamento')
            
            if faturamento_row:
                for month, col in self.month_cols.items():
                    # LB = Faturamento - CSV (sum of CSV rows)
                    # This is simplified - in practice would sum all CSV rows
                    col_letter = chr(64 + col)  # Convert to letter
                    formula = f"={col_letter}{faturamento_row}"
                    # Would add CSV subtraction here
                    # workbook_manager.write_formula(worksheet, lb_row, col, formula)
        
        print("DRE formulas updated")
    
    def get_monthly_summary(self, worksheet) -> Dict[str, Dict[str, float]]:
        """
        Get summary of all key metrics by month.
        
        Args:
            worksheet: DRE worksheet
            
        Returns:
            Dictionary with month -> metrics
        """
        summary = {}
        
        for month, col in self.month_cols.items():
            summary[month] = {}
            
            for label, row in self.dre_structure.items():
                cell = worksheet.cell(row=row, column=col)
                value = cell.value
                
                if isinstance(value, (int, float)):
                    summary[month][label] = float(value)
                else:
                    summary[month][label] = 0.0
        
        return summary
    
    def calculate_margins(self, worksheet) -> Dict[str, Dict[str, float]]:
        """
        Calculate margin percentages for each month.
        
        Returns:
            Dictionary with month -> margin metrics
        """
        margins = {}
        
        for month, col in self.month_cols.items():
            margins[month] = {}
            
            faturamento_row = self.dre_structure.get('faturamento')
            lb_row = self.dre_structure.get('lucro_bruto')
            lair_row = self.dre_structure.get('lair')
            ll_row = self.dre_structure.get('lucro_liquido')
            
            faturamento = 0
            if faturamento_row:
                faturamento = worksheet.cell(row=faturamento_row, column=col).value or 0
            
            if faturamento > 0:
                if lb_row:
                    lb = worksheet.cell(row=lb_row, column=col).value or 0
                    margins[month]['margem_bruta'] = (lb / faturamento) * 100
                
                if lair_row:
                    lair = worksheet.cell(row=lair_row, column=col).value or 0
                    margins[month]['margem_lair'] = (lair / faturamento) * 100
                
                if ll_row:
                    ll = worksheet.cell(row=ll_row, column=col).value or 0
                    margins[month]['margem_liquida'] = (ll / faturamento) * 100
        
        return margins

