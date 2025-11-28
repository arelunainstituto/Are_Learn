-- AlterTable
ALTER TABLE "warehouses" ADD COLUMN "settings" TEXT DEFAULT '{}';

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
    "unitOfMeasure" TEXT NOT NULL DEFAULT 'unit',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "products_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "products_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "categories" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_products" ("categoryId", "code", "createdAt", "description", "id", "isActive", "name", "tenantId", "unitOfMeasure", "updatedAt") SELECT "categoryId", "code", "createdAt", "description", "id", "isActive", "name", "tenantId", "unitOfMeasure", "updatedAt" FROM "products";
DROP TABLE "products";
ALTER TABLE "new_products" RENAME TO "products";
CREATE UNIQUE INDEX "products_tenantId_code_key" ON "products"("tenantId", "code");
CREATE UNIQUE INDEX "products_tenantId_sku_key" ON "products"("tenantId", "sku");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
