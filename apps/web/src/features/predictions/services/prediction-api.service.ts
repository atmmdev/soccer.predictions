import { API_URL, authFetch, parseApiError } from '@/lib/api-client';

import type { SubmitPredictionFormData } from '../schemas/submit-prediction.schema';
import type { PredictionFixtureItem } from '../types/prediction-fixture';

export async function fetchPredictionsRequest(): Promise<PredictionFixtureItem[]> {
  const response = await authFetch(`${API_URL}/predictions`);

  if (!response.ok) {
    throw new Error(await parseApiError(response));
  }

  return response.json() as Promise<PredictionFixtureItem[]>;
}

export async function fetchPredictionsByFixtureRequest(
  poolId: number,
  fixtureId: number,
): Promise<PredictionFixtureItem[]> {
  const params = new URLSearchParams({
    poolId: poolId.toString(),
    fixtureId: fixtureId.toString(),
  });
  const response = await authFetch(
    `${API_URL}/predictions/by-fixture?${params.toString()}`,
  );

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
  const response = await authFetch(`${API_URL}/predictions`, {
    method: 'POST',
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
