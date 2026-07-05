'use client';

import { usePredictionSearchFilters } from './use-prediction-search-filters';
import { usePredictions } from './use-predictions';
import { getStoredUser } from '@/features/auth/lib/auth-storage';

export function usePredictionList() {
  const {
    fixtures,
    isLoading,
    error,
    reloadFixtures,
    submitPrediction,
  } = usePredictions();
  const isSuperAdmin = getStoredUser()?.role === 'SUPER_ADMIN';
  const searchFilters = usePredictionSearchFilters(fixtures, {
    enableDateFilter: isSuperAdmin,
    enableParticipantFilter: true,
  });

  return {
    fixtures,
    isLoading,
    error,
    reloadFixtures,
    submitPrediction,
    searchFilters,
  };
}
