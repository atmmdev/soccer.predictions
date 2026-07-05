'use client';

import { Copy, Link2, MoreVertical } from 'lucide-react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { getStoredUser } from '@/features/auth/lib/auth-storage';
import { buildJoinPoolUrl } from '@/lib/join-pool-url';

import type { Pool, PoolStatus } from '../../types/pool';

interface PoolActionsProps {
  pool: Pool;
  onStatusChange: (poolId: number, status: PoolStatus) => Promise<boolean>;
}

export function PoolActions({ pool, onStatusChange }: PoolActionsProps) {
  const canManage =
    pool.isOwner || getStoredUser()?.role === 'SUPER_ADMIN';

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

  async function handleStatusChange(status: PoolStatus) {
    const success = await onStatusChange(pool.id, status);

    if (success) {
      const labels: Record<PoolStatus, string> = {
        ACTIVE: 'ativado',
        INACTIVE: 'desativado',
        CLOSED: 'encerrado',
      };
      toast.success(`Bolão ${labels[status]} com sucesso.`);
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

        {canManage && pool.status !== 'CLOSED' ? (
          <>
            <DropdownMenuSeparator />
            {pool.status === 'ACTIVE' ? (
              <DropdownMenuItem
                className='text-xs'
                onClick={() => void handleStatusChange('INACTIVE')}
              >
                Desativar
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                className='text-xs'
                onClick={() => void handleStatusChange('ACTIVE')}
              >
                Ativar
              </DropdownMenuItem>
            )}
            <DropdownMenuItem
              className='text-xs'
              onClick={() => void handleStatusChange('CLOSED')}
            >
              Encerrar bolão
            </DropdownMenuItem>
          </>
        ) : null}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
