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

@UseGuards(JwtAuthGuard)
@Controller('/api/user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  // @SkipAuthJwtGuard() usado para deixar algumas rotas públicas
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('/all')
  async findAll(): Promise<AllUsersResponseDto[]> {
    return this.usersService.findAll();
  }

  @Patch(':userId')
  async update(
    @Param('userId') userId: string,
    @Body() updateUserDto: UpdateUserDto,
    @Res() res,
  ): Promise<string> {
    return res
      .status(201)
      .json(this.usersService.update(userId, updateUserDto));
  }

  // @Get(':id')
  // async findOne(@Param('id') id: string) {
  //   return this.usersService.findOne(+id);
  // }

  // @Delete(':id')
  // async remove(@Param('id') id: string) {
  //   return this.usersService.remove(+id);
  // }
}
