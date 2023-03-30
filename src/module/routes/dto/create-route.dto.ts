import {
  IsNotEmpty,
  IsOptional,
  Length,
  MAX_LENGTH,
  Validate,
} from 'class-validator';
import { ValidCity } from '../pipes/ValidateCity.pipe';

export class CreateRouteDto {
  @IsNotEmpty()
  @Length(3, 255)
  @Validate(ValidCity, { message: 'Cidade de origem não encontrada' })
  origin: string;

  @IsNotEmpty()
  @Length(3, 255)
  @Validate(ValidCity, { message: 'Cidade de destino não encontrada' })
  destiny: string;

  @IsNotEmpty()
  durationEstimated: number;
}
