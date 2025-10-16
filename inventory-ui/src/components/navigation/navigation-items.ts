import {
  LayoutDashboard,
  Package,
  ArrowUpDown,
  FileText,
  Settings,
  BarChart3,
  Warehouse,
  Users,
  Zap,
  LucideIcon
} from 'lucide-react';

export interface NavigationItem {
  id: string;
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  description?: string;
}

export interface NavigationGroup {
  id: string;
  label: string;
  items: NavigationItem[];
}

export const navigationGroups: NavigationGroup[] = [
  {
    id: 'overview',
    label: 'Visão Geral',
    items: [
      {
        id: 'dashboard',
        label: 'Dashboard',
        href: '/',
        icon: LayoutDashboard,
        description: 'Visão geral do sistema'
      },
      {
        id: 'analytics',
        label: 'Analytics',
        href: '/analytics',
        icon: BarChart3,
        description: 'Relatórios e análises'
      }
    ]
  },
  {
    id: 'inventory',
    label: 'Inventário',
    items: [
      {
        id: 'products',
        label: 'Produtos',
        href: '/inventory',
        icon: Package,
        description: 'Gestão de produtos'
      },
      {
        id: 'warehouses',
        label: 'Armazéns',
        href: '/warehouses',
        icon: Warehouse,
        description: 'Gestão de armazéns'
      },
      {
        id: 'categories',
        label: 'Categorias',
        href: '/categories',
        icon: Users,
        description: 'Categorias de produtos'
      }
    ]
  },
  {
    id: 'movements',
    label: 'Movimentos',
    items: [
      {
        id: 'stock-movements',
        label: 'Movimentos',
        href: '/movements',
        icon: ArrowUpDown,
        description: 'Movimentos de stock'
      },
      {
        id: 'documents',
        label: 'Documentos',
        href: '/documents',
        icon: FileText,
        description: 'Documentos de movimento'
      }
    ]
  },
  {
    id: 'integrations',
    label: 'Integrações',
    items: [
      {
        id: 'integrations',
        label: 'Integrações',
        href: '/integrations',
        icon: Zap,
        description: 'Integrações externas'
      },
      {
        id: 'settings',
        label: 'Configurações',
        href: '/settings',
        icon: Settings,
        description: 'Configurações do sistema'
      }
    ]
  }
];

export const allNavigationItems = navigationGroups.flatMap(group => group.items);