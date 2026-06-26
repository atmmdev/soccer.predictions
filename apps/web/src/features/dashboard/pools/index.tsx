import { GiTrophiesShelf } from 'react-icons/gi';

import { Card, CardContent } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { DashboardSectionTitle } from '@/features/dashboard/components/dashboard-section-title';
import { activePools } from './mocks/active-pools';

export function ActivePools() {
  return (
    <section>
      <DashboardSectionTitle>Bolões Mais Ativos</DashboardSectionTitle>
      <Card className='shadow-sm'>
        <CardContent className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Bolão</TableHead>
                <TableHead>Campeonato</TableHead>
                <TableHead className='text-right'>Participantes</TableHead>
                <TableHead className='text-right'>Palpites</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activePools.map(pool => (
                <TableRow key={pool.id}>
                  <TableCell>
                    <div className='flex items-center gap-2 font-medium'>
                      <GiTrophiesShelf className='text-primary size-4 shrink-0' />
                      {pool.name}
                    </div>
                  </TableCell>
                  <TableCell className='text-muted-foreground text-sm'>
                    {pool.championship}
                  </TableCell>
                  <TableCell className='text-right'>{pool.participants}</TableCell>
                  <TableCell className='text-right'>{pool.predictions}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
