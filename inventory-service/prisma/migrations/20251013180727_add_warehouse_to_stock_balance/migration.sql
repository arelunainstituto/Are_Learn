/*
  Warnings:

  - Added the required column `warehouseId` to the `stock_balances` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_stock_balances" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "itemId" TEXT NOT NULL,
    "warehouseId" TEXT NOT NULL,
    "locationId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 0,
    "reservedQty" INTEGER NOT NULL DEFAULT 0,
    "availableQty" INTEGER NOT NULL DEFAULT 0,
    "lastUpdated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "stock_balances_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "inventory_items" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "stock_balances_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_stock_balances" ("availableQty", "id", "itemId", "lastUpdated", "locationId", "quantity", "reservedQty", "tenantId") SELECT "availableQty", "id", "itemId", "lastUpdated", "locationId", "quantity", "reservedQty", "tenantId" FROM "stock_balances";
DROP TABLE "stock_balances";
ALTER TABLE "new_stock_balances" RENAME TO "stock_balances";
CREATE UNIQUE INDEX "stock_balances_itemId_locationId_key" ON "stock_balances"("itemId", "locationId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
