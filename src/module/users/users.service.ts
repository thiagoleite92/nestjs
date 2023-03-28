import { ConflictException, Injectable } from '@nestjs/common';
import { BcryptService } from '../shared/bcrypt.service';
import { AllUsersResponseDto } from './dto/all-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryImpl } from './repository/implementation/users.repositoryImpl';

@Injectable()
export class UsersService {
  constructor(
    private userRepository: UserRepositoryImpl,
    private bcrypt: BcryptService,
  ) {}

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

  async findAll(): Promise<AllUsersResponseDto[]> {
    const users = await this.userRepository.getAll()

    users.forEach((user) => {
      this.excludeKeys(user, ['password']);
    });


    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findByEmail(email: string) {
    return await this.userRepository.findUserByEmail(email);
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
