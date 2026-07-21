import { ResponsiveDataView } from '@/components/ui/responsive-data-view';

import type { MatchFixtureItem } from '../../types/match-fixture';
import { MatchMobileList } from './match-mobile-list';
import { MatchTable } from './match-table';

interface MatchViewProps {
  rows: MatchFixtureItem[];
}

export function MatchView({ rows }: MatchViewProps) {
  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-center text-sm'>
          Nenhum jogo encontrado com os filtros selecionados.
          <br />
          Tente limpar a busca, o intervalo de datas e usar &quot;Todos&quot; nos
          filtros.
        </p>
      </div>
    );
  }

  return (
    <ResponsiveDataView
      breakpoint='md'
      desktop={<MatchTable rows={rows} />}
      mobile={<MatchMobileList rows={rows} />}
    />
  );
}
