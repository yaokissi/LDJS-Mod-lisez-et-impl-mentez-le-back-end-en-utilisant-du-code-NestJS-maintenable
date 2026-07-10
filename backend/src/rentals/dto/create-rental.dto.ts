import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRentalDto {
  @ApiProperty({ description: 'Nom de la location', example: 'Appartement Paris' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le nom est requis.' })
  name: string;

  @ApiProperty({ description: 'Surface en m²', example: 50, type: Number })
  @Type(() => Number)
  @IsNumber({}, { message: 'La surface doit être un nombre.' })
  @Min(0, { message: 'La surface doit être positive.' })
  surface: number;

  @ApiProperty({ description: 'Prix de la location par nuit', example: 120, type: Number })
  @Type(() => Number)
  @IsNumber({}, { message: 'Le prix doit être un nombre.' })
  @Min(0, { message: 'Le prix doit être positif.' })
  price: number;

  @ApiProperty({ description: 'Image de la location', type: 'string', format: 'binary' })
  picture: any; // Propriété factice pour que Swagger affiche le sélecteur de fichier

  @ApiProperty({ description: 'Description détaillée', example: 'Bel appartement au coeur de Paris.' })
  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'La description est requise.' })
  description: string;
}

