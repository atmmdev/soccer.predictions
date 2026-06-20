
import { StatsCards } from '@/features/dashboard/components/stats-cards/stats-cards';
import { TopRanking } from '@/features/dashboard/components/ranking/top-ranking';
import { MatchSections } from '@/features/dashboard/components/match/match-sections';

export default function DashboardPage() {
  return (
    <>
      <StatsCards />
      <div className='grid gap-6 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <MatchSections />
        </div>
        <TopRanking />
      </div>
    </>
  );
}
