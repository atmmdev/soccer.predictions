import type { Match } from '../types/match';
import { MatchMobileCard } from './match-mobile-card';

interface MatchMobileListProps {
  matches: Match[];
  rowKeyPrefix: string;
}

export function MatchMobileList({
  matches,
  rowKeyPrefix,
}: MatchMobileListProps) {
  return (
    <div className='space-y-3'>
      {matches.map((match, index) => (
        <MatchMobileCard
          key={`${rowKeyPrefix}-${match.id}-${index}`}
          match={match}
        />
      ))}
    </div>
  );
}
