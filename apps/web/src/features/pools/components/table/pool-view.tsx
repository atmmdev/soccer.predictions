'use client';

import { useState } from 'react';

import { ResponsiveDataView } from '@/components/ui/responsive-data-view';

import type { PoolSortKey, SortDirection } from '../../hooks/use-pool-table';
import type { CreatePoolFormData } from '../../schemas/create-pool.schema';
import type { Pool, PoolStatus } from '../../types/pool';
import { EditPoolDialog } from '../dialogs/edit-pool-dialog';
import { PoolMobileList } from './pool-mobile-list';
import { PoolTable } from './pool-table';

interface PoolViewProps {
  rows: Pool[];
  sortKey: PoolSortKey;
  sortDir: SortDirection;
  onSort: (key: PoolSortKey) => void;
  onUpdatePool: (
    poolId: number,
    data: CreatePoolFormData,
  ) => boolean | Promise<boolean>;
  onStatusChange: (poolId: number, status: PoolStatus) => Promise<boolean>;
}

export function PoolView({
  rows,
  sortKey,
  sortDir,
  onSort,
  onUpdatePool,
  onStatusChange,
}: PoolViewProps) {
  const [editingPool, setEditingPool] = useState<Pool | null>(null);

  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-sm'>
          Nenhum bolão encontrado com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <>
      <ResponsiveDataView
        breakpoint='md'
        desktop={
          <PoolTable
            rows={rows}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={onSort}
            onEdit={setEditingPool}
            onStatusChange={onStatusChange}
          />
        }
        mobile={
          <PoolMobileList
            rows={rows}
            onEdit={setEditingPool}
            onStatusChange={onStatusChange}
          />
        }
      />

      <EditPoolDialog
        pool={editingPool}
        open={editingPool !== null}
        onOpenChange={open => {
          if (!open) {
            setEditingPool(null);
          }
        }}
        onUpdate={onUpdatePool}
      />
    </>
  );
}
