import { predictionFixtures } from '../mocks/prediction-fixtures';
import type { PredictionFixtureItem } from '../types/prediction-fixture';

export function normalizePredictionFixture(
  fixture: PredictionFixtureItem,
): PredictionFixtureItem {
  const defaults = predictionFixtures.find(item => item.id === fixture.id);

  if (!defaults) {
    return {
      ...fixture,
      officialHomeScore: fixture.officialHomeScore ?? null,
      officialAwayScore: fixture.officialAwayScore ?? null,
    };
  }

  return {
    ...defaults,
    ...fixture,
    officialHomeScore:
      fixture.officialHomeScore ?? defaults.officialHomeScore ?? null,
    officialAwayScore:
      fixture.officialAwayScore ?? defaults.officialAwayScore ?? null,
    prediction: fixture.prediction ?? defaults.prediction ?? null,
  };
}

export function normalizePredictionFixtures(
  fixtures: PredictionFixtureItem[],
): PredictionFixtureItem[] {
  return fixtures.map(normalizePredictionFixture);
}
