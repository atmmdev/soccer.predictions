import { Card } from '@/components/ui/card';
import { RankingTable } from './components/ranking-table';
import { Label } from '@/components/ui/label';

export function TopRanking() {
  return (
    <section className='mt-8'>
      <Label className='title mb-3'>
        Ranking - Top 10 Classificados
      </Label>

      <Card className='px-4'>
        <RankingTable />
      </Card>
    </section>
  );
}
