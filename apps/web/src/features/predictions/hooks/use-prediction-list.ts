'use client';

import { usePredictionSearchFilters } from './use-prediction-search-filters';
import { usePredictions } from './use-predictions';

export function usePredictionList() {
  const { fixtures, submitPrediction } = usePredictions();
  const searchFilters = usePredictionSearchFilters(fixtures);

  return {
    submitPrediction,
    searchFilters,
  };
}
