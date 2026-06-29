import type { MatchFixtureItem } from '../types/match-fixture';

export function formatMatchResult(fixture: MatchFixtureItem): string {
  const { officialHomeScore: home, officialAwayScore: away } = fixture;

  if (typeof home !== 'number' || typeof away !== 'number') {
    return '—';
  }

  return `${home} x ${away}`;
}
