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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt_service_1 = require("../shared/bcrypt.service");
const users_service_1 = require("../users/users.service");
let AuthService = class AuthService {
    constructor(usersService, jwtService, bcrypt) {
        this.usersService = usersService;
        this.jwtService = jwtService;
        this.bcrypt = bcrypt;
    }
    async validateUser(email, password) {
        const user = await this.usersService.findByEmail(email);
        if (!user) {
            throw new common_1.UnauthorizedException('Usuário ou Senha Inválidos');
        }
        if (await this.bcrypt.comparePassword(password, user.password)) {
            return user;
        }
        throw new common_1.UnauthorizedException('Usuário ou Senha Inválidos');
    }
    async generateToken({ name, role, email, id }) {
        return {
            accessToken: this.jwtService.sign({ sub: id, email, role }),
            user: { email, name, role, id },
        };
    }
    async decodeToken(token) {
        try {
            const decoded = this.jwtService.decode(token);
            if (decoded) {
                return decoded;
            }
            return new common_1.BadRequestException('Erro no Token do usuário');
        }
        catch (error) {
            return new common_1.BadRequestException('Erro no Token do usuário');
        }
    }
};
AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService,
        bcrypt_service_1.BcryptService])
], AuthService);
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map