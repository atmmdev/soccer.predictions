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
    <div className='flex items-center justify-center gap-0.5'>
      <IconActionButton
        label='Sincronizar'
        icon={RefreshCw}
        tone='sync'
        onClick={() => void onSync(championship.id)}
      />

      {championship.status === 'ACTIVE' ? (
        <IconActionButton
          label='Desativar'
          icon={Ban}
          tone='mute'
          onClick={() => void onStatusChange(championship.id, false)}
        />
      ) : (
        <IconActionButton
          label='Ativar'
          icon={CheckCircle2}
          tone='success'
          onClick={() => void onStatusChange(championship.id, true)}
        />
      )}
    </div>
  );
}
