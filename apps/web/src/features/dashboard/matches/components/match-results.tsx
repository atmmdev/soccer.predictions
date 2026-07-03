import { ScoreStack, type ScorePair } from '@/components/matches';

import { Match } from '../types/match';

interface MatchResultProps {
  match: Match;
}

export function MatchResult({ match }: MatchResultProps) {
  const officialScores: ScorePair = {
    home: match.status === 'SCHEDULED' ? null : match.homeScore,
    away: match.status === 'SCHEDULED' ? null : match.awayScore,
  };

  const predictionScores: ScorePair = {
    home: match.predictedHomeScore,
    away: match.predictedAwayScore,
  };

  const hasOfficial =
    match.status !== 'SCHEDULED' &&
    typeof officialScores.home === 'number' &&
    typeof officialScores.away === 'number';

  return (
    <ScoreStack
      scores={officialScores}
      compareWith={hasOfficial ? predictionScores : undefined}
      highlight={hasOfficial}
    />
  );
}
