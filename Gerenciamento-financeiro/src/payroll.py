"""
Payroll Module for Cargos e Salários Integration

Calculates payroll costs and integrates with DRE fixed/variable costs.
"""

from typing import Dict, List, Tuple, Optional


class PayrollManager:
    """
    Manages payroll calculations and integration with DRE.
    """
    
    def __init__(self):
        """Initialize payroll manager."""
        self.roles = {}
        self.total_payroll = 0.0
        self.fixed_portion = 0.0
        self.variable_portion = 0.0
    
    def read_payroll_data(self, worksheet) -> Dict[str, Dict[str, float]]:
        """
        Read payroll data from Cargos e Salários sheet.
        
        Args:
            worksheet: Cargos e Salários worksheet
            
        Returns:
            Dictionary with role data
        """
        # Find header row (should be row 3)
        header_row = 3
        
        # Column mapping
        col_mapping = {
            'role': 2,           # Função
            'salary': 3,         # Salário Fixo
            'charges': 4,        # Encargos
            'benefits': 5,       # Benefícios
            'cost_per_role': 6,  # Custo por Função
            'quantity': 7,       # Quantidade
            'total_cost': 8,     # Custo Total
        }
        
        # Read data starting from row 4
        start_row = 4
        end_row = 17  # Based on the structure we saw
        
        for row in range(start_row, end_row):
            role_cell = worksheet.cell(row=row, column=col_mapping['role'])
            role_name = role_cell.value
            
            if not role_name or role_name == "Total":
                continue
            
            role_data = {
                'salary': worksheet.cell(row=row, column=col_mapping['salary']).value or 0,
                'charges': worksheet.cell(row=row, column=col_mapping['charges']).value or 0,
                'benefits': worksheet.cell(row=row, column=col_mapping['benefits']).value or 0,
                'quantity': worksheet.cell(row=row, column=col_mapping['quantity']).value or 0,
                'cost_per_role': worksheet.cell(row=row, column=col_mapping['cost_per_role']).value or 0,
                'total_cost': worksheet.cell(row=row, column=col_mapping['total_cost']).value or 0,
            }
            
            # Calculate if not already calculated
            if role_data['cost_per_role'] == 0:
                role_data['cost_per_role'] = (
                    role_data['salary'] + 
                    role_data['charges'] + 
                    role_data['benefits']
                )
            
            if role_data['total_cost'] == 0:
                role_data['total_cost'] = role_data['cost_per_role'] * role_data['quantity']
            
            self.roles[role_name] = role_data
        
        # Calculate total
        self.total_payroll = sum(role['total_cost'] for role in self.roles.values())
        
        print(f"Read {len(self.roles)} roles, total payroll: {self.total_payroll:,.2f}")
        
        return self.roles
    
    def classify_fixed_variable(self, variable_roles: Optional[List[str]] = None) -> Tuple[float, float]:
        """
        Classify payroll into fixed and variable portions.
        
        Args:
            variable_roles: List of role names to classify as variable cost
            
        Returns:
            Tuple of (fixed_total, variable_total)
        """
        if variable_roles is None:
            # By default, certain roles are considered variable
            # (e.g., commission-based roles)
            variable_roles = [
                'Supervisor Comercial',
                'Assessora Comercial',
            ]
        
        fixed_total = 0.0
        variable_total = 0.0
        
        for role_name, data in self.roles.items():
            if any(var_role in role_name for var_role in variable_roles):
                variable_total += data['total_cost']
            else:
                fixed_total += data['total_cost']
        
        self.fixed_portion = fixed_total
        self.variable_portion = variable_total
        
        print(f"Fixed payroll: {fixed_total:,.2f}")
        print(f"Variable payroll: {variable_total:,.2f}")
        
        return (fixed_total, variable_total)
    
    def update_payroll_sheet(self, workbook_manager, worksheet):
        """
        Update the payroll sheet with calculated values.
        
        Args:
            workbook_manager: ExcelWorkbookManager instance
            worksheet: Cargos e Salários worksheet
        """
        col_mapping = {
            'cost_per_role': 6,
            'total_cost': 8,
        }
        
        start_row = 4
        row = start_row
        
        for role_name, data in self.roles.items():
            # Update cost per role if needed
            cost_formula = f"=SUM(C{row}:E{row})"
            workbook_manager.write_formula(worksheet, row, col_mapping['cost_per_role'], cost_formula)
            
            # Update total cost
            total_formula = f"=F{row}*G{row}"
            workbook_manager.write_formula(worksheet, row, col_mapping['total_cost'], total_formula)
            
            row += 1
        
        # Update total row (row 17)
        total_row = 17
        workbook_manager.write_formula(worksheet, total_row, 3, f"=SUM(C4:C16)")
        workbook_manager.write_formula(worksheet, total_row, 4, f"=SUM(D4:D16)")
        workbook_manager.write_formula(worksheet, total_row, 5, f"=SUM(E4:E16)")
        workbook_manager.write_formula(worksheet, total_row, 6, f"=SUM(F4:F16)")
        workbook_manager.write_formula(worksheet, total_row, 7, f"=SUM(G4:G16)")
        workbook_manager.write_formula(worksheet, total_row, 8, f"=SUM(H4:H16)")
        
        print("Payroll sheet updated with formulas")
    
    def link_to_dre(self, workbook_manager, dre_worksheet, payroll_row: int, month_cols: Dict[str, int]):
        """
        Link payroll total to DRE sheet.
        
        Args:
            workbook_manager: ExcelWorkbookManager instance
            dre_worksheet: DRE worksheet
            payroll_row: Row in DRE for payroll costs
            month_cols: Dictionary of month names to columns
        """
        # The link is already in place: ='Cargos e Salários '!$H$17
        # We just verify it's correct
        
        for month, col in month_cols.items():
            cell = dre_worksheet.cell(row=payroll_row, column=col)
            current_formula = cell.value
            
            # Expected formula
            expected_formula = "='Cargos e Salários '!$H$17"
            
            if not current_formula or expected_formula not in str(current_formula):
                workbook_manager.write_formula(dre_worksheet, payroll_row, col, expected_formula)
        
        print(f"Payroll linked to DRE at row {payroll_row}")
    
    def get_payroll_summary(self) -> Dict[str, float]:
        """
        Get summary of payroll costs.
        
        Returns:
            Dictionary with summary metrics
        """
        return {
            'total': self.total_payroll,
            'fixed': self.fixed_portion,
            'variable': self.variable_portion,
            'headcount': sum(role['quantity'] for role in self.roles.values()),
            'average_cost_per_employee': (
                self.total_payroll / sum(role['quantity'] for role in self.roles.values())
                if sum(role['quantity'] for role in self.roles.values()) > 0 else 0
            ),
        }
    
    def get_role_details(self, role_name: str) -> Optional[Dict[str, float]]:
        """
        Get details for a specific role.
        
        Args:
            role_name: Name of the role
            
        Returns:
            Dictionary with role data, or None if not found
        """
        return self.roles.get(role_name)
    
    def add_or_update_role(self, role_name: str, salary: float, charges: float, 
                          benefits: float, quantity: int):
        """
        Add or update a role in the payroll.
        
        Args:
            role_name: Name of the role
            salary: Base salary
            charges: Employee charges (taxes, etc.)
            benefits: Benefits cost
            quantity: Number of employees in this role
        """
        cost_per_role = salary + charges + benefits
        total_cost = cost_per_role * quantity
        
        self.roles[role_name] = {
            'salary': salary,
            'charges': charges,
            'benefits': benefits,
            'quantity': quantity,
            'cost_per_role': cost_per_role,
            'total_cost': total_cost,
        }
        
        # Recalculate total
        self.total_payroll = sum(role['total_cost'] for role in self.roles.values())
    
    def get_cost_by_department(self, department_mapping: Dict[str, str]) -> Dict[str, float]:
        """
        Calculate total cost by department.
        
        Args:
            department_mapping: Dictionary mapping role names to departments
            
        Returns:
            Dictionary with department -> total cost
        """
        dept_costs = {}
        
        for role_name, data in self.roles.items():
            dept = department_mapping.get(role_name, 'Outros')
            if dept not in dept_costs:
                dept_costs[dept] = 0.0
            dept_costs[dept] += data['total_cost']
        
        return dept_costs

