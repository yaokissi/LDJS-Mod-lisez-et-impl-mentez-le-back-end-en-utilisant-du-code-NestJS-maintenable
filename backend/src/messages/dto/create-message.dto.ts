import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMessageDto {
  @ApiProperty({ description: 'Contenu du message', example: 'Bonjour, je suis intéressé par votre annonce.' })
  @IsString({ message: 'Le message doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le message ne peut pas être vide.' })
  message: string;

  @ApiProperty({ description: "Identifiant de l'utilisateur destinataire (propriétaire)", example: 1 })
  @IsNumber({}, { message: "L'identifiant de l'utilisateur doit être un nombre." })
  @IsNotEmpty({ message: "L'identifiant de l'utilisateur est requis." })
  user_id: number;

  @ApiProperty({ description: 'Identifiant de la location concernée', example: 1 })
  @IsNumber({}, { message: "L'identifiant de la location doit être un nombre." })
  @IsNotEmpty({ message: "L'identifiant de la location est requis." })
  rental_id: number;
}

