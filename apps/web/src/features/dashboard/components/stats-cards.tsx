import { stats } from '../data/stats';
import { StatsCard } from '../stats-card';

export function StatsCards() {
  return (
    <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      {stats.map(item => (
        <StatsCard key={item.title} item={item} />
      ))}
    </section>
  );
}
