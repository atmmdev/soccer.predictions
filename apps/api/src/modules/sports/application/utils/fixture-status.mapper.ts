import type { FixtureStatus } from '../../../../../generated/prisma/client.js';

const LIVE_STATUSES = new Set([
  '1H',
  'HT',
  '2H',
  'ET',
  'BT',
  'P',
  'LIVE',
  'INT',
]);

const FINISHED_STATUSES = new Set(['FT', 'AET', 'PEN']);

const POSTPONED_STATUSES = new Set(['PST', 'SUSP']);

const CANCELLED_STATUSES = new Set(['CANC', 'ABD', 'AWD', 'WO']);

export function mapApiFootballFixtureStatus(short: string): FixtureStatus {
  if (LIVE_STATUSES.has(short)) {
    return 'LIVE';
  }

  if (FINISHED_STATUSES.has(short)) {
    return 'FINISHED';
  }

  if (POSTPONED_STATUSES.has(short)) {
    return 'POSTPONED';
  }

  if (CANCELLED_STATUSES.has(short)) {
    return 'CANCELLED';
  }

  return 'SCHEDULED';
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
