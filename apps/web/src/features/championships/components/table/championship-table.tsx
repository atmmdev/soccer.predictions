import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

import { Championship } from '../../types/championship';
import { ChampionshipRow } from './championship-row';

interface ChampionshipTableProps {
  championships: Championship[];
}

export function ChampionshipTable({ championships }: ChampionshipTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nome</TableHead>
          <TableHead>País</TableHead>
          <TableHead>Temporada</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Classificação</TableHead>
          <TableHead>Ações</TableHead>
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
