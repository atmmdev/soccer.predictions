'use client';

import { useCallback, useState } from 'react';

import { championships as initialChampionships } from '../mocks/championships';
import type { CreateChampionshipFormData } from '../schemas/create-championship.schema';
import { ChampionshipService } from '../services/championship.service';
import type { Championship } from '../types/championship';

export function useChampionships() {
  const [championships, setChampionships] =
    useState<Championship[]>(initialChampionships);

  const createChampionship = useCallback((data: CreateChampionshipFormData) => {
    const championship = ChampionshipService.create(data);
    setChampionships(current => [...current, championship]);
    return championship;
  }, []);

  return {
    championships,
    createChampionship,
  };
}
