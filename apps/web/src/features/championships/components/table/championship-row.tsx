import { TableCell, TableRow } from '@/components/ui/table';
import { Championship } from '../../types/championship';
import { ChampionshipStatusBadge } from './championship-status-badge';
import { ChampionshipActions } from './championship-actions';

interface ChampionshipRowProps {
  championship: Championship;
}

export function ChampionshipRow({ championship }: ChampionshipRowProps) {
  // TODO: Adicionar link para uma pagina (Tabela de Classificação).
  return (
    <TableRow>
      <TableCell className='font-medium'>
        <span className='mr-2' aria-hidden>
          {championship.flags || '🏆'}
        </span>
        {championship.name}
      </TableCell>
      <TableCell>{championship.country}</TableCell>
      <TableCell>{championship.season}</TableCell>
      <TableCell>
        <ChampionshipStatusBadge status={championship.status} />
      </TableCell>
      <TableCell className='text-primary text-xs font-medium text-center'>
        Classificação
      </TableCell>
      <TableCell className='text-right'>
        <ChampionshipActions championship={championship} />
      </TableCell>
    </TableRow>
  );
}
