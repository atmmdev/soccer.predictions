import type { FixtureStatus } from '../../../../../generated/prisma/client.js';
import type { FootballDataMatchStatus } from '../../infrastructure/integrations/football-data.types.js';

export function mapFootballDataFixtureStatus(
  status: FootballDataMatchStatus | string,
): FixtureStatus {
  switch (status) {
    case 'IN_PLAY':
    case 'PAUSED':
      return 'LIVE';
    case 'FINISHED':
    case 'AWARDED':
      return 'FINISHED';
    case 'POSTPONED':
    case 'SUSPENDED':
      return 'POSTPONED';
    case 'CANCELLED':
      return 'CANCELLED';
    case 'SCHEDULED':
    case 'TIMED':
    default:
      return 'SCHEDULED';
  }
}

export function isFinishedFootballDataStatus(
  status: FootballDataMatchStatus | string,
): boolean {
  return status === 'FINISHED' || status === 'AWARDED';
}

export function parseFixtureRound(round: string | null): number | null {
  if (!round) {
    return null;
  }

  const match = round.match(/(\d+)\s*$/);

  if (!match) {
    return null;
  }

  return Number.parseInt(match[1], 10);
}
