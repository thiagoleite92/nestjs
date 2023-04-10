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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoutesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const create_route_dto_1 = require("./dto/create-route.dto");
const routes_service_1 = require("./routes.service");
const admin_role_guard_1 = require("../auth/admin-role.guard");
const role_decorator_1 = require("../../decorator/role.decorator");
const role_enum_1 = require("../../enums/role.enum");
const update_route_dto_1 = require("./dto/update-route.dto");
let RoutesController = class RoutesController {
    constructor(routesService) {
        this.routesService = routesService;
    }
    async create(createRouteDto) {
        return this.routesService.saveRoute(createRouteDto);
    }
    async deleteRoute(routeId) {
        return this.routesService.deleteRoute(routeId);
    }
    async updateRoute(routeId, updateRouteDto) {
        return this.routesService.updateRoute(routeId, updateRouteDto);
    }
    async getRoutes(routeId) {
        return routeId
            ? await this.routesService.findRouteById(routeId)
            : await this.routesService.getAllRoutes();
    }
};
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_route_dto_1.CreateRouteDto]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(':routeId'),
    __param(0, (0, common_1.Param)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "deleteRoute", null);
__decorate([
    (0, common_1.Patch)(':routeId'),
    __param(0, (0, common_1.Param)('routeId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_route_dto_1.UpdateRouteDto]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "updateRoute", null);
__decorate([
    (0, common_1.Get)(':routeId?'),
    __param(0, (0, common_1.Param)('routeId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], RoutesController.prototype, "getRoutes", null);
RoutesController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, admin_role_guard_1.AdminGuard),
    (0, common_1.Controller)('/api/route'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.ADMIN),
    __metadata("design:paramtypes", [routes_service_1.RoutesService])
], RoutesController);
exports.RoutesController = RoutesController;
//# sourceMappingURL=routes.controller.js.map