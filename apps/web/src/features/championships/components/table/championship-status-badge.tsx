import { StatusBadge } from '@/components/ui/status-badge';

import type { ChampionshipStatus } from '../../types/championship';

interface ChampionshipStatusBadgeProps {
  status: ChampionshipStatus;
}

const tones = {
  ACTIVE: 'success',
  INACTIVE: 'neutral',
} as const;

const labels = {
  ACTIVE: 'Ativo',
  INACTIVE: 'Inativo',
} as const;

export function ChampionshipStatusBadge({
  status,
}: ChampionshipStatusBadgeProps) {
  return (
    <StatusBadge tone={tones[status]}>{labels[status]}</StatusBadge>
  );
}
