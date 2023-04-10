import { PrismaService } from '../../shared/prisma.service';
import { User } from '@prisma/client';
import { CreateUserDto } from '../dto/create-user.dto';
import { IUserRepository } from './users.repository';
import { UpdateUserDto } from '../dto/update-user.dto';
export declare class UserRepositoryImpl implements IUserRepository {
    private prisma;
    constructor(prisma: PrismaService);
    findUserById(userId: string): Promise<User | null>;
    getAll(): Promise<User[]>;
    saveUser(user: CreateUserDto): Promise<string>;
    deleteUser(userId: string): Promise<void | string>;
    updateUser(userId: string, { name, email, password, role, isActive, flightExp, actualLocation, }: UpdateUserDto): Promise<User>;
    findUserByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
}
