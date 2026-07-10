import { ScoreStack, hasCompleteScore, type ScorePair } from '@/components/matches';

import { Match } from '../types/match';

interface MatchPredictionsProps {
  match: Match;
}

export function MatchPredictions({ match }: MatchPredictionsProps) {
  const predictionScores: ScorePair = {
    home: match.predictedHomeScore,
    away: match.predictedAwayScore,
  };

  if (!hasCompleteScore(predictionScores)) {
    return (
      <span className='text-base font-bold text-muted-foreground'>—</span>
    );
  }

  const officialScores: ScorePair = {
    home: match.homeScore,
    away: match.awayScore,
  };

  const hasOfficial = hasCompleteScore(officialScores);

  return (
    <ScoreStack
      scores={predictionScores}
      compareWith={hasOfficial ? officialScores : undefined}
      highlight={hasOfficial}
    />
  );
}
