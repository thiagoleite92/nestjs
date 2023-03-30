import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ConsoleLogger,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ExtractJwt } from 'passport-jwt';
import { ROLES_KEY } from 'src/decorator/role.decorator';
import { Role } from 'src/enums/role.enum';
import { UsersService } from '../users/users.service';
import { AuthService } from './auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private authService: AuthService,
    private usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles) {
      return true;
    }

    const token = ExtractJwt.fromAuthHeaderAsBearerToken()(
      context.switchToHttp().getRequest(),
    );

    if (!token) {
      return false;
    }

    const { sub: userId } = await this.authService.decodeToken(token);

    if (!userId) {
      return false;
    }

    const user = await this.usersService.findById(userId);

    context.switchToHttp().getRequest().body.userId = userId;

    return requiredRoles.some((role) => role === user?.role);
  }
}
