'use client';

import { Copy, Link2, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { buildJoinPoolUrl } from '@/lib/join-pool-url';

import type { Pool } from '../../types/pool';

interface PoolActionsProps {
  pool: Pool;
}

export function PoolActions({ pool }: PoolActionsProps) {
  async function handleCopyInviteLink() {
    try {
      await navigator.clipboard.writeText(buildJoinPoolUrl(pool.inviteCode));
      toast.success('Link de convite copiado!');
    } catch {
      toast.error('Não foi possível copiar o link.');
    }
  }

  async function handleCopyInviteCode() {
    try {
      await navigator.clipboard.writeText(pool.inviteCode);
      toast.success('Código copiado!');
    } catch {
      toast.error('Não foi possível copiar o código.');
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size='icon' variant='ghost'>
          <MoreVertical className='size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align='end'>
        <DropdownMenuItem className='text-xs' onClick={() => void handleCopyInviteLink()}>
          <Link2 className='size-4' />
          Copiar link de convite
        </DropdownMenuItem>
        <DropdownMenuItem className='text-xs' onClick={() => void handleCopyInviteCode()}>
          <Copy className='size-4' />
          Copiar código {pool.inviteCode}
        </DropdownMenuItem>
        <DropdownMenuItem disabled className='text-xs'>
          {pool.status === 'ACTIVE' ? 'Desativar' : 'Ativar'}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
