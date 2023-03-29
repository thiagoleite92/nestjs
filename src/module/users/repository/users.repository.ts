import { User } from '@prisma/client';

export interface IUserRepository {
  saveUser(user: User): Promise<string>;
  updateUser(userId: string, user: User): Promise<User>;
  deleteUser(userId: string): Promise<void | string>;
  getAll(): Promise<User[]>;
  findUserByEmail(email: string): Promise<User | null>;
  findUserById(userId: string): Promise<User | null>;
}
