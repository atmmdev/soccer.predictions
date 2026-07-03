import { Module } from '@nestjs/common';

import { IdentityModule } from '../identity/identity.module.js';
import { PoolService } from './application/services/pool.service.js';
import { PredictionService } from './application/services/prediction.service.js';
import { RankingService } from './application/services/ranking.service.js';
import { ScoringService } from './application/services/scoring.service.js';
import { PoolsController } from './infrastructure/http/pools.controller.js';
import { PredictionsController } from './infrastructure/http/predictions.controller.js';
import { RankingsController } from './infrastructure/http/rankings.controller.js';

@Module({
  imports: [IdentityModule],
  controllers: [PoolsController, PredictionsController, RankingsController],
  providers: [PoolService, PredictionService, ScoringService, RankingService],
  exports: [PoolService, PredictionService, ScoringService, RankingService],
})
export class BettingModule {}
