import { StatsCards } from '@/features/dashboard/stats';
import { MatchSections } from '@/features/dashboard/matches';
import { ActivityFeed } from '@/features/dashboard/activity';
import { TopRanking } from '@/features/dashboard/rankings';
import { ActivePools } from '@/features/dashboard/pools';

export default function DashboardPage() {
  return (
    <div className='flex flex-col gap-6'>
      <p className='text-sm text-muted-foreground'>
        <span className='font-bold'>Bem-vindo ao Soccer Predictions!</span> Aqui você pode gerenciar seus bolões e campeonatos.
      </p>
      <StatsCards />

      <div className='grid gap-6 lg:grid-cols-3'>
        <div className='flex flex-col gap-6 lg:col-span-2'>
          <MatchSections />
          <ActivityFeed />
        </div>

        <div className='flex flex-col gap-6'>
          <TopRanking />
          <ActivePools />
        </div>
      </div>
    </div>
  );
}
