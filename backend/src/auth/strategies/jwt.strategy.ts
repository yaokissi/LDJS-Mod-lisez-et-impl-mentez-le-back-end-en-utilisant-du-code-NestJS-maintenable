import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PrismaService } from '../../prisma/prisma.service.js';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly prisma: PrismaService) {
    super({
      // 1. Extraire le token JWT de l'en-tête Authorization sous la forme "Bearer <token>"
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      // 2. Utiliser le secret JWT pour valider la signature du token
      secretOrKey: process.env.JWT_SECRET || 'super-secret-jwt-key-change-in-production',
    });
  }

  /**
   * Cette méthode est appelée automatiquement une fois que Passport a décodé et validé la signature du token.
   * Le payload décodé est injecté ici.
   */
  async validate(payload: { sub: number; email: string }) {
    // Chercher l'utilisateur dans la base de données pour s'assurer qu'il existe toujours
    const user = await this.prisma.uSERS.findUnique({
      where: { id: payload.sub },
    });

    if (!user) {
      throw new UnauthorizedException('Utilisateur non autorisé ou introuvable');
    }

    // Exclure le mot de passe pour ne pas le propager dans l'application
    const { password, ...result } = user;
    return result; // Ce qui est retourné ici sera injecté dans l'objet request : `req.user`
  }
}
