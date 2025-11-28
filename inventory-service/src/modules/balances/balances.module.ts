import { Module } from '@nestjs/common';
import { BalancesController } from './balances.controller';
import { BalancesService } from './balances.service';
import { StockMovementsService } from '../stock-movements/stock-movements.service';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [BalancesController],
  providers: [BalancesService, StockMovementsService],
  exports: [BalancesService],
})
export class BalancesModule {}