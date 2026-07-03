'use client';

import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { useDashboardData } from '../hooks/use-dashboard-data';
import { MatchTableRow } from './components/match-table-row';
import { MatchTabs } from './components/match-tabs';

export function MatchSections() {
  const { matchCounts, filterMatches } = useDashboardData();

  return (
    <section>
      <Card className='shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between border-b'>
          <h2 className='section-title mb-0'>Próximos Jogos e Meus Palpites</h2>
          <Link
            href='/predictions'
            className='text-primary text-sm font-medium hover:underline'
          >
            Ver todos
          </Link>
        </CardHeader>
        <CardContent className='space-y-2'>
          <MatchTabs
            activeTab='all'
            onTabChange={() => undefined}
            counts={matchCounts}
          />
          <div className='overflow-x-auto'>
            <Table>
              <TableHeader>
                <TableRow className='text-xs'>
                  <TableHead>Data / Hora</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-center'>Jogo</TableHead>
                  <TableHead className='text-center'>Resultado Oficial</TableHead>
                  <TableHead className='text-center'>Meu Palpite</TableHead>
                  <TableHead>Pontos</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filterMatches('all').map((match, index) => (
                  <MatchTableRow
                    key={`match-section-${match.id}-${index}`}
                    match={match}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
