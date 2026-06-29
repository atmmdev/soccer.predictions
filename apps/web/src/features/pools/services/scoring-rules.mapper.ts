import type { CreatePoolFormData } from '../schemas/create-pool.schema';
import type { PoolScoringConfig } from '../types/scoring-rules';

export function mapFormToScoringConfig(
  data: CreatePoolFormData,
): PoolScoringConfig {
  return {
    base: { ...data.baseScoring },
    cupPhases: data.cupPhases ? data.cupPhases.map(phase => ({ ...phase })) : null,
  };
}
