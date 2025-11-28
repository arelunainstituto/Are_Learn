"""
Tests for cash flow module
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from src.cashflow import CashFlowManager
from src.assumptions import AssumptionsManager


def test_apply_ar_terms():
    """Test application of AR terms to revenue."""
    assumptions = AssumptionsManager()
    cf = CashFlowManager(assumptions)
    
    # Uniform monthly revenue
    monthly_revenue = [10000] * 12
    
    cash_inflows = cf.apply_ar_terms(monthly_revenue)
    
    assert len(cash_inflows) == 12
    
    # With default AR terms [0, 30, 60] and weights [0.7, 0.2, 0.1]
    # Month 0: 10000 * 0.7 = 7000
    # Month 1: 10000 * 0.7 + 10000 * 0.2 = 9000
    # Month 2+: 10000 * 0.7 + 10000 * 0.2 + 10000 * 0.1 = 10000
    
    assert abs(cash_inflows[0] - 7000) < 1
    assert abs(cash_inflows[1] - 9000) < 1
    assert abs(cash_inflows[2] - 10000) < 1


def test_apply_ap_terms():
    """Test application of AP terms to expenses."""
    assumptions = AssumptionsManager()
    cf = CashFlowManager(assumptions)
    
    # Uniform monthly expenses
    monthly_expenses = [5000] * 12
    
    cash_outflows = cf.apply_ap_terms(monthly_expenses)
    
    assert len(cash_outflows) == 12
    
    # With default AP terms [0, 30] and weights [0.8, 0.2]
    # Month 0: 5000 * 0.8 = 4000
    # Month 1+: 5000 * 0.8 + 5000 * 0.2 = 5000
    
    assert abs(cash_outflows[0] - 4000) < 1
    assert abs(cash_outflows[1] - 5000) < 1


def test_calculate_monthly_cashflow():
    """Test complete cash flow calculation."""
    assumptions = AssumptionsManager()
    cf = CashFlowManager(assumptions)
    
    # Simple DRE data
    dre_data = {
        'faturamento': [10000] * 12,
        'csv': [3000] * 12,
        'custos_fixos': [2000] * 12,
        'custos_variaveis': [1000] * 12,
        'impostos': [500] * 12,
    }
    
    cashflow_data = cf.calculate_monthly_cashflow(dre_data)
    
    assert 'cash_inflows' in cashflow_data
    assert 'total_outflows' in cashflow_data
    assert 'monthly_balance' in cashflow_data
    assert 'accumulated_balance' in cashflow_data
    
    assert len(cashflow_data['monthly_balance']) == 12
    assert len(cashflow_data['accumulated_balance']) == 12
    
    # First month accumulated should be initial + first month balance
    expected_first_accum = cf.initial_balance + cashflow_data['monthly_balance'][0]
    assert abs(cashflow_data['accumulated_balance'][0] - expected_first_accum) < 1


def test_cashflow_summary():
    """Test cash flow summary calculation."""
    assumptions = AssumptionsManager()
    cf = CashFlowManager(assumptions)
    
    dre_data = {
        'faturamento': [10000] * 12,
        'csv': [3000] * 12,
        'custos_fixos': [2000] * 12,
        'custos_variaveis': [1000] * 12,
        'impostos': [500] * 12,
    }
    
    cashflow_data = cf.calculate_monthly_cashflow(dre_data)
    summary = cf.get_cashflow_summary(cashflow_data)
    
    assert 'total_inflows' in summary
    assert 'total_outflows' in summary
    assert 'net_cashflow' in summary
    assert 'ending_balance' in summary
    assert 'min_balance' in summary
    assert 'max_balance' in summary
    
    # Net cashflow should equal inflows - outflows
    expected_net = summary['total_inflows'] - summary['total_outflows']
    assert abs(summary['net_cashflow'] - expected_net) < 1


if __name__ == "__main__":
    test_apply_ar_terms()
    test_apply_ap_terms()
    test_calculate_monthly_cashflow()
    test_cashflow_summary()
    print("✓ All cash flow tests passed!")

