import { Controller, Get, Param, ParseIntPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@ApiBearerAuth('bearer')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Endpoint GET /api/user/:id
   */
  @ApiOperation({ summary: 'Récupérer le profil public d\'un utilisateur par son ID' })
  @ApiResponse({ status: 200, description: 'Renvoie les données publiques du profil (ID, nom, email, dates).' })
  @ApiResponse({ status: 401, description: 'Token JWT non valide.' })
  @ApiResponse({ status: 404, description: 'Utilisateur introuvable.' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.findOne(id);
  }
}
