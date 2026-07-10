import { IsOptional, IsNumber, IsString, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateRentalDto {
  @IsString({ message: 'Le nom doit être une chaîne de caractères.' })
  @IsOptional()
  name?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'La surface doit être un nombre.' })
  @Min(0, { message: 'La surface doit être positive.' })
  @IsOptional()
  surface?: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'Le prix doit être un nombre.' })
  @Min(0, { message: 'Le prix doit être positif.' })
  @IsOptional()
  price?: number;

  @IsString({ message: 'La description doit être une chaîne de caractères.' })
  @IsOptional()
  description?: string;
}
