import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';
import { RankingMobileCard } from './ranking-mobile-card';

interface RankingMobileListProps {
  rows: RankingEntry[];
  scoringRule: RankingScoringRuleFilter;
  positionOffset?: number;
}

export function RankingMobileList({
  rows,
  scoringRule,
  positionOffset = 0,
}: RankingMobileListProps) {
  return (
    <div className='space-y-2'>
      {rows.map((entry, index) => (
        <RankingMobileCard
          key={`${entry.poolId}-${entry.id}`}
          entry={entry}
          position={positionOffset + index + 1}
          scoringRule={scoringRule}
        />
      ))}
    </div>
  );
}
