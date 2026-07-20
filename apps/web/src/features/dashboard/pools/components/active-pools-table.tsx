import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import type { Pool } from '@/features/pools/types/pool';

interface ActivePoolsTableProps {
  pools: Pool[];
}

export function ActivePoolsTable({ pools }: ActivePoolsTableProps) {
  return (
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
        {pools.map(pool => (
          <TableRow key={pool.id}>
            <TableCell className='font-medium'>{pool.name}</TableCell>
            <TableCell>{pool.championshipName}</TableCell>
            <TableCell className='text-right font-bold'>
              {pool.participantsCount}
            </TableCell>
            <TableCell className='text-right font-bold'>
              {pool.predictionsCount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
