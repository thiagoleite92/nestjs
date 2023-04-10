import { User } from '@prisma/client';
import { UpdateUserDto } from '../dto/update-user.dto';
import { CreateUserDto } from '../dto/create-user.dto';
export interface IUserRepository {
    saveUser(user: CreateUserDto): Promise<string>;
    updateUser(userId: string, user: UpdateUserDto): Promise<User>;
    deleteUser(userId: string): Promise<void | string>;
    getAll(): Promise<User[]>;
    findUserByEmail(email: string): Promise<User | null>;
    findUserById(userId: string): Promise<User | null>;
}
