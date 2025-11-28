"""
Products Module for Product-Level DRE Analysis

Aggregates product-level P&L data into category-level summaries for the main DRE.
"""

from typing import Dict, List, Tuple, Optional
from .labeling import LabelDetector


class ProductDREAnalyzer:
    """
    Analyzes product-level DRE and aggregates by category.
    """
    
    def __init__(self, assumptions_manager):
        """
        Initialize analyzer with assumptions.
        
        Args:
            assumptions_manager: AssumptionsManager instance
        """
        self.assumptions = assumptions_manager
        self.label_detector = LabelDetector()
        self.products = []
        self.product_data = {}
    
    def read_product_dre(self, worksheet) -> Dict[str, Dict[str, float]]:
        """
        Read product-level DRE from worksheet.
        
        Args:
            worksheet: DRE por Produto worksheet
            
        Returns:
            Dictionary with product data
        """
        # Find product names in row 3
        product_row = 3
        products_by_col = {}
        
        for col in range(4, worksheet.max_column + 1):
            cell = worksheet.cell(row=product_row, column=col)
            if cell.value:
                product_name = str(cell.value).strip()
                if product_name and product_name not in ['DRE', 'Total', '']:
                    products_by_col[col] = product_name
                    self.products.append(product_name)
        
        print(f"Found {len(products_by_col)} products: {list(products_by_col.values())}")
        
        # Find key rows
        row_mapping = {
            'receita_bruta': None,
            'impostos': None,
            'descontos': None,
            'receita_liquida': None,
            'csv': None,
            'lucro_bruto': None,
            'despesas_variaveis': None,
            'margem_contribuicao': None,
            'rateio_fixos': None,
            'lucro_operacional': None,
        }
        
        # Search for row labels
        label_map = {
            'Receita Bruta': 'receita_bruta',
            'Impostos': 'impostos',
            'Devoluções e descontos': 'descontos',
            'Receita Líquida': 'receita_liquida',
            'Custo dos Serviços Vendidos': 'csv',
            'Lucro Bruto': 'lucro_bruto',
            'Despesas Variáveis': 'despesas_variaveis',
            'Margem de Contribuição': 'margem_contribuicao',
            'Rateio das Despesas Fixas': 'rateio_fixos',
            'Lucro Operacional': 'lucro_operacional',
        }
        
        for row in range(1, min(30, worksheet.max_row + 1)):
            cell = worksheet.cell(row=row, column=2)
            if cell.value:
                cell_text = str(cell.value).strip()
                for label, key in label_map.items():
                    if self.label_detector.fuzzy_match(cell_text, label):
                        row_mapping[key] = row
                        break
        
        print(f"Row mapping: {row_mapping}")
        
        # Extract data for each product
        for col, product_name in products_by_col.items():
            self.product_data[product_name] = {}
            
            for key, row in row_mapping.items():
                if row is not None:
                    cell = worksheet.cell(row=row, column=col)
                    value = cell.value
                    if value is not None and isinstance(value, (int, float)):
                        self.product_data[product_name][key] = float(value)
                    else:
                        self.product_data[product_name][key] = 0.0
        
        return self.product_data
    
    def aggregate_by_category(self) -> Dict[str, Dict[str, float]]:
        """
        Aggregate product data by category.
        
        Returns:
            Dictionary with category-level aggregates
        """
        category_data = {}
        
        for product, data in self.product_data.items():
            category = self.assumptions.get_category_for_product(product)
            
            if category not in category_data:
                category_data[category] = {
                    'receita_bruta': 0.0,
                    'impostos': 0.0,
                    'descontos': 0.0,
                    'receita_liquida': 0.0,
                    'csv': 0.0,
                    'lucro_bruto': 0.0,
                    'despesas_variaveis': 0.0,
                    'margem_contribuicao': 0.0,
                }
            
            # Sum up values
            for key in category_data[category].keys():
                if key in data:
                    category_data[category][key] += data[key]
        
        return category_data
    
    def calculate_product_metrics(self, product_name: str) -> Dict[str, float]:
        """
        Calculate key metrics for a product.
        
        Args:
            product_name: Name of the product
            
        Returns:
            Dictionary with calculated metrics
        """
        if product_name not in self.product_data:
            return {}
        
        data = self.product_data[product_name]
        
        metrics = {
            'margem_bruta_pct': 0.0,
            'margem_contribuicao_pct': 0.0,
            'margem_operacional_pct': 0.0,
        }
        
        receita_liquida = data.get('receita_liquida', 0.0)
        
        if receita_liquida > 0:
            metrics['margem_bruta_pct'] = (data.get('lucro_bruto', 0.0) / receita_liquida) * 100
            metrics['margem_contribuicao_pct'] = (data.get('margem_contribuicao', 0.0) / receita_liquida) * 100
            metrics['margem_operacional_pct'] = (data.get('lucro_operacional', 0.0) / receita_liquida) * 100
        
        return metrics
    
    def write_aggregated_to_dre(self, workbook_manager, dre_worksheet, month_row: int, month_cols: Dict[str, int]):
        """
        Write aggregated category data to main DRE sheet.
        
        Args:
            workbook_manager: ExcelWorkbookManager instance
            dre_worksheet: Main DRE worksheet
            month_row: Row number where months are
            month_cols: Dictionary of month names to columns
        """
        # For now, we'll write annual totals
        # In a full implementation, this would distribute monthly
        
        category_aggregates = self.aggregate_by_category()
        
        # Find category rows in DRE
        category_rows = {
            "Odonto e Estética": None,
            "Cursos": None,
            "Implante Capilar": None,
        }
        
        csv_rows = {
            "Odonto e Estética": None,
            "Cursos": None,
            "Implante Capilar": None,
        }
        
        # Search for category rows
        for row in range(1, min(50, dre_worksheet.max_row + 1)):
            cell = dre_worksheet.cell(row=row, column=2)
            if cell.value:
                cell_text = str(cell.value).strip()
                
                if "Odonto e Est" in cell_text:
                    category_rows["Odonto e Estética"] = row
                elif "Cursos" == cell_text:
                    category_rows["Cursos"] = row
                elif "Implante Capilar" in cell_text:
                    category_rows["Implante Capilar"] = row
                
                # CSV rows
                if "CSV" in cell_text and "Odo" in cell_text:
                    csv_rows["Odonto e Estética"] = row
                elif "CSV" in cell_text and "Cur" in cell_text:
                    csv_rows["Cursos"] = row
                elif "CSV" in cell_text and "Imp" in cell_text:
                    csv_rows["Implante Capilar"] = row
        
        print(f"Category rows: {category_rows}")
        print(f"CSV rows: {csv_rows}")
        
        # Write data (this is simplified - in full implementation, would distribute monthly)
        # For now, just log what would be written
        for category, data in category_aggregates.items():
            print(f"\nCategory: {category}")
            print(f"  Receita Líquida: {data['receita_liquida']:,.2f}")
            print(f"  CSV: {data['csv']:,.2f}")
            print(f"  Lucro Bruto: {data['lucro_bruto']:,.2f}")
    
    def get_product_list(self) -> List[str]:
        """Get list of all products."""
        return self.products.copy()
    
    def get_category_summary(self) -> Dict[str, Dict[str, float]]:
        """Get summary by category with totals."""
        return self.aggregate_by_category()

