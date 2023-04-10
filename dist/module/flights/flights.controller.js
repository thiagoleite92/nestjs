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
exports.FlightsController = void 0;
const common_1 = require("@nestjs/common");
const flights_service_1 = require("./flights.service");
const create_flight_dto_1 = require("./dto/create-flight.dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const role_decorator_1 = require("../../decorator/role.decorator");
const role_enum_1 = require("../../enums/role.enum");
const update_flight_dto_1 = require("./dto/update-flight.dto");
const roles_auth_guard_1 = require("../auth/roles-auth.guard");
let FlightsController = class FlightsController {
    constructor(flightsService) {
        this.flightsService = flightsService;
    }
    async saveFlight(createFlightDto) {
        return this.flightsService.saveFlight(createFlightDto);
    }
    async updateFlight(req, flightId, updateFlightDto) {
        const { routeId } = updateFlightDto;
        const { id: pilotId } = req.user;
        return this.flightsService.updateFlight(flightId, routeId, pilotId);
    }
    async deleteFlight(req, flightId) {
        const { id: pilotId } = req.user;
        return this.flightsService.deleteFlight(flightId, pilotId);
    }
    async getFlights(flightId) {
        return flightId
            ? await this.flightsService.findFlightById(flightId)
            : await this.flightsService.getAllFlights();
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, role_decorator_1.Roles)(role_enum_1.Role.PILOT),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_flight_dto_1.CreateFlightDto]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "saveFlight", null);
__decorate([
    (0, common_1.Patch)(':flightId'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.PILOT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('flightId')),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, update_flight_dto_1.UpdateFlightDto]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "updateFlight", null);
__decorate([
    (0, common_1.Delete)(':flightId'),
    (0, role_decorator_1.Roles)(role_enum_1.Role.PILOT),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Param)('flightId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "deleteFlight", null);
__decorate([
    (0, common_1.Get)(':flightId?'),
    __param(0, (0, common_1.Param)('flightId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], FlightsController.prototype, "getFlights", null);
FlightsController = __decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, roles_auth_guard_1.RolesAuthGuard),
    (0, common_1.Controller)('/api/flight'),
    __metadata("design:paramtypes", [flights_service_1.FlightsService])
], FlightsController);
exports.FlightsController = FlightsController;
//# sourceMappingURL=flights.controller.js.map