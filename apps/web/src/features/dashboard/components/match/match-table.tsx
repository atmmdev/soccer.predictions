import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { recentMatches } from '../../data/recent-matches';
import { MatchTableRow } from './match-table-row';

interface MatchCardProps {
  match: Match;
}

export function MatchCard({ match }: MatchCardProps) {
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
