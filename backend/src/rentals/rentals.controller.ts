import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

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

  /**
   * Endpoint GET /api/rentals/:id
   * Protégé par le JwtAuthGuard. Récupère le détail d'un hébergement.
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getRentalById(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.findOne(id);
  }

  /**
   * Endpoint POST /api/rentals
   * Protégé par le JwtAuthGuard.
   * Permet de créer une location en envoyant des données de type multipart/form-data.
   * Utilise FileInterceptor pour capturer le fichier "picture" et le sauvegarder dans le dossier "uploads".
   */
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          // Générer un nom de fichier unique basé sur le timestamp et un nombre aléatoire
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async createRental(
    @Body() createRentalDto: CreateRentalDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    // Reconstruire l'URL absolue de l'image pour la stocker en base
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    
    // Récupérer l'ID de l'utilisateur connecté depuis l'objet request (injecté par Passport)
    const ownerId = req.user.id;

    return this.rentalsService.create(createRentalDto, fileUrl, ownerId);
  }

  /**
   * Endpoint PUT /api/rentals/:id
   * Protégé par le JwtAuthGuard.
   * Permet de modifier une location. Les données sont envoyées en multipart/form-data.
   * L'image ("picture") est optionnelle dans cette route.
   */
  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileInterceptor('picture', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(null, `${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async updateRental(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateRentalDto: UpdateRentalDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    // Si une nouvelle image a été uploadée, on génère sa nouvelle URL absolue
    const fileUrl = file
      ? `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      : undefined;

    return this.rentalsService.update(id, updateRentalDto, fileUrl);
  }
}



