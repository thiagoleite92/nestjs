import { User } from '@prisma/client';
import { BcryptService } from '../shared/bcrypt.service';
import { AllUsersResponseDto } from './dto/all-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepositoryImpl } from './repository/users.repositoryImpl';
export declare class UsersService {
    private userRepository;
    private bcrypt;
    constructor(userRepository: UserRepositoryImpl, bcrypt: BcryptService);
    findAll(): Promise<AllUsersResponseDto[]>;
    create(createUserDto: CreateUserDto): Promise<string>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<string>;
    deleteUser(userId: string): Promise<void | string>;
    findByEmail(email: string): Promise<User | null>;
    findById(userId: string): Promise<User | null>;
    excludeKeys<User, Key extends keyof User>(user: User, keys: Key[]): Omit<User, Key>;
}
