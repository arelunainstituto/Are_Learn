import { Module } from '@nestjs/common';
import { StockMovementsController } from './stock-movements.controller';
import { StockMovementsService } from './stock-movements.service';
import { TestMovementController } from './test-movement.controller';
import { SimpleTestController } from './simple-test.controller';
import { PrismaModule } from '../../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StockMovementsController, TestMovementController, SimpleTestController],
  providers: [StockMovementsService],
  exports: [StockMovementsService],
})
export class StockMovementsModule {}