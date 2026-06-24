import { Badge } from '@/components/ui/badge';

import type { ChampionshipStatus } from '../../types/championship';

interface ChampionshipStatusBadgeProps {
  status: ChampionshipStatus;
}

export function ChampionshipStatusBadge({
  status,
}: ChampionshipStatusBadgeProps) {
  const variants = {
    ACTIVE: 'default',
    INACTIVE: 'secondary',
  } as const;

  const labels = {
    ACTIVE: 'Ativo',
    INACTIVE: 'Inativo',
  };

  return <Badge variant={variants[status]}>{labels[status]}</Badge>;
}
