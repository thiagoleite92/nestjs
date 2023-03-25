import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryImpl } from './repository/implementation/users.repositoryImpl';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepositoryImpl) {}

  async create(createUserDto: CreateUserDto) {
    if (await this.findByEmail(createUserDto.email)) {
      throw new HttpException(
        {
          message: 'Email já registrado',
        },
        HttpStatus.CONFLICT,
      );
    }

    createUserDto.password = '123456789';

    return this.userRepository.saveUser(createUserDto);
  }

  async findAll() {
    return await this.userRepository.getAll();
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
}
