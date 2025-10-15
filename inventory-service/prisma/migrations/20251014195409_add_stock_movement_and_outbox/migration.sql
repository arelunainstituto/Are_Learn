/*
  Warnings:

  - You are about to drop the column `changes` on the `audit_trail` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `audit_trail` table. All the data in the column will be lost.
  - You are about to drop the column `expiryDate` on the `batches` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `batches` table. All the data in the column will be lost.
  - You are about to drop the column `manufactureDate` on the `batches` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `batches` table. All the data in the column will be lost.
  - You are about to drop the column `color` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the column `batchNumber` on the `document_lines` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `document_lines` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `document_lines` table. All the data in the column will be lost.
  - You are about to drop the column `serialNumber` on the `document_lines` table. All the data in the column will be lost.
  - You are about to drop the column `totalPrice` on the `document_lines` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `document_lines` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `document_lines` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `document_lines` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `approvedBy` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `currency` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `customer` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `destinationWarehouseId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `documentDate` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `documentNumber` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `dueDate` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `externalId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `partnerId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `partnerName` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `referenceNumber` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `sourceWarehouseId` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `supplier` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `totalAmount` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `documents` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `integration_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `lastSyncAt` on the `integration_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `systemName` on the `integration_mappings` table. All the data in the column will be lost.
  - You are about to drop the column `barcode` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `lastCountDate` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `maxQuantity` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `minQuantity` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `qrCode` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `inventory_items` table. All the data in the column will be lost.
  - You are about to alter the column `availableQty` on the `inventory_items` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `quantity` on the `inventory_items` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `reservedQty` on the `inventory_items` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `metadata` on the `inventory_movements` table. All the data in the column will be lost.
  - You are about to drop the column `newQuantity` on the `inventory_movements` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `inventory_movements` table. All the data in the column will be lost.
  - You are about to drop the column `previousQuantity` on the `inventory_movements` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `inventory_movements` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `inventory_movements` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `inventory_movements` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `inventory_movements` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `coordinates` on the `locations` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `locations` table. All the data in the column will be lost.
  - You are about to alter the column `capacity` on the `locations` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `attributes` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `costPrice` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `description` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `qrCode` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `product_variants` table. All the data in the column will be lost.
  - You are about to drop the column `barcode` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `brand` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `costPrice` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `dimensions` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `metadata` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `model` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `qrCode` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `sku` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `unit` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `products` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `stock_balances` table. All the data in the column will be lost.
  - You are about to drop the column `lastUpdated` on the `stock_balances` table. All the data in the column will be lost.
  - You are about to alter the column `availableQty` on the `stock_balances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `quantity` on the `stock_balances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to alter the column `reservedQty` on the `stock_balances` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `balance` on the `stock_ledger` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `stock_ledger` table. All the data in the column will be lost.
  - You are about to drop the column `itemId` on the `stock_ledger` table. All the data in the column will be lost.
  - You are about to drop the column `movementId` on the `stock_ledger` table. All the data in the column will be lost.
  - You are about to drop the column `totalValue` on the `stock_ledger` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `stock_ledger` table. All the data in the column will be lost.
  - You are about to drop the column `unitPrice` on the `stock_ledger` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `stock_ledger` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `metadata` on the `stock_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `notes` on the `stock_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `priority` on the `stock_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `referenceId` on the `stock_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `referenceType` on the `stock_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `stock_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `stock_reservations` table. All the data in the column will be lost.
  - You are about to alter the column `quantity` on the `stock_reservations` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Float`.
  - You are about to drop the column `description` on the `warehouses` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `warehouses` table. All the data in the column will be lost.
  - You are about to drop the column `manager` on the `warehouses` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `warehouses` table. All the data in the column will be lost.
  - You are about to drop the column `settings` on the `warehouses` table. All the data in the column will be lost.
  - Made the column `productId` on table `document_lines` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `number` to the `documents` table without a default value. This is not possible if the table is not empty.
  - Added the required column `externalSystem` to the `integration_mappings` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `inventory_items` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `productId` to the `inventory_movements` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `product_variants` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `products` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `stock_balances` table without a default value. This is not possible if the table is not empty.
  - Made the column `productId` on table `stock_balances` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `movementType` to the `stock_ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `stock_ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `runningBalance` to the `stock_ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseId` to the `stock_ledger` table without a default value. This is not possible if the table is not empty.
  - Added the required column `reason` to the `stock_reservations` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "role" TEXT NOT NULL DEFAULT 'user',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "users_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "companies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "taxId" TEXT,
    "address" TEXT,
    "phone" TEXT,
    "email" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "companies_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "stock_movements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "batchId" TEXT,
    "seriesId" TEXT,
    "warehouseId" TEXT NOT NULL,
    "locationId" TEXT,
    "type" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "unitCost" REAL,
    "totalCost" REAL,
    "reference" TEXT,
    "processedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stock_movements_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_movements_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_movements_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_movements_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_movements_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_movements_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_movements_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stock_movements_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "outbox_events" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "aggregateId" TEXT NOT NULL,
    "payload" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'pending',
    "retryCount" INTEGER NOT NULL DEFAULT 0,
    "maxRetries" INTEGER NOT NULL DEFAULT 3,
    "scheduledAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "processedAt" DATETIME,
    "error" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "outbox_events_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "_CompanyToUser" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_CompanyToUser_A_fkey" FOREIGN KEY ("A") REFERENCES "companies" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_CompanyToUser_B_fkey" FOREIGN KEY ("B") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_audit_trail" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "action" TEXT NOT NULL,
    "oldValues" TEXT,
    "newValues" TEXT,
    "userId" TEXT,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "ipAddress" TEXT,
    "userAgent" TEXT,
    CONSTRAINT "audit_trail_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_audit_trail" ("action", "entityId", "entityType", "id", "ipAddress", "newValues", "oldValues", "tenantId", "userAgent", "userId") SELECT "action", "entityId", "entityType", "id", "ipAddress", "newValues", "oldValues", "tenantId", "userAgent", "userId" FROM "audit_trail";
DROP TABLE "audit_trail";
ALTER TABLE "new_audit_trail" RENAME TO "audit_trail";
CREATE TABLE "new_batches" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "batchNumber" TEXT NOT NULL,
    "productId" TEXT,
    "variantId" TEXT,
    "manufacturingDate" DATETIME,
    "expirationDate" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'available',
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "batches_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_batches" ("batchNumber", "createdAt", "id", "notes", "productId", "tenantId", "updatedAt", "variantId") SELECT "batchNumber", "createdAt", "id", "notes", "productId", "tenantId", "updatedAt", "variantId" FROM "batches";
DROP TABLE "batches";
ALTER TABLE "new_batches" RENAME TO "batches";
CREATE UNIQUE INDEX "batches_tenantId_batchNumber_key" ON "batches"("tenantId", "batchNumber");
CREATE TABLE "new_categories" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "parentId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "categories_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "categories_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_categories" ("code", "createdAt", "description", "id", "isActive", "name", "parentId", "tenantId", "updatedAt") SELECT "code", "createdAt", "description", "id", "isActive", "name", "parentId", "tenantId", "updatedAt" FROM "categories";
DROP TABLE "categories";
ALTER TABLE "new_categories" RENAME TO "categories";
CREATE UNIQUE INDEX "categories_tenantId_code_key" ON "categories"("tenantId", "code");
CREATE TABLE "new_document_lines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "warehouseId" TEXT,
    "locationId" TEXT,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "batchId" TEXT,
    "seriesId" TEXT,
    "quantity" REAL NOT NULL,
    "unitCost" REAL,
    "totalCost" REAL,
    "notes" TEXT,
    "lineNumber" INTEGER NOT NULL DEFAULT 1,
    CONSTRAINT "document_lines_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "document_lines_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "document_lines_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "document_lines_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "document_lines_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "document_lines_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "document_lines_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "document_lines_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_document_lines" ("documentId", "id", "lineNumber", "locationId", "notes", "productId", "quantity", "tenantId", "variantId", "warehouseId") SELECT "documentId", "id", "lineNumber", "locationId", "notes", "productId", "quantity", "tenantId", "variantId", "warehouseId" FROM "document_lines";
DROP TABLE "document_lines";
ALTER TABLE "new_document_lines" RENAME TO "document_lines";
CREATE TABLE "new_documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "warehouseId" TEXT,
    "type" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "reference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "notes" TEXT,
    "metadata" TEXT,
    "createdBy" TEXT,
    "confirmedAt" DATETIME,
    "confirmedBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "documents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "documents_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "documents_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "documents_createdBy_fkey" FOREIGN KEY ("createdBy") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_documents" ("createdAt", "createdBy", "date", "id", "metadata", "notes", "status", "tenantId", "type", "updatedAt", "warehouseId", "number") SELECT "createdAt", "createdBy", "date", "id", "metadata", "notes", "status", "tenantId", "type", "updatedAt", "warehouseId", COALESCE("documentNumber", "type" || '-' || substr("id", 1, 8)) FROM "documents";
DROP TABLE "documents";
ALTER TABLE "new_documents" RENAME TO "documents";
CREATE UNIQUE INDEX "documents_tenantId_number_key" ON "documents"("tenantId", "number");
CREATE TABLE "new_integration_mappings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "internalId" TEXT NOT NULL,
    "externalId" TEXT NOT NULL,
    "externalSystem" TEXT NOT NULL,
    "metadata" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "integration_mappings_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_integration_mappings" ("createdAt", "entityType", "externalId", "id", "internalId", "metadata", "tenantId", "updatedAt") SELECT "createdAt", "entityType", "externalId", "id", "internalId", "metadata", "tenantId", "updatedAt" FROM "integration_mappings";
DROP TABLE "integration_mappings";
ALTER TABLE "new_integration_mappings" RENAME TO "integration_mappings";
CREATE UNIQUE INDEX "integration_mappings_tenantId_entityType_externalSystem_externalId_key" ON "integration_mappings"("tenantId", "entityType", "externalSystem", "externalId");
CREATE TABLE "new_inventory_items" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "locationId" TEXT,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "batchId" TEXT,
    "seriesId" TEXT,
    "quantity" REAL NOT NULL DEFAULT 0,
    "reservedQty" REAL NOT NULL DEFAULT 0,
    "availableQty" REAL NOT NULL DEFAULT 0,
    "unitCost" REAL,
    "lastMovementAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "inventory_items_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_items_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_inventory_items" ("availableQty", "batchId", "createdAt", "id", "locationId", "productId", "quantity", "reservedQty", "seriesId", "tenantId", "updatedAt", "variantId", "warehouseId") SELECT "availableQty", "batchId", "createdAt", "id", "locationId", "productId", "quantity", "reservedQty", "seriesId", "tenantId", "updatedAt", "variantId", "warehouseId" FROM "inventory_items";
DROP TABLE "inventory_items";
ALTER TABLE "new_inventory_items" RENAME TO "inventory_items";
CREATE UNIQUE INDEX "inventory_items_tenantId_warehouseId_locationId_productId_variantId_batchId_seriesId_key" ON "inventory_items"("tenantId", "warehouseId", "locationId", "productId", "variantId", "batchId", "seriesId");
CREATE TABLE "new_inventory_movements" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT,
    "documentId" TEXT,
    "type" TEXT NOT NULL,
    "fromWarehouseId" TEXT,
    "toWarehouseId" TEXT,
    "fromLocationId" TEXT,
    "toLocationId" TEXT,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "batchId" TEXT,
    "seriesId" TEXT,
    "quantity" REAL NOT NULL,
    "unitCost" REAL,
    "totalCost" REAL,
    "reason" TEXT,
    "reference" TEXT,
    "processedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "inventory_movements_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventory_items" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_fromWarehouseId_fkey" FOREIGN KEY ("fromWarehouseId") REFERENCES "warehouses" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_toWarehouseId_fkey" FOREIGN KEY ("toWarehouseId") REFERENCES "warehouses" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_fromLocationId_fkey" FOREIGN KEY ("fromLocationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "inventory_movements_toLocationId_fkey" FOREIGN KEY ("toLocationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_inventory_movements" ("createdAt", "documentId", "fromLocationId", "id", "itemId", "quantity", "reference", "tenantId", "toLocationId", "type", "productId") 
SELECT im."createdAt", im."documentId", im."fromLocationId", im."id", im."itemId", im."quantity", im."reference", im."tenantId", im."toLocationId", im."type", 
       COALESCE(ii."productId", (SELECT "id" FROM "products" WHERE "tenantId" = im."tenantId" LIMIT 1))
FROM "inventory_movements" im
LEFT JOIN "inventory_items" ii ON im."itemId" = ii."id";
DROP TABLE "inventory_movements";
ALTER TABLE "new_inventory_movements" RENAME TO "inventory_movements";
CREATE TABLE "new_locations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "parentId" TEXT,
    "type" TEXT NOT NULL DEFAULT 'zone',
    "capacity" REAL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "locations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "locations_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "locations_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_locations" ("capacity", "code", "createdAt", "id", "isActive", "name", "parentId", "tenantId", "type", "updatedAt", "warehouseId") SELECT "capacity", "code", "createdAt", "id", "isActive", "name", "parentId", "tenantId", "type", "updatedAt", "warehouseId" FROM "locations";
DROP TABLE "locations";
ALTER TABLE "new_locations" RENAME TO "locations";
CREATE UNIQUE INDEX "locations_tenantId_warehouseId_code_key" ON "locations"("tenantId", "warehouseId", "code");
CREATE TABLE "new_product_variants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "sku" TEXT,
    "barcode" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "product_variants_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "product_variants_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_product_variants" ("barcode", "createdAt", "id", "isActive", "name", "productId", "sku", "tenantId", "updatedAt") SELECT "barcode", "createdAt", "id", "isActive", "name", "productId", "sku", "tenantId", "updatedAt" FROM "product_variants";
DROP TABLE "product_variants";
ALTER TABLE "new_product_variants" RENAME TO "product_variants";
CREATE UNIQUE INDEX "product_variants_tenantId_productId_code_key" ON "product_variants"("tenantId", "productId", "code");
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "categoryId" TEXT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "unitOfMeasure" TEXT NOT NULL DEFAULT 'unit',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "products_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_products" ("categoryId", "createdAt", "description", "id", "name", "tenantId", "updatedAt", "code") SELECT "categoryId", "createdAt", "description", "id", "name", "tenantId", "updatedAt", COALESCE("sku", "name") FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_tenantId_code_key" ON "products"("tenantId", "code");
CREATE TABLE "new_stock_balances" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "locationId" TEXT,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "batchId" TEXT,
    "seriesId" TEXT,
    "quantity" REAL NOT NULL DEFAULT 0,
    "reservedQty" REAL NOT NULL DEFAULT 0,
    "availableQty" REAL NOT NULL DEFAULT 0,
    "unitCost" REAL,
    "lastMovementAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stock_balances_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_stock_balances" ("availableQty", "batchId", "id", "locationId", "productId", "quantity", "reservedQty", "seriesId", "tenantId", "variantId", "warehouseId") SELECT "availableQty", "batchId", "id", "locationId", "productId", "quantity", "reservedQty", "seriesId", "tenantId", "variantId", "warehouseId" FROM "stock_balances";
DROP TABLE "stock_balances";
ALTER TABLE "new_stock_balances" RENAME TO "stock_balances";
CREATE UNIQUE INDEX "stock_balances_tenantId_warehouseId_locationId_productId_variantId_batchId_seriesId_key" ON "stock_balances"("tenantId", "warehouseId", "locationId", "productId", "variantId", "batchId", "seriesId");
CREATE TABLE "new_stock_ledger" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "locationId" TEXT,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "batchId" TEXT,
    "seriesId" TEXT,
    "movementType" TEXT NOT NULL,
    "quantity" REAL NOT NULL,
    "runningBalance" REAL NOT NULL,
    "unitCost" REAL,
    "reference" TEXT,
    "processedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stock_ledger_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_stock_ledger" ("createdAt", "id", "quantity", "reference", "tenantId") SELECT "createdAt", "id", "quantity", "reference", "tenantId" FROM "stock_ledger";
DROP TABLE "stock_ledger";
ALTER TABLE "new_stock_ledger" RENAME TO "stock_ledger";
CREATE TABLE "new_stock_reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "locationId" TEXT,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "batchId" TEXT,
    "seriesId" TEXT,
    "quantity" REAL NOT NULL,
    "reason" TEXT NOT NULL,
    "reference" TEXT,
    "expiresAt" DATETIME,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stock_reservations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_stock_reservations" ("batchId", "createdAt", "expiresAt", "id", "locationId", "productId", "quantity", "seriesId", "tenantId", "updatedAt", "variantId", "warehouseId") SELECT "batchId", "createdAt", "expiresAt", "id", "locationId", "productId", "quantity", "seriesId", "tenantId", "updatedAt", "variantId", "warehouseId" FROM "stock_reservations";
DROP TABLE "stock_reservations";
ALTER TABLE "new_stock_reservations" RENAME TO "stock_reservations";
CREATE TABLE "new_tenants" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "domain" TEXT,
    "settings" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_tenants" ("createdAt", "domain", "id", "isActive", "name", "settings", "slug", "updatedAt") SELECT "createdAt", "domain", "id", "isActive", "name", "settings", "slug", "updatedAt" FROM "tenants";
DROP TABLE "tenants";
ALTER TABLE "new_tenants" RENAME TO "tenants";
CREATE UNIQUE INDEX "tenants_slug_key" ON "tenants"("slug");
CREATE TABLE "new_warehouses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "companyId" TEXT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "address" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "warehouses_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "warehouses_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "companies" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_warehouses" ("address", "code", "createdAt", "id", "isActive", "name", "tenantId", "updatedAt") SELECT "address", "code", "createdAt", "id", "isActive", "name", "tenantId", "updatedAt" FROM "warehouses";
DROP TABLE "warehouses";
ALTER TABLE "new_warehouses" RENAME TO "warehouses";
CREATE UNIQUE INDEX "warehouses_tenantId_code_key" ON "warehouses"("tenantId", "code");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "companies_tenantId_code_key" ON "companies"("tenantId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "_CompanyToUser_AB_unique" ON "_CompanyToUser"("A", "B");

-- CreateIndex
CREATE INDEX "_CompanyToUser_B_index" ON "_CompanyToUser"("B");
