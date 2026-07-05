import { Module } from '@nestjs/common';

import { PoolAccessGuard } from '../../shared/auth/pool-access.guard.js';
import { PoolOwnerGuard } from '../../shared/auth/pool-owner.guard.js';
import { RolesGuard } from '../../shared/auth/roles.guard.js';
import { IdentityModule } from '../identity/identity.module.js';
import { ParticipantService } from './application/services/participant.service.js';
import { PoolService } from './application/services/pool.service.js';
import { PredictionService } from './application/services/prediction.service.js';
import { RankingService } from './application/services/ranking.service.js';
import { ScoringService } from './application/services/scoring.service.js';
import { ParticipantsController } from './infrastructure/http/participants.controller.js';
import { PoolsController } from './infrastructure/http/pools.controller.js';
import { PredictionsController } from './infrastructure/http/predictions.controller.js';
import { RankingsController } from './infrastructure/http/rankings.controller.js';

@Module({
  imports: [IdentityModule],
  controllers: [PoolsController, PredictionsController, RankingsController, ParticipantsController],
  providers: [PoolService, PredictionService, ScoringService, RankingService, ParticipantService, RolesGuard, PoolAccessGuard, PoolOwnerGuard],
  exports: [PoolService, PredictionService, ScoringService, RankingService, ParticipantService],
})
export class BettingModule {}
