export interface SearchableItem {
  [key: string]: any;
}

export interface SearchConfig {
  fields: string[];
  weights?: { [field: string]: number };
  fuzzy?: boolean;
  caseSensitive?: boolean;
}

export interface FilterConfig {
  type: 'text' | 'number' | 'date' | 'select' | 'multiselect' | 'range' | 'daterange';
  field: string;
  label: string;
  options?: { value: any; label: string }[];
  min?: number;
  max?: number;
}

export interface SortConfig {
  field: string;
  direction: 'asc' | 'desc';
}

/**
 * Performs fuzzy search on text
 */
export function fuzzyMatch(text: string, pattern: string, caseSensitive = false): boolean {
  if (!pattern) return true;
  
  const textToSearch = caseSensitive ? text : text.toLowerCase();
  const patternToMatch = caseSensitive ? pattern : pattern.toLowerCase();
  
  let patternIndex = 0;
  
  for (let i = 0; i < textToSearch.length && patternIndex < patternToMatch.length; i++) {
    if (textToSearch[i] === patternToMatch[patternIndex]) {
      patternIndex++;
    }
  }
  
  return patternIndex === patternToMatch.length;
}

/**
 * Calculates search score for an item
 */
export function calculateSearchScore(
  item: SearchableItem,
  searchTerm: string,
  config: SearchConfig
): number {
  if (!searchTerm) return 1;
  
  let totalScore = 0;
  let totalWeight = 0;
  
  config.fields.forEach(field => {
    const value = getNestedValue(item, field);
    if (value == null) return;
    
    const stringValue = String(value);
    const weight = config.weights?.[field] || 1;
    totalWeight += weight;
    
    // Exact match gets highest score
    if (stringValue === searchTerm) {
      totalScore += weight * 1.0;
      return;
    }
    
    // Case-insensitive exact match
    if (!config.caseSensitive && stringValue.toLowerCase() === searchTerm.toLowerCase()) {
      totalScore += weight * 0.9;
      return;
    }
    
    // Starts with match
    const startsWithMatch = config.caseSensitive 
      ? stringValue.startsWith(searchTerm)
      : stringValue.toLowerCase().startsWith(searchTerm.toLowerCase());
    
    if (startsWithMatch) {
      totalScore += weight * 0.8;
      return;
    }
    
    // Contains match
    const containsMatch = config.caseSensitive
      ? stringValue.includes(searchTerm)
      : stringValue.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (containsMatch) {
      totalScore += weight * 0.6;
      return;
    }
    
    // Fuzzy match
    if (config.fuzzy && fuzzyMatch(stringValue, searchTerm, config.caseSensitive)) {
      totalScore += weight * 0.4;
    }
  });
  
  return totalWeight > 0 ? totalScore / totalWeight : 0;
}

/**
 * Searches and ranks items
 */
export function searchItems<T extends SearchableItem>(
  items: T[],
  searchTerm: string,
  config: SearchConfig,
  minScore = 0.1
): T[] {
  if (!searchTerm) return items;
  
  return items
    .map(item => ({
      item,
      score: calculateSearchScore(item, searchTerm, config)
    }))
    .filter(({ score }) => score >= minScore)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);
}

/**
 * Applies filters to items
 */
export function applyFilters<T extends SearchableItem>(
  items: T[],
  filters: { [key: string]: any },
  filterConfigs: FilterConfig[]
): T[] {
  return items.filter(item => {
    return Object.entries(filters).every(([key, value]) => {
      if (value === undefined || value === null || value === '') return true;
      
      const config = filterConfigs.find(c => c.field === key);
      if (!config) return true;
      
      const itemValue = getNestedValue(item, key);
      
      switch (config.type) {
        case 'text':
          return String(itemValue).toLowerCase().includes(String(value).toLowerCase());
        
        case 'number':
          return Number(itemValue) === Number(value);
        
        case 'date':
          return new Date(itemValue).toDateString() === new Date(value).toDateString();
        
        case 'select':
          return itemValue === value;
        
        case 'multiselect':
          return Array.isArray(value) ? value.includes(itemValue) : itemValue === value;
        
        case 'range':
          const numValue = Number(itemValue);
          return numValue >= value.min && numValue <= value.max;
        
        case 'daterange':
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
          return true;
        
        default:
          return true;
      }
    });
  });
}

/**
 * Sorts items
 */
export function sortItems<T extends SearchableItem>(
  items: T[],
  sortConfig: SortConfig
): T[] {
  if (!sortConfig.field) return items;
  
  return [...items].sort((a, b) => {
    const aValue = getNestedValue(a, sortConfig.field);
    const bValue = getNestedValue(b, sortConfig.field);
    
    // Handle null/undefined values
    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
    if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
    
    // Compare values
    let comparison = 0;
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      comparison = aValue.localeCompare(bValue);
    } else if (typeof aValue === 'number' && typeof bValue === 'number') {
      comparison = aValue - bValue;
    } else if (aValue instanceof Date && bValue instanceof Date) {
      comparison = aValue.getTime() - bValue.getTime();
    } else {
      comparison = String(aValue).localeCompare(String(bValue));
    }
    
    return sortConfig.direction === 'asc' ? comparison : -comparison;
  });
}

/**
 * Generates autocomplete suggestions
 */
export function generateSuggestions<T extends SearchableItem>(
  items: T[],
  searchTerm: string,
  fields: string[],
  maxSuggestions = 10
): string[] {
  if (!searchTerm) return [];
  
  const suggestions = new Set<string>();
  const lowerSearchTerm = searchTerm.toLowerCase();
  
  items.forEach(item => {
    fields.forEach(field => {
      const value = getNestedValue(item, field);
      if (value != null) {
        const stringValue = String(value);
        const lowerValue = stringValue.toLowerCase();
        
        // Add if it contains the search term and is different from search term
        if (lowerValue.includes(lowerSearchTerm) && lowerValue !== lowerSearchTerm) {
          suggestions.add(stringValue);
        }
        
        // Add words that start with the search term
        const words = stringValue.split(/\s+/);
        words.forEach(word => {
          if (word.toLowerCase().startsWith(lowerSearchTerm) && word.toLowerCase() !== lowerSearchTerm) {
            suggestions.add(word);
          }
        });
      }
    });
  });
  
  return Array.from(suggestions)
    .sort((a, b) => {
      // Prioritize suggestions that start with the search term
      const aStarts = a.toLowerCase().startsWith(lowerSearchTerm);
      const bStarts = b.toLowerCase().startsWith(lowerSearchTerm);
      
      if (aStarts && !bStarts) return -1;
      if (!aStarts && bStarts) return 1;
      
      // Then sort alphabetically
      return a.localeCompare(b);
    })
    .slice(0, maxSuggestions);
}

/**
 * Helper function to get nested object values
 */
export function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : null;
  }, obj);
}

/**
 * Highlights search term in text
 */
export function highlightSearchTerm(text: string, searchTerm: string, caseSensitive = false): string {
  if (!searchTerm) return text;
  
  const flags = caseSensitive ? 'g' : 'gi';
  const regex = new RegExp(`(${escapeRegExp(searchTerm)})`, flags);
  
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Escapes special regex characters
 */
function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}