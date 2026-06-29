'use client';

import { useCallback, useState } from 'react';

import { championships as initialChampionships } from '../mocks/championships';
import type { CreateChampionshipFormData } from '../schemas/create-championship.schema';
import {
  ChampionshipService,
  getNextChampionshipId,
} from '../services/championship.service';

export function useChampionships() {
  const [championships, setChampionships] =
    useState(initialChampionships);

  const createChampionship = useCallback((data: CreateChampionshipFormData) => {
    setChampionships(current => {
      const championship = ChampionshipService.create(
        data,
        getNextChampionshipId(current),
      );

      return [...current, championship];
    });
  }, []);

  return {
    championships,
    createChampionship,
  };
}
