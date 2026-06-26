import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { matches } from '../mocks/matches';
import { MatchTableRow } from './match-table-row';

export function MatchTable() {
  return (
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
          {matches.map(match => (
            <MatchTableRow key={match.id} match={match} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
