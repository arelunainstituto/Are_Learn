'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    label: string;
    isPositive?: boolean;
  };
  variant?: 'default' | 'success' | 'warning' | 'danger';
  className?: string;
}

const variantStyles = {
  default: {
    card: 'border-gray-200',
    icon: 'text-blue-600 bg-blue-50',
    value: 'text-gray-900'
  },
  success: {
    card: 'border-green-200 bg-green-50/30',
    icon: 'text-green-600 bg-green-100',
    value: 'text-green-900'
  },
  warning: {
    card: 'border-yellow-200 bg-yellow-50/30',
    icon: 'text-yellow-600 bg-yellow-100',
    value: 'text-yellow-900'
  },
  danger: {
    card: 'border-red-200 bg-red-50/30',
    icon: 'text-red-600 bg-red-100',
    value: 'text-red-900'
  }
};

export function KPICard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
  className
}: KPICardProps) {
  const styles = variantStyles[variant];

  return (
    <Card className={cn(styles.card, className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={cn('p-2 rounded-lg', styles.icon)}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className={cn('text-2xl font-bold', styles.value)}>
            {typeof value === 'number' ? value.toLocaleString() : value}
          </div>
          
          {subtitle && (
            <p className="text-xs text-gray-500">
              {subtitle}
            </p>
          )}
          
          {trend && (
            <div className="flex items-center space-x-2">
              <Badge 
                variant={trend.isPositive ? 'default' : 'secondary'}
                className={cn(
                  'text-xs',
                  trend.isPositive 
                    ? 'bg-green-100 text-green-800 hover:bg-green-100' 
                    : 'bg-red-100 text-red-800 hover:bg-red-100'
                )}
              >
                {trend.isPositive ? '+' : ''}{trend.value}%
              </Badge>
              <span className="text-xs text-gray-500">
                {trend.label}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}