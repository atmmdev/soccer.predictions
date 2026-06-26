import { Match } from '../types/match';
import { TeamFlag } from './team-flag';

interface MatchResultProps {
  match: Match;
}

export function MatchResult({ match }: MatchResultProps) {
  return (
    <div className='flex items-center gap-3'>
      <TeamFlag team={match.homeTeam} />
      <span className='font-bold'>{match.homeScore}</span>
      <span>x</span>
      <span className='font-bold'>{match.awayScore}</span>
      <TeamFlag team={match.awayTeam} />
    </div>
  );
}
