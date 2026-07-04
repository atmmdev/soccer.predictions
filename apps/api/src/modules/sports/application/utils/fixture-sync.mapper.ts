import type { Prisma } from '../../../../../generated/prisma/client.js';
import type { ApiFootballFixtureItem } from '../../infrastructure/integrations/api-football.types.js';
import { mapRoundToCupPhase } from '../utils/cup-phase.mapper.js';
import {
  mapApiFootballFixtureStatus,
  parseFixtureRound,
} from '../utils/fixture-status.mapper.js';
import type { FixtureGoalScorer } from '../utils/fixture-goal-scorers.js';

export function buildFixtureUpdateData(
  remote: ApiFootballFixtureItem,
  goalScorers?: FixtureGoalScorer[],
): Prisma.FixtureUpdateInput {
  const status = mapApiFootballFixtureStatus(remote.fixture.status.short);

  return {
    date: new Date(remote.fixture.date),
    status,
    homeScore: remote.goals.home,
    awayScore: remote.goals.away,
    round: parseFixtureRound(remote.league.round),
    phase: mapRoundToCupPhase(remote.league.round),
    ...(goalScorers
      ? { goalScorers: goalScorers as unknown as Prisma.InputJsonValue }
      : {}),
  };
}

export function isFinishedFixtureStatus(
  shortStatus: string,
): boolean {
  return ['FT', 'AET', 'PEN'].includes(shortStatus);
}
