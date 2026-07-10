import { hasCompleteScore, PointsBadge as SharedPointsBadge } from '@/components/matches';

import { Match } from '../types/match';

interface PointsBadgeProps {
  match: Match;
}

export function PointsBadge({ match }: PointsBadgeProps) {
  const hasPrediction = hasCompleteScore({
    home: match.predictedHomeScore,
    away: match.predictedAwayScore,
  });

  return (
    <SharedPointsBadge
      points={hasPrediction ? match.points : null}
      finished={match.status === 'FINISHED'}
    />
  );
}
