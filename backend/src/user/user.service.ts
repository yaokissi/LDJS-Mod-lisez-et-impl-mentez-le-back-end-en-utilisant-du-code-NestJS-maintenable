import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Récupère un utilisateur par son identifiant.
   * Exclut le mot de passe pour des raisons évidentes de sécurité.
   */
  async findOne(id: number) {
    const user = await this.prisma.uSERS.findUnique({
      where: { id },
    });

    // Si l'utilisateur n'existe pas en base, lever une erreur 404.
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Exclure le mot de passe de l'objet renvoyé
    const { password, ...result } = user;
    return result;
  }
}
