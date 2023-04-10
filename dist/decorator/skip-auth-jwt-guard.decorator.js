"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SkipAuthJwtGuard = void 0;
const common_1 = require("@nestjs/common");
const SkipAuthJwtGuard = (...args) => (0, common_1.SetMetadata)('SkipAuthJwtGuard', args);
exports.SkipAuthJwtGuard = SkipAuthJwtGuard;
//# sourceMappingURL=skip-auth-jwt-guard.decorator.js.map