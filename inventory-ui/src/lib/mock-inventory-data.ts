export interface InventoryItem {
  id: string;
  name: string;
  description: string;
  category: string;
  subcategory?: string;
  sku: string;
  barcode?: string;
  quantity: number;
  minStock: number;
  maxStock: number;
  unitPrice: number;
  totalValue: number;
  supplier: string;
  location: string;
  warehouse: string;
  status: 'active' | 'inactive' | 'discontinued' | 'out_of_stock';
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
  lastMovement?: Date;
  createdBy: string;
  updatedBy: string;
}

export const mockInventoryItems: InventoryItem[] = [
  {
    id: '1',
    name: 'Laptop Dell Inspiron 15',
    description: 'Laptop Dell Inspiron 15 3000 Series, Intel Core i5, 8GB RAM, 256GB SSD',
    category: 'Electronics',
    subcategory: 'Computers',
    sku: 'DELL-INS-15-001',
    barcode: '1234567890123',
    quantity: 25,
    minStock: 5,
    maxStock: 50,
    unitPrice: 599.99,
    totalValue: 14999.75,
    supplier: 'Dell Technologies',
    location: 'A1-B2-C3',
    warehouse: 'Main Warehouse',
    status: 'active',
    tags: ['laptop', 'dell', 'business'],
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-20'),
    lastMovement: new Date('2024-01-18'),
    createdBy: 'João Silva',
    updatedBy: 'Maria Santos'
  },
  {
    id: '2',
    name: 'Mouse Logitech MX Master 3',
    description: 'Mouse sem fio Logitech MX Master 3 para produtividade avançada',
    category: 'Electronics',
    subcategory: 'Peripherals',
    sku: 'LOG-MX3-001',
    barcode: '2345678901234',
    quantity: 15,
    minStock: 10,
    maxStock: 30,
    unitPrice: 89.99,
    totalValue: 1349.85,
    supplier: 'Logitech',
    location: 'A2-B1-C1',
    warehouse: 'Main Warehouse',
    status: 'active',
    tags: ['mouse', 'wireless', 'productivity'],
    createdAt: new Date('2024-01-10'),
    updatedAt: new Date('2024-01-19'),
    lastMovement: new Date('2024-01-17'),
    createdBy: 'Ana Costa',
    updatedBy: 'João Silva'
  },
  {
    id: '3',
    name: 'Cadeira Ergonômica Herman Miller',
    description: 'Cadeira de escritório ergonômica Herman Miller Aeron, tamanho B',
    category: 'Furniture',
    subcategory: 'Office Chairs',
    sku: 'HM-AERON-B-001',
    barcode: '3456789012345',
    quantity: 8,
    minStock: 3,
    maxStock: 15,
    unitPrice: 1299.99,
    totalValue: 10399.92,
    supplier: 'Herman Miller',
    location: 'B1-A1-C2',
    warehouse: 'Furniture Warehouse',
    status: 'active',
    tags: ['chair', 'ergonomic', 'office'],
    createdAt: new Date('2024-01-05'),
    updatedAt: new Date('2024-01-16'),
    lastMovement: new Date('2024-01-14'),
    createdBy: 'Pedro Oliveira',
    updatedBy: 'Ana Costa'
  },
  {
    id: '4',
    name: 'Smartphone Samsung Galaxy S24',
    description: 'Smartphone Samsung Galaxy S24, 256GB, Phantom Black',
    category: 'Electronics',
    subcategory: 'Mobile Devices',
    sku: 'SAM-S24-256-001',
    barcode: '4567890123456',
    quantity: 2,
    minStock: 5,
    maxStock: 20,
    unitPrice: 899.99,
    totalValue: 1799.98,
    supplier: 'Samsung Electronics',
    location: 'A3-B2-C1',
    warehouse: 'Main Warehouse',
    status: 'out_of_stock',
    tags: ['smartphone', 'samsung', 'mobile'],
    createdAt: new Date('2024-01-12'),
    updatedAt: new Date('2024-01-21'),
    lastMovement: new Date('2024-01-20'),
    createdBy: 'Maria Santos',
    updatedBy: 'Pedro Oliveira'
  },
  {
    id: '5',
    name: 'Mesa de Escritório IKEA',
    description: 'Mesa de escritório IKEA BEKANT, 160x80cm, branca',
    category: 'Furniture',
    subcategory: 'Desks',
    sku: 'IKEA-BEKANT-160-001',
    barcode: '5678901234567',
    quantity: 12,
    minStock: 5,
    maxStock: 25,
    unitPrice: 149.99,
    totalValue: 1799.88,
    supplier: 'IKEA',
    location: 'B2-A2-C1',
    warehouse: 'Furniture Warehouse',
    status: 'active',
    tags: ['desk', 'office', 'white'],
    createdAt: new Date('2024-01-08'),
    updatedAt: new Date('2024-01-15'),
    lastMovement: new Date('2024-01-13'),
    createdBy: 'João Silva',
    updatedBy: 'Maria Santos'
  },
  {
    id: '6',
    name: 'Monitor LG UltraWide 34"',
    description: 'Monitor LG UltraWide 34WN80C-B, 34 polegadas, 3440x1440, USB-C',
    category: 'Electronics',
    subcategory: 'Monitors',
    sku: 'LG-UW34-001',
    barcode: '6789012345678',
    quantity: 7,
    minStock: 3,
    maxStock: 15,
    unitPrice: 449.99,
    totalValue: 3149.93,
    supplier: 'LG Electronics',
    location: 'A1-B3-C2',
    warehouse: 'Main Warehouse',
    status: 'active',
    tags: ['monitor', 'ultrawide', 'usb-c'],
    createdAt: new Date('2024-01-06'),
    updatedAt: new Date('2024-01-18'),
    lastMovement: new Date('2024-01-16'),
    createdBy: 'Ana Costa',
    updatedBy: 'João Silva'
  },
  {
    id: '7',
    name: 'Impressora HP LaserJet Pro',
    description: 'Impressora HP LaserJet Pro M404dn, monocromática, duplex automático',
    category: 'Electronics',
    subcategory: 'Printers',
    sku: 'HP-LJ-M404-001',
    barcode: '7890123456789',
    quantity: 4,
    minStock: 2,
    maxStock: 10,
    unitPrice: 299.99,
    totalValue: 1199.96,
    supplier: 'HP Inc.',
    location: 'A2-B2-C3',
    warehouse: 'Main Warehouse',
    status: 'active',
    tags: ['printer', 'laser', 'duplex'],
    createdAt: new Date('2024-01-11'),
    updatedAt: new Date('2024-01-17'),
    lastMovement: new Date('2024-01-15'),
    createdBy: 'Pedro Oliveira',
    updatedBy: 'Ana Costa'
  },
  {
    id: '8',
    name: 'Teclado Mecânico Keychron K2',
    description: 'Teclado mecânico sem fio Keychron K2, switches Gateron Blue, RGB',
    category: 'Electronics',
    subcategory: 'Peripherals',
    sku: 'KEY-K2-BLUE-001',
    barcode: '8901234567890',
    quantity: 18,
    minStock: 8,
    maxStock: 35,
    unitPrice: 79.99,
    totalValue: 1439.82,
    supplier: 'Keychron',
    location: 'A2-B1-C2',
    warehouse: 'Main Warehouse',
    status: 'active',
    tags: ['keyboard', 'mechanical', 'wireless', 'rgb'],
    createdAt: new Date('2024-01-09'),
    updatedAt: new Date('2024-01-19'),
    lastMovement: new Date('2024-01-17'),
    createdBy: 'Maria Santos',
    updatedBy: 'Pedro Oliveira'
  },
  {
    id: '9',
    name: 'Webcam Logitech C920',
    description: 'Webcam Logitech C920 HD Pro, 1080p, microfone estéreo',
    category: 'Electronics',
    subcategory: 'Peripherals',
    sku: 'LOG-C920-001',
    barcode: '9012345678901',
    quantity: 0,
    minStock: 5,
    maxStock: 20,
    unitPrice: 69.99,
    totalValue: 0,
    supplier: 'Logitech',
    location: 'A3-B1-C1',
    warehouse: 'Main Warehouse',
    status: 'out_of_stock',
    tags: ['webcam', 'hd', 'microphone'],
    createdAt: new Date('2024-01-07'),
    updatedAt: new Date('2024-01-20'),
    lastMovement: new Date('2024-01-19'),
    createdBy: 'João Silva',
    updatedBy: 'Maria Santos'
  },
  {
    id: '10',
    name: 'Luminária LED de Mesa',
    description: 'Luminária LED de mesa ajustável, 3 níveis de brilho, USB',
    category: 'Furniture',
    subcategory: 'Lighting',
    sku: 'LED-DESK-001',
    barcode: '0123456789012',
    quantity: 22,
    minStock: 10,
    maxStock: 40,
    unitPrice: 39.99,
    totalValue: 879.78,
    supplier: 'Generic Lighting Co.',
    location: 'B1-A3-C1',
    warehouse: 'Furniture Warehouse',
    status: 'active',
    tags: ['lamp', 'led', 'adjustable', 'usb'],
    createdAt: new Date('2024-01-04'),
    updatedAt: new Date('2024-01-14'),
    lastMovement: new Date('2024-01-12'),
    createdBy: 'Ana Costa',
    updatedBy: 'João Silva'
  }
];

export const mockCategories = [
  { id: 'electronics', label: 'Electronics', value: 'Electronics' },
  { id: 'furniture', label: 'Furniture', value: 'Furniture' },
  { id: 'office-supplies', label: 'Office Supplies', value: 'Office Supplies' },
  { id: 'tools', label: 'Tools', value: 'Tools' }
];

export const mockSuppliers = [
  { id: 'dell', label: 'Dell Technologies', value: 'Dell Technologies' },
  { id: 'logitech', label: 'Logitech', value: 'Logitech' },
  { id: 'herman-miller', label: 'Herman Miller', value: 'Herman Miller' },
  { id: 'samsung', label: 'Samsung Electronics', value: 'Samsung Electronics' },
  { id: 'ikea', label: 'IKEA', value: 'IKEA' },
  { id: 'lg', label: 'LG Electronics', value: 'LG Electronics' },
  { id: 'hp', label: 'HP Inc.', value: 'HP Inc.' },
  { id: 'keychron', label: 'Keychron', value: 'Keychron' },
  { id: 'generic', label: 'Generic Lighting Co.', value: 'Generic Lighting Co.' }
];

export const mockWarehouses = [
  { id: 'main', label: 'Main Warehouse', value: 'Main Warehouse' },
  { id: 'furniture', label: 'Furniture Warehouse', value: 'Furniture Warehouse' },
  { id: 'electronics', label: 'Electronics Warehouse', value: 'Electronics Warehouse' }
];

export const mockStatuses = [
  { id: 'active', label: 'Active', value: 'active' },
  { id: 'inactive', label: 'Inactive', value: 'inactive' },
  { id: 'discontinued', label: 'Discontinued', value: 'discontinued' },
  { id: 'out_of_stock', label: 'Out of Stock', value: 'out_of_stock' }
];

export const mockUsers = [
  { id: 'joao', label: 'João Silva', value: 'João Silva' },
  { id: 'maria', label: 'Maria Santos', value: 'Maria Santos' },
  { id: 'ana', label: 'Ana Costa', value: 'Ana Costa' },
  { id: 'pedro', label: 'Pedro Oliveira', value: 'Pedro Oliveira' }
];