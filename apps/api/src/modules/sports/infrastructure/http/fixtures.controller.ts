import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { CurrentUser } from '../../../identity/infrastructure/http/current-user.decorator.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import { FixtureService } from '../../application/services/fixture.service.js';
import { LineupService } from '../../application/services/lineup.service.js';

@Controller('fixtures')
@UseGuards(JwtAuthGuard)
export class FixturesController {
  constructor(
    private readonly fixtureService: FixtureService,
    private readonly lineupService: LineupService,
  ) {}

  @Get()
  list(@CurrentUser() user: AuthUser) {
    return this.fixtureService.listForUser(user);
  }

  @Get(':id/lineup')
  getLineup(@Param('id', ParseIntPipe) id: number) {
    return this.lineupService.getFixtureLineup(id);
  }
}
