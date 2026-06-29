'use client';

import { useState } from 'react';

import { predictionFixtures } from '../mocks/prediction-fixtures';
import type { SubmitPredictionFormData } from '../schemas/submit-prediction.schema';
import { PredictionService } from '../services/prediction.service';
import type { PredictionFixtureItem } from '../types/prediction-fixture';

export function usePredictions() {
  const [fixtures, setFixtures] =
    useState<PredictionFixtureItem[]>(predictionFixtures);

  function submitPrediction(
    fixtureId: number,
    data: SubmitPredictionFormData,
  ) {
    setFixtures(current =>
      PredictionService.submit(current, fixtureId, data),
    );
  }

  return { fixtures, submitPrediction };
}
