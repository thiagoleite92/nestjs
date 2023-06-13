import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { BcryptService } from '../shared/bcrypt.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryImpl } from './repository/users.repositoryImpl';
import { UserResponse } from './types/user-response.type';
import { UpdateUserStatus } from './dto/update-user-status.dto';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepositoryImpl,
    private bcrypt: BcryptService,
  ) {}

  async findAll(): Promise<UserResponse[]> {
    const users = await this.userRepository.getAll();

    return users.map(this.parserUserList);
  }

  async create(createUserDto: CreateUserDto): Promise<string> {
    if (await this.findByEmail(createUserDto.email)) {
      throw new ConflictException({
        message: 'Email já registrado',
      });
    }

    createUserDto.password = await this.bcrypt.hashPassword(
      createUserDto.password,
    );

    if (createUserDto.role === 'PILOT') {
      createUserDto.isActive === false;
    }

    return this.userRepository.saveUser(createUserDto);
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<string> {
    const user = await this.findById(userId);

    if (!user) {
      throw new NotFoundException({
        erro: 'Usuário não encontrado',
      });
    }

    if (updateUserDto.email !== user.email) {
      if (await this.findByEmail(updateUserDto.email)) {
        throw new ConflictException({
          message: 'Email já registrado',
        });
      }
    }

    if (updateUserDto.password) {
      updateUserDto.password = await this.bcrypt.hashPassword(
        updateUserDto.password,
      );
    }

    await this.userRepository.updateUser(userId, updateUserDto);

    return 'Usuário atualizado com sucesso';
  }

  async deleteUser(userId: string): Promise<void | string> {
    if (!(await this.findById(userId))) {
      throw new NotFoundException({
        erro: 'Usuário não encontrado',
      });
    }

    return await this.userRepository.deleteUser(userId);
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepository.findUserByEmail(email);
  }

  async findById(userId: string): Promise<User | null> {
    const user = await this.userRepository.findUserById(userId);

    if (user) {
      this.excludeKeys(user, ['password']);
    }

    return user;
  }

  excludeKeys<User, Key extends keyof User>(
    user: User,
    keys: Key[],
  ): Omit<User, Key> {
    for (const key of keys) {
      delete user[key];
    }
    return user;
  }

  async updateStatus(
    userId: string,
    isActive: boolean,
  ): Promise<{ message: string }> {
    if (!(await this.findById(userId))) {
      throw new NotFoundException({
        erro: 'Usuário não encontrado',
      });
    }

    return {
      message: await this.userRepository.updateStatus(userId, isActive),
    };
  }

  private parserUserList(user: User) {
    return {
      id: user.id,
      Status: user.isActive,
      Nome: user.name,
      Função: user.role === 'PILOT' ? 'Piloto' : 'Administrador',
      ...(user.role && user.role === 'PILOT'
        ? {
            'Tempo de voo':
              user.flightExp === 1
                ? `${user.flightExp} hora`
                : `${user.flightExp} horas`,
          }
        : { 'Tempo de voo': 'Não se aplica' }),
      Localização:
        user.role === 'PILOT' ? user.actualLocation : 'Não se aplica',
    };
  }
}
