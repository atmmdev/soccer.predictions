import { Module } from '@nestjs/common';

import { IdentityModule } from '../identity/identity.module.js';
import { PoolService } from './application/services/pool.service.js';
import { PredictionService } from './application/services/prediction.service.js';
import { PoolsController } from './infrastructure/http/pools.controller.js';
import { PredictionsController } from './infrastructure/http/predictions.controller.js';

@Module({
  imports: [IdentityModule],
  controllers: [PoolsController, PredictionsController],
  providers: [PoolService, PredictionService],
  exports: [PoolService, PredictionService],
})
export class BettingModule {}
