import { Controller, Get, UseGuards } from '@nestjs/common';

import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { CurrentUser } from '../../../identity/infrastructure/http/current-user.decorator.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import { FixtureService } from '../../application/services/fixture.service.js';

@Controller('fixtures')
@UseGuards(JwtAuthGuard)
export class FixturesController {
  constructor(private readonly fixtureService: FixtureService) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.fixtureService.listForUser(user);
  }
}
