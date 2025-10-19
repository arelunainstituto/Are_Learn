"""
Label Detection Module for Portuguese (PT-BR/PT-PT) Excel Automation

This module provides resilient label detection for financial workbooks,
handling accents, case differences, and common variants.
"""

import re
from typing import Optional, Tuple, List, Dict, Any
from unidecode import unidecode


class LabelDetector:
    """
    Detects and locates labels in Excel worksheets with fuzzy matching.
    Handles Portuguese month names, financial terms, and accent variations.
    """
    
    # Portuguese month names
    MONTHS_PT = [
        'janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho',
        'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'
    ]
    
    # Common label variants for key financial terms
    LABEL_VARIANTS = {
        'faturamento': ['faturamento', 'receita total', 'receitas'],
        'receita_bruta': ['receita bruta'],
        'receita_liquida': ['receita liquida', 'receita líquida'],
        'csv': ['csv', 'custo do servico vendido', 'custo dos servicos vendidos'],
        'lucro_bruto': ['lucro bruto', 'lb'],
        'custos_fixos': ['custos fixos'],
        'custos_variaveis': ['custos variaveis', 'custos variáveis'],
        'despesas_operacionais': ['despesas operacionais', 'despesas operacionais - administrativas'],
        'lair': ['lair', 'lucro antes do imposto'],
        'lucro_liquido': ['lucro liquido', 'lucro líquido'],
        'impostos': ['impostos', 'imposto'],
        'fluxo_caixa': ['projecao de fluxo de caixa', 'fluxo de caixa'],
        'entradas': ['entradas'],
        'saidas': ['saidas', 'saídas', 'saidas totais', 'saídas totais'],
        'saldo_mensal': ['saldo mensal'],
        'saldo_acumulado': ['saldo acumulado'],
        'saldo_inicial': ['saldo inicial'],
        'folha_pagamento': ['folha de pagamento', 'folha de pagamento com encargos'],
        'aluguel': ['aluguel'],
        'margem_contribuicao': ['margem de contribuicao', 'margem de contribuição'],
        'despesas_variaveis': ['despesas variaveis', 'despesas variáveis'],
    }
    
    def __init__(self):
        pass
    
    def normalize_text(self, text: str) -> str:
        """
        Normalize text by removing accents, converting to lowercase,
        and stripping extra whitespace.
        
        Args:
            text: Input text to normalize
            
        Returns:
            Normalized text
        """
        if not text:
            return ""
        
        # Convert to string if not already
        text = str(text)
        
        # Remove accents
        text_no_accent = unidecode(text)
        
        # Convert to lowercase
        text_lower = text_no_accent.lower()
        
        # Strip and normalize whitespace
        text_clean = re.sub(r'\s+', ' ', text_lower).strip()
        
        return text_clean
    
    def fuzzy_match(self, text1: str, text2: str, threshold: float = 0.8) -> bool:
        """
        Perform fuzzy string matching using simple similarity metric.
        
        Args:
            text1: First text
            text2: Second text
            threshold: Similarity threshold (0-1)
            
        Returns:
            True if texts are similar enough
        """
        norm1 = self.normalize_text(text1)
        norm2 = self.normalize_text(text2)
        
        if not norm1 or not norm2:
            return False
        
        # Exact match after normalization
        if norm1 == norm2:
            return True
        
        # Check if one contains the other
        if norm1 in norm2 or norm2 in norm1:
            return True
        
        # Simple Levenshtein-like ratio using set intersection
        words1 = set(norm1.split())
        words2 = set(norm2.split())
        
        if not words1 or not words2:
            return False
        
        intersection = words1 & words2
        union = words1 | words2
        
        similarity = len(intersection) / len(union) if union else 0
        
        return similarity >= threshold
    
    def find_label(
        self,
        worksheet,
        label_key: str,
        search_area: Optional[Tuple[int, int, int, int]] = None
    ) -> Optional[Tuple[int, int]]:
        """
        Find a label in the worksheet by searching for known variants.
        
        Args:
            worksheet: openpyxl worksheet object
            label_key: Key for the label to find (e.g., 'faturamento', 'csv')
            search_area: Optional (min_row, max_row, min_col, max_col) to limit search
            
        Returns:
            Tuple of (row, column) if found, None otherwise
        """
        variants = self.LABEL_VARIANTS.get(label_key, [label_key])
        
        # Default search area
        if search_area is None:
            min_row, max_row = 1, worksheet.max_row
            min_col, max_col = 1, worksheet.max_column
        else:
            min_row, max_row, min_col, max_col = search_area
        
        # Search through the area
        for row in range(min_row, min(max_row + 1, worksheet.max_row + 1)):
            for col in range(min_col, min(max_col + 1, worksheet.max_column + 1)):
                cell = worksheet.cell(row=row, column=col)
                cell_value = cell.value
                
                if cell_value is None:
                    continue
                
                cell_text = str(cell_value).strip()
                
                # Check against all variants
                for variant in variants:
                    if self.fuzzy_match(cell_text, variant):
                        return (row, col)
        
        return None
    
    def find_month_row(
        self,
        worksheet,
        start_row: int = 1,
        max_search_rows: int = 50
    ) -> Optional[Tuple[int, Dict[str, int]]]:
        """
        Find the row containing month names and return a mapping of month -> column.
        
        Args:
            worksheet: openpyxl worksheet object
            start_row: Row to start searching from
            max_search_rows: Maximum number of rows to search
            
        Returns:
            Tuple of (row_number, dict{month_name: column}) if found, None otherwise
        """
        for row in range(start_row, min(start_row + max_search_rows, worksheet.max_row + 1)):
            month_cols = {}
            
            for col in range(1, worksheet.max_column + 1):
                cell = worksheet.cell(row=row, column=col)
                cell_value = cell.value
                
                if cell_value is None:
                    continue
                
                cell_text = self.normalize_text(str(cell_value))
                
                # Check if this cell contains a month name
                for month in self.MONTHS_PT:
                    if month in cell_text or cell_text in month:
                        month_cols[month] = col
            
            # If we found at least 10 months, this is likely the month row
            if len(month_cols) >= 10:
                return (row, month_cols)
        
        return None
    
    def find_data_range(
        self,
        worksheet,
        label: str,
        month_row: int,
        month_cols: Dict[str, int]
    ) -> Optional[Tuple[int, int, int]]:
        """
        Find the row containing a label and return the data range across months.
        
        Args:
            worksheet: openpyxl worksheet object
            label: Label to search for
            month_row: Row number where months are located
            month_cols: Dictionary mapping month names to columns
            
        Returns:
            Tuple of (label_row, first_col, last_col) if found, None otherwise
        """
        # Search for label in rows near the month row
        search_start = month_row + 1
        search_end = min(month_row + 100, worksheet.max_row)
        
        label_pos = self.find_label(
            worksheet,
            label,
            search_area=(search_start, search_end, 1, 5)  # Usually labels are in first few columns
        )
        
        if label_pos is None:
            return None
        
        label_row, label_col = label_pos
        
        # Find first and last month columns
        sorted_months = sorted(month_cols.items(), key=lambda x: self.MONTHS_PT.index(x[0]))
        first_col = sorted_months[0][1]
        last_col = sorted_months[-1][1]
        
        return (label_row, first_col, last_col)
    
    def extract_month_data(
        self,
        worksheet,
        label: str,
        month_row: int,
        month_cols: Dict[str, int]
    ) -> Optional[Dict[str, Any]]:
        """
        Extract monthly data for a given label.
        
        Args:
            worksheet: openpyxl worksheet object
            label: Label to search for
            month_row: Row number where months are located
            month_cols: Dictionary mapping month names to columns
            
        Returns:
            Dictionary with month names as keys and cell values as values, None if not found
        """
        data_range = self.find_data_range(worksheet, label, month_row, month_cols)
        
        if data_range is None:
            return None
        
        label_row, first_col, last_col = data_range
        
        # Extract data for each month
        month_data = {}
        for month, col in month_cols.items():
            cell = worksheet.cell(row=label_row, column=col)
            month_data[month] = cell.value
        
        return month_data


def get_month_number(month_name_pt: str) -> int:
    """
    Convert Portuguese month name to month number (1-12).
    
    Args:
        month_name_pt: Portuguese month name
        
    Returns:
        Month number (1-12), or 0 if not found
    """
    detector = LabelDetector()
    normalized = detector.normalize_text(month_name_pt)
    
    for i, month in enumerate(LabelDetector.MONTHS_PT, 1):
        if detector.fuzzy_match(normalized, month):
            return i
    
    return 0


def get_month_name_pt(month_number: int) -> str:
    """
    Convert month number to Portuguese month name.
    
    Args:
        month_number: Month number (1-12)
        
    Returns:
        Portuguese month name, or empty string if invalid
    """
    if 1 <= month_number <= 12:
        return LabelDetector.MONTHS_PT[month_number - 1].capitalize()
    return ""

