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
          <TableHead className='text-center'>Participantes</TableHead>
          <TableHead className='text-center'>Palpites</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pools.map(pool => (
          <TableRow key={pool.id}>
            <TableCell className='font-medium'>
              <p>{pool.name}</p>
              <p className='text-muted-foreground text-xs'>{pool.championshipName}</p></TableCell>
            <TableCell className='text-center font-bold'>
              {pool.participantsCount}
            </TableCell>
            <TableCell className='text-center font-bold'>
              {pool.predictionsCount}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
