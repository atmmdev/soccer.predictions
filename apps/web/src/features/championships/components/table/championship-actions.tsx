'use client';

import { Ban, CheckCircle2, RefreshCw } from 'lucide-react';

import { IconActionButton } from '@/components/ui/icon-action-button';

import type { Championship } from '../../types/championship';

interface ChampionshipActionsProps {
  championship: Championship;
  onSync: (championshipId: number) => Promise<boolean>;
  onStatusChange: (championshipId: number, active: boolean) => Promise<boolean>;
}

export function ChampionshipActions({
  championship,
  onSync,
  onStatusChange,
}: ChampionshipActionsProps) {
  return (
    <div className='flex items-center justify-end gap-0.5'>
      <IconActionButton
        label='Sincronizar jogos'
        tone='sync'
        onClick={() => void onSync(championship.id)}
      >
        <RefreshCw className='size-4' />
      </IconActionButton>

      {championship.status === 'ACTIVE' ? (
        <IconActionButton
          label='Desativar'
          tone='mute'
          onClick={() => void onStatusChange(championship.id, false)}
        >
          <Ban className='size-4' />
        </IconActionButton>
      ) : (
        <IconActionButton
          label='Ativar'
          tone='success'
          onClick={() => void onStatusChange(championship.id, true)}
        >
          <CheckCircle2 className='size-4' />
        </IconActionButton>
      )}
    </div>
  );
}
