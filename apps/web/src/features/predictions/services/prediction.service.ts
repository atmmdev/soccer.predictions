import type { SubmitPredictionFormData } from '../schemas/submit-prediction.schema';
import type {
  PredictionFixtureItem,
  UserPrediction,
} from '../types/prediction-fixture';
import { canEditPrediction } from '../utils/prediction-window';

export class PredictionService {
  static submit(
    fixtures: PredictionFixtureItem[],
    fixtureId: number,
    data: SubmitPredictionFormData,
  ): PredictionFixtureItem[] {
    const fixture = fixtures.find(item => item.id === fixtureId);

    if (!fixture) {
      throw new Error('Jogo não encontrado');
    }

    if (!canEditPrediction(fixture)) {
      throw new Error(
        'Prazo encerrado. Palpites só podem ser enviados até 10 minutos antes do jogo.',
      );
    }

    return fixtures.map(item => {
      if (item.id !== fixtureId) {
        return item;
      }

      const prediction: UserPrediction = {
        fixtureId,
        predictedHomeScore: data.predictedHomeScore,
        predictedAwayScore: data.predictedAwayScore,
        selectedPlayerId: data.selectedPlayerId,
      };

      return { ...item, prediction };
    });
  }
}
