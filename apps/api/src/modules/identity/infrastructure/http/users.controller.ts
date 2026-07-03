import { Controller, Get, UseGuards } from '@nestjs/common';

import { Roles } from '../../../../shared/auth/roles.decorator.js';
import { RolesGuard } from '../../../../shared/auth/roles.guard.js';
import { UserService } from '../../application/services/user.service.js';
import { JwtAuthGuard } from './jwt-auth.guard.js';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('SUPER_ADMIN')
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Get('pool-delegates')
  listPoolDelegates() {
    return this.userService.listPoolDelegateCandidates();
  }
}
