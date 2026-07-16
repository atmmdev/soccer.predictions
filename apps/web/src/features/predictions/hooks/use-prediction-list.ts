'use client';

import { useEffect, useState } from 'react';

import { getStoredUser } from '@/features/auth/lib/auth-storage';

import { usePredictionSearchFilters } from './use-prediction-search-filters';
import { usePredictions } from './use-predictions';

export function usePredictionList() {
  const {
    fixtures,
    isLoading,
    error,
    reloadFixtures,
    submitPrediction,
  } = usePredictions();
  // Defer sessionStorage/cookie read until after mount to keep SSR and
  // hydration markup identical (avoids React #418 on SUPER_ADMIN).
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);

  useEffect(() => {
    setIsSuperAdmin(getStoredUser()?.role === 'SUPER_ADMIN');
  }, []);

  const searchFilters = usePredictionSearchFilters(fixtures, {
    enableDateFilter: true,
    enableParticipantFilter: isSuperAdmin,
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
