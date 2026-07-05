import { Module } from '@nestjs/common';

import { BettingModule } from '../betting/betting.module.js';
import { RolesGuard } from '../../shared/auth/roles.guard.js';
import { IdentityModule } from '../identity/identity.module.js';
import { CatalogService } from './application/services/catalog.service.js';
import { ChampionshipService } from './application/services/championship.service.js';
import { FixtureService } from './application/services/fixture.service.js';
import { ImportChampionshipService } from './application/services/import-championship.service.js';
import { LineupService } from './application/services/lineup.service.js';
import { SyncFixturesService } from './application/services/sync-fixtures.service.js';
import { FixtureSyncScheduler } from './infrastructure/jobs/fixture-sync.scheduler.js';
import { ApiFootballClient } from './infrastructure/integrations/api-football.client.js';
import { ChampionshipsController } from './infrastructure/http/championships.controller.js';
import { FixturesController } from './infrastructure/http/fixtures.controller.js';

@Module({
  imports: [IdentityModule, BettingModule],
  controllers: [ChampionshipsController, FixturesController],
  providers: [
    ApiFootballClient,
    CatalogService,
    ChampionshipService,
    FixtureService,
    ImportChampionshipService,
    LineupService,
    SyncFixturesService,
    FixtureSyncScheduler,
    RolesGuard,
  ],
  exports: [
    ChampionshipService,
    FixtureService,
    SyncFixturesService,
    LineupService,
  ],
})
export class SportsModule {}
