import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  // Servir les fichiers statiques du dossier 'uploads' sur l'URL /uploads/
  app.useStaticAssets(join(process.cwd(), 'uploads'), {
    prefix: '/uploads/',
  });

  // Préfixe global pour toutes les routes de l'API
  app.setGlobalPrefix('api');

  // Validation globale des DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Supprime les propriétés non déclarées dans le DTO
      transform: true, // Convertit les types des données d'entrée
    }),
  );

  // Activation de CORS pour permettre la communication avec le front-end React
  app.enableCors();

  // Configuration de Swagger
  const config = new DocumentBuilder()
    .setTitle('ChâTop API')
    .setDescription("Documentation de l'API REST de ChâTop ")
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Entrez votre token JWT',
        in: 'header',
      },
      'bearer', // Identifiant de l'authentification de sécurité
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger', app, document);

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  console.log(`Le backend de ChâTop est démarré sur : http://localhost:${port}/api`);
  console.log(`La documentation Swagger est accessible sur : http://localhost:${port}/api/swagger`);
}
bootstrap();





