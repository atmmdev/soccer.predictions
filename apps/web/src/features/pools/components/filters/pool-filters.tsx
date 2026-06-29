'use client';

import { ClearFiltersButton } from '@/components/ui/clear-filters-button';

import type { CreatePoolFormData } from '../../schemas/create-pool.schema';
import { CreatePoolDialog } from '../dialogs/create-pool-dialog';
import { PoolSearch } from './pool-search';
import { PoolStatusSelect } from './pool-status-select';

interface PoolFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  resultCount: number;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onCreatePool: (data: CreatePoolFormData) => void;
}

export function PoolFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  resultCount,
  hasActiveFilters,
  onClearFilters,
  onCreatePool,
}: PoolFiltersProps) {
  return (
    <>
      <div className='flex flex-col gap-3 xl:flex-row xl:flex-wrap xl:items-center'>
        <PoolSearch
          value={search}
          onChange={onSearchChange}
          className='xl:min-w-[200px] xl:flex-1'
        />
        <PoolStatusSelect value={status} onChange={onStatusChange} />
        <ClearFiltersButton
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        />
        <CreatePoolDialog onCreate={onCreatePool} />
      </div>

      <p className='text-muted-foreground px-2 text-xs xl:ml-auto'>
        <span
          className={resultCount === 0 ? 'text-red-500' : 'text-primary'}
        >
          {resultCount} Bol{resultCount !== 1 ? 'ões' : 'ão'} encontrado
          {resultCount !== 1 ? 's' : ''}
        </span>
      </p>
    </>
  );
}
