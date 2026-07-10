import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: "Adresse email de l'utilisateur", example: 'jean.dupont@test.com' })
  @IsEmail({}, { message: 'Veuillez entrer une adresse email valide.' })
  @IsNotEmpty({ message: "L'adresse email est requise." })
  email: string;

  @ApiProperty({ description: "Mot de passe de l'utilisateur", example: 'monMotDePasse123' })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  password: string;
}

