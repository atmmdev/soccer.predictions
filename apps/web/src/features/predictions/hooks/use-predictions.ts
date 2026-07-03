'use client';

import { useCallback, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { getFetchErrorMessage } from '@/lib/api-client';

import type { SubmitPredictionFormData } from '../schemas/submit-prediction.schema';
import {
  fetchPredictionsRequest,
  submitPredictionRequest,
} from '../services/prediction-api.service';
import type { PredictionFixtureItem } from '../types/prediction-fixture';

export function usePredictions() {
  const [fixtures, setFixtures] = useState<PredictionFixtureItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadFixtures = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetchPredictionsRequest();
      setFixtures(response);
    } catch (loadError) {
      setError(
        getFetchErrorMessage(
          loadError,
          'Não foi possível carregar os palpites.',
        ),
      );
      setFixtures([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadFixtures();
  }, [loadFixtures]);

  const submitPrediction = useCallback(
    async (
      fixtureId: number,
      poolId: number,
      data: SubmitPredictionFormData,
    ): Promise<boolean> => {
      try {
        const updated = await submitPredictionRequest(poolId, fixtureId, data);

        setFixtures(current =>
          current.map(item =>
            item.id === updated.id &&
            item.poolId === updated.poolId &&
            item.participantId === updated.participantId
              ? updated
              : item,
          ),
        );

        return true;
      } catch (submitError) {
        toast.error(
          getFetchErrorMessage(
            submitError,
            'Não foi possível salvar o palpite.',
          ),
        );
        return false;
      }
    },
    [],
  );

  return {
    fixtures,
    isLoading,
    error,
    reloadFixtures: loadFixtures,
    submitPrediction,
  };
}
