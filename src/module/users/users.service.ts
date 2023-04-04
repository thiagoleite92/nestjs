import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { BcryptService } from '../shared/bcrypt.service';
import { AllUsersResponseDto } from './dto/all-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryImpl } from './repository/users.repositoryImpl';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepositoryImpl,
    private bcrypt: BcryptService,
  ) {}

  async findAll(): Promise<AllUsersResponseDto[]> {
    const users = await this.userRepository.getAll();

    users.forEach((user) => {
      this.excludeKeys(user, ['password']);
    });

    return users;
  }

  async create(createUserDto: CreateUserDto) {
    if (await this.findByEmail(createUserDto.email)) {
      throw new ConflictException({
        message: 'Email já registrado',
      });
    }

    createUserDto.password = await this.bcrypt.hashPassword(
      createUserDto.password,
    );

    return this.userRepository.saveUser(createUserDto);
  }

  async update(userId: string, updateUserDto: UpdateUserDto): Promise<string> {
    if (!(await this.findById(userId))) {
      throw new NotFoundException({
        erro: 'Usuário não encontrado',
      });
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
}
