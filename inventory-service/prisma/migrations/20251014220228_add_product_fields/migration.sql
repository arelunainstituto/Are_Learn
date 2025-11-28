-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "categoryId" TEXT,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "sku" TEXT NOT NULL DEFAULT '',
    "description" TEXT,
    "type" TEXT,
    "brand" TEXT,
    "model" TEXT,
    "unitOfMeasure" TEXT NOT NULL DEFAULT 'unit',
    "weight" REAL,
    "dimensions" TEXT,
    "costPrice" REAL,
    "sellingPrice" REAL,
    "minStock" REAL,
    "maxStock" REAL,
    "reorderPoint" REAL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isTrackable" BOOLEAN NOT NULL DEFAULT false,
    "tags" TEXT,
    "attributes" TEXT,
    "externalId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "products_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_products" ("categoryId", "code", "createdAt", "description", "id", "isActive", "name", "sku", "tenantId", "unitOfMeasure", "updatedAt") SELECT "categoryId", "code", "createdAt", "description", "id", "isActive", "name", "sku", "tenantId", "unitOfMeasure", "updatedAt" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_tenantId_code_key" ON "products"("tenantId", "code");
CREATE UNIQUE INDEX "products_tenantId_sku_key" ON "products"("tenantId", "sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
