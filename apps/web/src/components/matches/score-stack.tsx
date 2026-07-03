import { cn } from '@/lib/utils';

export interface ScorePair {
  home: number | null;
  away: number | null;
}

export function hasCompleteScore(
  scores: ScorePair,
): scores is { home: number; away: number } {
  return typeof scores.home === 'number' && typeof scores.away === 'number';
}

interface ScoreStackProps {
  scores: ScorePair;
  compareWith?: ScorePair;
  highlight?: boolean;
  className?: string;
}

function ScoreDigit({
  value,
  isMatch,
  highlight,
}: {
  value: number;
  isMatch: boolean;
  highlight: boolean;
}) {
  return (
    <span
      className={cn(
        'leading-none font-bold tabular-nums text-xs',
        !highlight && 'text-foreground',
        highlight && isMatch && 'text-emerald-600',
        highlight && !isMatch && 'text-red-500',
      )}
    >
      {value}
    </span>
  );
}

export function ScoreStack({
  scores,
  compareWith,
  highlight = false,
  className,
}: ScoreStackProps) {
  if (!hasCompleteScore(scores)) {
    return (
      <span
        className={cn(
          'text-base font-bold text-muted-foreground',
          className,
        )}
      >
        —
      </span>
    );
  }

  const canHighlight =
    highlight && compareWith !== undefined && hasCompleteScore(compareWith);

  return (
    <div className={cn('flex flex-col items-center gap-2', className)}>
      <ScoreDigit
        value={scores.home}
        isMatch={canHighlight ? scores.home === compareWith.home : false}
        highlight={canHighlight}
      />
      <ScoreDigit
        value={scores.away}
        isMatch={canHighlight ? scores.away === compareWith.away : false}
        highlight={canHighlight}
      />
    </div>
  );
}
