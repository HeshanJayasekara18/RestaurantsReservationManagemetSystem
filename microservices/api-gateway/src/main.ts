import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`[API-GATEWAY] running on port ${port}`);
  console.log(`  → /auth/*         → AUTH-SERVICE     (3001)`);
  console.log(`  → /customers/*    → CUSTOMER-SERVICE (3002)`);
  console.log(`  → /reservations/* → RESERVATION-SERVICE (3003)`);
}
bootstrap();
