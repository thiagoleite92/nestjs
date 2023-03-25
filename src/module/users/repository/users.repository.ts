import { User } from '@prisma/client';
import { AllUsersResponseDto } from '../dto/all-users.dto';

export interface IUserRepository {
  getUserById(id: string): Promise<User>;

  getAll(): Promise<AllUsersResponseDto[]>;

  saveUser(user: User): Promise<string>;

  deleteUser(id: string): Promise<string>;

  updateUser(id: string, user: User): Promise<string>;

  findUserByEmail(email: string): Promise<User | null>;
}
