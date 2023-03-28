import { User } from '@prisma/client';

export interface IUserRepository {
  getUserById(id: string): Promise<User>;

  getAll(): Promise<User[]>;

  saveUser(user: User): Promise<string>;

  deleteUser(id: string): Promise<string>;

  updateUser(id: string, user: User): Promise<User>;

  findUserByEmail(email: string): Promise<User | null>;
}
