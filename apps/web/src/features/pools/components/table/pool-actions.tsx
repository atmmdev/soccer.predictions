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
    <div className='flex items-center justify-center gap-0.5'>
      <IconActionButton
        label='Copiar link'
        icon={Link2}
        tone='link'
        onClick={() => void handleCopyInviteLink()}
      />

      <IconActionButton
        label='Código'
        icon={Copy}
        tone='copy'
        aria-label={`Copiar código ${pool.inviteCode}`}
        onClick={() => void handleCopyInviteCode()}
      />

      {canManage && pool.status !== 'CLOSED' ? (
        <>
          <IconActionButton
            label='Editar'
            icon={Pencil}
            tone='edit'
            onClick={() => onEdit(pool)}
          />

          {pool.status === 'ACTIVE' ? (
            <IconActionButton
              label='Desativar'
              icon={Ban}
              tone='mute'
              onClick={() => void handleStatusChange('INACTIVE')}
            />
          ) : (
            <IconActionButton
              label='Ativar'
              icon={CheckCircle2}
              tone='success'
              onClick={() => void handleStatusChange('ACTIVE')}
            />
          )}

          <IconActionButton
            label='Encerrar'
            icon={OctagonX}
            tone='danger'
            onClick={() => void handleStatusChange('CLOSED')}
          />
        </>
      ) : null}
    </div>
  );
}
