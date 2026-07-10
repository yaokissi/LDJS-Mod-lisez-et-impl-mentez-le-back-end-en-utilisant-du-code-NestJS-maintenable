import { Controller, Get, UseGuards } from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';

@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  /**
   * Endpoint GET /api/rentals
   * Protégé par le JwtAuthGuard. Seuls les utilisateurs connectés
   * avec un token JWT valide peuvent récupérer la liste des locations.
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRentals() {
    return this.rentalsService.findAll();
  }
}
