import { IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateRentalDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'Le nom est requis.' })
  name: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'La surface doit être un nombre.' })
  @Min(0, { message: 'La surface doit être positive.' })
  surface: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Le prix doit être un nombre.' })
  @Min(0, { message: 'Le prix doit être positif.' })
  price: number;

  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  @IsNotEmpty({ message: 'La description est requise.' })
  description: string;
}
