import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { championships } from '../mocks/championships';
import { ChampionshipRow } from './championship-row';

export function ChampionshipTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>País</TableHead>
          <TableHead>Temporada</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Classificação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {championships.map(championship => {
          return (
            <ChampionshipRow
              key={championship.id}
              championship={championship}
            />
          );
        })}
      </TableBody>
    </Table>
  );
}
