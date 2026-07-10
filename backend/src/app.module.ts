import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RentalsModule } from './rentals/rentals.module.js';
import { UserModule } from './user/user.module.js';
import { MessagesModule } from './messages/messages.module.js';

@Module({
  imports: [AuthModule, PrismaModule, RentalsModule, UserModule, MessagesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}






