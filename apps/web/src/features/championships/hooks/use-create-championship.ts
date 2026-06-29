"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { CURRENT_SEASON } from '../mocks/seasons';
import {
  createChampionshipSchema,
  CreateChampionshipFormData,
} from '../schemas/create-championship.schema';

export function useCreateChampionship() {
  return useForm<CreateChampionshipFormData>({
    resolver: zodResolver(createChampionshipSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',

    defaultValues: {
      season: CURRENT_SEASON,
      country: '',
      leagueId: 0,
      active: true,
    },
  });
}