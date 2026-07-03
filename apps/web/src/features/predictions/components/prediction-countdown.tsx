'use client';

import { Clock } from 'lucide-react';

import { cn } from '@/lib/utils';

import type { PredictionFixtureItem } from '../types/prediction-fixture';
import {
  formatPredictionCountdown,
  getTimeToPredictionDeadlineMs,
  shouldShowPredictionCountdown,
} from '../utils/format-prediction-countdown';

interface PredictionCountdownProps {
  fixture: PredictionFixtureItem;
  now: Date;
  className?: string;
}

const URGENT_THRESHOLD_MS = 2 * 60 * 1000;

export function PredictionCountdown({
  fixture,
  now,
  className,
}: PredictionCountdownProps) {
  if (fixture.matchStatus !== 'SCHEDULED') {
    return <span className={cn('text-muted-foreground text-xs', className)}>—</span>;
  }

  if (!shouldShowPredictionCountdown(fixture.date, now)) {
    return <span className={cn('text-muted-foreground text-xs', className)}>—</span>;
  }

  const remainingMs = getTimeToPredictionDeadlineMs(fixture.date, now);
  const isUrgent = remainingMs <= URGENT_THRESHOLD_MS;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-mono text-xs font-medium tabular-nums',
        isUrgent ? 'text-destructive' : 'text-amber-600 dark:text-amber-500',
        className,
      )}
      title='Tempo restante para enviar ou editar o palpite'
    >
      <Clock className='size-3 shrink-0' aria-hidden />
      {formatPredictionCountdown(remainingMs)}
    </span>
  );
}
