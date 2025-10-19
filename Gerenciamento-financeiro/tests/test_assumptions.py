"""
Tests for assumptions module
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from src.assumptions import AssumptionsManager


def test_default_assumptions():
    """Test default assumptions are set correctly."""
    mgr = AssumptionsManager()
    
    assert mgr.assumptions['growth_rate_2025'] == 0.15
    assert len(mgr.assumptions['monthly_seasonality']) == 12
    assert sum(mgr.assumptions['monthly_seasonality']) == 1.0
    
    # Check AR terms
    ar_terms = mgr.assumptions['ar_terms']
    assert len(ar_terms['days']) == len(ar_terms['weights'])
    assert abs(sum(ar_terms['weights']) - 1.0) < 0.01
    
    # Check AP terms
    ap_terms = mgr.assumptions['ap_terms']
    assert len(ap_terms['days']) == len(ap_terms['weights'])
    assert abs(sum(ap_terms['weights']) - 1.0) < 0.01


def test_set_growth_rate():
    """Test setting growth rate."""
    mgr = AssumptionsManager()
    
    mgr.set_growth_rate(0.20)
    assert mgr.assumptions['growth_rate_2025'] == 0.20


def test_set_seasonality():
    """Test setting seasonality weights."""
    mgr = AssumptionsManager()
    
    # Custom weights
    weights = [0.08, 0.08, 0.09, 0.09, 0.10, 0.10,
               0.10, 0.09, 0.09, 0.08, 0.08, 0.02]
    
    mgr.set_seasonality(weights)
    assert len(mgr.assumptions['monthly_seasonality']) == 12
    assert abs(sum(mgr.assumptions['monthly_seasonality']) - 1.0) < 0.01


def test_product_mapping():
    """Test product to category mapping."""
    mgr = AssumptionsManager()
    
    # Check default mappings
    assert mgr.get_category_for_product("Implantologia") == "Odonto e Estética"
    assert mgr.get_category_for_product("Harmonização Facial") == "Odonto e Estética"
    assert mgr.get_category_for_product("Curso de Capacitação") == "Cursos"
    assert mgr.get_category_for_product("Implante Capilar") == "Implante Capilar"
    
    # Add new mapping
    mgr.add_product_mapping("Novo Produto", "Nova Categoria")
    assert mgr.get_category_for_product("Novo Produto") == "Nova Categoria"


def test_ar_ap_terms():
    """Test AR/AP terms configuration."""
    mgr = AssumptionsManager()
    
    # Set custom AR terms
    mgr.set_ar_terms([0, 30, 60, 90], [0.4, 0.3, 0.2, 0.1])
    ar_terms = mgr.assumptions['ar_terms']
    assert ar_terms['days'] == [0, 30, 60, 90]
    assert abs(sum(ar_terms['weights']) - 1.0) < 0.01
    
    # Set custom AP terms
    mgr.set_ap_terms([0, 30, 60], [0.6, 0.3, 0.1])
    ap_terms = mgr.assumptions['ap_terms']
    assert ap_terms['days'] == [0, 30, 60]
    assert abs(sum(ap_terms['weights']) - 1.0) < 0.01


if __name__ == "__main__":
    test_default_assumptions()
    test_set_growth_rate()
    test_set_seasonality()
    test_product_mapping()
    test_ar_ap_terms()
    print("✓ All assumptions tests passed!")

