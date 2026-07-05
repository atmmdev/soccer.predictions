'use client';

import { MoreVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={() => void onSync(championship.id)}>
          Sincronizar jogos
        </DropdownMenuItem>

        {championship.status === 'ACTIVE' ? (
          <DropdownMenuItem
            onClick={() => void onStatusChange(championship.id, false)}
          >
            Desativar
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem
            onClick={() => void onStatusChange(championship.id, true)}
          >
            Ativar
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
