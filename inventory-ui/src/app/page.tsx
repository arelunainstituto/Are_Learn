'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { apiClient } from '@/lib/api';
import { 
  Package, 
  TrendingUp, 
  Warehouse, 
  AlertTriangle,
  Activity,
  BarChart3,
  Clock
} from 'lucide-react';

interface DashboardStats {
  movimentosHoje: {
    total: number;
    entradas: number;
    saidas: number;
    transferencias: number;
  };
  saldoPorArmazem: Array<{
    nome: string;
    totalItens: number;
    valor: number;
  }>;
  alertasEstoque: Array<{
    produto: string;
    sku: string;
    estoqueAtual: number;
    estoqueMinimo: number;
    armazem: string;
  }>;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    movimentosHoje: { total: 0, entradas: 0, saidas: 0, transferencias: 0 },
    saldoPorArmazem: [],
    alertasEstoque: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Simulated data - replace with real API calls when endpoints are available
        const mockStats: DashboardStats = {
          movimentosHoje: {
            total: 24,
            entradas: 8,
            saidas: 12,
            transferencias: 4
          },
          saldoPorArmazem: [
            { nome: 'Armazém Principal', totalItens: 1250, valor: 45600.50 },
            { nome: 'Armazém Secundário', totalItens: 680, valor: 23400.25 },
            { nome: 'Loja Porto', totalItens: 320, valor: 12800.75 }
          ],
          alertasEstoque: [
            { produto: 'Test Product', sku: 'TEST-001', estoqueAtual: 5, estoqueMinimo: 10, armazem: 'Principal' },
            { produto: 'Product B', sku: 'PROD-002', estoqueAtual: 2, estoqueMinimo: 15, armazem: 'Secundário' }
          ]
        };
        
        setStats(mockStats);
      } catch (error) {
        console.error('Erro ao carregar dados do dashboard:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Visão geral do inventário AreLuna</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Clock className="h-4 w-4" />
          <span>Atualizado: {new Date().toLocaleTimeString('pt-PT')}</span>
        </div>
      </div>

      {/* Movimentos Hoje */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Movimentos Hoje</CardTitle>
          <Activity className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-gray-900">{stats.movimentosHoje.total}</div>
              <div className="text-sm text-gray-600">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{stats.movimentosHoje.entradas}</div>
              <div className="text-sm text-gray-600">Entradas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{stats.movimentosHoje.saidas}</div>
              <div className="text-sm text-gray-600">Saídas</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.movimentosHoje.transferencias}</div>
              <div className="text-sm text-gray-600">Transferências</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Saldo por Armazém */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Saldo por Armazém</CardTitle>
          <Warehouse className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {stats.saldoPorArmazem.map((armazem, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <div className="font-medium text-gray-900">{armazem.nome}</div>
                  <div className="text-sm text-gray-600">{armazem.totalItens} itens</div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-lg text-gray-900">
                    €{armazem.valor.toLocaleString('pt-PT', { minimumFractionDigits: 2 })}
                  </div>
                  <Badge variant="outline" className="text-xs">
                    {armazem.totalItens} unidades
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Alertas de Estoque Baixo */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-lg font-medium">Alertas de Estoque Baixo</CardTitle>
          <AlertTriangle className="h-5 w-5 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.alertasEstoque.length === 0 ? (
              <div className="text-center py-6 text-gray-500">
                <Package className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Nenhum alerta de estoque baixo</p>
              </div>
            ) : (
              stats.alertasEstoque.map((alerta, index) => (
                <Alert key={index} className="border-orange-200 bg-orange-50">
                  <AlertTriangle className="h-4 w-4 text-orange-600" />
                  <AlertDescription>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-medium">{alerta.produto}</span>
                        <span className="text-gray-600 ml-2">({alerta.sku})</span>
                        <div className="text-sm text-gray-600 mt-1">
                          {alerta.armazem} • Estoque: {alerta.estoqueAtual} / Mínimo: {alerta.estoqueMinimo}
                        </div>
                      </div>
                      <Badge variant="destructive" className="ml-4">
                        Baixo
                      </Badge>
                    </div>
                  </AlertDescription>
                </Alert>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg font-medium">Ações Rápidas</CardTitle>
          <CardDescription>Acesso rápido às funcionalidades principais</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <a 
              href="/inventory" 
              className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
            >
              <Package className="h-8 w-8 text-blue-600 mb-2" />
              <span className="text-sm font-medium text-blue-900">Produtos</span>
            </a>
            <a 
              href="/movements" 
              className="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
            >
              <TrendingUp className="h-8 w-8 text-green-600 mb-2" />
              <span className="text-sm font-medium text-green-900">Movimentos</span>
            </a>
            <a 
              href="/documents" 
              className="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors"
            >
              <BarChart3 className="h-8 w-8 text-purple-600 mb-2" />
              <span className="text-sm font-medium text-purple-900">Documentos</span>
            </a>
            <a 
              href="/integrations" 
              className="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors"
            >
              <Activity className="h-8 w-8 text-orange-600 mb-2" />
              <span className="text-sm font-medium text-orange-900">Integrações</span>
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}