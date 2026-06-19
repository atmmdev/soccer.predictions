import { Label } from '@/components/ui/label';
import { recentMatches } from '../../data/recent-matches';
import { MatchCard } from './match-card';

export function RecentMatches() {
  return (
    <section className='mt-8'>
      <Label className='text-lg font-semibold py-2'>Partidas Recentes</Label>

      {recentMatches.map(match => (
        <MatchCard key={match.id} match={match} />
      ))}
    </section>
  );
}
