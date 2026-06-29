'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import {
  submitPredictionSchema,
  type SubmitPredictionFormData,
} from '../schemas/submit-prediction.schema';
import type { UserPrediction } from '../types/prediction-fixture';

export function useSubmitPredictionForm(existing?: UserPrediction | null) {
  return useForm<SubmitPredictionFormData>({
    resolver: zodResolver(submitPredictionSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      predictedHomeScore: existing?.predictedHomeScore ?? 0,
      predictedAwayScore: existing?.predictedAwayScore ?? 0,
      selectedPlayerId: existing?.selectedPlayerId ?? null,
    },
  });
}
