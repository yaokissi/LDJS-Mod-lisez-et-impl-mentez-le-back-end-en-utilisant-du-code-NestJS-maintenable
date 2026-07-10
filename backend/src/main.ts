import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Préfixe global pour toutes les routes de l'API
  app.setGlobalPrefix('api');

  // Validation globale des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non déclarées dans le DTO
      transform: true, // Convertit les types des données d'entrée
    }),
  );

  // Activer CORS pour permettre la communication avec le front-end React
  app.enableCors();

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Le backend de ChâTop est démarré sur : http://localhost:${port}/api`);
}
bootstrap();

