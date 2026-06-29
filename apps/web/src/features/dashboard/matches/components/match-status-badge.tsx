import { StatusBadge } from '@/components/ui/status-badge';

interface MatchStatusBadgeProps {
  status: 'SCHEDULED' | 'LIVE' | 'FINISHED';
}

const config = {
  SCHEDULED: { tone: 'neutral' as const, label: 'Agendado' },
  LIVE: { tone: 'success' as const, label: 'Ao vivo' },
  FINISHED: { tone: 'warning' as const, label: 'Finalizado' },
};

export function MatchStatusBadge({ status }: MatchStatusBadgeProps) {
  const { tone, label } = config[status];

  return <StatusBadge tone={tone}>{label}</StatusBadge>;
}
