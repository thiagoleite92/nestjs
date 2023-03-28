import { SetMetadata } from '@nestjs/common';

export const SkipAuthJwtGuard = (...args: string[]) => SetMetadata('SkipAuthJwtGuard', true);
