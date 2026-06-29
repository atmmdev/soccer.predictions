import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import type { PoolSortKey, SortDirection } from '../../hooks/use-pool-table';

interface PoolSortableHeadProps {
  label: string;
  column: PoolSortKey;
  sortKey: PoolSortKey;
  sortDir: SortDirection;
  onSort: (column: PoolSortKey) => void;
  className?: string;
}

export function PoolSortableHead({
  label,
  column,
  sortKey,
  sortDir,
  onSort,
  className,
}: PoolSortableHeadProps) {
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
