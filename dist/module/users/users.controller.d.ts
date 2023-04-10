import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AllUsersResponseDto } from './dto/all-users.dto';
import { User } from '@prisma/client';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    create(createUserDto: CreateUserDto): Promise<string>;
    findUsers(userId?: string): Promise<AllUsersResponseDto[] | User | null>;
    update(userId: string, updateUserDto: UpdateUserDto): Promise<string>;
    delete(userId: string): Promise<void | string>;
}
