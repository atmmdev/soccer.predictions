import type { CupPhase } from '@/features/pools/types/scoring-rules';
import { defaultCupPhaseRules } from '@/features/pools/mocks/scoring-templates';

const cupPhaseLabels = Object.fromEntries(
  defaultCupPhaseRules.map(rule => [rule.phase, rule.label]),
) as Record<CupPhase, string>;

export function formatFixtureRoundLabel(input: {
  round?: number | null;
  phase?: CupPhase | null;
}): string {
  if (input.phase) {
    return cupPhaseLabels[input.phase] ?? input.phase;
  }

  if (typeof input.round === 'number' && input.round > 0) {
    return String(input.round);
  }

  return '—';
}
