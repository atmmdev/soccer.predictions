'use client';

import type { UseFormReturn } from 'react-hook-form';

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

import type { CreatePoolFormData } from '../../schemas/create-pool.schema';

interface PoolCupPhaseMultipliersProps {
  form: UseFormReturn<CreatePoolFormData>;
  disabled?: boolean;
}

export function PoolCupPhaseMultipliers({
  form,
  disabled,
}: PoolCupPhaseMultipliersProps) {
  const cupPhases = form.watch('cupPhases');

  if (!cupPhases?.length) {
    return null;
  }

  return (
    <div className='space-y-2'>
      {cupPhases.map((phase, index) => (
        <div
          key={phase.phase}
          className='flex items-center justify-between gap-3 rounded-md border px-3 py-2'
        >
          <div className='min-w-0'>
            <p className='text-sm font-medium'>{phase.label}</p>
            {phase.phase === 'GROUP' ? (
              <p className='text-muted-foreground text-xs'>
                Mesmas regras de pontos corridos
              </p>
            ) : (
              <p className='text-muted-foreground text-xs'>
                Multiplicador sobre a pontuação da partida
              </p>
            )}
          </div>

          <FormField
            control={form.control}
            name={`cupPhases.${index}.multiplier`}
            render={({ field }) => (
              <FormItem className='w-24 shrink-0'>
                <FormControl>
                  <div className='relative'>
                    <span className='text-muted-foreground pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-sm'>
                      ×
                    </span>
                    <Input
                      type='number'
                      min={1}
                      step={1}
                      className='h-10 pr-3 pl-7 text-right'
                      disabled={disabled}
                      value={field.value}
                      onChange={event =>
                        field.onChange(Number(event.target.value))
                      }
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      ))}
    </div>
  );
}
