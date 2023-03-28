import { SetMetadata } from '@nestjs/common';

// decoretor para tornar algumas rotas públicas mesmo com UseGuards
export const SkipAuthJwtGuard = (...args: string[]) =>
  SetMetadata('SkipAuthJwtGuard', args);
