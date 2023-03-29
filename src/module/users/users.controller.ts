import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Res,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { AllUsersResponseDto } from './dto/all-users.dto';
import { SkipAuthJwtGuard } from 'src/decorator/skip-auth-jwt-guard.decorator';
import { User } from '@prisma/client';

// @UseGuards(JwtAuthGuard)
@Controller('/api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @SkipAuthJwtGuard() usado para deixar algumas rotas públicas
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId?')
  async findUsers(
    @Param('userId') userId?: string,
  ): Promise<AllUsersResponseDto[] | User | null> {
    if (userId) {
      return await this.usersService.findById(userId);
    } else {
      return await this.usersService.findAll();
    }
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<string> {
    return this.usersService.update(userId, updateUserDto);
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string): Promise<void | string> {
    return this.usersService.deleteUser(userId);
  }
}
