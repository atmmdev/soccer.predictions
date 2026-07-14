'use client';

import { useMemo, useState } from 'react';

import { DEFAULT_PAGE_SIZE } from '@/lib/pagination';

export function useClientPagination<T>(
  items: T[],
  options?: {
    pageSize?: number;
    resetKey?: string | number;
  },
) {
  const [pageSize, setPageSize] = useState(
    options?.pageSize ?? DEFAULT_PAGE_SIZE,
  );
  const resetKey = options?.resetKey ?? '';
  const syncKey = `${resetKey}|${pageSize}`;

  const [page, setPage] = useState(1);
  const [trackedSyncKey, setTrackedSyncKey] = useState(syncKey);

  if (syncKey !== trackedSyncKey) {
    setTrackedSyncKey(syncKey);
    setPage(1);
  }

  const totalItems = items.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / pageSize) || 1);
  const currentPage =
    syncKey !== trackedSyncKey ? 1 : Math.min(page, totalPages);

  if (syncKey === trackedSyncKey && page !== currentPage) {
    setPage(currentPage);
  }

  const pageItems = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return items.slice(start, start + pageSize);
  }, [currentPage, items, pageSize]);

  const rangeStart = totalItems === 0 ? 0 : (currentPage - 1) * pageSize + 1;
  const rangeEnd = Math.min(currentPage * pageSize, totalItems);

  return {
    page: currentPage,
    pageSize,
    setPageSize,
    totalItems,
    totalPages,
    pageItems,
    rangeStart,
    rangeEnd,
    setPage,
    goToPrevious: () => setPage(value => Math.max(1, value - 1)),
    goToNext: () => setPage(value => Math.min(totalPages, value + 1)),
    canPrevious: currentPage > 1,
    canNext: currentPage < totalPages && totalItems > 0,
  };
}
