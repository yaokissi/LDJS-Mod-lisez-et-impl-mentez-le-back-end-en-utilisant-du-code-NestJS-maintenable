import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';

@Injectable()
export class RentalsService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Récupère toutes les locations de la base de données.
   * Joint l'utilisateur propriétaire (owner) et formate la réponse.
   */
  async findAll() {
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

    const mappedRentals = rentals.map((rental) => {
      const { USERS, ...rest } = rental;
      return {
        ...rest,
        surface: Number(rental.surface),
        price: Number(rental.price),
        owner: USERS,
      };
    });

    return {
      rentals: mappedRentals,
    };
  }

  /**
   * Récupère une location par son identifiant unique.
   * Joint l'utilisateur propriétaire et lève une exception 404 si introuvable.
   */
  async findOne(id: number) {
    const rental = await this.prisma.rENTALS.findUnique({
      where: { id },
      include: {
        USERS: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    // Si la location n'existe pas en base de données, on jette une erreur 404.
    if (!rental) {
      throw new NotFoundException('Rental not found');
    }

    const { USERS, ...rest } = rental;
    return {
      ...rest,
      surface: Number(rental.surface),
      price: Number(rental.price),
      owner: USERS,
    };
  }

  /**
   * Enregistre une nouvelle location dans la base de données.
   */
  async create(createRentalDto: CreateRentalDto, fileUrl: string, ownerId: number) {
    const { name, surface, price, description } = createRentalDto;

    await this.prisma.rENTALS.create({
      data: {
        name,
        surface,
        price,
        picture: fileUrl,
        description,
        owner_id: ownerId,
      },
    });

    return {
      message: 'Rental created !',
    };
  }

  /**
   * Modifie une location existante par son ID.
   */
  async update(id: number, updateRentalDto: UpdateRentalDto, fileUrl?: string) {
    // 1. Vérifier si la location existe
    const existingRental = await this.prisma.rENTALS.findUnique({
      where: { id },
    });

    if (!existingRental) {
      throw new NotFoundException('Rental not found');
    }

    // 2. Mettre à jour l'entrée avec les nouveaux champs (s'ils sont fournis)
    const { name, surface, price, description } = updateRentalDto;

    await this.prisma.rENTALS.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(surface !== undefined && { surface }),
        ...(price !== undefined && { price }),
        ...(description !== undefined && { description }),
        ...(fileUrl !== undefined && { picture: fileUrl }),
      },
    });

    return {
      message: 'Rental updated !',
    };
  }
}



