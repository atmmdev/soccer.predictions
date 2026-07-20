import { ResponsiveDataView } from '@/components/ui/responsive-data-view';

import type {
  ChampionshipSortKey,
  SortDirection,
} from '../../hooks/use-championship-table';
import type { Championship } from '../../types/championship';
import { ChampionshipMobileList } from './championship-mobile-list';
import { ChampionshipTable } from './championship-table';

interface ChampionshipViewProps {
  rows: Championship[];
  sortKey: ChampionshipSortKey;
  sortDir: SortDirection;
  onSort: (key: ChampionshipSortKey) => void;
  onSync: (championshipId: number) => Promise<boolean>;
  onStatusChange: (championshipId: number, active: boolean) => Promise<boolean>;
}

export function ChampionshipView({
  rows,
  sortKey,
  sortDir,
  onSort,
  onSync,
  onStatusChange,
}: ChampionshipViewProps) {
  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-sm'>
          Nenhum campeonato encontrado com os filtros selecionados.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveDataView
      breakpoint='md'
      desktop={
        <ChampionshipTable
          rows={rows}
          sortKey={sortKey}
          sortDir={sortDir}
          onSort={onSort}
          onSync={onSync}
          onStatusChange={onStatusChange}
        />
      }
      mobile={
        <ChampionshipMobileList
          rows={rows}
          onSync={onSync}
          onStatusChange={onStatusChange}
        />
      }
    />
  );
}
