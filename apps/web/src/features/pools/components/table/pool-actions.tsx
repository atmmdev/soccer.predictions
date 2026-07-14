'use client';

import {
  Ban,
  CheckCircle2,
  Copy,
  Link2,
  OctagonX,
  Pencil,
} from 'lucide-react';
import { toast } from 'sonner';

import { IconActionButton } from '@/components/ui/icon-action-button';
import { getStoredUser } from '@/features/auth/lib/auth-storage';
import { buildJoinPoolUrl } from '@/lib/join-pool-url';

import type { Pool, PoolStatus } from '../../types/pool';

interface PoolActionsProps {
  pool: Pool;
  onEdit: (pool: Pool) => void;
  onStatusChange: (poolId: number, status: PoolStatus) => Promise<boolean>;
}

export function PoolActions({
  pool,
  onEdit,
  onStatusChange,
}: PoolActionsProps) {
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
    <div className='flex items-center justify-end gap-0.5'>
      <IconActionButton
        label='Copiar link de convite'
        tone='link'
        onClick={() => void handleCopyInviteLink()}
      >
        <Link2 className='size-4' />
      </IconActionButton>

      <IconActionButton
        label={`Copiar código ${pool.inviteCode}`}
        tone='copy'
        onClick={() => void handleCopyInviteCode()}
      >
        <Copy className='size-4' />
      </IconActionButton>

      {canManage && pool.status !== 'CLOSED' ? (
        <>
          <IconActionButton
            label='Editar bolão'
            tone='edit'
            onClick={() => onEdit(pool)}
          >
            <Pencil className='size-4' />
          </IconActionButton>

          {pool.status === 'ACTIVE' ? (
            <IconActionButton
              label='Desativar'
              tone='mute'
              onClick={() => void handleStatusChange('INACTIVE')}
            >
              <Ban className='size-4' />
            </IconActionButton>
          ) : (
            <IconActionButton
              label='Ativar'
              tone='success'
              onClick={() => void handleStatusChange('ACTIVE')}
            >
              <CheckCircle2 className='size-4' />
            </IconActionButton>
          )}

          <IconActionButton
            label='Encerrar bolão'
            tone='danger'
            onClick={() => void handleStatusChange('CLOSED')}
          >
            <OctagonX className='size-4' />
          </IconActionButton>
        </>
      ) : null}
    </div>
  );
}
