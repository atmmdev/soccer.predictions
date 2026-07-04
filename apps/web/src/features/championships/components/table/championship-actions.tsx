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
}

export function ChampionshipActions({
  championship,
  onSync,
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
          <DropdownMenuItem disabled>Desativar (em breve)</DropdownMenuItem>
        ) : (
          <DropdownMenuItem disabled>Ativar (em breve)</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
