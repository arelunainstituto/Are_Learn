'use client';

import { KPICard, KPICardProps } from './kpi-card';
import { 
  Package, 
  AlertTriangle, 
  TrendingUp, 
  DollarSign,
  ShoppingCart,
  BarChart3
} from 'lucide-react';

// Mock data for demonstration
const mockKPIData: KPICardProps[] = [
  {
    title: 'Total in Stock',
    value: 2847,
    subtitle: 'Items across all warehouses',
    icon: Package,
    trend: {
      value: 12.5,
      label: 'vs last month',
      isPositive: true
    },
    variant: 'success'
  },
  {
    title: 'Items at Risk',
    value: 23,
    subtitle: 'Low stock or expired items',
    icon: AlertTriangle,
    trend: {
      value: -8.2,
      label: 'vs last month',
      isPositive: true
    },
    variant: 'warning'
  },
  {
    title: 'Total Value',
    value: '€127,450',
    subtitle: 'Current inventory value',
    icon: DollarSign,
    trend: {
      value: 5.8,
      label: 'vs last month',
      isPositive: true
    },
    variant: 'default'
  },
  {
    title: 'Monthly Movements',
    value: 1234,
    subtitle: 'In/Out transactions',
    icon: TrendingUp,
    trend: {
      value: 18.7,
      label: 'vs last month',
      isPositive: true
    },
    variant: 'default'
  },
  {
    title: 'Pending Orders',
    value: 45,
    subtitle: 'Awaiting processing',
    icon: ShoppingCart,
    trend: {
      value: -12.3,
      label: 'vs last week',
      isPositive: true
    },
    variant: 'default'
  },
  {
    title: 'Turnover Rate',
    value: '85%',
    subtitle: 'Inventory efficiency',
    icon: BarChart3,
    trend: {
      value: 3.2,
      label: 'vs last quarter',
      isPositive: true
    },
    variant: 'success'
  }
];

export interface KPIGridProps {
  data?: KPICardProps[];
  className?: string;
}

export function KPIGrid({ data = mockKPIData, className }: KPIGridProps) {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${className || ''}`}>
      {data.map((kpi, index) => (
        <KPICard
          key={`${kpi.title}-${index}`}
          {...kpi}
        />
      ))}
    </div>
  );
}