import Link from 'next/link';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { activePools } from './mocks/active-pools';

export function ActivePools() {
  return (
    <section>
      <Card className='shadow-sm'>
        <CardHeader className='flex flex-row items-center justify-between border-b pb-4'>
          <h2 className='section-title mb-0'>Bolões Mais Ativos</h2>
          <Link
            href='/pools'
            className='text-primary text-sm font-medium hover:underline'
          >
            Ver todos
          </Link>
        </CardHeader>
        <CardContent className='overflow-x-auto'>
          <Table>
            <TableHeader>
              <TableRow className='text-xs'>
                <TableHead>Bolão</TableHead>
                <TableHead>Campeonato</TableHead>
                <TableHead className='text-right'>Participantes</TableHead>
                <TableHead className='text-right'>Palpites</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {activePools.map(pool => (
                <TableRow key={pool.id}>
                  <TableCell className='font-medium'>{pool.name}</TableCell>
                  <TableCell>{pool.championship}</TableCell>
                  <TableCell className='text-right font-bold'>
                    {pool.participants}
                  </TableCell>
                  <TableCell className='text-right font-bold'>
                    {pool.predictions}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </section>
  );
}
