import type { Prisma } from '../../../../../generated/prisma/client.js';
import type { FootballDataMatch } from '../../infrastructure/integrations/football-data.types.js';
import { mapStageToCupPhase } from '../utils/cup-phase.mapper.js';
import { mapFootballDataFixtureStatus } from '../utils/fixture-status.mapper.js';

export function buildFixtureUpdateData(
  remote: FootballDataMatch,
): Prisma.FixtureUpdateInput {
  return {
    date: new Date(remote.utcDate),
    status: mapFootballDataFixtureStatus(remote.status),
    homeScore: remote.score.fullTime.home,
    awayScore: remote.score.fullTime.away,
    round: remote.matchday,
    phase: mapStageToCupPhase(remote.stage),
  };
}
