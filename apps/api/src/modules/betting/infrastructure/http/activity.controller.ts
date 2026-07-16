import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../../identity/infrastructure/http/current-user.decorator.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { ActivityService } from '../../application/services/activity.service.js';

@Controller('activity')
@UseGuards(JwtAuthGuard)
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  list(@CurrentUser() user: AuthUser, @Query('limit') limit?: string) {
    const parsedLimit =
      limit !== undefined && limit.length > 0 ? Number(limit) : undefined;

    return this.activityService.listForUser(
      user,
      Number.isFinite(parsedLimit) ? parsedLimit : undefined,
    );
  }
}
