"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryImpl = void 0;
const prisma_service_1 = require("../../shared/prisma.service");
const common_1 = require("@nestjs/common");
let UserRepositoryImpl = class UserRepositoryImpl {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findUserById(userId) {
        return await this.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
    }
    async getAll() {
        try {
            const users = await this.prisma.user.findMany({});
            return users;
        }
        catch (err) {
            return err;
        }
    }
    async saveUser(user) {
        try {
            await this.prisma.user.create({ data: user });
            return 'Registro criado com sucesso';
        }
        catch (err) {
            console.log(err);
            return 'Houve um error ao criar um usuário';
        }
    }
    async deleteUser(userId) {
        try {
            await this.prisma.user.delete({
                where: { id: userId },
            });
            return;
        }
        catch (error) {
            console.log(error);
            return 'Houve um erro ao deletar usuário';
        }
    }
    async updateUser(userId, { name, email, password, role, isActive, flightExp, actualLocation, }) {
        try {
            const update = await this.prisma.user.update({
                where: {
                    id: userId,
                },
                data: {
                    name,
                    email,
                    password,
                    role,
                    isActive,
                    flightExp,
                    actualLocation,
                },
            });
            return update;
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    async findUserByEmail(email) {
        return await this.prisma.user.findFirst({
            where: {
                email,
            },
        });
    }
    async findById(userId) {
        return await this.prisma.user.findFirst({
            where: {
                id: userId,
            },
        });
    }
};
UserRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepositoryImpl);
exports.UserRepositoryImpl = UserRepositoryImpl;
//# sourceMappingURL=users.repositoryImpl.js.map