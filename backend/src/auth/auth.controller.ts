import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import { JwtAuthGuard } from './guards/jwt-auth.guard.js';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Endpoint POST /api/auth/register
   * Le décorateur @Body permet de récupérer le corps de la requête HTTP
   * et de le valider automatiquement via le RegisterDto.
   */
  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  /**
   * Endpoint POST /api/auth/login
   * Le décorateur @Body permet de récupérer le corps de la requête HTTP
   * et de le valider automatiquement via le LoginDto.
   */
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  /**
   * Endpoint GET /api/auth/me
   * Le décorateur @UseGuards(JwtAuthGuard) protège cet endpoint.
   * Si le token est valide, Passport injecte l'utilisateur décodé dans `req.user`.
   */
  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getProfile(@Request() req) {
    return req.user;
  }
}


