import { cn } from '@/lib/utils';

import type { PredictionUiState } from '../utils/prediction-ui-state';
import {
  getPredictionStatusLabel,
  predictionUiStateClassName,
} from '../utils/prediction-ui-state';

interface PredictionStatePillProps {
  state: PredictionUiState;
  className?: string;
}

export function PredictionStatePill({
  state,
  className,
}: PredictionStatePillProps) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium',
        predictionUiStateClassName[state],
        className,
      )}
    >
      {getPredictionStatusLabel(state)}
    </span>
  );
}
