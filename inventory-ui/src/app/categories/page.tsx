'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  FolderOpen, 
  Plus, 
  Search, 
  Package, 
  TrendingUp, 
  AlertCircle,
  Edit,
  Trash2,
  Eye,
  Tag
} from 'lucide-react';

// Mock data for categories
const mockCategories = [
  {
    id: '1',
    name: 'Eletrónicos',
    code: 'ELEC',
    description: 'Produtos eletrónicos e tecnológicos',
    parentId: null,
    level: 0,
    productCount: 156,
    status: 'active',
    color: '#3B82F6',
    createdAt: '2024-01-01',
    subcategories: [
      {
        id: '1-1',
        name: 'Computadores',
        code: 'COMP',
        description: 'Computadores e acessórios',
        parentId: '1',
        level: 1,
        productCount: 45,
        status: 'active',
        color: '#1E40AF'
      },
      {
        id: '1-2',
        name: 'Smartphones',
        code: 'PHONE',
        description: 'Telemóveis e acessórios',
        parentId: '1',
        level: 1,
        productCount: 67,
        status: 'active',
        color: '#1E40AF'
      }
    ]
  },
  {
    id: '2',
    name: 'Escritório',
    code: 'OFF',
    description: 'Material de escritório e papelaria',
    parentId: null,
    level: 0,
    productCount: 89,
    status: 'active',
    color: '#10B981',
    createdAt: '2024-01-02',
    subcategories: [
      {
        id: '2-1',
        name: 'Papelaria',
        code: 'PAP',
        description: 'Papel, canetas e material de escrita',
        parentId: '2',
        level: 1,
        productCount: 34,
        status: 'active',
        color: '#059669'
      }
    ]
  },
  {
    id: '3',
    name: 'Mobiliário',
    code: 'MOB',
    description: 'Móveis e equipamentos de escritório',
    parentId: null,
    level: 0,
    productCount: 23,
    status: 'active',
    color: '#F59E0B',
    createdAt: '2024-01-03',
    subcategories: []
  },
  {
    id: '4',
    name: 'Limpeza',
    code: 'CLEAN',
    description: 'Produtos de limpeza e higiene',
    parentId: null,
    level: 0,
    productCount: 45,
    status: 'inactive',
    color: '#EF4444',
    createdAt: '2024-01-04',
    subcategories: []
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-green-100 text-green-800';
    case 'inactive': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return 'Ativa';
    case 'inactive': return 'Inativa';
    default: return status;
  }
};

export default function CategoriesPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const filteredCategories = mockCategories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalCategories = mockCategories.length;
  const totalSubcategories = mockCategories.reduce((sum, cat) => sum + cat.subcategories.length, 0);
  const totalProducts = mockCategories.reduce((sum, cat) => sum + cat.productCount, 0);
  const activeCategories = mockCategories.filter(cat => cat.status === 'active').length;

  const toggleExpanded = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestão de Categorias</h1>
          <p className="text-muted-foreground">
            Organizar e gerir categorias de produtos
          </p>
        </div>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Nova Categoria
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Criar Nova Categoria</DialogTitle>
              <DialogDescription>
                Adicione uma nova categoria de produtos
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome da Categoria</Label>
                  <Input id="name" placeholder="Ex: Eletrónicos" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="code">Código</Label>
                  <Input id="code" placeholder="Ex: ELEC" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Input id="description" placeholder="Descrição da categoria" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="parent">Categoria Pai (Opcional)</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecionar categoria pai" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">Nenhuma (Categoria Principal)</SelectItem>
                      {mockCategories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.id}>
                          {cat.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="color">Cor</Label>
                  <Input id="color" type="color" defaultValue="#3B82F6" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Estado</Label>
                <Select defaultValue="active">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Ativa</SelectItem>
                    <SelectItem value="inactive">Inativa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={() => setIsCreateDialogOpen(false)}>
                Criar Categoria
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Categorias</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCategories}</div>
            <p className="text-xs text-muted-foreground">
              {activeCategories} ativas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Subcategorias</CardTitle>
            <Tag className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalSubcategories}</div>
            <p className="text-xs text-muted-foreground">
              Categorias filhas
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Produtos Categorizados</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProducts}</div>
            <p className="text-xs text-muted-foreground">
              Total de produtos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de Utilização</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((activeCategories / totalCategories) * 100).toFixed(0)}%
            </div>
            <p className="text-xs text-muted-foreground">
              Categorias ativas
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center space-x-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar categorias..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>

      {/* Categories List */}
      <div className="space-y-4">
        {filteredCategories.map((category) => (
          <Card key={category.id} className="hover:shadow-md transition-shadow">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div 
                    className="w-4 h-4 rounded-full" 
                    style={{ backgroundColor: category.color }}
                  ></div>
                  <div>
                    <CardTitle className="text-lg">{category.name}</CardTitle>
                    <CardDescription>{category.code} • {category.description}</CardDescription>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className={getStatusColor(category.status)}>
                    {getStatusText(category.status)}
                  </Badge>
                  <Button 
                    variant="ghost" 
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsViewDialogOpen(true);
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="text-sm">
                    <span className="font-medium">{category.productCount}</span> produtos
                  </div>
                  <div className="text-sm">
                    <span className="font-medium">{category.subcategories.length}</span> subcategorias
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Criada em {new Date(category.createdAt).toLocaleDateString('pt-PT')}
                  </div>
                </div>
                {category.subcategories.length > 0 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleExpanded(category.id)}
                  >
                    {expandedCategories.has(category.id) ? 'Ocultar' : 'Mostrar'} subcategorias
                  </Button>
                )}
              </div>

              {/* Subcategories */}
              {expandedCategories.has(category.id) && category.subcategories.length > 0 && (
                <div className="mt-4 pl-6 border-l-2 border-gray-200 space-y-2">
                  {category.subcategories.map((subcategory) => (
                    <div key={subcategory.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: subcategory.color }}
                        ></div>
                        <div>
                          <div className="font-medium">{subcategory.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {subcategory.code} • {subcategory.description}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div className="text-sm">
                          <span className="font-medium">{subcategory.productCount}</span> produtos
                        </div>
                        <Badge className={getStatusColor(subcategory.status)}>
                          {getStatusText(subcategory.status)}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Category Details Dialog */}
      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: selectedCategory?.color }}
              ></div>
              <span>{selectedCategory?.name}</span>
            </DialogTitle>
            <DialogDescription>
              Detalhes completos da categoria
            </DialogDescription>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-6">
              {/* General Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Informações Gerais</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Código</Label>
                    <p className="text-sm text-muted-foreground">{selectedCategory.code}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Estado</Label>
                    <Badge className={getStatusColor(selectedCategory.status)}>
                      {getStatusText(selectedCategory.status)}
                    </Badge>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Nível</Label>
                    <p className="text-sm text-muted-foreground">
                      {selectedCategory.level === 0 ? 'Categoria Principal' : `Nível ${selectedCategory.level}`}
                    </p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Data de Criação</Label>
                    <p className="text-sm text-muted-foreground">
                      {new Date(selectedCategory.createdAt).toLocaleDateString('pt-PT')}
                    </p>
                  </div>
                </div>
                <div>
                  <Label className="text-sm font-medium">Descrição</Label>
                  <p className="text-sm text-muted-foreground">{selectedCategory.description}</p>
                </div>
              </div>

              {/* Statistics */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Estatísticas</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm font-medium">Produtos</Label>
                    <p className="text-2xl font-bold">{selectedCategory.productCount}</p>
                  </div>
                  <div>
                    <Label className="text-sm font-medium">Subcategorias</Label>
                    <p className="text-2xl font-bold">{selectedCategory.subcategories.length}</p>
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              {selectedCategory.subcategories.length > 0 && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Subcategorias</h3>
                  <div className="space-y-2">
                    {selectedCategory.subcategories.map((subcategory: any) => (
                      <div key={subcategory.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: subcategory.color }}
                          ></div>
                          <div>
                            <div className="font-medium">{subcategory.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {subcategory.code} • {subcategory.description}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-sm">
                            <span className="font-medium">{subcategory.productCount}</span> produtos
                          </div>
                          <Badge className={getStatusColor(subcategory.status)}>
                            {getStatusText(subcategory.status)}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsViewDialogOpen(false)}>
              Fechar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}