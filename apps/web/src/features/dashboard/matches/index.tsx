'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { MatchTabs } from './components/match-tabs';
import { MatchTable } from './components/match-table';

export function MatchSections() {
  return (
    <section>
      <Card className='shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between border-b'>
          <h2 className='section-title mb-0'>Próximos Jogos e Meus Palpites</h2>
          <Link
            href='/matches'
            className='text-primary text-sm font-medium hover:underline'
          >
            Ver todos
          </Link>
        </CardHeader>
        <CardContent className='space-y-2'>
          <MatchTabs />
          <MatchTable />
        </CardContent>
      </Card>
    </section>
  );
}
