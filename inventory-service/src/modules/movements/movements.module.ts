import { Module } from '@nestjs/common';
import { MovementsController } from './movements.controller';
import { StockMovementsModule } from '../stock-movements/stock-movements.module';

@Module({
  imports: [StockMovementsModule],
  controllers: [MovementsController],
})
export class MovementsModule {}