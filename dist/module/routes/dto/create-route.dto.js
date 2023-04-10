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
exports.CreateRouteDto = void 0;
const class_validator_1 = require("class-validator");
const ValidateCity_pipe_1 = require("../pipes/ValidateCity.pipe");
class CreateRouteDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 255),
    (0, class_validator_1.Validate)(ValidateCity_pipe_1.ValidCity, { message: 'Cidade de origem não encontrada' }),
    __metadata("design:type", String)
], CreateRouteDto.prototype, "origin", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(3, 255),
    (0, class_validator_1.Validate)(ValidateCity_pipe_1.ValidCity, { message: 'Cidade de destino não encontrada' }),
    __metadata("design:type", String)
], CreateRouteDto.prototype, "destiny", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", Number)
], CreateRouteDto.prototype, "durationEstimated", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    __metadata("design:type", Object)
], CreateRouteDto.prototype, "departureTime", void 0);
__decorate([
    (0, class_validator_1.IsUUID)(),
    __metadata("design:type", String)
], CreateRouteDto.prototype, "userId", void 0);
__decorate([
    (0, class_validator_1.IsDateString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], CreateRouteDto.prototype, "arrivalTime", void 0);
exports.CreateRouteDto = CreateRouteDto;
//# sourceMappingURL=create-route.dto.js.map