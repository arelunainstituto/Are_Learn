import { Module } from '@nestjs/common';
import { IntegrationsController } from './integrations.controller';
import { IntegrationModule } from '../../integrations/integration.module';

@Module({
  imports: [IntegrationModule],
  controllers: [IntegrationsController],
})
export class IntegrationsModule {}