import { Module } from '@nestjs/common';

import { IdentityModule } from '../identity/identity.module.js';
import { ChampionshipService } from './application/services/championship.service.js';
import { ChampionshipsController } from './infrastructure/http/championships.controller.js';

@Module({
  imports: [IdentityModule],
  controllers: [ChampionshipsController],
  providers: [ChampionshipService],
  exports: [ChampionshipService],
})
export class SportsModule {}
