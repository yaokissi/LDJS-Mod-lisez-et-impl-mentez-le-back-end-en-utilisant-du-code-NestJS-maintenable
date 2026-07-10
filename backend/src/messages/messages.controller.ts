import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  /**
   * Endpoint POST /api/messages
   * Protégé par le JwtAuthGuard. Permet d'envoyer un message concernant une location.
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }
}
