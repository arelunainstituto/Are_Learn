-- CreateTable
CREATE TABLE "document_lines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tenantId" TEXT NOT NULL,
    "documentId" TEXT NOT NULL,
    "lineNumber" INTEGER NOT NULL,
    "productId" TEXT,
    "variantId" TEXT,
    "warehouseId" TEXT,
    "locationId" TEXT,
    "quantity" INTEGER NOT NULL,
    "unitPrice" DECIMAL,
    "totalPrice" DECIMAL,
    "batchNumber" TEXT,
    "serialNumber" TEXT,
    "notes" TEXT,
    "metadata" TEXT NOT NULL DEFAULT '{}',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "document_lines_tenantId_fkey" FOREIGN KEY ("tenantId") REFERENCES "tenants" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "document_lines_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "documents" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "document_lines_productId_fkey" FOREIGN KEY ("productId") REFERENCES "products" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "document_lines_variantId_fkey" FOREIGN KEY ("variantId") REFERENCES "product_variants" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "document_lines_warehouseId_fkey" FOREIGN KEY ("warehouseId") REFERENCES "warehouses" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "document_lines_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "locations" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "document_lines_documentId_lineNumber_key" ON "document_lines"("documentId", "lineNumber");
