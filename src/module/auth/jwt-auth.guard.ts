import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const SkipAuthJwtGuard = this.reflector.get<boolean>('SkipAuthJwtGuard', context.getHandler())

    // if (SkipAuthJwtGuard) {
    //     return true;
    // }
    return super.canActivate(context);
  }
}
