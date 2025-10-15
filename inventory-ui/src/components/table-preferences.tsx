'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Settings } from 'lucide-react';

interface Column {
  key: string;
  label: string;
  visible: boolean;
}

interface TablePreferencesProps {
  tableId: string;
  columns: Omit<Column, 'visible'>[];
  onPreferencesChange: (visibleColumns: string[]) => void;
}

export function TablePreferences({ tableId, columns, onPreferencesChange }: TablePreferencesProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [columnPreferences, setColumnPreferences] = useState<Column[]>([]);

  const storageKey = `table-preferences-${tableId}`;

  useEffect(() => {
    // Carrega preferências do localStorage
    const saved = localStorage.getItem(storageKey);
    let preferences: Column[];

    if (saved) {
      try {
        const savedPrefs = JSON.parse(saved);
        preferences = columns.map(col => ({
          ...col,
          visible: savedPrefs[col.key] !== false // Default true se não especificado
        }));
      } catch {
        preferences = columns.map(col => ({ ...col, visible: true }));
      }
    } else {
      preferences = columns.map(col => ({ ...col, visible: true }));
    }

    setColumnPreferences(preferences);
    
    // Notifica componente pai sobre colunas visíveis
    const visibleColumns = preferences
      .filter(col => col.visible)
      .map(col => col.key);
    onPreferencesChange(visibleColumns);
  }, [tableId, columns, onPreferencesChange]);

  const handleColumnToggle = (columnKey: string, visible: boolean) => {
    const updated = columnPreferences.map(col =>
      col.key === columnKey ? { ...col, visible } : col
    );
    
    setColumnPreferences(updated);
    
    // Salva no localStorage
    const prefsToSave = updated.reduce((acc, col) => {
      acc[col.key] = col.visible;
      return acc;
    }, {} as Record<string, boolean>);
    
    localStorage.setItem(storageKey, JSON.stringify(prefsToSave));
    
    // Notifica componente pai
    const visibleColumns = updated
      .filter(col => col.visible)
      .map(col => col.key);
    onPreferencesChange(visibleColumns);
  };

  const resetToDefault = () => {
    const defaultPrefs = columns.map(col => ({ ...col, visible: true }));
    setColumnPreferences(defaultPrefs);
    
    localStorage.removeItem(storageKey);
    
    const visibleColumns = defaultPrefs.map(col => col.key);
    onPreferencesChange(visibleColumns);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Colunas
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Preferências de Colunas</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-sm text-gray-600">
            Selecione quais colunas deseja visualizar na tabela:
          </div>
          
          <div className="space-y-3 max-h-60 overflow-y-auto">
            {columnPreferences.map((column) => (
              <div key={column.key} className="flex items-center space-x-2">
                <Checkbox
                  id={column.key}
                  checked={column.visible}
                  onCheckedChange={(checked: boolean) => 
                    handleColumnToggle(column.key, checked)
                  }
                />
                <label
                  htmlFor={column.key}
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  {column.label}
                </label>
              </div>
            ))}
          </div>
          
          <div className="flex justify-between pt-4 border-t">
            <Button variant="outline" onClick={resetToDefault}>
              Restaurar Padrão
            </Button>
            <Button onClick={() => setIsOpen(false)}>
              Aplicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// Hook para usar preferências de tabela
export function useTablePreferences(tableId: string, defaultColumns: string[]) {
  const [visibleColumns, setVisibleColumns] = useState<string[]>(defaultColumns);

  useEffect(() => {
    const storageKey = `table-preferences-${tableId}`;
    const saved = localStorage.getItem(storageKey);
    
    if (saved) {
      try {
        const savedPrefs = JSON.parse(saved);
        const visible = defaultColumns.filter(col => savedPrefs[col] !== false);
        setVisibleColumns(visible);
      } catch {
        setVisibleColumns(defaultColumns);
      }
    }
  }, [tableId, defaultColumns]);

  return { visibleColumns, setVisibleColumns };
}