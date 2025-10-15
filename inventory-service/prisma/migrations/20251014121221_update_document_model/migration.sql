-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_documents" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "warehouseId" TEXT,
    "sourceWarehouseId" TEXT,
    "destinationWarehouseId" TEXT,
    "type" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "reference" TEXT,
    "status" TEXT NOT NULL DEFAULT 'draft',
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "documentDate" DATETIME,
    "dueDate" DATETIME,
    "supplier" TEXT,
    "customer" TEXT,
    "partnerId" TEXT,
    "partnerName" TEXT,
    "notes" TEXT,
    "totalValue" DECIMAL,
    "totalAmount" DECIMAL,
    "currency" TEXT NOT NULL DEFAULT 'EUR',
    "description" TEXT,
    "tags" TEXT NOT NULL DEFAULT '[]',
    "priority" INTEGER NOT NULL DEFAULT 5,
    "externalId" TEXT,
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdBy" TEXT,
    "approvedBy" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "documents_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "documents_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "documents_sourceWarehouseId_fkey" FOREIGN KEY ("sourceWarehouseId") REFERENCES "warehouses" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "documents_destinationWarehouseId_fkey" FOREIGN KEY ("destinationWarehouseId") REFERENCES "warehouses" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_documents" ("approvedBy", "createdAt", "createdBy", "customer", "date", "dueDate", "id", "metadata", "notes", "number", "reference", "status", "supplier", "tenantId", "totalValue", "type", "updatedAt", "warehouseId") SELECT "approvedBy", "createdAt", "createdBy", "customer", "date", "dueDate", "id", "metadata", "notes", "number", "reference", "status", "supplier", "tenantId", "totalValue", "type", "updatedAt", "warehouseId" FROM "documents";
DROP TABLE "documents";
ALTER TABLE "new_documents" RENAME TO "documents";
CREATE UNIQUE INDEX "documents_tenantId_type_number_key" ON "documents"("tenantId", "type", "number");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
