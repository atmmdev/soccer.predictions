import { parseISO } from 'date-fns';

export interface RoundAwareFixture {
  round: number | null;
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED' | string;
  date: string;
}

/** Distinct non-null rounds, ascending. */
export function listDistinctRounds(
  fixtures: ReadonlyArray<Pick<RoundAwareFixture, 'round'>>,
): number[] {
  const rounds = new Set<number>();

  for (const fixture of fixtures) {
    if (typeof fixture.round === 'number') {
      rounds.add(fixture.round);
    }
  }

  return [...rounds].sort((left, right) => left - right);
}

/**
 * Current league round heuristic:
 * 1) any LIVE → lowest live round
 * 2) else next SCHEDULED by date (or earliest scheduled)
 * 3) else highest FINISHED round
 */
export function resolveCurrentLeagueRound(
  fixtures: ReadonlyArray<RoundAwareFixture>,
  now: Date = new Date(),
): number | null {
  const withRound = fixtures.filter(
    (fixture): fixture is RoundAwareFixture & { round: number } =>
      typeof fixture.round === 'number',
  );

  if (withRound.length === 0) {
    return null;
  }

  const liveRounds = withRound
    .filter(fixture => fixture.status === 'LIVE')
    .map(fixture => fixture.round);

  if (liveRounds.length > 0) {
    return Math.min(...liveRounds);
  }

  const scheduled = withRound
    .filter(fixture => fixture.status === 'SCHEDULED')
    .sort(
      (left, right) =>
        parseISO(left.date).getTime() - parseISO(right.date).getTime(),
    );

  if (scheduled.length > 0) {
    const nowMs = now.getTime();
    const upcoming =
      scheduled.find(fixture => parseISO(fixture.date).getTime() >= nowMs) ??
      scheduled[0];

    return upcoming.round;
  }

  return Math.max(...withRound.map(fixture => fixture.round));
}
