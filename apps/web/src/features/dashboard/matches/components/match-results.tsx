import { ScoreStack, hasCompleteScore, type ScorePair } from '@/components/matches';

import { Match } from '../types/match';

interface MatchResultProps {
  match: Match;
}

export function MatchResult({ match }: MatchResultProps) {
  const officialScores: ScorePair = {
    home: match.homeScore,
    away: match.awayScore,
  };

  const predictionScores: ScorePair = {
    home: match.predictedHomeScore,
    away: match.predictedAwayScore,
  };

  const hasOfficial = hasCompleteScore(officialScores);
  const hasPrediction = hasCompleteScore(predictionScores);

  return (
    <ScoreStack
      scores={officialScores}
      compareWith={hasOfficial && hasPrediction ? predictionScores : undefined}
      highlight={hasOfficial && hasPrediction}
    />
  );
}
