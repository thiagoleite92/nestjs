import { PrismaService } from '../../../shared/prisma.service';
import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreateUserDto } from '../../dto/create-user.dto';
import { IUserRepository } from '../users.repository';
import { UpdateUserDto } from '../../dto/update-user.dto';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(private prisma: PrismaService) {}

  async getUserById(id: string): Promise<User> {
    throw new Error('Method not implemented.');
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
      return 'Usuário criado com sucesso';
    } catch (err) {
      console.log(err);
      return 'Houve um error ao criar um usuário';
    }
  }

  async deleteUser(id: string): Promise<string> {
    throw new Error('Method not implemented.');
  }
  async updateUser(
    userId: string,
    { name, email, password }: UpdateUserDto,
  ): Promise<User> {
    const update = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        name,
        email,
        password,
      },
    });

    return update;
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
