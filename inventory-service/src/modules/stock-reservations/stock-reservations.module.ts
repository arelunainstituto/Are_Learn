import { Module } from '@nestjs/common';
import { StockReservationsService } from './stock-reservations.service';
import { StockReservationsController } from './stock-reservations.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockReservationsController],
  providers: [StockReservationsService],
  exports: [StockReservationsService],
})
export class StockReservationsModule {}