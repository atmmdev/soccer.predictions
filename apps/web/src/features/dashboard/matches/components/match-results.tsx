import { Match } from '../types/match';
import { MatchScore } from './match-score';

interface MatchResultProps {
  match: Match;
}

export function MatchResult({ match }: MatchResultProps) {
  return (
    <div className='flex flex-col gap-0.5'>
      {match.status === 'SCHEDULED' ? (
        <span className='font-bold'>—</span>
      ) : (
        <MatchScore homeScore={match.homeScore} awayScore={match.awayScore} />
      )}
    </div>
  );
}
