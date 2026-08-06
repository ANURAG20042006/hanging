import { NestFactory } from '@nestjs/core';
import { ValidationPipe, Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as compression from 'compression';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { RedisIoAdapter } from './common/adapters/redis-io.adapter';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create(AppModule);

  // Security & compression middleware
  app.use(helmet());
  app.use(compression());
  
  // CORS configuration
  const corsOrigins = process.env.CORS_ORIGINS?.split(',') || ['http://localhost:3000', 'http://localhost:3001'];
  app.enableCors({
    origin: corsOrigins,
    credentials: true,
  });

  // Global pipes & filters
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  app.useGlobalFilters(new HttpExceptionFilter());

  // Socket.IO Redis adapter with in-memory fallback
  try {
    const redisIoAdapter = new RedisIoAdapter(app);
    await redisIoAdapter.connectToRedis();
    app.useWebSocketAdapter(redisIoAdapter);
    logger.log('Socket.IO Redis Adapter connected successfully.');
  } catch (err: any) {
    logger.warn(`Redis adapter connection failed (${err.message}). Using standard WebSocket adapter.`);
  }

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Hangout API')
    .setDescription('The Hangout private social platform API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // Graceful shutdown
  app.enableShutdownHooks();

  const port = process.env.PORT || 3001;
  await app.listen(port);
  logger.log(`🚀 Hangout API Server running at http://localhost:${port}`);
  logger.log(`📚 Swagger Docs available at http://localhost:${port}/api/docs`);
}
bootstrap();
