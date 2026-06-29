import type { PredictionFixtureItem } from '../types/prediction-fixture';

export function formatOfficialResult(fixture: PredictionFixtureItem): string {
  const { officialHomeScore: home, officialAwayScore: away } = fixture;

  if (typeof home !== 'number' || typeof away !== 'number') {
    return '—';
  }

  return `${home} x ${away}`;
}
