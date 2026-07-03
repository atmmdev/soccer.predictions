import { API_URL, authHeaders, parseApiError } from '@/lib/api-client';

import type { SubmitPredictionFormData } from '../schemas/submit-prediction.schema';
import type { PredictionFixtureItem } from '../types/prediction-fixture';

export async function fetchPredictionsRequest(): Promise<PredictionFixtureItem[]> {
  const response = await fetch(`${API_URL}/predictions`, {
    headers: authHeaders(),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<PredictionFixtureItem[]>;
}

export async function submitPredictionRequest(
  poolId: number,
  fixtureId: number,
  data: SubmitPredictionFormData,
): Promise<PredictionFixtureItem> {
  const response = await fetch(`${API_URL}/predictions`, {
    method: 'POST',
    headers: authHeaders(),
    body: JSON.stringify({
      poolId,
      fixtureId,
      predictedHomeScore: data.predictedHomeScore,
      predictedAwayScore: data.predictedAwayScore,
      selectedPlayerId: data.selectedPlayerId,
    }),
  });

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<PredictionFixtureItem>;
}
