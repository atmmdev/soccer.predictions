import { Controller, Get, Query, UseGuards } from '@nestjs/common';

import { CurrentUser } from '../../../identity/infrastructure/http/current-user.decorator.js';
import { JwtAuthGuard } from '../../../identity/infrastructure/http/jwt-auth.guard.js';
import type { AuthUser } from '../../../identity/application/types/auth-user.js';
import { RankingService } from '../../application/services/ranking.service.js';

@Controller('rankings')
@UseGuards(JwtAuthGuard)
export class RankingsController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  list(
    @CurrentUser() user: AuthUser,
    @Query('poolId') poolId?: string,
  ) {
    const parsedPoolId =
      poolId !== undefined && poolId.length > 0 ? Number(poolId) : undefined;

    return this.rankingService.listForUser(
      user,
      Number.isInteger(parsedPoolId) ? parsedPoolId : undefined,
    );
  }
}
