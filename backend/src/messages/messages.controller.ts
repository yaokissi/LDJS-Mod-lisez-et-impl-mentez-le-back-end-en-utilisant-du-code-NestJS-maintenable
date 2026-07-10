import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { MessagesService } from './messages.service.js';
import { CreateMessageDto } from './dto/create-message.dto.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('messages')
@ApiBearerAuth('bearer')
@Controller('messages')
export class MessagesController {
  constructor(private readonly messagesService: MessagesService) {}

  /**
   * Endpoint POST /api/messages
   */
  @ApiOperation({ summary: 'Envoyer un message à un propriétaire pour un hébergement' })
  @ApiResponse({ status: 201, description: 'Le message a été envoyé avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 401, description: 'Token JWT non valide.' })
  @UseGuards(JwtAuthGuard)
  @Post()
  async createMessage(@Body() createMessageDto: CreateMessageDto) {
    return this.messagesService.create(createMessageDto);
  }
}

