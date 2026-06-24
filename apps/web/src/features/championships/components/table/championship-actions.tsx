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
}

export function ChampionshipActions({
  championship,
}: ChampionshipActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem>
          <a href={`/championships/${championship.id}/sync`}>Sincronizar</a>
        </DropdownMenuItem>

        {championship.status === 'ACTIVE' ? (
          <DropdownMenuItem>
            <a href={`/championships/${championship.id}/deactivate`}>
              Desativar
            </a>
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem>
            <a href={`/championships/${championship.id}/activate`}>Ativar</a>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
