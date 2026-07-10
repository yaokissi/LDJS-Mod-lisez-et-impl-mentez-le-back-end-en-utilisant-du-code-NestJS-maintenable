import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint POST /api/auth/register
   */
  @ApiOperation({ summary: "Créer un nouveau compte utilisateur" })
  @ApiResponse({ status: 201, description: 'Utilisateur créé avec succès, retourne un token JWT.' })
  @ApiResponse({ status: 400, description: "Données invalides ou adresse email déjà existante." })
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Endpoint POST /api/auth/login
   */
  @ApiOperation({ summary: "Connecter un utilisateur existant" })
  @ApiResponse({ status: 200, description: 'Connexion réussie, retourne un token JWT.' })
  @ApiResponse({ status: 401, description: "Identifiants invalides." })
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Endpoint GET /api/auth/me
   */
  @ApiBearerAuth('bearer')
  @ApiOperation({ summary: "Récupérer le profil de l'utilisateur connecté" })
  @ApiResponse({ status: 200, description: 'Retourne les informations du profil connecté (sans le mot de passe).' })
  @ApiResponse({ status: 401, description: "Token JWT manquant, expiré ou invalide." })
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }
}



