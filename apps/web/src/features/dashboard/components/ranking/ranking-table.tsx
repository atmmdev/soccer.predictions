import { ranking } from '../../data/ranking';
import { RankingRow } from './ranking-row';

export function RankingTable() {
  return (
    <div className='flex flex-col gap-4'>
      {ranking.map((user, index) => (
        <RankingRow key={user.id} user={user} position={index + 1} />
      ))}
    </div>
  );
}
