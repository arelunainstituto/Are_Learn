import { ChartData } from 'chart.js';

// Color palette for consistent theming
export const chartColors = {
  primary: '#3B82F6',
  secondary: '#10B981',
  warning: '#F59E0B',
  danger: '#EF4444',
  info: '#06B6D4',
  purple: '#8B5CF6',
  pink: '#EC4899',
  indigo: '#6366F1'
};

// Monthly inventory movements data
export const monthlyMovementsData: ChartData<'bar'> = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Entradas',
      data: [450, 520, 380, 610, 490, 580],
      backgroundColor: chartColors.secondary,
      borderColor: chartColors.secondary,
      borderWidth: 1
    },
    {
      label: 'Saídas',
      data: [320, 410, 290, 480, 350, 420],
      backgroundColor: chartColors.danger,
      borderColor: chartColors.danger,
      borderWidth: 1
    }
  ]
};

// Inventory by category (pie chart)
export const inventoryByCategoryData: ChartData<'pie'> = {
  labels: ['Eletrônicos', 'Roupas', 'Casa & Jardim', 'Esportes', 'Livros', 'Outros'],
  datasets: [
    {
      data: [35, 25, 15, 12, 8, 5],
      backgroundColor: [
        chartColors.primary,
        chartColors.secondary,
        chartColors.warning,
        chartColors.danger,
        chartColors.info,
        chartColors.purple
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }
  ]
};

// Stock levels trend (line chart)
export const stockTrendData: ChartData<'line'> = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  datasets: [
    {
      label: 'Stock Total',
      data: [2400, 2350, 2500, 2650, 2800, 2750, 2900, 2850, 2950, 3100, 3050, 2847],
      borderColor: chartColors.primary,
      backgroundColor: `${chartColors.primary}20`,
      fill: true,
      tension: 0.4
    },
    {
      label: 'Stock Mínimo',
      data: [2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000, 2000],
      borderColor: chartColors.danger,
      backgroundColor: 'transparent',
      borderDash: [5, 5],
      fill: false,
      tension: 0
    }
  ]
};

// Top products by value
export const topProductsData: ChartData<'bar'> = {
  labels: ['iPhone 15', 'MacBook Pro', 'Samsung TV', 'Nike Air Max', 'Sony Headphones'],
  datasets: [
    {
      label: 'Valor (€)',
      data: [25000, 18000, 12000, 8500, 6200],
      backgroundColor: [
        chartColors.primary,
        chartColors.secondary,
        chartColors.warning,
        chartColors.info,
        chartColors.purple
      ],
      borderColor: [
        chartColors.primary,
        chartColors.secondary,
        chartColors.warning,
        chartColors.info,
        chartColors.purple
      ],
      borderWidth: 1
    }
  ]
};

// Warehouse distribution
export const warehouseDistributionData: ChartData<'pie'> = {
  labels: ['Armazém Principal', 'Armazém Norte', 'Armazém Sul', 'Loja Centro', 'Loja Shopping'],
  datasets: [
    {
      data: [45, 20, 15, 12, 8],
      backgroundColor: [
        chartColors.primary,
        chartColors.secondary,
        chartColors.warning,
        chartColors.info,
        chartColors.purple
      ],
      borderColor: '#ffffff',
      borderWidth: 2
    }
  ]
};

// Monthly sales trend
export const salesTrendData: ChartData<'line'> = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'Vendas (€)',
      data: [45000, 52000, 48000, 61000, 55000, 67000],
      borderColor: chartColors.secondary,
      backgroundColor: `${chartColors.secondary}20`,
      fill: true,
      tension: 0.4
    },
    {
      label: 'Meta (€)',
      data: [50000, 50000, 50000, 50000, 50000, 50000],
      borderColor: chartColors.warning,
      backgroundColor: 'transparent',
      borderDash: [5, 5],
      fill: false,
      tension: 0
    }
  ]
};

// Export all mock data
export const mockChartData = {
  monthlyMovements: monthlyMovementsData,
  inventoryByCategory: inventoryByCategoryData,
  stockTrend: stockTrendData,
  topProducts: topProductsData,
  warehouseDistribution: warehouseDistributionData,
  salesTrend: salesTrendData
};