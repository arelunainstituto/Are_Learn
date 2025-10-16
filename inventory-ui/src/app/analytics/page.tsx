'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  Package, 
  DollarSign, 
  ArrowUpDown,
  Calendar,
  Download,
  Filter,
  RefreshCw
} from 'lucide-react';

interface AnalyticsData {
  overview: {
    totalProducts: number;
    totalValue: number;
    totalMovements: number;
    averageValue: number;
  };
  trends: {
    salesTrend: number;
    stockTrend: number;
    valueTrend: number;
  };
  topProducts: Array<{
    id: string;
    name: string;
    sku: string;
    movements: number;
    value: number;
    trend: 'up' | 'down' | 'stable';
  }>;
  movementsByType: Array<{
    type: string;
    count: number;
    value: number;
    percentage: number;
  }>;
  monthlyData: Array<{
    month: string;
    entries: number;
    exits: number;
    value: number;
  }>;
}

export default function AnalyticsPage() {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [timeRange, setTimeRange] = useState('30d');
  const [refreshing, setRefreshing] = useState(false);

  // Mock data - in real app, this would come from API
  const mockData: AnalyticsData = {
    overview: {
      totalProducts: 1247,
      totalValue: 89650.50,
      totalMovements: 342,
      averageValue: 71.92
    },
    trends: {
      salesTrend: 12.5,
      stockTrend: -3.2,
      valueTrend: 8.7
    },
    topProducts: [
      {
        id: '1',
        name: 'Kit Teclado + Mouse Logitech',
        sku: 'LOG-KM-001',
        movements: 45,
        value: 2250.00,
        trend: 'up'
      },
      {
        id: '2',
        name: 'Monitor Dell 24"',
        sku: 'DELL-MON-24',
        movements: 32,
        value: 4800.00,
        trend: 'up'
      },
      {
        id: '3',
        name: 'Cabo HDMI Premium',
        sku: 'HDMI-PREM-2M',
        movements: 28,
        value: 420.00,
        trend: 'stable'
      },
      {
        id: '4',
        name: 'Webcam HD 1080p',
        sku: 'WEB-HD-1080',
        movements: 24,
        value: 1200.00,
        trend: 'down'
      },
      {
        id: '5',
        name: 'Headset Gamer RGB',
        sku: 'HEAD-RGB-001',
        movements: 19,
        value: 950.00,
        trend: 'up'
      }
    ],
    movementsByType: [
      { type: 'Entradas', count: 156, value: 45230.00, percentage: 45.6 },
      { type: 'Saídas', count: 134, value: 38920.00, percentage: 39.2 },
      { type: 'Transferências', count: 32, value: 4200.00, percentage: 9.4 },
      { type: 'Ajustes', count: 20, value: 1300.50, percentage: 5.8 }
    ],
    monthlyData: [
      { month: 'Jan', entries: 45, exits: 32, value: 12500 },
      { month: 'Fev', entries: 52, exits: 38, value: 15200 },
      { month: 'Mar', entries: 48, exits: 41, value: 14800 },
      { month: 'Abr', entries: 61, exits: 45, value: 18900 },
      { month: 'Mai', entries: 58, exits: 52, value: 17600 },
      { month: 'Jun', entries: 67, exits: 48, value: 21300 }
    ]
  };

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setData(mockData);
      setLoading(false);
    };

    loadData();
  }, [timeRange]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setData(mockData);
    setRefreshing(false);
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down':
        return <TrendingDown className="h-4 w-4 text-red-500" />;
      default:
        return <ArrowUpDown className="h-4 w-4 text-gray-500" />;
    }
  };

  const getTrendColor = (value: number) => {
    if (value > 0) return 'text-green-600';
    if (value < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-center py-12">
          <p className="text-gray-500">Erro ao carregar dados de analytics</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-gray-600">Relatórios e análises do inventário</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[140px]">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Últimos 7 dias</SelectItem>
              <SelectItem value="30d">Últimos 30 dias</SelectItem>
              <SelectItem value="90d">Últimos 90 dias</SelectItem>
              <SelectItem value="1y">Último ano</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            size="sm"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw className={`mr-2 h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
            Atualizar
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Produtos</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalProducts.toLocaleString()}</div>
            <p className={`text-xs ${getTrendColor(data.trends.stockTrend)}`}>
              {data.trends.stockTrend > 0 ? '+' : ''}{data.trends.stockTrend}% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Total</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{data.overview.totalValue.toLocaleString()}</div>
            <p className={`text-xs ${getTrendColor(data.trends.valueTrend)}`}>
              {data.trends.valueTrend > 0 ? '+' : ''}{data.trends.valueTrend}% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Movimentos</CardTitle>
            <ArrowUpDown className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.totalMovements}</div>
            <p className={`text-xs ${getTrendColor(data.trends.salesTrend)}`}>
              {data.trends.salesTrend > 0 ? '+' : ''}{data.trends.salesTrend}% vs período anterior
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Valor Médio</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€{data.overview.averageValue.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">Por produto</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Movements by Type */}
        <Card>
          <CardHeader>
            <CardTitle>Movimentos por Tipo</CardTitle>
            <CardDescription>Distribuição dos tipos de movimento</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.movementsByType.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      index === 0 ? 'bg-blue-500' :
                      index === 1 ? 'bg-green-500' :
                      index === 2 ? 'bg-yellow-500' : 'bg-red-500'
                    }`} />
                    <span className="text-sm font-medium">{item.type}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-bold">{item.count}</div>
                    <div className="text-xs text-gray-500">€{item.value.toLocaleString()}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Tendência Mensal</CardTitle>
            <CardDescription>Entradas vs Saídas por mês</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.monthlyData.slice(-6).map((month, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium w-12">{month.month}</span>
                  <div className="flex-1 mx-4">
                    <div className="flex gap-1 h-6">
                      <div 
                        className="bg-green-500 rounded-sm"
                        style={{ width: `${(month.entries / 70) * 100}%` }}
                      />
                      <div 
                        className="bg-red-500 rounded-sm"
                        style={{ width: `${(month.exits / 70) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right text-sm">
                    <div className="text-green-600">+{month.entries}</div>
                    <div className="text-red-600">-{month.exits}</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Top Products */}
      <Card>
        <CardHeader>
          <CardTitle>Produtos Mais Movimentados</CardTitle>
          <CardDescription>Top 5 produtos com mais movimentos no período</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {data.topProducts.map((product, index) => (
              <div key={product.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">{product.sku}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-medium">{product.movements} movimentos</div>
                    <div className="text-sm text-gray-500">€{product.value.toLocaleString()}</div>
                  </div>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(product.trend)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}