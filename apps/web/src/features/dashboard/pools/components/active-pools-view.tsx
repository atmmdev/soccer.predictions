import { ResponsiveDataView } from '@/components/ui/responsive-data-view';

import type { Pool } from '@/features/pools/types/pool';

import { ActivePoolsMobileList } from './active-pools-mobile-list';
import { ActivePoolsTable } from './active-pools-table';

interface ActivePoolsViewProps {
  pools: Pool[];
}

export function ActivePoolsView({ pools }: ActivePoolsViewProps) {
  return (
    <ResponsiveDataView
      breakpoint='md'
      desktop={<ActivePoolsTable pools={pools} />}
      mobile={<ActivePoolsMobileList pools={pools} />}
    />
  );
}
