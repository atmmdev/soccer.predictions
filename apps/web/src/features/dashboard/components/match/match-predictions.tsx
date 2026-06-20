import { Match } from '../../../../types/match';
import { TeamFlag } from './team-flag';

interface MatchPredictionsProps {
  match: Match;
}

export function MatchPredictions({ match }: MatchPredictionsProps) {
  return (
    <div className='flex items-center gap-3'>
      <TeamFlag team={match.homeTeam} />
      <span className='font-bold'>{match.predictedHomeScore}</span>
      <span>x</span>
      <span className='font-bold'>{match.predictedAwayScore}</span>
      <TeamFlag team={match.awayTeam} />
    </div>
  );
}
