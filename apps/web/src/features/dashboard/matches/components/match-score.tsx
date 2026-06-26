import { cn } from '@/lib/utils';

interface MatchScoreProps {
  homeScore: number;
  awayScore: number;
  compareWith?: { home: number; away: number };
  highlight?: boolean;
}

function ScoreValue({
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
        'font-bold',
        highlight && isMatch && 'text-primary',
        highlight && !isMatch && 'text-destructive',
      )}
    >
      {value}
    </span>
  );
}

export function MatchScore({
  homeScore,
  awayScore,
  compareWith,
  highlight = false,
}: MatchScoreProps) {
  return (
    <div className='flex flex-col gap-2'>
      <ScoreValue
        value={homeScore}
        isMatch={compareWith ? homeScore === compareWith.home : false}
        highlight={highlight}
      />
      <ScoreValue
        value={awayScore}
        isMatch={compareWith ? awayScore === compareWith.away : false}
        highlight={highlight}
      />
    </div>
  );
}
