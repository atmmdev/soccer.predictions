import { StatusBadge } from '@/components/ui/status-badge';

import type { PoolStatus } from '../../types/pool';

interface PoolStatusBadgeProps {
  status: PoolStatus;
}

const labels: Record<PoolStatus, string> = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
  CLOSED: 'Encerrado',
};

const tones: Record<PoolStatus, 'success' | 'neutral' | 'warning'> = {
  ACTIVE: 'success',
  INACTIVE: 'neutral',
  CLOSED: 'warning',
};

export function PoolStatusBadge({ status }: PoolStatusBadgeProps) {
  return <StatusBadge tone={tones[status]}>{labels[status]}</StatusBadge>;
}
