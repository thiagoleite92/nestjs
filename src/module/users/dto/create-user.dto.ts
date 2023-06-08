import { Role } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  Matches,
  IsOptional,
  MaxLength,
  MinLength,
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
  @MaxLength(12)
  @MinLength(6)
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

  @IsNotEmpty()
  @IsOptional()
  actualLocation: string;
}
