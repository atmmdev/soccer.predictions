import { stats } from './mocks/stats';
import { StatsCard } from './components/stats-card';

export function StatsCards() {
  return (
    <section className='grid gap-4 sm:grid-cols-2 xl:grid-cols-5'>
      {stats.map(item => (
        <StatsCard key={item.title} item={item} />
      ))}
    </section>
  );
}
