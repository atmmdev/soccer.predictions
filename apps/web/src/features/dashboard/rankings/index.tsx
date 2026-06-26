import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { RankingTable } from './components/ranking-table';

export function TopRanking() {
  return (
    <section>
      <Card className='shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between border-b pb-4'>
          <h2 className='section-title mb-0'>Ranking Geral</h2>
          <Link
            href='/rankings'
            className='text-primary text-sm font-medium hover:underline'
          >
            Ver ranking completo
          </Link>
        </CardHeader>
        <CardContent>
          <RankingTable />
        </CardContent>
      </Card>
    </section>
  );
}
