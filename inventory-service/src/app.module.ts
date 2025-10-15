import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './common/prisma/prisma.module';
import { TenantsModule } from './modules/tenants/tenants.module';
import { WarehousesModule } from './modules/warehouses/warehouses.module';
import { ProductsModule } from './modules/products/products.module';
import { CategoriesModule } from './modules/categories/categories.module';
import { StockMovementsModule } from './modules/stock-movements/stock-movements.module';
import { StockReservationsModule } from './modules/stock-reservations/stock-reservations.module';
import { DocumentsModule } from './modules/documents/documents.module';
import { MovementsModule } from './modules/movements/movements.module';
import { BalancesModule } from './modules/balances/balances.module';
import { WebhooksModule } from './modules/webhooks/webhooks.module';
import { IntegrationsModule } from './modules/integrations/integrations.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PrismaModule,
    TenantsModule,
    WarehousesModule,
    ProductsModule,
    CategoriesModule,
    StockMovementsModule,
    StockReservationsModule,
    DocumentsModule,
    MovementsModule,
    BalancesModule,
    WebhooksModule,
    IntegrationsModule,
  ],
})
export class AppModule {}