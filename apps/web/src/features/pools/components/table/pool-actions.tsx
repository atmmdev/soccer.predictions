'use client';

import {
  Ban,
  CheckCircle2,
  OctagonX,
  Pencil,
} from 'lucide-react';
import { toast } from 'sonner';

import { IconActionButton } from '@/components/ui/icon-action-button';
import { getStoredUser } from '@/features/auth/lib/auth-storage';

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
