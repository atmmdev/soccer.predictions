import { Module } from '@nestjs/common';

import { IdentityModule } from '../identity/identity.module.js';
import { PoolService } from './application/services/pool.service.js';
import { PoolsController } from './infrastructure/http/pools.controller.js';

@Module({
  imports: [IdentityModule],
  controllers: [PoolsController],
  providers: [PoolService],
  exports: [PoolService],
})
export class BettingModule {}
