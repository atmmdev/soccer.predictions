'use client';

import { useState } from 'react';
import { toast } from 'sonner';

import { predictionFixtures } from '../mocks/prediction-fixtures';
import type { SubmitPredictionFormData } from '../schemas/submit-prediction.schema';
import { PredictionService } from '../services/prediction.service';
import type { PredictionFixtureItem } from '../types/prediction-fixture';
import { normalizePredictionFixtures } from '../utils/normalize-prediction-fixture';

export function usePredictions() {
  const [fixtures, setFixtures] = useState<PredictionFixtureItem[]>(() =>
    normalizePredictionFixtures(predictionFixtures),
  );

  function submitPrediction(
    fixtureId: number,
    data: SubmitPredictionFormData,
  ): boolean {
    try {
      setFixtures(current =>
        normalizePredictionFixtures(
          PredictionService.submit(current, fixtureId, data),
        ),
      );

      return true;
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível salvar o palpite.';

      toast.error(message);
      return false;
    }
  }

  return { fixtures, submitPrediction };
}
