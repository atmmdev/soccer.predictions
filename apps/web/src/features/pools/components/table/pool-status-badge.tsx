import { Badge } from '@/components/ui/badge';

import type { PoolStatus } from '../../types/pool';

interface PoolStatusBadgeProps {
  status: PoolStatus;
}

export function PoolStatusBadge({ status }: PoolStatusBadgeProps) {
  const isActive = status === 'ACTIVE';

  return (
    <Badge variant={isActive ? 'default' : 'secondary'}>
      {isActive ? 'Ativo' : 'Inativo'}
    </Badge>
  );
}
