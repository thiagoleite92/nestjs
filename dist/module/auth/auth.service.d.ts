import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { BcryptService } from '../shared/bcrypt.service';
import { UsersService } from '../users/users.service';
export declare class AuthService {
    private usersService;
    private jwtService;
    private bcrypt;
    constructor(usersService: UsersService, jwtService: JwtService, bcrypt: BcryptService);
    validateUser(email: string, password: string): Promise<any>;
    generateToken({ name, role, email, id }: User): Promise<any>;
    decodeToken(token: any): Promise<string | {
        [key: string]: any;
    }>;
}
