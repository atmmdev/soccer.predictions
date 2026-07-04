import { Controller, Get, UseGuards } from '@nestjs/common';

import { Roles } from '../../../../shared/auth/roles.decorator.js';
import { RolesGuard } from '../../../../shared/auth/roles.guard.js';
import { CurrentUser } from '../../../identity/infrastructure/http/current-user.decorator.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { ParticipantService } from '../../application/services/participant.service.js';

@Controller('participants')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles('ADMIN', 'SUPER_ADMIN')
export class ParticipantsController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.participantService.listForUser(user);
  }
}
