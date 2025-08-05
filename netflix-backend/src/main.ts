import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';
 
async function bootstrap() {
  dotenv.config(); // Load .env variables
 
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: 'http://localhost:3001', // Change this to match your frontend port
  credentials: true,
  });
 
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
 
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`App running on http://localhost:${port}`);
}
bootstrap();
 
 