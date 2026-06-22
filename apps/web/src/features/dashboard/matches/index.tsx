'use client';

import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { MatchTabs } from './components/match-tabs';
import { MatchTable } from './components/match-table';

export function MatchSections() {
  return (
    <section className='mt-8'>
      <Label className='text-lg font-semibold py-2'>
        Lista dos jogos recentes, atuais e futuros.
      </Label>
      <Card>
        <CardContent className='space-y-2'>
          <MatchTabs />
          <MatchTable />
        </CardContent>
      </Card>
    </section>
  );
}
