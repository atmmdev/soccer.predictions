import { Match } from '../types/match';
import { TeamFlag } from './team-flag';

interface MatchTeamsProps {
  match: Match;
}

export function MatchTeams({ match }: MatchTeamsProps) {
  return (
    <div className='flex flex-col min-w-[220px] gap-2'>
      <TeamFlag team={match.homeTeam} />
      <TeamFlag team={match.awayTeam} />
    </div>
  );
}
