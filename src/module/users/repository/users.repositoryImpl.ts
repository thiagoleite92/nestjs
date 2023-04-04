import { PrismaService } from '../../shared/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from './users.repository';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async findUserById(userId: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }

  async getAll(): Promise<User[]> {
    try {
      const users = await this.prisma.user.findMany({});

      return users;
    } catch (err) {
      return err;
    }
  }

  async saveUser(user: CreateUserDto): Promise<string> {
    try {
      await this.prisma.user.create({ data: user });
      return 'Registro criado com sucesso';
    } catch (err) {
      console.log(err);
      return 'Houve um error ao criar um usuário';
    }
  }

  async deleteUser(userId: string): Promise<void | string> {
    try {
      await this.prisma.user.delete({
        where: { id: userId },
      });
      return;
    } catch (error) {
      console.log(error);
      return 'Houve um erro ao deletar usuário';
    }
  }

  async updateUser(
    userId: string,
    { name, email, password, role, isActive, flightExp }: UpdateUserDto,
  ): Promise<User> {
    try {
      const update = await this.prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          name,
          email,
          password,
          role,
          isActive,
          flightExp,
        },
      });

      return update;
    } catch (error) {
      return;
    }
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        email,
      },
    });
  }

  async findById(userId: string): Promise<User | null> {
    return await this.prisma.user.findFirst({
      where: {
        id: userId,
      },
    });
  }
}
