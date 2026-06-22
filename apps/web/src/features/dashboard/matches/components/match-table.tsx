import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { recentMatches } from '../mocks/recent-matches';
import { MatchTableRow } from './match-table-row';

export function MatchTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Data</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Resultado Oficial</TableHead>
          <TableHead>Palpite</TableHead>
          <TableHead>Pontuação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {recentMatches.map(match => {
          return <MatchTableRow key={match.id} match={match} />;
        })}
      </TableBody>
    </Table>
  );
}
