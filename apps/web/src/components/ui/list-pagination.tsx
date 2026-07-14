'use client';

import { TablePagination } from '@/components/ui/table-pagination';
import type { useClientPagination } from '@/hooks/use-client-pagination';

type ClientPagination = ReturnType<typeof useClientPagination>;

interface ListPaginationProps {
  pagination: ClientPagination;
  itemLabel: string;
  className?: string;
}

/** Footer de paginação padronizado a partir de `useClientPagination`. */
export function ListPagination({
  pagination,
  itemLabel,
  className,
}: ListPaginationProps) {
  return (
    <TablePagination
      page={pagination.page}
      totalPages={pagination.totalPages}
      totalItems={pagination.totalItems}
      rangeStart={pagination.rangeStart}
      rangeEnd={pagination.rangeEnd}
      pageSize={pagination.pageSize}
      onPageSizeChange={pagination.setPageSize}
      canPrevious={pagination.canPrevious}
      canNext={pagination.canNext}
      onPrevious={pagination.goToPrevious}
      onNext={pagination.goToNext}
      itemLabel={itemLabel}
      className={className}
    />
  );
}
