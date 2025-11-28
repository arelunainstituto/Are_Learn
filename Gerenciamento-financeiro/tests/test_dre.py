"""
Tests for DRE module
"""

import sys
import os
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..'))

from src.dre import DREManager
from src.assumptions import AssumptionsManager


def test_calculate_2025_target():
    """Test 2025 target calculation."""
    assumptions = AssumptionsManager()
    dre = DREManager(assumptions)
    
    realized_2024 = 1100000
    target_2025 = dre.calculate_2025_target(realized_2024)
    
    # Should be 15% higher
    expected = 1100000 * 1.15
    assert abs(target_2025 - expected) < 0.01


def test_distribute_monthly_uniform():
    """Test uniform monthly distribution."""
    assumptions = AssumptionsManager()
    dre = DREManager(assumptions)
    
    annual_target = 1200000
    monthly_values = dre.distribute_monthly(annual_target)
    
    assert len(monthly_values) == 12
    assert abs(sum(monthly_values) - annual_target) < 1.0  # Allow small rounding
    
    # With uniform seasonality, each month should be ~1/12
    expected_monthly = annual_target / 12
    for value in monthly_values:
        assert abs(value - expected_monthly) < 1.0


def test_distribute_monthly_custom():
    """Test monthly distribution with custom seasonality."""
    assumptions = AssumptionsManager()
    
    # Higher in summer months
    seasonality = [0.06, 0.06, 0.07, 0.08, 0.09, 0.10,
                  0.12, 0.12, 0.10, 0.08, 0.07, 0.05]
    assumptions.set_seasonality(seasonality)
    
    dre = DREManager(assumptions)
    
    annual_target = 1200000
    monthly_values = dre.distribute_monthly(annual_target)
    
    assert len(monthly_values) == 12
    assert abs(sum(monthly_values) - annual_target) < 1.0
    
    # July (index 6) should be highest
    assert monthly_values[6] == max(monthly_values)


if __name__ == "__main__":
    test_calculate_2025_target()
    test_distribute_monthly_uniform()
    test_distribute_monthly_custom()
    print("✓ All DRE tests passed!")

