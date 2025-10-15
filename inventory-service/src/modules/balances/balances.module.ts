import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { StockMovementsModule } from '../stock-movements/stock-movements.module';

@Module({
  imports: [StockMovementsModule],
  controllers: [BalancesController],
})
export class BalancesModule {}