import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Récupère toutes les locations de la base de données.
   * Joint l'utilisateur propriétaire (owner) et formate la réponse.
   */
  async findAll() {
    // 1. Récupérer toutes les locations de la table RENTALS
    // On utilise "include" pour faire une jointure avec la table USERS.
    // On sélectionne uniquement l'id et le nom du propriétaire pour ne pas exposer son mot de passe ou email.
    const rentals = await this.prisma.rENTALS.findMany({
      include: {
        USERS: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // 2. Transformer le résultat (mapping)
    // Nous extrayons le champ de jointure "USERS" et le renommons en "owner"
    // pour correspondre au format exact attendu par le front-end React.
    const mappedRentals = rentals.map((rental) => {
      const { USERS, ...rest } = rental;
      return {
        ...rest,
        // On convertit les champs Decimal de Prisma (surface et price) en nombres standards JS
        surface: Number(rental.surface),
        price: Number(rental.price),
        owner: USERS,
      };
    });

    // 3. Retourner l'objet sous la clé "rentals" attendue par l'application
    return {
      rentals: mappedRentals,
    };
  }
}
