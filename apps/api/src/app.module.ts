import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';

import { BettingModule } from './modules/betting/betting.module.js';
import { HealthModule } from './modules/health/health.module.js';
import { IdentityModule } from './modules/identity/identity.module.js';
import { SportsModule } from './modules/sports/sports.module.js';
import { PrismaModule } from './shared/prisma/prisma.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    ScheduleModule.forRoot(),
    PrismaModule,
    HealthModule,
    IdentityModule,
    SportsModule,
    BettingModule,
  ],
})
export class AppModule {}
