import { z } from 'zod';

// Base schemas
export const TenantSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(1, 'Nome do tenant é obrigatório'),
  slug: z.string().regex(/^[a-z0-9-]+$/, 'Slug deve conter apenas letras minúsculas, números e hífens'),
  domain: z.string().url().optional(),
  settings: z.record(z.any()).default({}),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const CategorySchema = z.object({
  id: z.string().cuid(),
  tenantId: z.string().cuid(),
  name: z.string().min(1, 'Nome da categoria é obrigatório'),
  description: z.string().optional(),
  parentId: z.string().cuid().optional(),
  color: z.string().regex(/^#[0-9A-F]{6}$/i, 'Cor deve ser um hex válido').optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const LocationSchema = z.object({
  id: z.string().cuid(),
  tenantId: z.string().cuid(),
  name: z.string().min(1, 'Nome da localização é obrigatório'),
  description: z.string().optional(),
  address: z.string().optional(),
  parentId: z.string().cuid().optional(),
  coordinates: z.object({
    lat: z.number(),
    lng: z.number(),
  }).optional(),
  isActive: z.boolean().default(true),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

export const InventoryItemSchema = z.object({
  id: z.string().cuid(),
  tenantId: z.string().cuid(),
  sku: z.string().min(1, 'SKU é obrigatório'),
  name: z.string().min(1, 'Nome do item é obrigatório'),
  description: z.string().optional(),
  categoryId: z.string().cuid(),
  locationId: z.string().cuid(),
  barcode: z.string().optional(),
  qrCode: z.string().optional(),
  quantity: z.number().int().min(0, 'Quantidade não pode ser negativa').default(0),
  minQuantity: z.number().int().min(0).default(0),
  maxQuantity: z.number().int().min(0).optional(),
  unitPrice: z.number().min(0, 'Preço unitário não pode ser negativo').optional(),
  totalValue: z.number().min(0).optional(),
  unit: z.string().default('un'),
  status: z.enum(['active', 'inactive', 'discontinued', 'out_of_stock']).default('active'),
  tags: z.array(z.string()).default([]),
  metadata: z.record(z.any()).default({}),
  lastCountDate: z.date().optional(),
  createdAt: z.date().default(() => new Date()),
  updatedAt: z.date().default(() => new Date()),
});

// User's simplified MovementType enum (aligned with schema)
export const MovementType = z.enum(["IN", "OUT", "TRANSFER", "ADJUST"]);

// Extended MovementType enum for internal use
export const MovementTypeEnum = z.enum([
  'in',           // Entrada
  'out',          // Saída
  'transfer',     // Transferência
  'adjustment',   // Ajuste
  'count',        // Contagem
  'return',       // Devolução
  'loss',         // Perda
  'found',        // Achado
]);

export const InventoryMovementSchema = z.object({
  id: z.string().cuid(),
  tenantId: z.string().cuid(),
  itemId: z.string().cuid(),
  type: MovementTypeEnum,
  quantity: z.number().int(),
  previousQuantity: z.number().int().min(0),
  newQuantity: z.number().int().min(0),
  unitPrice: z.number().min(0).optional(),
  totalValue: z.number().optional(),
  fromLocationId: z.string().cuid().optional(),
  toLocationId: z.string().cuid().optional(),
  reference: z.string().optional(), // Referência externa (nota fiscal, ordem, etc.)
  notes: z.string().optional(),
  userId: z.string().cuid().optional(),
  metadata: z.record(z.any()).default({}),
  createdAt: z.date().default(() => new Date()),
});

// User's MovementCreate schema (aligned with Prisma schema)
export const MovementCreate = z.object({
  tenantId: z.string().cuid(),
  type: MovementType,
  productId: z.string(),
  variantId: z.string().optional(),
  lotId: z.string().optional(),
  serial: z.string().optional(),
  fromLocationId: z.string().optional(),
  toLocationId: z.string().optional(),
  qty: z.number().positive(),
  uom: z.string().default("pc"),
  refDocumentId: z.string().optional(),
  note: z.string().optional(),
});

export type MovementCreateInput = z.infer<typeof MovementCreate>;

// User's ProductCreate schema (aligned with Prisma schema)
export const ProductCreate = z.object({
  tenantId: z.string().cuid(),
  sku: z.string().min(1),
  name: z.string().min(1),
  uom: z.string().min(1),
  trackLot: z.boolean().default(false),
  trackSerial: z.boolean().default(false),
});

export type ProductCreateInput = z.infer<typeof ProductCreate>;

// DTOs para API
export const CreateTenantDto = TenantSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdateTenantDto = CreateTenantDto.partial();

export const CreateCategoryDto = CategorySchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdateCategoryDto = CreateCategoryDto.partial();

export const CreateLocationDto = LocationSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true 
});

export const UpdateLocationDto = CreateLocationDto.partial();

export const CreateInventoryItemDto = InventoryItemSchema.omit({ 
  id: true, 
  createdAt: true, 
  updatedAt: true,
  totalValue: true 
});

export const UpdateInventoryItemDto = CreateInventoryItemDto.partial();

export const CreateMovementDto = InventoryMovementSchema.omit({ 
  id: true, 
  createdAt: true,
  previousQuantity: true,
  newQuantity: true 
});

// Query schemas
export const InventoryQuerySchema = z.object({
  tenantId: z.string().cuid(),
  categoryId: z.string().cuid().optional(),
  locationId: z.string().cuid().optional(),
  status: z.enum(['active', 'inactive', 'discontinued', 'out_of_stock']).optional(),
  search: z.string().optional(),
  minQuantity: z.number().int().min(0).optional(),
  maxQuantity: z.number().int().min(0).optional(),
  tags: z.array(z.string()).optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['name', 'sku', 'quantity', 'createdAt', 'updatedAt']).default('name'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export const MovementQuerySchema = z.object({
  tenantId: z.string().cuid(),
  itemId: z.string().cuid().optional(),
  type: MovementTypeEnum.optional(),
  fromDate: z.date().optional(),
  toDate: z.date().optional(),
  locationId: z.string().cuid().optional(),
  userId: z.string().cuid().optional(),
  page: z.number().int().min(1).default(1),
  limit: z.number().int().min(1).max(100).default(20),
  sortBy: z.enum(['createdAt', 'quantity', 'type']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// Response schemas
export const InventoryStatsSchema = z.object({
  totalItems: z.number().int(),
  totalValue: z.number(),
  lowStockItems: z.number().int(),
  outOfStockItems: z.number().int(),
  categoriesCount: z.number().int(),
  locationsCount: z.number().int(),
  recentMovements: z.number().int(),
});

export const PaginatedResponseSchema = <T extends z.ZodTypeAny>(itemSchema: T) =>
  z.object({
    data: z.array(itemSchema),
    pagination: z.object({
      page: z.number().int(),
      limit: z.number().int(),
      total: z.number().int(),
      totalPages: z.number().int(),
      hasNext: z.boolean(),
      hasPrev: z.boolean(),
    }),
  });

// Type exports
export type Tenant = z.infer<typeof TenantSchema>;
export type Category = z.infer<typeof CategorySchema>;
export type Location = z.infer<typeof LocationSchema>;
export type InventoryItem = z.infer<typeof InventoryItemSchema>;
export type InventoryMovement = z.infer<typeof InventoryMovementSchema>;
export type MovementType = z.infer<typeof MovementTypeEnum>;

export type CreateTenant = z.infer<typeof CreateTenantDto>;
export type UpdateTenant = z.infer<typeof UpdateTenantDto>;
export type CreateCategory = z.infer<typeof CreateCategoryDto>;
export type UpdateCategory = z.infer<typeof UpdateCategoryDto>;
export type CreateLocation = z.infer<typeof CreateLocationDto>;
export type UpdateLocation = z.infer<typeof UpdateLocationDto>;
export type CreateInventoryItem = z.infer<typeof CreateInventoryItemDto>;
export type UpdateInventoryItem = z.infer<typeof UpdateInventoryItemDto>;
export type CreateMovement = z.infer<typeof CreateMovementDto>;

export type InventoryQuery = z.infer<typeof InventoryQuerySchema>;
export type MovementQuery = z.infer<typeof MovementQuerySchema>;
export type InventoryStats = z.infer<typeof InventoryStatsSchema>;