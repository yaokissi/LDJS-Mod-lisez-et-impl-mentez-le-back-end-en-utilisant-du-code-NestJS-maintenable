import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: "Adresse email de l'utilisateur", example: 'jean.dupont@test.com' })
  @IsEmail({}, { message: 'Veuillez entrer un adresse email valide.' })
  @IsNotEmpty({ message: "L'adresse email est requise." })
  email: string;

  @ApiProperty({ description: "Nom complet de l'utilisateur", example: 'Jean Dupont' })
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le nom est requis.' })
  name: string;

  @ApiProperty({ description: 'Mot de passe de l\'utilisateur (min. 6 caractères)', example: 'monMotDePasse123', minLength: 6 })
  @IsString({ message: 'Le mot de passe doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le mot de passe est requis.' })
  @MinLength(6, { message: 'Le mot de passe doit contenir au moins 6 caractères.' })
  password: string;
}

