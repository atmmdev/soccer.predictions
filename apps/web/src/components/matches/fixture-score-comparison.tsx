import { ScoreStack, hasCompleteScore, type ScorePair } from './score-stack';

interface FixtureScoreComparisonProps {
  officialScores: ScorePair;
  predictionScores: ScorePair | null;
  predictionLabel?: string;
  className?: string;
}

export function FixtureScoreComparison({
  officialScores,
  predictionScores,
  predictionLabel = 'Palpite',
  className,
}: FixtureScoreComparisonProps) {
  const hasOfficial = hasCompleteScore(officialScores);
  const hasPrediction =
    predictionScores !== null && hasCompleteScore(predictionScores);

  return (
    <div className={className}>
      <div className='grid grid-cols-2 gap-5 text-center'>
        <div className='space-y-3'>
          <p className='text-muted-foreground text-xs font-medium'>
            Resultado Oficial
          </p>
          <ScoreStack
            scores={officialScores}
            compareWith={hasPrediction ? predictionScores : undefined}
            highlight={hasOfficial && hasPrediction}
          />
        </div>
        <div className='space-y-3'>
          <p className='text-muted-foreground text-xs font-medium'>
            {predictionLabel}
          </p>
          {hasPrediction ? (
            <ScoreStack
              scores={predictionScores}
              compareWith={hasOfficial ? officialScores : undefined}
              highlight={hasOfficial}
            />
          ) : (
            <span className='text-base font-bold text-muted-foreground'>—</span>
          )}
        </div>
      </div>
    </div>
  );
}

export function getOfficialScoresFromFixture(fixture: {
  officialHomeScore: number | null;
  officialAwayScore: number | null;
}): ScorePair {
  return {
    home: fixture.officialHomeScore,
    away: fixture.officialAwayScore,
  };
}

export function getPredictionScoresFromFixture(prediction: {
  predictedHomeScore: number;
  predictedAwayScore: number;
} | null): ScorePair | null {
  if (!prediction) {
    return null;
  }

  return {
    home: prediction.predictedHomeScore,
    away: prediction.predictedAwayScore,
  };
}
