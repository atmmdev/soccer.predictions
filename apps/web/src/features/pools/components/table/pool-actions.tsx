'use client';

import { MoreVertical } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

import type { Pool } from '../../types/pool';

interface PoolActionsProps {
  pool: Pool;
}

export function PoolActions({ pool }: PoolActionsProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem disabled>Ver participantes</DropdownMenuItem>
        <DropdownMenuItem disabled>
          Copiar código {pool.inviteCode}
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          {pool.status === 'ACTIVE' ? 'Desativar' : 'Ativar'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
