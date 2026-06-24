import { ChampionshipList } from '@/features/championships/components/championship-list';
import { ChampionshipHeader } from '../../../features/championships/components/championship-header';

export default function ChampionshipPage() {
  return (
    <div className='flex flex-col gap-4'>
      <ChampionshipHeader />
      <ChampionshipList />
    </div>
  );
}
