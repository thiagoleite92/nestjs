import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { User } from '@prisma/client';
import { ResponseModel } from '../shared/ResponseModel';
import { UserResponse } from './types/user-response.type';
import { UpdateUserStatus } from './dto/update-user-status.dto';

@UseGuards(JwtAuthGuard)
@Controller('/api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<ResponseModel> {
    return ResponseModel.response(
      await this.usersService.create(createUserDto),
    );
  }

  @Get(':userId?')
  async findUsers(
    @Param('userId') userId?: string,
  ): Promise<UserResponse[] | User | null> {
    return userId
      ? await this.usersService.findById(userId)
      : await this.usersService.findAll();
  }

  @Patch(':userId/status')
  async updateUserStatus(
    @Param('userId') userId: string,
    @Body() { isActive }: UpdateUserStatus,
  ) {
    return this.usersService.updateStatus(userId, isActive);
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<ResponseModel> {
    return ResponseModel.response(
      await this.usersService.update(userId, updateUserDto),
    );
  }

  @Delete(':userId')
  async delete(@Param('userId') userId: string): Promise<void | ResponseModel> {
    await this.usersService.deleteUser(userId);

    return ResponseModel.response('Usuário deletado êxito.');
  }
}
