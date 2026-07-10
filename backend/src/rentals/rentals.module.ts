import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module.js';
import { AuthModule } from '../auth/auth.module.js';
import { RentalsController } from './rentals.controller.js';
import { RentalsService } from './rentals.service.js';

@Module({
  imports: [
    PrismaModule,
    AuthModule, // Nécessaire car RentalsController utilise JwtAuthGuard qui dépend du module d'authentification
  ],
  controllers: [RentalsController],
  providers: [RentalsService],
})
export class RentalsModule {}
