import { Role } from '@prisma/client';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    isActive?: boolean;
    flightExp?: number;
    role: Role;
    actualLocation: string;
}
