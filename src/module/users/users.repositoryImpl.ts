import { PrismaService } from './../../database/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { IUserRepository } from './repository/users.repository';
import { AllUsersResponseDto } from './dto/all-users.dto';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
  }

  async getAll(): Promise<AllUsersResponseDto[]> {
    try {
      const users = await this.prisma.user.findMany({});

      users.forEach((user) => {
        this.exclude(user, ['password']);
      });

      return users;
    } catch (err) {
      return err;
    }
  }

  async saveUser(user: CreateUserDto): Promise<string> {
    try {
      await this.prisma.user.create({ data: user });
      return 'Usuário criado com sucesso';
    } catch (err) {
      return err;
    }
  }

  async deleteUser(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async updateUser(id: string, user: User): Promise<string> {
    throw new Error('Method not implemented.');
  }

  exclude<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }
}
