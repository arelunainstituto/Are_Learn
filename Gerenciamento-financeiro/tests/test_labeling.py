"""
Tests for labeling module
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from src.labeling import LabelDetector, get_month_number, get_month_name_pt


def test_normalize_text():
    """Test text normalization."""
    detector = LabelDetector()
    
    assert detector.normalize_text("Faturamento") == "faturamento"
    assert detector.normalize_text("FATURAMENTO") == "faturamento"
    assert detector.normalize_text("  Faturamento  ") == "faturamento"
    assert detector.normalize_text("Receção") == "rececao"  # Remove accent
    assert detector.normalize_text("Março") == "marco"


def test_fuzzy_match():
    """Test fuzzy string matching."""
    detector = LabelDetector()
    
    # Exact match after normalization
    assert detector.fuzzy_match("Faturamento", "faturamento")
    assert detector.fuzzy_match("LAIR", "lair")
    
    # Contains match
    assert detector.fuzzy_match("Lucro Líquido Total", "Lucro Líquido")
    assert detector.fuzzy_match("Custos Fixos Mensais", "Custos Fixos")
    
    # Should not match
    assert not detector.fuzzy_match("Receita", "Despesa")


def test_month_detection():
    """Test month name conversion."""
    assert get_month_number("Janeiro") == 1
    assert get_month_number("janeiro") == 1
    assert get_month_number("JANEIRO") == 1
    assert get_month_number("Dezembro") == 12
    assert get_month_number("InvalidMonth") == 0
    
    assert get_month_name_pt(1) == "Janeiro"
    assert get_month_name_pt(12) == "Dezembro"
    assert get_month_name_pt(13) == ""


def test_label_variants():
    """Test that label variants are defined."""
    detector = LabelDetector()
    
    assert 'faturamento' in detector.LABEL_VARIANTS
    assert 'csv' in detector.LABEL_VARIANTS
    assert 'lucro_liquido' in detector.LABEL_VARIANTS
    
    # Check CSV has multiple variants
    csv_variants = detector.LABEL_VARIANTS['csv']
    assert len(csv_variants) > 0
    assert any('csv' in v.lower() for v in csv_variants)


if __name__ == "__main__":
    test_normalize_text()
    test_fuzzy_match()
    test_month_detection()
    test_label_variants()
    print("✓ All labeling tests passed!")

