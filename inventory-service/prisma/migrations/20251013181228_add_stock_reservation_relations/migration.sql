/*
  Warnings:

  - You are about to drop the column `itemId` on the `stock_reservations` table. All the data in the column will be lost.
  - You are about to drop the column `reservedFor` on the `stock_reservations` table. All the data in the column will be lost.
  - Added the required column `locationId` to the `stock_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productId` to the `stock_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceId` to the `stock_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceType` to the `stock_reservations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `warehouseId` to the `stock_reservations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "audit_trail" ADD COLUMN "changes" TEXT;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stock_reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "variantId" TEXT,
    "warehouseId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "batchId" TEXT,
    "seriesId" TEXT,
    "quantity" INTEGER NOT NULL,
    "type" TEXT NOT NULL DEFAULT 'order',
    "status" TEXT NOT NULL DEFAULT 'active',
    "referenceId" TEXT NOT NULL,
    "referenceType" TEXT NOT NULL,
    "priority" INTEGER NOT NULL DEFAULT 5,
    "expiresAt" DATETIME,
    "notes" TEXT,
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "stock_reservations_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_batchId_fkey" FOREIGN KEY ("batchId") REFERENCES "batches" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "stock_reservations_seriesId_fkey" FOREIGN KEY ("seriesId") REFERENCES "series" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_stock_reservations" ("createdAt", "expiresAt", "id", "notes", "quantity", "status", "tenantId", "type", "updatedAt") SELECT "createdAt", "expiresAt", "id", "notes", "quantity", "status", "tenantId", "type", "updatedAt" FROM "stock_reservations";
DROP TABLE "stock_reservations";
ALTER TABLE "new_stock_reservations" RENAME TO "stock_reservations";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
