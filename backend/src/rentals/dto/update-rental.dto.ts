import { IsOptional, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRentalDto {
  @ApiProperty({ description: 'Nom de la location (Optionnel)', example: 'Appartement Paris Modifié', required: false })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @IsOptional()
  name?: string;

  @ApiProperty({ description: 'Surface en m² (Optionnel)', example: 55, type: Number, required: false })
  @Type(() => Number)
  @IsNumber({}, { message: 'La surface doit être un nombre.' })
  @Min(0, { message: 'La surface doit être positive.' })
  @IsOptional()
  surface?: number;

  @ApiProperty({ description: 'Prix de la location par nuit (Optionnel)', example: 130, type: Number, required: false })
  @Type(() => Number)
  @IsNumber({}, { message: 'Le prix doit être un nombre.' })
  @Min(0, { message: 'Le prix doit être positif.' })
  @IsOptional()
  price?: number;

  @ApiProperty({ description: 'Nouvelle image de la location (Optionnel)', type: 'string', format: 'binary', required: false })
  picture?: any; // Optionnel pour la modification

  @ApiProperty({ description: 'Description détaillée (Optionnel)', example: 'Bel appartement spacieux.', required: false })
  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  @IsOptional()
  description?: string;
}

