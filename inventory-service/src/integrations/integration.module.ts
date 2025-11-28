import { Module } from '@nestjs/common';
import { IntegrationController } from './integration.controller';
import { SyncController } from './sync.controller';
import { IntegrationService } from './integration.service';
import { SyncService } from './sync.service';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [IntegrationController, SyncController],
  providers: [IntegrationService, SyncService],
  exports: [IntegrationService, SyncService],
})
export class IntegrationModule {}