import { Match } from '../types/match';
import { MatchScore } from './match-score';

interface MatchPredictionsProps {
  match: Match;
}

export function MatchPredictions({ match }: MatchPredictionsProps) {
  return (
    <MatchScore
      homeScore={match.predictedHomeScore}
      awayScore={match.predictedAwayScore}
      className='font-semibold'
    />
  );
}
