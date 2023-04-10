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
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const moment_service_1 = require("./moment.service");
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super();
        this.$use(this.updateTimeField);
        this.$use(this.softDeleteRoute);
        this.$use(this.softDeleteFlight);
    }
    async onModuleInit() {
        await this.$connect();
    }
    async enableShutdownHooks(app) {
        this.$on('beforeExit', async () => {
            await app.close();
        });
    }
    async softDeleteRoute(params, next) {
        const data = {
            isDeleted: true,
            deletedAt: moment_service_1.MomentService.getMomentPTBR(),
            updatedAt: null,
            isAvailable: false,
        };
        if (params.action === 'delete' && params.model === 'Route') {
            params.action = 'update';
            params.args.data = data;
        }
        return next(params);
    }
    async softDeleteFlight(params, next) {
        const data = {
            isDeleted: true,
            flightStatus: 'CANCELED',
            deletedAt: moment_service_1.MomentService.getMomentPTBR(),
            updatedAt: null,
        };
        if (params.action === 'delete' && params.model === 'Flight') {
            params.action = 'update';
            params.args.data = data;
        }
        return next(params);
    }
    async updateTimeField(params, next) {
        const { data } = params.args;
        const newData = Object.assign(Object.assign({}, data), { updatedAt: moment_service_1.MomentService.getMomentPTBR() });
        if (params.action === 'update') {
            params.args.data = newData;
        }
        return next(params);
    }
};
PrismaService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PrismaService);
exports.PrismaService = PrismaService;
//# sourceMappingURL=prisma.service.js.map