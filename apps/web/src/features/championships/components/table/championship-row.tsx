import { TableCell, TableRow } from '@/components/ui/table';
import { Championship } from '../../types/championship';
import { Badge } from '@/components/ui/badge';

interface ChampionshipRowProps {
  championship: Championship;
}

export function ChampionshipRow({ championship }: ChampionshipRowProps) {
  // TODO: Adicionar link para uma pagina (Tabela de Classificação).
  return (
    <TableRow>
      <TableCell>
        <span className='mr-2 bg-red-900 text-white px-2 py-1 rounded-lg text-xs'>
          Bandeira / Logo
        </span>{' '}
        {championship.name}
      </TableCell>
      <TableCell>{championship.country}</TableCell>
      <TableCell>{championship.season}</TableCell>
      <TableCell>
        <Badge
          variant={championship.status === 'ACTIVE' ? 'default' : 'destructive'}
        >
          {championship.status}
        </Badge>
      </TableCell>
      <TableCell>Detalhes</TableCell>
    </TableRow>
  );
}
