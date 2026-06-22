import { StatsCards } from '@/features/dashboard/stats';
import { TopRanking } from '@/features/dashboard/rankings';
import { MatchSections } from '@/features/dashboard/matches';

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
