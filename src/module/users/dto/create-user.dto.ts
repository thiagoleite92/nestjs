import { Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
  IsOptional,
  Validate,
} from 'class-validator';
import { ValidCity } from '../../routes/pipes/ValidateCity.pipe';

export class CreateUserDto {
  @Length(3)
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password do not match minimum security requirements',
  })
  password: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  flightExp?: number;

  @IsOptional()
  role: Role;

  @Validate(ValidCity, { message: 'Localização atual não encontrada.' })
  @IsNotEmpty()
  actualLocation: string;
}
