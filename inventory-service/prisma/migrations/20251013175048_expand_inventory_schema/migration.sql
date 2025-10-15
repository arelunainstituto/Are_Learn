/*
  Warnings:

  - You are about to drop the column `categoryId` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `locations` table. All the data in the column will be lost.
  - Added the required column `code` to the `categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseId` to the `inventory_items` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `locations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseId` to the `locations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "warehouses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "address" TEXT,
    "manager" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "settings" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "warehouses_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "categoryId" TEXT NOT NULL,
    "brand" TEXT,
    "model" TEXT,
    "barcode" TEXT,
    "qrCode" TEXT,
    "unitPrice" DECIMAL,
    "costPrice" DECIMAL,
    "weight" DECIMAL,
    "dimensions" TEXT,
    "unit" TEXT NOT NULL DEFAULT 'un',
    "status" TEXT NOT NULL DEFAULT 'active',
    "tags" TEXT NOT NULL DEFAULT '',
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "products_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "product_variants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "attributes" TEXT NOT NULL,
    "barcode" TEXT,
    "qrCode" TEXT,
    "unitPrice" DECIMAL,
    "costPrice" DECIMAL,
    "weight" DECIMAL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "product_variants_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "batches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "batchNumber" TEXT NOT NULL,
    "productId" TEXT,
    "variantId" TEXT,
    "manufactureDate" DATETIME,
    "expiryDate" DATETIME,
    "supplier" TEXT,
    "notes" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "batches_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "series" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "serialNumber" TEXT NOT NULL,
    "productId" TEXT,
    "variantId" TEXT,
    "batchId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'available',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "series_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stock_balances" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "reservedQty" INTEGER NOT NULL DEFAULT 0,
    "availableQty" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stock_balances_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventory_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stock_reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "reservedFor" TEXT NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'order',
    "status" TEXT NOT NULL DEFAULT 'active',
    "expiresAt" DATETIME,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stock_reservations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventory_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "reference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dueDate" DATETIME,
    "supplier" TEXT,
    "customer" TEXT,
    "notes" TEXT,
    "totalValue" DECIMAL,
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdBy" TEXT,
    "approvedBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "documents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "documents_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stock_ledger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "movementId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "balance" INTEGER NOT NULL,
    "unitPrice" DECIMAL,
    "totalValue" DECIMAL,
    "reference" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stock_ledger_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_ledger_movementId_fkey" FOREIGN KEY ("movementId") REFERENCES "inventory_movements" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "audit_trail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "oldValues" TEXT,
    "newValues" TEXT,
    "userId" TEXT,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "audit_trail_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "integration_mappings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "internalId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "systemName" TEXT NOT NULL,
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "lastSyncAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "integration_mappings_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "parentId" TEXT,
    "color" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "categories_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_categories" ("color", "createdAt", "description", "id", "isActive", "name", "parentId", "tenantId", "updatedAt") SELECT "color", "createdAt", "description", "id", "isActive", "name", "parentId", "tenantId", "updatedAt" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
CREATE UNIQUE INDEX "categories_tenantId_code_key" ON "categories"("tenantId", "code");
CREATE TABLE "new_inventory_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "productId" TEXT,
    "variantId" TEXT,
    "batchId" TEXT,
    "seriesId" TEXT,
    "sku" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "barcode" TEXT,
    "qrCode" TEXT,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "reservedQty" INTEGER NOT NULL DEFAULT 0,
    "availableQty" INTEGER NOT NULL DEFAULT 0,
    "minQuantity" INTEGER NOT NULL DEFAULT 0,
    "maxQuantity" INTEGER,
    "unitPrice" DECIMAL,
    "totalValue" DECIMAL,
    "unit" TEXT NOT NULL DEFAULT 'un',
    "status" TEXT NOT NULL DEFAULT 'active',
    "tags" TEXT NOT NULL DEFAULT '',
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "lastCountDate" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "inventory_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_inventory_items" ("barcode", "createdAt", "description", "id", "lastCountDate", "locationId", "maxQuantity", "metadata", "minQuantity", "name", "qrCode", "quantity", "sku", "status", "tags", "tenantId", "totalValue", "unit", "unitPrice", "updatedAt") SELECT "barcode", "createdAt", "description", "id", "lastCountDate", "locationId", "maxQuantity", "metadata", "minQuantity", "name", "qrCode", "quantity", "sku", "status", "tags", "tenantId", "totalValue", "unit", "unitPrice", "updatedAt" FROM "inventory_items";
DROP TABLE "inventory_items";
ALTER TABLE "new_inventory_items" RENAME TO "inventory_items";
CREATE UNIQUE INDEX "inventory_items_tenantId_warehouseId_locationId_sku_key" ON "inventory_items"("tenantId", "warehouseId", "locationId", "sku");
CREATE TABLE "new_inventory_movements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "documentId" TEXT,
    "itemId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "previousQuantity" INTEGER NOT NULL,
    "newQuantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL,
    "totalValue" DECIMAL,
    "fromLocationId" TEXT,
    "toLocationId" TEXT,
    "reference" TEXT,
    "notes" TEXT,
    "userId" TEXT,
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inventory_movements_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventory_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_toLocationId_fkey" FOREIGN KEY ("toLocationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_inventory_movements" ("createdAt", "fromLocationId", "id", "itemId", "metadata", "newQuantity", "notes", "previousQuantity", "quantity", "reference", "tenantId", "toLocationId", "totalValue", "type", "unitPrice", "userId") SELECT "createdAt", "fromLocationId", "id", "itemId", "metadata", "newQuantity", "notes", "previousQuantity", "quantity", "reference", "tenantId", "toLocationId", "totalValue", "type", "unitPrice", "userId" FROM "inventory_movements";
DROP TABLE "inventory_movements";
ALTER TABLE "new_inventory_movements" RENAME TO "inventory_movements";
CREATE TABLE "new_locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL DEFAULT 'bin',
    "parentId" TEXT,
    "coordinates" TEXT,
    "capacity" INTEGER,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "locations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "locations_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "locations_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_locations" ("coordinates", "createdAt", "description", "id", "isActive", "name", "parentId", "tenantId", "updatedAt") SELECT "coordinates", "createdAt", "description", "id", "isActive", "name", "parentId", "tenantId", "updatedAt" FROM "locations";
DROP TABLE "locations";
ALTER TABLE "new_locations" RENAME TO "locations";
CREATE UNIQUE INDEX "locations_tenantId_warehouseId_code_key" ON "locations"("tenantId", "warehouseId", "code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "warehouses_tenantId_code_key" ON "warehouses"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "products_tenantId_sku_key" ON "products"("tenantId", "sku");

-- CreateIndex
CREATE UNIQUE INDEX "product_variants_tenantId_sku_key" ON "product_variants"("tenantId", "sku");

-- CreateIndex
CREATE UNIQUE INDEX "batches_tenantId_batchNumber_key" ON "batches"("tenantId", "batchNumber");

-- CreateIndex
CREATE UNIQUE INDEX "series_tenantId_serialNumber_key" ON "series"("tenantId", "serialNumber");

-- CreateIndex
CREATE UNIQUE INDEX "stock_balances_itemId_locationId_key" ON "stock_balances"("itemId", "locationId");

-- CreateIndex
CREATE UNIQUE INDEX "documents_tenantId_type_number_key" ON "documents"("tenantId", "type", "number");

-- CreateIndex
CREATE UNIQUE INDEX "stock_ledger_movementId_key" ON "stock_ledger"("movementId");

-- CreateIndex
CREATE UNIQUE INDEX "integration_mappings_tenantId_entityType_internalId_systemName_key" ON "integration_mappings"("tenantId", "entityType", "internalId", "systemName");

-- CreateIndex
CREATE UNIQUE INDEX "integration_mappings_tenantId_entityType_externalId_systemName_key" ON "integration_mappings"("tenantId", "entityType", "externalId", "systemName");
