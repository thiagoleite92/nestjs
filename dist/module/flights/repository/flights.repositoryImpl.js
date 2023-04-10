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
exports.FlightsRepositoryImpl = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../shared/prisma.service");
const moment_service_1 = require("../../shared/moment.service");
let FlightsRepositoryImpl = class FlightsRepositoryImpl {
    constructor(prisma, moment) {
        this.prisma = prisma;
        this.moment = moment;
    }
    async saveFlight({ pilotId, routeId }) {
        try {
            await this.prisma.$transaction([
                this.prisma.route.update({
                    where: {
                        id: routeId,
                    },
                    data: {
                        isAvailable: false,
                    },
                }),
                this.prisma.flight.create({
                    data: { pilotId, routeId },
                }),
            ]);
            return 'Voo agendado com sucesso!';
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    async findFlightById(flightId) {
        return await this.prisma.flight.findUnique({ where: { id: flightId } });
    }
    async findFlightByRouteId(routeId) {
        return this.prisma.flight.findFirst({
            where: { routeId },
        });
    }
    async updateFlight(flightId, routeId) {
        try {
            const { routeId: oldRouteId } = await this.prisma.flight.findUnique({
                where: { id: flightId },
            });
            await this.prisma.$transaction([
                this.prisma.route.update({
                    where: { id: oldRouteId },
                    data: { isAvailable: true },
                }),
                this.prisma.flight.update({
                    where: { id: flightId },
                    data: { routeId },
                }),
                this.prisma.route.update({
                    where: { id: routeId },
                    data: { isAvailable: false },
                }),
            ]);
            return;
        }
        catch (error) {
            console.log(error);
            return;
        }
    }
    async bookedFlightByPilotId(pilotId) {
        return this.prisma.flight.findFirst({
            where: {
                pilotId,
                flightStatus: 'BOOKED',
            },
        });
    }
    async deleteFlight(flightId, routeId) {
        await this.prisma.$transaction([
            this.prisma.route.update({
                where: { id: routeId },
                data: { isAvailable: true },
            }),
            this.prisma.flight.delete({
                where: { id: flightId },
            }),
        ]);
    }
    async getAllFlights() {
        return this.prisma.flight.findMany({});
    }
};
FlightsRepositoryImpl = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, moment_service_1.MomentService])
], FlightsRepositoryImpl);
exports.FlightsRepositoryImpl = FlightsRepositoryImpl;
//# sourceMappingURL=flights.repositoryImpl.js.map