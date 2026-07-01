'use client';

import type { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { CreatePoolFormData } from '../../schemas/create-pool.schema';

const BASE_SCORING_FIELDS = [
  {
    name: 'exactScore' as const,
    label: 'Placar exato',
    min: 0,
    step: 1,
  },
  {
    name: 'winnerScore' as const,
    label: 'Placar do vencedor',
    min: 0,
    step: 1,
  },
  {
    name: 'loserScore' as const,
    label: 'Placar do perdedor',
    min: 0,
    step: 1,
  },
  {
    name: 'correctWinner' as const,
    label: 'Vencedor sem placar exato',
    min: 0,
    step: 1,
  },
  {
    name: 'drawWithoutExactScore' as const,
    label: 'Empate sem placar exato',
    min: 0,
    step: 1,
  },
  {
    name: 'playerGoal' as const,
    label: 'Jogador para fazer gol',
    min: 0,
    step: 1,
  },
  {
    name: 'playerHatTrickMultiplier' as const,
    label: 'Hat-trick (multiplicador)',
    min: 1,
    step: 1,
  },
];

interface PoolBaseScoringRulesProps {
  form: UseFormReturn<CreatePoolFormData>;
  disabled?: boolean;
}

export function PoolBaseScoringRules({
  form,
  disabled,
}: PoolBaseScoringRulesProps) {
  return (
    <div className='grid gap-3 sm:grid-cols-2'>
      {BASE_SCORING_FIELDS.map(fieldConfig => (
        <FormField
          key={fieldConfig.name}
          control={form.control}
          name={`baseScoring.${fieldConfig.name}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{fieldConfig.label}</FormLabel>
              <FormControl>
                <Input
                  type='number'
                  min={fieldConfig.min}
                  step={fieldConfig.step}
                  className='h-11'
                  disabled={disabled}
                  value={field.value}
                  onChange={event =>
                    field.onChange(Number(event.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      ))}
    </div>
  );
}
