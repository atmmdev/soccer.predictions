import type { SubmitPredictionFormData } from '../schemas/submit-prediction.schema';
import type {
  PredictionFixtureItem,
  UserPrediction,
} from '../types/prediction-fixture';

export class PredictionService {
  static submit(
    fixtures: PredictionFixtureItem[],
    fixtureId: number,
    data: SubmitPredictionFormData,
  ): PredictionFixtureItem[] {
    return fixtures.map(fixture => {
      if (fixture.id !== fixtureId) {
        return fixture;
      }

      const prediction: UserPrediction = {
        fixtureId,
        predictedHomeScore: data.predictedHomeScore,
        predictedAwayScore: data.predictedAwayScore,
        selectedPlayerId: data.selectedPlayerId,
      };

      return { ...fixture, prediction };
    });
  }
}
