import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryImpl } from './users.repositoryImpl';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepositoryImpl) {}

  async create(createUserDto: CreateUserDto) {
    return this.userRepository.saveUser(createUserDto);
  }

  async findAll() {
    console.log('all service');
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
}
