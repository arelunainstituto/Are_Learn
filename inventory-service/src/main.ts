import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  // Security & Performance
  app.use(helmet());
  app.use(compression());
  
  // CORS
  app.enableCors({
    origin: process.env.NODE_ENV === 'production' 
      ? ['https://areluna.pt', 'https://*.areluna.pt']
      : ['http://localhost:3000', 'http://localhost:3006'],
    credentials: true,
  });

  // Logging
  // app.useLogger(app.get(Logger));

  // Validation
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Swagger Documentation
  const config = new DocumentBuilder()
    .setTitle('AreLuna Inventory API')
    .setDescription('Multi-tenant Inventory Control System')
    .setVersion('1.0')
    .addTag('inventory', 'Inventory management endpoints')
    .addTag('tenants', 'Tenant management endpoints')
    .addTag('categories', 'Category management endpoints')
    .addTag('locations', 'Location management endpoints')
    .addTag('movements', 'Movement tracking endpoints')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Health check
  app.getHttpAdapter().get('/healthz', (req, res) => {
    res.json({
      status: 'OK',
      service: 'AreLuna Inventory Service',
      timestamp: new Date().toISOString(),
      version: process.env.npm_package_version || '1.0.0',
    });
  });

  const port = process.env.PORT || 3005;
  await app.listen(port);
  
  console.log(`🚀 AreLuna Inventory Service running on http://localhost:${port}`);
  console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
  console.log(`❤️  Health Check: http://localhost:${port}/healthz`);
}

bootstrap();