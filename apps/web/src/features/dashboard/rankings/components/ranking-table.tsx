import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { ranking } from '../mocks/ranking';
import { RankingRow } from './ranking-row';

export function RankingTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow className='text-xs'>
          <TableHead className='w-14'>Posição</TableHead>
          <TableHead>Participante</TableHead>
          <TableHead className='text-right'>Pontos</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {ranking.map((user, index) => (
          <RankingRow key={user.id} user={user} position={index + 1} />
        ))}
      </TableBody>
    </Table>
  );
}
