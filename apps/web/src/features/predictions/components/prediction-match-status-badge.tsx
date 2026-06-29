import type { MatchStatus } from '../types/prediction-fixture';

interface PredictionMatchStatusBadgeProps {
  status: MatchStatus;
}

const labels: Record<MatchStatus, string> = {
  SCHEDULED: 'Agendado',
  LIVE: 'Ao vivo',
  FINISHED: 'Encerrado',
};

const styles: Record<MatchStatus, string> = {
  SCHEDULED: 'bg-blue-500/10 text-blue-700 dark:text-blue-300',
  LIVE: 'bg-amber-500/10 text-amber-700 dark:text-amber-300',
  FINISHED: 'bg-muted text-muted-foreground',
};

export function PredictionMatchStatusBadge({
  status,
}: PredictionMatchStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
