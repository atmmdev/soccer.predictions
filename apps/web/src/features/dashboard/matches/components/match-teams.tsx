import { MatchTeamsStack } from '@/components/matches';

import { Match } from '../types/match';

interface MatchTeamsProps {
  match: Match;
}

export function MatchTeams({ match }: MatchTeamsProps) {
  return (
    <MatchTeamsStack
      homeTeam={match.homeTeam.name}
      awayTeam={match.awayTeam.name}
      homeTeamLogo={match.homeTeam.flag}
      awayTeamLogo={match.awayTeam.flag}
      className='flex min-w-[220px] flex-col gap-2'
      size={20}
    />
  );
}
