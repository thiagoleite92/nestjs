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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_service_1 = require("../shared/bcrypt.service");
const users_repositoryImpl_1 = require("./repository/users.repositoryImpl");
let UsersService = class UsersService {
    constructor(userRepository, bcrypt) {
        this.userRepository = userRepository;
        this.bcrypt = bcrypt;
    }
    async findAll() {
        const users = await this.userRepository.getAll();
        users.forEach((user) => {
            this.excludeKeys(user, ['password']);
        });
        return users;
    }
    async create(createUserDto) {
        if (await this.findByEmail(createUserDto.email)) {
            throw new common_1.ConflictException({
                message: 'Email já registrado',
            });
        }
        createUserDto.password = await this.bcrypt.hashPassword(createUserDto.password);
        return this.userRepository.saveUser(createUserDto);
    }
    async update(userId, updateUserDto) {
        const user = await this.findById(userId);
        if (!user) {
            throw new common_1.NotFoundException({
                erro: 'Usuário não encontrado',
            });
        }
        if (updateUserDto.email !== user.email) {
            if (await this.findByEmail(updateUserDto.email)) {
                throw new common_1.ConflictException({
                    message: 'Email já registrado',
                });
            }
        }
        if (updateUserDto.password) {
            updateUserDto.password = await this.bcrypt.hashPassword(updateUserDto.password);
        }
        await this.userRepository.updateUser(userId, updateUserDto);
        return 'Usuário atualizado com sucesso';
    }
    async deleteUser(userId) {
        if (!(await this.findById(userId))) {
            throw new common_1.NotFoundException({
                erro: 'Usuário não encontrado',
            });
        }
        return await this.userRepository.deleteUser(userId);
    }
    async findByEmail(email) {
        return await this.userRepository.findUserByEmail(email);
    }
    async findById(userId) {
        const user = await this.userRepository.findUserById(userId);
        if (user) {
            this.excludeKeys(user, ['password']);
        }
        return user;
    }
    excludeKeys(user, keys) {
        for (const key of keys) {
            delete user[key];
        }
        return user;
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_repositoryImpl_1.UserRepositoryImpl,
        bcrypt_service_1.BcryptService])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map