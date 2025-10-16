'use client';

import React, { useState } from 'react';
import { Filter, X, Calendar, DollarSign, User, Tag, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';

export interface FilterOption {
  id: string;
  label: string;
  value: string;
}

export interface DateRange {
  from?: Date;
  to?: Date;
}

export interface PriceRange {
  min?: number;
  max?: number;
}

export interface FilterState {
  search?: string;
  category?: string;
  dateRange?: DateRange;
  priceRange?: PriceRange;
  user?: string;
  status?: string;
  tags?: string[];
}

export interface FilterPanelProps {
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  categories?: FilterOption[];
  users?: FilterOption[];
  statuses?: FilterOption[];
  availableTags?: FilterOption[];
  className?: string;
  showAdvanced?: boolean;
}

export function FilterPanel({
  filters,
  onFiltersChange,
  categories = [],
  users = [],
  statuses = [],
  availableTags = [],
  className,
  showAdvanced = true,
}: FilterPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const activeFiltersCount = Object.values(filters).filter(value => {
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(v => v !== undefined && v !== null);
    }
    return value !== undefined && value !== null && value !== '';
  }).length;

  const updateFilter = (key: keyof FilterState, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value,
    });
  };

  const clearFilter = (key: keyof FilterState) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('pt-PT');
  };

  const renderActiveFilters = () => {
    const activeFilters: React.ReactNode[] = [];

    if (filters.category) {
      const category = categories.find(c => c.value === filters.category);
      activeFilters.push(
        <Badge key="category" variant="secondary" className="gap-1">
          <Tag className="h-3 w-3" />
          {category?.label || filters.category}
          <button
            onClick={() => clearFilter('category')}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      );
    }

    if (filters.dateRange?.from || filters.dateRange?.to) {
      const { from, to } = filters.dateRange;
      const dateText = from && to 
        ? `${formatDate(from)} - ${formatDate(to)}`
        : from 
        ? `A partir de ${formatDate(from)}`
        : to 
        ? `Até ${formatDate(to)}`
        : '';
      
      activeFilters.push(
        <Badge key="date" variant="secondary" className="gap-1">
          <Calendar className="h-3 w-3" />
          {dateText}
          <button
            onClick={() => clearFilter('dateRange')}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      );
    }

    if (filters.priceRange?.min !== undefined || filters.priceRange?.max !== undefined) {
      const { min, max } = filters.priceRange;
      const priceText = min !== undefined && max !== undefined
        ? `€${min} - €${max}`
        : min !== undefined
        ? `A partir de €${min}`
        : max !== undefined
        ? `Até €${max}`
        : '';

      activeFilters.push(
        <Badge key="price" variant="secondary" className="gap-1">
          <DollarSign className="h-3 w-3" />
          {priceText}
          <button
            onClick={() => clearFilter('priceRange')}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      );
    }

    if (filters.user) {
      const user = users.find(u => u.value === filters.user);
      activeFilters.push(
        <Badge key="user" variant="secondary" className="gap-1">
          <User className="h-3 w-3" />
          {user?.label || filters.user}
          <button
            onClick={() => clearFilter('user')}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      );
    }

    if (filters.status) {
      const status = statuses.find(s => s.value === filters.status);
      activeFilters.push(
        <Badge key="status" variant="secondary" className="gap-1">
          {status?.label || filters.status}
          <button
            onClick={() => clearFilter('status')}
            className="ml-1 hover:text-destructive"
          >
            <X className="h-3 w-3" />
          </button>
        </Badge>
      );
    }

    if (filters.tags && filters.tags.length > 0) {
      filters.tags.forEach(tagValue => {
        const tag = availableTags.find(t => t.value === tagValue);
        activeFilters.push(
          <Badge key={`tag-${tagValue}`} variant="outline" className="gap-1">
            #{tag?.label || tagValue}
            <button
              onClick={() => {
                const newTags = filters.tags?.filter(t => t !== tagValue) || [];
                updateFilter('tags', newTags.length > 0 ? newTags : undefined);
              }}
              className="ml-1 hover:text-destructive"
            >
              <X className="h-3 w-3" />
            </button>
          </Badge>
        );
      });
    }

    return activeFilters;
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between">
        <Popover open={isOpen} onOpenChange={setIsOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2">
              <Filter className="h-4 w-4" />
              Filtros
              {activeFiltersCount > 0 && (
                <Badge variant="secondary" className="ml-1">
                  {activeFiltersCount}
                </Badge>
              )}
              <ChevronDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" align="start">
            <Card className="border-0 shadow-none">
              <CardHeader className="pb-3">
                <CardTitle className="text-base">Filtros</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Category Filter */}
                {categories.length > 0 && (
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Select
                      value={filters.category || "all"}
                      onValueChange={(value) => updateFilter('category', value === "all" ? undefined : value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecionar categoria" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todas as categorias</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.id} value={category.value}>
                            {category.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {/* Date Range Filter */}
                <div className="space-y-2">
                  <Label>Período</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="date"
                      placeholder="Data inicial"
                      value={filters.dateRange?.from?.toISOString().split('T')[0] || ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : undefined;
                        updateFilter('dateRange', {
                          ...filters.dateRange,
                          from: date,
                        });
                      }}
                    />
                    <Input
                      type="date"
                      placeholder="Data final"
                      value={filters.dateRange?.to?.toISOString().split('T')[0] || ''}
                      onChange={(e) => {
                        const date = e.target.value ? new Date(e.target.value) : undefined;
                        updateFilter('dateRange', {
                          ...filters.dateRange,
                          to: date,
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="space-y-2">
                  <Label>Preço (€)</Label>
                  <div className="grid grid-cols-2 gap-2">
                    <Input
                      type="number"
                      placeholder="Mín"
                      value={filters.priceRange?.min || ''}
                      onChange={(e) => {
                        const value = e.target.value ? parseFloat(e.target.value) : undefined;
                        updateFilter('priceRange', {
                          ...filters.priceRange,
                          min: value,
                        });
                      }}
                    />
                    <Input
                      type="number"
                      placeholder="Máx"
                      value={filters.priceRange?.max || ''}
                      onChange={(e) => {
                        const value = e.target.value ? parseFloat(e.target.value) : undefined;
                        updateFilter('priceRange', {
                          ...filters.priceRange,
                          max: value,
                        });
                      }}
                    />
                  </div>
                </div>

                {/* Advanced Filters */}
                {showAdvanced && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                      className="w-full justify-between"
                    >
                      Filtros Avançados
                      <ChevronDown className={cn(
                        "h-4 w-4 transition-transform",
                        showAdvancedFilters && "rotate-180"
                      )} />
                    </Button>

                    {showAdvancedFilters && (
                      <div className="space-y-4 pt-2 border-t">
                        {/* User Filter */}
                        {users.length > 0 && (
                          <div className="space-y-2">
                            <Label>Utilizador</Label>
                            <Select
                              value={filters.user || "all"}
                              onValueChange={(value) => updateFilter('user', value === "all" ? undefined : value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecionar utilizador" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Todos os utilizadores</SelectItem>
                                {users.map((user) => (
                                  <SelectItem key={user.id} value={user.value}>
                                    {user.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}

                        {/* Status Filter */}
                        {statuses.length > 0 && (
                          <div className="space-y-2">
                            <Label>Estado</Label>
                            <Select
                              value={filters.status || "all"}
                              onValueChange={(value) => updateFilter('status', value === "all" ? undefined : value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Selecionar estado" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">Todos os estados</SelectItem>
                                {statuses.map((status) => (
                                  <SelectItem key={status.id} value={status.value}>
                                    {status.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* Clear Filters Button */}
                {activeFiltersCount > 0 && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={clearAllFilters}
                    className="w-full"
                  >
                    Limpar Filtros
                  </Button>
                )}
              </CardContent>
            </Card>
          </PopoverContent>
        </Popover>
      </div>

      {/* Active Filters Display */}
      {activeFiltersCount > 0 && (
        <div className="flex flex-wrap gap-2">
          {renderActiveFilters()}
        </div>
      )}
    </div>
  );
}