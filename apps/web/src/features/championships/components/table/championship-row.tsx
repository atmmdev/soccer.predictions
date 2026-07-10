import { TableCell, TableRow } from '@/components/ui/table';
import { Championship } from '../../types/championship';
import { CountryFlag } from '../country-flag';
import { ChampionshipStatusBadge } from './championship-status-badge';
import { ChampionshipActions } from './championship-actions';

interface ChampionshipRowProps {
  championship: Championship;
  onSync: (championshipId: number) => Promise<boolean>;
  onStatusChange: (championshipId: number, active: boolean) => Promise<boolean>;
}

export function ChampionshipRow({
  championship,
  onSync,
  onStatusChange,
}: ChampionshipRowProps) {
  // TODO: Adicionar link para uma pagina (Tabela de Classificação).
  return (
    <TableRow>
      <TableCell className='font-medium'>
        <CountryFlag
          flag={championship.flags || '🏆'}
          name={championship.name}
        />
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
        <ChampionshipActions
          championship={championship}
          onSync={onSync}
          onStatusChange={onStatusChange}
        />
      </TableCell>
    </TableRow>
  );
}
