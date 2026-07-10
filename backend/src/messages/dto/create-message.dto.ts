import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageDto {
  @IsString({ message: 'Le message doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le message ne peut pas être vide.' })
  message: string;

  @IsNumber({}, { message: "L'identifiant de l'utilisateur doit être un nombre." })
  @IsNotEmpty({ message: "L'identifiant de l'utilisateur est requis." })
  user_id: number;

  @IsNumber({}, { message: "L'identifiant de la location doit être un nombre." })
  @IsNotEmpty({ message: "L'identifiant de la location est requis." })
  rental_id: number;
}
