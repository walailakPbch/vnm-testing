import { NestFactory } from '@nestjs/core';
import { json } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.setGlobalPrefix('api');
  app.use(json({ limit: '50mb' }));
  app.enableCors();
  await app.listen(3000);
}
bootstrap();
