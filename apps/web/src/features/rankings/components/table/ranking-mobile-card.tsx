import { UserAvatar } from '@/components/ui/user-avatar';
import { PositionBadge } from '@/features/dashboard/rankings/components/position-badge';
import { cn } from '@/lib/utils';

import { RANKING_STAT_COLUMNS } from '../../constants/ranking-columns';
import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';
import { getRankingStatValue } from '../../utils/ranking-stats';

interface RankingMobileCardProps {
  entry: RankingEntry;
  position: number;
  scoringRule: RankingScoringRuleFilter;
}

export function RankingMobileCard({
  entry,
  position,
  scoringRule,
}: RankingMobileCardProps) {
  return (
    <article
      className={cn(
        'border-border space-y-2.5 rounded-lg border bg-card p-3 shadow-sm',
        entry.isCurrentUser && 'border-primary/30 bg-primary/5',
      )}
    >
      <div className='flex items-center gap-2.5'>
        <PositionBadge position={position} />
        <UserAvatar name={entry.name} avatarDataUrl={entry.avatarDataUrl} />
        <div className='min-w-0 flex-1'>
          <div className='flex min-w-0 items-center gap-1.5'>
            <span className='truncate text-sm font-medium'>{entry.name}</span>
            {entry.isCurrentUser ? (
              <span className='text-primary shrink-0 text-xs font-medium'>
                Você
              </span>
            ) : null}
          </div>
          <span className='text-muted-foreground block truncate text-xs'>
            {entry.email}
          </span>
        </div>
        <div className='shrink-0 text-right'>
          <span className='text-sm font-bold tabular-nums'>
            {entry.points.toLocaleString('pt-BR')}
          </span>{' '}
          <span className='text-muted-foreground text-xs'>pts</span>
        </div>
      </div>

      <div className='flex justify-between gap-1.5 pt-3'>
        {RANKING_STAT_COLUMNS.map(column => {
          const isHighlighted = scoringRule === column.key;

          return (
            <div
              key={column.key}
              className={cn(
                'rounded-md px-2 py-1.5 text-center',
                isHighlighted ? 'bg-primary/10' : 'bg-muted/60',
              )}
              title={column.label}
            >
              <div
                className={cn(
                  'text-[10px] font-semibold tracking-wide uppercase',
                  isHighlighted ? 'text-primary' : 'text-muted-foreground',
                )}
              >
                {column.sigla}
              </div>
              <div
                className={cn(
                  'text-sm font-medium tabular-nums',
                  isHighlighted && 'text-primary',
                )}
              >
                {getRankingStatValue(entry, column.key)}
              </div>
            </div>
          );
        })}
      </div>
    </article>
  );
}
