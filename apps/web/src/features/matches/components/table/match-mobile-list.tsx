import type { MatchFixtureItem } from '../../types/match-fixture';
import { MatchMobileCard } from './match-mobile-card';

interface MatchMobileListProps {
  rows: MatchFixtureItem[];
}

export function MatchMobileList({ rows }: MatchMobileListProps) {
  return (
    <div className='space-y-3'>
      {rows.map(fixture => (
        <MatchMobileCard key={fixture.id} fixture={fixture} />
      ))}
    </div>
  );
}
