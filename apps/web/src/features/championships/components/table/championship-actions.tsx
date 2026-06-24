'use client';

import { MoreHorizontal } from 'lucide-react';

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
}

export function ChampionshipActions({
  championship,
}: ChampionshipActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <MoreHorizontal className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem>Sincronizar</DropdownMenuItem>

        {championship.status === 'ACTIVE' ? (
          <DropdownMenuItem>Desativar</DropdownMenuItem>
        ) : (
          <DropdownMenuItem>Ativar</DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
