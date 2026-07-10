import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';

@Injectable()
export class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Enregistre un message dans la base de données.
   */
  async create(createMessageDto: CreateMessageDto) {
    const { message, user_id, rental_id } = createMessageDto;

    await this.prisma.mESSAGES.create({
      data: {
        message,
        user_id,
        rental_id,
      },
    });

    return {
      message: 'Message sent !',
    };
  }
}
