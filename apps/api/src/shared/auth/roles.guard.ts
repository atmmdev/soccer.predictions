import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import type { UserRole } from '../../../generated/prisma/client.js';
import type { AuthUser } from '../../modules/identity/application/types/auth-user.js';
import { ROLES_KEY } from './roles.decorator.js';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredRoles?.length) {
      return true;
    }

    const request = context.switchToHttp().getRequest<{ user: AuthUser }>();
    const user = request.user;

    if (!user) {
      throw new ForbiddenException('Acesso negado');
    }

    if (requiredRoles.includes(user.role)) {
      return true;
    }

    throw new ForbiddenException('Acesso negado');
  }
}
