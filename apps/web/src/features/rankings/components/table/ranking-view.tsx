import { ResponsiveDataView } from '@/components/ui/responsive-data-view';

import type { RankingSortKey, SortDirection } from '../../hooks/use-ranking-table';
import type {
  RankingEntry,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';
import { RankingLegend } from '../ranking-legend';
import { RankingMobileList } from './ranking-mobile-list';
import { RankingTable } from './ranking-table';

interface RankingViewProps {
  rows: RankingEntry[];
  isPoolSelected: boolean;
  scoringRule: RankingScoringRuleFilter;
  sortKey: RankingSortKey;
  sortDir: SortDirection;
  onSort: (key: RankingSortKey) => void;
  positionOffset?: number;
}

export function RankingView({
  rows,
  isPoolSelected,
  scoringRule,
  sortKey,
  sortDir,
  onSort,
  positionOffset = 0,
}: RankingViewProps) {
  if (!isPoolSelected) {
    return (
      <div className='flex items-center justify-center py-16'>
        <div className='max-w-sm space-y-2 text-center'>
          <p className='text-foreground text-sm font-medium'>
            Selecione um bolão
          </p>
          <p className='text-muted-foreground text-sm'>
            Escolha um bolão no filtro acima para visualizar a classificação dos
            participantes.
          </p>
        </div>
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className='flex items-center justify-center py-12'>
        <p className='text-muted-foreground text-center text-sm'>
          Nenhum participante encontrado com os filtros selecionados.
          <br />
          Tente limpar a busca, alterar o bolão ou escolher outra regra de
          pontuação.
        </p>
      </div>
    );
  }

  return (
    <div className='overflow-hidden'>
      <ResponsiveDataView
        breakpoint='md'
        desktop={
          <RankingTable
            rows={rows}
            scoringRule={scoringRule}
            sortKey={sortKey}
            sortDir={sortDir}
            onSort={onSort}
            positionOffset={positionOffset}
          />
        }
        mobile={
          <RankingMobileList
            rows={rows}
            scoringRule={scoringRule}
            positionOffset={positionOffset}
          />
        }
      />
      <RankingLegend />
    </div>
  );
}
