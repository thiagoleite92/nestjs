import { Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
  IsOptional,
} from 'class-validator';

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
    message: 'Passwrd do not match minimum security requirements',
  })
  password: string;

  @IsOptional()
  isActive?: boolean;

  @IsOptional()
  flightXp?: Number;

  @IsOptional()
  role: Role;
}
