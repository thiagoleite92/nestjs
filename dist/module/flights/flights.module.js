"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FlightsModule = void 0;
const common_1 = require("@nestjs/common");
const flights_controller_1 = require("./flights.controller");
const flights_service_1 = require("./flights.service");
const flights_repositoryImpl_1 = require("./repository/flights.repositoryImpl");
const shared_module_1 = require("../shared/shared.module");
const routes_module_1 = require("../routes/routes.module");
const users_module_1 = require("../users/users.module");
let FlightsModule = class FlightsModule {
};
FlightsModule = __decorate([
    (0, common_1.Module)({
        imports: [shared_module_1.SharedModule, routes_module_1.RoutesModule, users_module_1.UsersModule],
        controllers: [flights_controller_1.FlightsController],
        providers: [flights_service_1.FlightsService, flights_repositoryImpl_1.FlightsRepositoryImpl],
    })
], FlightsModule);
exports.FlightsModule = FlightsModule;
//# sourceMappingURL=flights.module.js.map