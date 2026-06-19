import { Card } from '@/components/ui/card';
import { RankingTable } from '../components/ranking-table';
import { Label } from '@/components/ui/label';

export function TopRanking() {
  return (
    <section className='mt-8'>
      <Label className='text-lg font-semibold py-2'>Ranking - Top 10 Classificados</Label>

      <Card className="px-4">
        <RankingTable />
      </Card>
    </section>
  );
}
