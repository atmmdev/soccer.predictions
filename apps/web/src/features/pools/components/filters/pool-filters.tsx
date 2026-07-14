'use client';

import { ClearFiltersButton } from '@/components/ui/clear-filters-button';
import { filterToolbarClassName } from '@/lib/filter-styles';

import type { CreatePoolFormData } from '../../schemas/create-pool.schema';
import { CreatePoolDialog } from '../dialogs/create-pool-dialog';
import { PoolSearch } from './pool-search';
import { PoolStatusSelect } from './pool-status-select';

interface PoolFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: string;
  onStatusChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onCreatePool: (data: CreatePoolFormData) => boolean | Promise<boolean>;
}

export function PoolFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  hasActiveFilters,
  onClearFilters,
  onCreatePool,
}: PoolFiltersProps) {
  return (
    <>
      <div className={filterToolbarClassName}>
        <PoolSearch
          value={search}
          onChange={onSearchChange}
          className='xl:min-w-[200px] xl:flex-1 bg-white'
        />
        <PoolStatusSelect value={status} onChange={onStatusChange} />
        <ClearFiltersButton
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        />
        <CreatePoolDialog onCreate={onCreatePool} />
      </div>
    </>
  );
}
