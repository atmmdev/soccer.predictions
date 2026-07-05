'use client';

import { useNow } from '@/hooks/use-now';

import type { PredictionFixtureItem } from '../types/prediction-fixture';
import { PredictionMobileCard } from './prediction-mobile-card';

interface PredictionMobileListProps {
  rows: PredictionFixtureItem[];
  onPredict: (fixture: PredictionFixtureItem) => void;
  onViewAllPredictions: (fixture: PredictionFixtureItem) => void;
}

export function PredictionMobileList({
  rows,
  onPredict,
  onViewAllPredictions,
}: PredictionMobileListProps) {
  const now = useNow();
  const showParticipant = rows.some(row => !row.isOwnPrediction);

  return (
    <div className='space-y-3 xl:hidden'>
      {rows.map(fixture => (
        <PredictionMobileCard
          key={`${fixture.poolId}-${fixture.id}-${fixture.participantId}`}
          fixture={fixture}
          now={now}
          showParticipant={showParticipant}
          onPredict={onPredict}
          onViewAllPredictions={onViewAllPredictions}
        />
      ))}
    </div>
  );
}
