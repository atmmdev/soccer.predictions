import { Match } from '../types/match';
import { TeamFlag } from './team-flag';

interface MatchTeamsProps {
  match: Match;
}

export function MatchTeams({ match }: MatchTeamsProps) {
  return (
    <div className='flex min-w-[220px] items-center gap-2 justify-center'>
      <TeamFlag team={match.homeTeam} />
      <span className='text-muted-foreground text-xs'>
        vs
      </span>
      <TeamFlag team={match.awayTeam} />
    </div>
  );
}
