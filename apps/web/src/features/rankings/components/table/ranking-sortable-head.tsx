import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';

import { TableHead } from '@/components/ui/table';
import { cn } from '@/lib/utils';

import type { RankingSortKey, SortDirection } from '../../hooks/use-ranking-table';

interface RankingSortableHeadProps {
  label: string;
  column: RankingSortKey;
  sortKey: RankingSortKey;
  sortDir: SortDirection;
  onSort: (column: RankingSortKey) => void;
  className?: string;
  align?: 'left' | 'center' | 'right';
  title?: string;
  variant?: 'default' | 'standings';
}

export function RankingSortableHead({
  label,
  column,
  sortKey,
  sortDir,
  onSort,
  className,
  align = 'left',
  title,
  variant = 'default',
}: RankingSortableHeadProps) {
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
        title={title ?? label}
        onClick={() => onSort(column)}
        className={cn(
          'inline-flex w-full items-center gap-1 text-xs font-medium whitespace-nowrap transition-colors',
          variant === 'default' &&
            'text-muted-foreground hover:text-foreground',
          variant === 'standings' && 'text-slate-500 hover:text-slate-200',
          align === 'center' && 'justify-center text-center',
          align === 'right' && 'justify-end text-right',
          isActive &&
            (variant === 'standings' ? 'text-slate-100' : 'text-foreground'),
        )}
      >
        <span>{label}</span>
        <SortIcon className='size-3.5 shrink-0' />
      </button>
    </TableHead>
  );
}
