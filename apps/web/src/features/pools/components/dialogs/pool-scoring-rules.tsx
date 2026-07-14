'use client';

import type { UseFormReturn } from 'react-hook-form';

import type { CreatePoolFormData } from '../../schemas/create-pool.schema';
import { PoolBaseScoringRules } from './pool-base-scoring-rules';
import { PoolCupPhaseMultipliers } from './pool-cup-phase-multipliers';

interface PoolScoringRulesProps {
  form: UseFormReturn<CreatePoolFormData>;
  disabled?: boolean;
  championshipType?: 'LEAGUE' | 'CUP';
}

export function PoolScoringRules({
  form,
  disabled,
  championshipType,
}: PoolScoringRulesProps) {
  const isCup = championshipType === 'CUP';

  return (
    <div className='space-y-4'>
      <div className='space-y-3 rounded-lg border p-3'>
        <div>
          <p className='text-sm font-medium'>
            {isCup
              ? 'Pontuação base (fase de grupos e ligas)'
              : 'Pontuação por rodada'}
          </p>
          <p className='text-muted-foreground text-xs'>
            Valores pré-preenchidos conforme o padrão do bolão. Confirme ou
            edite conforme necessário.
          </p>
        </div>

        <PoolBaseScoringRules form={form} disabled={disabled} />
      </div>

      {isCup ? (
        <div className='space-y-3 rounded-lg border p-3'>
          <div>
            <p className='text-sm font-medium'>Multiplicadores por fase</p>
            <p className='text-muted-foreground text-xs'>
              Nas fases eliminatórias, a pontuação da partida é multiplicada
              conforme a fase do mata-mata.
            </p>
          </div>

          <PoolCupPhaseMultipliers form={form} disabled={disabled} />
        </div>
      ) : null}
    </div>
  );
}
