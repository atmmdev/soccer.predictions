import { recentMatches } from '../data/recent-matches';
import { MatchCard } from './match-card';

export function RecentMatches() {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-semibold">Partidas</h2>

      {recentMatches.map(match => (
        <MatchCard  key={match.id} match={match} />
      ))}
    </section>
  );
}
