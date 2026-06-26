interface MatchScoreProps {
  homeScore: number;
  awayScore: number;
  className?: string;
}

export function MatchScore({
  homeScore,
  awayScore,
  className,
}: MatchScoreProps) {
  return (
    <span className={className ?? 'font-bold'}>
      {homeScore} x {awayScore}
    </span>
  );
}
