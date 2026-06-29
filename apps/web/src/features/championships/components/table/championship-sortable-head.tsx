import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import type {
  ChampionshipSortKey,
  SortDirection,
} from './hooks/use-championship-table';

interface ChampionshipSortableHeadProps {
  label: string;
  column: ChampionshipSortKey;
  sortKey: ChampionshipSortKey;
  sortDir: SortDirection;
  onSort: (column: ChampionshipSortKey) => void;
  className?: string;
}

export function ChampionshipSortableHead({
  label,
  column,
  sortKey,
  sortDir,
  onSort,
  className,
}: ChampionshipSortableHeadProps) {
  const isActive = sortKey === column;
  const SortIcon = isActive
    ? sortDir === 'asc'
      ? ArrowUp
      : ArrowDown
    : ArrowUpDown;

  return (
    <TableHead className={className}>
      <button
        type='button'
        onClick={() => onSort(column)}
        className={cn(
          'text-muted-foreground hover:text-foreground inline-flex items-center gap-1 text-xs font-medium transition-colors',
          isActive && 'text-foreground',
        )}
      >
        {label}
        <SortIcon className='size-3.5 shrink-0' />
      </button>
    </TableHead>
  );
}
