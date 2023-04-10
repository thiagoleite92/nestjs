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
exports.RoutesService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const routes_repositoryImpl_1 = require("./repository/routes.repositoryImpl");
const moment_service_1 = require("../shared/moment.service");
let RoutesService = class RoutesService {
    constructor(routesRepository, usersService, moment) {
        this.routesRepository = routesRepository;
        this.usersService = usersService;
        this.moment = moment;
    }
    async saveRoute(createRouteDto) {
        if (!(await this.usersService.findById(createRouteDto.userId))) {
            throw new common_1.NotFoundException('Usuário para criação da rota, não encontrado.');
        }
        if (await this.checkDuplicateRoute(createRouteDto)) {
            throw new common_1.ConflictException('Rota duplicada, consulte a lista de rotas.');
        }
        const { departureTime, durationEstimated } = createRouteDto;
        const arrivalTime = this.moment.adjustArrivalTime(departureTime, durationEstimated);
        createRouteDto.arrivalTime = arrivalTime;
        return this.routesRepository.saveRoute(createRouteDto);
    }
    async checkDuplicateRoute(createRouteDto) {
        return await this.routesRepository.checkDuplicateRoute(createRouteDto);
    }
    async deleteRoute(routeId) {
        let flightId = null;
        const detailedRoute = (await this.routesRepository.findDetailedRoute(routeId));
        if (!detailedRoute) {
            throw new common_1.NotFoundException('Rota não encontrada.');
        }
        if (detailedRoute.Flight.length) {
            flightId = detailedRoute.Flight[0].id;
        }
        return this.routesRepository.deleteRoute(routeId, flightId);
    }
    async findRouteById(routeId) {
        return this.routesRepository.findRouteById(routeId);
    }
    async updateRoute(routeId, updateRouteDto) {
        let newArrivalTime = null;
        const route = await this.routesRepository.findRouteById(routeId);
        if (!route) {
            throw new common_1.NotFoundException('Rota não encontrada.');
        }
        if (!(await this.usersService.findById(updateRouteDto.userId))) {
            throw new common_1.NotFoundException('Usuário para atualização da rota, não encontrado.');
        }
        if (route.departureTime !== updateRouteDto.departureTime ||
            route.durationEstimated !== updateRouteDto.durationEstimated) {
            newArrivalTime = this.moment.adjustArrivalTime(updateRouteDto.departureTime || route.departureTime, updateRouteDto.durationEstimated || route.durationEstimated);
            updateRouteDto.arrivalTime = newArrivalTime;
        }
        return this.routesRepository.updateRoute(routeId, updateRouteDto);
    }
    async getAllRoutes() {
        return this.routesRepository.getAll();
    }
};
RoutesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [routes_repositoryImpl_1.RoutesRepositoryImpl,
        users_service_1.UsersService,
        moment_service_1.MomentService])
], RoutesService);
exports.RoutesService = RoutesService;
//# sourceMappingURL=routes.service.js.map