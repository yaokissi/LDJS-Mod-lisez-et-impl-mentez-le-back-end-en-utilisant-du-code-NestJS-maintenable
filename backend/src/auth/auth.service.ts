import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service.js';
import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Enregistre un nouvel utilisateur après validation et chiffrement de son mot de passe.
   * Renvoye un token JWT.
   */
  async register(registerDto: RegisterDto) {
    const { email, name, password } = registerDto;

    // 1. Vérifier si l'email est déjà utilisé
    const existingUser = await this.prisma.uSERS.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new BadRequestException('Email already exists');
    }

    // 2. Chiffrer le mot de passe avec bcrypt (10 rounds de salage)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Enregistrer l'utilisateur dans la base de données
    const user = await this.prisma.uSERS.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    // 4. Créer le payload du token JWT
    const payload = { sub: user.id, email: user.email };

    // 5. Renvoyer le token signé
    return {
      token: this.jwtService.sign(payload),
    };
  }

  /**
   * Connecte un utilisateur après vérification de ses identifiants.
   * Renvoye un token JWT.
   */
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // 1. Chercher l'utilisateur par son email
    const user = await this.prisma.uSERS.findUnique({
      where: { email },
    });

    // 2. Si l'utilisateur n'existe pas, lever une exception 401 (Unauthorized)
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 3. Vérifier le mot de passe avec bcrypt
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // 4. Si le mot de passe ne correspond pas, lever une exception 401 (Unauthorized)
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // 5. Créer le payload du token JWT
    const payload = { sub: user.id, email: user.email };

    // 6. Renvoyer le token signé
    return {
      token: this.jwtService.sign(payload),
    };
  }
}

