'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { NativeSelect } from '@/components/ui/native-select';
import { DEFAULT_PAGE_SIZE, PAGE_SIZE_OPTIONS } from '@/lib/pagination';
import { cn } from '@/lib/utils';

const pageSizeSelectClassName = cn(
  'w-auto',
  '[&_select]:h-8 [&_select]:min-w-12 [&_select]:rounded-md',
  '[&_select]:border-0 [&_select]:bg-transparent [&_select]:shadow-none',
  '[&_select]:px-1.5 [&_select]:pr-7 [&_select]:text-xs',
  '[&_select]:focus-visible:border-0 [&_select]:focus-visible:ring-0',
  '[&_svg]:right-1.5 [&_svg]:size-3.5',
);

interface TablePaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  rangeStart: number;
  rangeEnd: number;
  pageSize?: number;
  pageSizeOptions?: readonly number[];
  onPageSizeChange: (pageSize: number) => void;
  canPrevious: boolean;
  canNext: boolean;
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  itemLabel?: string;
}

export function TablePagination({
  page,
  totalPages,
  totalItems,
  rangeStart,
  rangeEnd,
  pageSize = DEFAULT_PAGE_SIZE,
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  onPageSizeChange,
  canPrevious,
  canNext,
  onPrevious,
  onNext,
  className,
  itemLabel = 'itens',
}: TablePaginationProps) {
  if (totalItems === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        'flex flex-col gap-3 border-t pt-3 sm:flex-row sm:items-center sm:justify-between',
        className,
      )}
    >
      <p className='text-muted-foreground order-2 text-xs sm:order-1'>
        Mostrando{' '}
        <span className='text-foreground font-medium'>
          {rangeStart}–{rangeEnd}
        </span>{' '}
        de <span className='text-foreground font-medium'>{totalItems}</span>{' '}
        {itemLabel}
      </p>

      <div className='order-1 flex flex-wrap items-center gap-3 sm:order-2 sm:ml-auto'>
        <div className='flex items-center gap-2'>
          <NativeSelect
            value={String(pageSize)}
            onChange={event => onPageSizeChange(Number(event.target.value))}
            className={pageSizeSelectClassName}
            aria-label='Itens por página'
          >
            {pageSizeOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </NativeSelect>
          <span className='text-muted-foreground text-xs whitespace-nowrap'>
            por página
          </span>
        </div>

        <div className='flex items-center gap-1.5'>
          <Button
            type='button'
            size='icon-sm'
            variant='ghost'
            disabled={!canPrevious}
            aria-label='Página anterior'
            onClick={onPrevious}
          >
            <ChevronLeft className='size-4' />
          </Button>

          <span className='text-muted-foreground min-w-16 text-center text-xs whitespace-nowrap'>
            <span className='text-foreground font-medium'>{page}</span> de{' '}
            {totalPages}
          </span>

          <Button
            type='button'
            size='icon-sm'
            variant='ghost'
            disabled={!canNext}
            aria-label='Próxima página'
            onClick={onNext}
          >
            <ChevronRight className='size-4' />
          </Button>
        </div>
      </div>
    </div>
  );
}
