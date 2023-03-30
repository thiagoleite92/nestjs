import { CreateUserDto } from './create-user.dto';
import { PartialType } from '@nestjs/mapped-types';
import { IsOptional, IsEmpty, Allow } from 'class-validator';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsEmpty()
  password: string;
}
