import { ResponsiveDataView } from '@/components/ui/responsive-data-view';

import type { RankingUser } from '../types/ranking';
import { RankingMobileList } from './ranking-mobile-list';
import { RankingTable } from './ranking-table';

interface DashboardRankingViewProps {
  users: RankingUser[];
}

export function DashboardRankingView({ users }: DashboardRankingViewProps) {
  return (
    <ResponsiveDataView
      breakpoint='md'
      desktop={<RankingTable users={users} />}
      mobile={<RankingMobileList users={users} />}
    />
  );
}
