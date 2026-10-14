import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { env, webOrigins } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: webOrigins });
  await app.listen(env.PORT, '0.0.0.0');
}

void bootstrap();
