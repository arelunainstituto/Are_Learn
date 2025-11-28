'use client';

import { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, MapPin } from 'lucide-react';

interface Warehouse {
  id: string;
  name: string;
  code: string;
  location?: string;
}

interface WarehouseFilterProps {
  onWarehouseChange: (warehouseId: string | null) => void;
  onLocationChange: (location: string | null) => void;
  selectedWarehouse?: string | null;
  selectedLocation?: string | null;
  className?: string;
}

export function WarehouseFilter({
  onWarehouseChange,
  onLocationChange,
  selectedWarehouse,
  selectedLocation,
  className = ''
}: WarehouseFilterProps) {
  const [warehouses, setWarehouses] = useState<Warehouse[]>([]);
  const [locations, setLocations] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock data - em produção, buscar da API
  useEffect(() => {
    const mockWarehouses: Warehouse[] = [
      { id: '1', name: 'Armazém Principal', code: 'WH001', location: 'Lisboa' },
      { id: '2', name: 'Armazém Norte', code: 'WH002', location: 'Porto' },
      { id: '3', name: 'Armazém Sul', code: 'WH003', location: 'Faro' },
    ];

    const mockLocations = [
      'A1-B1-C1', 'A1-B1-C2', 'A1-B2-C1', 'A1-B2-C2',
      'A2-B1-C1', 'A2-B1-C2', 'A2-B2-C1', 'A2-B2-C2',
      'B1-A1-C1', 'B1-A1-C2', 'B1-A2-C1', 'B1-A2-C2'
    ];

    setWarehouses(mockWarehouses);
    setLocations(mockLocations);
    setLoading(false);
  }, []);

  const clearWarehouse = () => {
    onWarehouseChange(null);
  };

  const clearLocation = () => {
    onLocationChange(null);
  };

  const clearAll = () => {
    onWarehouseChange(null);
    onLocationChange(null);
  };

  const hasFilters = selectedWarehouse || selectedLocation;

  if (loading) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <div className="h-9 w-32 bg-gray-200 animate-pulse rounded"></div>
        <div className="h-9 w-32 bg-gray-200 animate-pulse rounded"></div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Select value={selectedWarehouse || ''} onValueChange={onWarehouseChange}>
        <SelectTrigger className="w-48">
          <SelectValue placeholder="Selecionar armazém" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todos os armazéns</SelectItem>
          {warehouses.map((warehouse) => (
            <SelectItem key={warehouse.id} value={warehouse.id}>
              <div className="flex items-center gap-2">
                <span className="font-medium">{warehouse.code}</span>
                <span className="text-gray-500">-</span>
                <span>{warehouse.name}</span>
                {warehouse.location && (
                  <Badge variant="secondary" className="text-xs">
                    {warehouse.location}
                  </Badge>
                )}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedLocation || ''} onValueChange={onLocationChange}>
        <SelectTrigger className="w-40">
          <SelectValue placeholder="Localização" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">Todas as localizações</SelectItem>
          {locations.map((location) => (
            <SelectItem key={location} value={location}>
              <div className="flex items-center gap-2">
                <MapPin className="h-3 w-3" />
                {location}
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {hasFilters && (
        <Button variant="outline" size="sm" onClick={clearAll}>
          <X className="h-4 w-4 mr-1" />
          Limpar
        </Button>
      )}

      {selectedWarehouse && (
        <Badge variant="secondary" className="flex items-center gap-1">
          Armazém: {warehouses.find(w => w.id === selectedWarehouse)?.code}
          <button onClick={clearWarehouse} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}

      {selectedLocation && (
        <Badge variant="secondary" className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          {selectedLocation}
          <button onClick={clearLocation} className="ml-1 hover:bg-gray-300 rounded-full p-0.5">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      )}
    </div>
  );
}