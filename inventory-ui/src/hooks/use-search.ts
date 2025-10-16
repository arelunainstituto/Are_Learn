import { useState, useEffect, useMemo } from 'react';

export interface SearchOptions {
  searchFields?: string[];
  debounceMs?: number;
  caseSensitive?: boolean;
}

export interface FilterOptions {
  [key: string]: any;
}

export function useSearch<T>(
  data: T[],
  options: SearchOptions = {}
) {
  const {
    searchFields = [],
    debounceMs = 300,
    caseSensitive = false
  } = options;

  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [filters, setFilters] = useState<FilterOptions>({});
  const [sortBy, setSortBy] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  // Debounce search term
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [searchTerm, debounceMs]);

  // Filter and search data
  const filteredData = useMemo(() => {
    let result = [...data];

    // Apply search
    if (debouncedSearchTerm && searchFields.length > 0) {
      const term = caseSensitive ? debouncedSearchTerm : debouncedSearchTerm.toLowerCase();
      
      result = result.filter(item => {
        return searchFields.some(field => {
          const value = getNestedValue(item, field);
          if (value == null) return false;
          
          const stringValue = caseSensitive ? String(value) : String(value).toLowerCase();
          return stringValue.includes(term);
        });
      });
    }

    // Apply filters
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        result = result.filter(item => {
          const itemValue = getNestedValue(item, key);
          
          if (Array.isArray(value)) {
            return value.includes(itemValue);
          }
          
          if (typeof value === 'object' && value.min !== undefined && value.max !== undefined) {
            const numValue = Number(itemValue);
            return numValue >= value.min && numValue <= value.max;
          }
          
          if (typeof value === 'object' && (value.from || value.to)) {
            const dateValue = new Date(itemValue);
            const fromDate = value.from ? new Date(value.from) : null;
            const toDate = value.to ? new Date(value.to) : null;
            
            if (fromDate && toDate) {
              return dateValue >= fromDate && dateValue <= toDate;
            } else if (fromDate) {
              return dateValue >= fromDate;
            } else if (toDate) {
              return dateValue <= toDate;
            }
          }
          
          return itemValue === value;
        });
      }
    });

    // Apply sorting
    if (sortBy) {
      result.sort((a, b) => {
        const aValue = getNestedValue(a, sortBy);
        const bValue = getNestedValue(b, sortBy);
        
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, debouncedSearchTerm, filters, sortBy, sortOrder, searchFields, caseSensitive]);

  // Generate suggestions for autocomplete
  const suggestions = useMemo(() => {
    if (!searchTerm || searchFields.length === 0) return [];

    const uniqueValues = new Set<string>();
    const term = caseSensitive ? searchTerm : searchTerm.toLowerCase();

    data.forEach(item => {
      searchFields.forEach(field => {
        const value = getNestedValue(item, field);
        if (value != null) {
          const stringValue = String(value);
          const compareValue = caseSensitive ? stringValue : stringValue.toLowerCase();
          
          if (compareValue.includes(term) && stringValue !== searchTerm) {
            uniqueValues.add(stringValue);
          }
        }
      });
    });

    return Array.from(uniqueValues).slice(0, 10); // Limit to 10 suggestions
  }, [data, searchTerm, searchFields, caseSensitive]);

  const updateFilter = (key: string, value: any) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const removeFilter = (key: string) => {
    setFilters(prev => {
      const newFilters = { ...prev };
      delete newFilters[key];
      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({});
  };

  const clearSearch = () => {
    setSearchTerm('');
    setDebouncedSearchTerm('');
  };

  const clearAll = () => {
    clearSearch();
    clearFilters();
    setSortBy('');
    setSortOrder('asc');
  };

  return {
    // Search state
    searchTerm,
    setSearchTerm,
    suggestions,
    
    // Filter state
    filters,
    updateFilter,
    removeFilter,
    clearFilters,
    
    // Sort state
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    
    // Results
    filteredData,
    totalResults: filteredData.length,
    
    // Actions
    clearSearch,
    clearAll,
    
    // Status
    isSearching: searchTerm !== debouncedSearchTerm,
    hasActiveFilters: Object.keys(filters).length > 0,
    hasResults: filteredData.length > 0
  };
}

// Helper function to get nested object values
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}