import { ScoreStack, type ScorePair } from '@/components/matches';

import { Match } from '../types/match';

interface MatchPredictionsProps {
  match: Match;
}

export function MatchPredictions({ match }: MatchPredictionsProps) {
  const predictionScores: ScorePair = {
    home: match.predictedHomeScore,
    away: match.predictedAwayScore,
  };

  const officialScores: ScorePair = {
    home: match.status === 'SCHEDULED' ? null : match.homeScore,
    away: match.status === 'SCHEDULED' ? null : match.awayScore,
  };

  const hasOfficial = match.status !== 'SCHEDULED';

  return (
    <ScoreStack
      scores={predictionScores}
      compareWith={hasOfficial ? officialScores : undefined}
      highlight={hasOfficial}
    />
  );
}
