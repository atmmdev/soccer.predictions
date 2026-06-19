import { RecentMatches } from '@/features/dashboard/components/match/recent-matches';
import { StatsCards } from '@/features/dashboard/components/stats-cards/stats-cards';
import { TopRanking } from '@/features/dashboard/components/ranking/top-ranking';

export default function DashboardPage() {
  return (
    <>
      <StatsCards />
      <div className='grid gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <RecentMatches />
        </div>
        <TopRanking />
      </div>
    </>
  );
}
