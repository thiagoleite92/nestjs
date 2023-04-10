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
exports.PilotGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const role_decorator_1 = require("../../decorator/role.decorator");
let PilotGuard = class PilotGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    async canActivate(context) {
        var _a;
        const requiredRoles = this.reflector.getAllAndOverride(role_decorator_1.ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true;
        }
        const user = (_a = context.switchToHttp().getRequest()) === null || _a === void 0 ? void 0 : _a.user;
        if (user) {
            context.switchToHttp().getRequest().body.pilotId = user.id;
            return requiredRoles.some((role) => role === (user === null || user === void 0 ? void 0 : user.role));
        }
        else {
            return false;
        }
    }
};
PilotGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], PilotGuard);
exports.PilotGuard = PilotGuard;
//# sourceMappingURL=pilot-role.guard.js.map