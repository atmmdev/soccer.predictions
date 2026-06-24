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
    <>
      {championships.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>País</TableHead>
              <TableHead>Temporada</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Tabela de Classificação</TableHead>
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
      ) : (
        <div className='flex justify-center items-center h-full'>
          <p className='text-sm text-red-500'>Nenhum campeonato encontrado.</p>
        </div>
      )}
    </>
  );
}
