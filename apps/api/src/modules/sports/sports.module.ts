import { Module } from '@nestjs/common';

import { IdentityModule } from '../identity/identity.module.js';
import { ChampionshipService } from './application/services/championship.service.js';
import { FixtureService } from './application/services/fixture.service.js';
import { ChampionshipsController } from './infrastructure/http/championships.controller.js';
import { FixturesController } from './infrastructure/http/fixtures.controller.js';

@Module({
  imports: [IdentityModule],
  controllers: [ChampionshipsController, FixturesController],
  providers: [ChampionshipService, FixtureService],
  exports: [ChampionshipService, FixtureService],
})
export class SportsModule {}
