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
exports.FlightsService = void 0;
const common_1 = require("@nestjs/common");
const flights_repositoryImpl_1 = require("./repository/flights.repositoryImpl");
const routes_service_1 = require("../routes/routes.service");
const users_service_1 = require("../users/users.service");
let FlightsService = class FlightsService {
    constructor(flightsRepository, routesService, usersService) {
        this.flightsRepository = flightsRepository;
        this.routesService = routesService;
        this.usersService = usersService;
    }
    async saveFlight(createFlightDto) {
        const { routeId, pilotId } = createFlightDto;
        if (await this.flightsRepository.bookedFlightByPilotId(pilotId)) {
            throw new common_1.BadRequestException('Esse piloto já tem uma rota agendada.');
        }
        const route = await this.routesService.findRouteById(routeId);
        if (!route) {
            throw new common_1.NotFoundException('Rota não encontrada.');
        }
        if (!route.isAvailable) {
            throw new common_1.BadRequestException('Rota não está disponível');
        }
        if (await this.flightsRepository.findFlightByRouteId(routeId)) {
            throw new common_1.ConflictException('Rota já está agendada para outro piloto.');
        }
        if (!(await this.checkPilotLocationAndRouteOrigin(pilotId, routeId))) {
            throw new common_1.BadRequestException('Piloto e Origem da rota solicitada não coincidem.');
        }
        return this.flightsRepository.saveFlight(createFlightDto);
    }
    async updateFlight(flightId, routeId, pilotId) {
        const flight = await this.flightsRepository.findFlightById(flightId);
        if (!flight) {
            throw new common_1.NotFoundException('Voo não encontrado');
        }
        const currentPilotId = flight.pilotId;
        if (currentPilotId !== pilotId) {
            throw new common_1.BadRequestException('Apenas o piloto que agendou a viagem pode atualiza-la.');
        }
        const route = await this.routesService.findRouteById(routeId);
        if (!route) {
            throw new common_1.NotFoundException('Rota não encontrada.');
        }
        if (!route.isAvailable) {
            throw new common_1.BadRequestException('Rota não está disponível');
        }
        if (await this.flightsRepository.findFlightByRouteId(routeId)) {
            throw new common_1.ConflictException('Essa rota já foi agendada');
        }
        if (!(await this.checkPilotLocationAndRouteOrigin(pilotId, routeId))) {
            throw new common_1.BadRequestException('Piloto e Origem da rota solicitada não coincidem.');
        }
        await this.flightsRepository.updateFlight(flightId, routeId);
        return 'Voo atualizado com sucesso';
    }
    async checkPilotLocationAndRouteOrigin(pilotId, routeId) {
        const { actualLocation } = await this.usersService.findById(pilotId);
        const { origin } = await this.routesService.findRouteById(routeId);
        return actualLocation === origin;
    }
    async deleteFlight(flightId, pilotId) {
        const flight = await this.findFlightById(flightId);
        if (!flight) {
            throw new common_1.NotFoundException('Voo não encontrado');
        }
        const currentPilotId = flight.pilotId;
        if (currentPilotId !== pilotId) {
            throw new common_1.BadRequestException('Apenas o piloto que agendou a viagem pode deleta-la');
        }
        return this.flightsRepository.deleteFlight(flightId, flight.routeId);
    }
    async getAllFlights() {
        return this.flightsRepository.getAllFlights();
    }
    async findFlightById(flightId) {
        return this.flightsRepository.findFlightById(flightId);
    }
};
FlightsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [flights_repositoryImpl_1.FlightsRepositoryImpl,
        routes_service_1.RoutesService,
        users_service_1.UsersService])
], FlightsService);
exports.FlightsService = FlightsService;
//# sourceMappingURL=flights.service.js.map