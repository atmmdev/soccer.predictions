import { StatusBadge } from '@/components/ui/status-badge';

import type { PoolStatus } from '../../types/pool';

interface PoolStatusBadgeProps {
  status: PoolStatus;
}

export function PoolStatusBadge({ status }: PoolStatusBadgeProps) {
  const isActive = status === 'ACTIVE';

  return (
    <StatusBadge tone={isActive ? 'success' : 'neutral'}>
      {isActive ? 'Ativo' : 'Inativo'}
    </StatusBadge>
  );
}
