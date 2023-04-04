import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';

@Injectable()
export class PilotGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const user = context.switchToHttp().getRequest()?.user;

    if (user) {
      context.switchToHttp().getRequest().body.pilotId = user.id;
      return requiredRoles.some((role) => role === user?.role);
    } else {
      return false;
    }
  }
}
