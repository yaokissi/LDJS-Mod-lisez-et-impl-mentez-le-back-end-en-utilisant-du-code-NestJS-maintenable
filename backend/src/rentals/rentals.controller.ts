import { Body, Controller, Get, Param, ParseIntPipe, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { RentalsService } from './rentals.service.js';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard.js';
import { CreateRentalDto } from './dto/create-rental.dto.js';
import { UpdateRentalDto } from './dto/update-rental.dto.js';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('rentals')
@ApiBearerAuth('bearer')
@Controller('rentals')
export class RentalsController {
  constructor(private readonly rentalsService: RentalsService) {}

  /**
   * Endpoint GET /api/rentals
   */
  @ApiOperation({ summary: 'Récupérer la liste de toutes les locations' })
  @ApiResponse({ status: 200, description: 'Renvoie un tableau contenant toutes les locations saisonnières.' })
  @ApiResponse({ status: 401, description: 'Token JWT non valide.' })
  @UseGuards(JwtAuthGuard)
  @Get()
  async getAllRentals() {
    return this.rentalsService.findAll();
  }

  /**
   * Endpoint GET /api/rentals/:id
   */
  @ApiOperation({ summary: 'Récupérer le détail d\'une location spécifique' })
  @ApiResponse({ status: 200, description: 'Renvoie les données complètes de la location avec le propriétaire.' })
  @ApiResponse({ status: 401, description: 'Token JWT non valide.' })
  @ApiResponse({ status: 404, description: 'Location introuvable.' })
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async getRentalById(@Param('id', ParseIntPipe) id: number) {
    return this.rentalsService.findOne(id);
  }

  /**
   * Endpoint POST /api/rentals
   */
  @ApiOperation({ summary: 'Créer une nouvelle location (avec upload d\'image)' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 201, description: 'La location a été créée avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides dans le formulaire.' })
  @ApiResponse({ status: 401, description: 'Token JWT non valide.' })
  @UseGuards(JwtAuthGuard)
  @Post()
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
  async createRental(
    @Body() createRentalDto: CreateRentalDto,
    @UploadedFile() file: Express.Multer.File,
    @Req() req: any,
  ) {
    const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
    const ownerId = req.user.id;

    return this.rentalsService.create(createRentalDto, fileUrl, ownerId);
  }

  /**
   * Endpoint PUT /api/rentals/:id
   */
  @ApiOperation({ summary: 'Modifier une location existante' })
  @ApiConsumes('multipart/form-data')
  @ApiResponse({ status: 200, description: 'La location a été mise à jour avec succès.' })
  @ApiResponse({ status: 400, description: 'Données invalides.' })
  @ApiResponse({ status: 401, description: 'Token JWT non valide.' })
  @ApiResponse({ status: 404, description: 'Location introuvable.' })
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
    const fileUrl = file
      ? `${req.protocol}://${req.get('host')}/uploads/${file.filename}`
      : undefined;

    return this.rentalsService.update(id, updateRentalDto, fileUrl);
  }
}




