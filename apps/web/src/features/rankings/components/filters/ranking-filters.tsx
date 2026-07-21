'use client';

import { Search } from 'lucide-react';

import { RoundFilterSelect } from '@/components/filters/round-filter-select';
import { ClearFiltersButton } from '@/components/ui/clear-filters-button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import {
  filterSearchFieldClassName,
  filterSelectLgClassName,
  filterSelectMdClassName,
  filterToolbarClassName,
} from '@/lib/filter-styles';
import { cn } from '@/lib/utils';

import { SCORING_RULE_FILTER_OPTIONS } from '../../constants/scoring-rule-filters';
import type {
  RankingPoolOption,
  RankingScoringRuleFilter,
} from '../../types/ranking-entry';

interface RankingFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  selectedPoolId: number | null;
  onPoolChange: (poolId: number | null) => void;
  poolOptions: RankingPoolOption[];
  scoringRule: RankingScoringRuleFilter;
  onScoringRuleChange: (value: RankingScoringRuleFilter) => void;
  isLeague: boolean;
  availableRounds: number[];
  selectedRound: number | null;
  onRoundChange: (round: number | null) => void;
  championshipName: string | null;
  isPoolSelected: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function RankingFilters({
  search,
  onSearchChange,
  selectedPoolId,
  onPoolChange,
  poolOptions,
  scoringRule,
  onScoringRuleChange,
  isLeague,
  availableRounds,
  selectedRound,
  onRoundChange,
  championshipName,
  isPoolSelected,
  hasActiveFilters,
  onClearFilters,
}: RankingFiltersProps) {
  return (
    <>
      <div className={filterToolbarClassName}>
        <div className={filterSearchFieldClassName}>
          <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            placeholder='Buscar participante...'
            className='pl-9 bg-white'
            value={search}
            disabled={!isPoolSelected}
            onChange={event => onSearchChange(event.target.value)}
          />
        </div>

        <NativeSelect
          value={selectedPoolId === null ? '' : String(selectedPoolId)}
          onChange={event => {
            const value = event.target.value;
            onPoolChange(value.length > 0 ? Number(value) : null);
          }}
          className={cn(filterSelectMdClassName, 'bg-white')}
        >
          <option value=''>Selecione um bolão</option>
          {poolOptions.map(pool => (
            <option key={pool.id} value={pool.id}>
              {pool.name}
            </option>
          ))}
        </NativeSelect>

        {isLeague && isPoolSelected ? (
          <RoundFilterSelect
            availableRounds={availableRounds}
            value={selectedRound}
            onChange={onRoundChange}
            emptyOptionLabel='Escolha a Rodada'
            formatOptionLabel={round => `Rodada ${round}`}
            ariaLabel='Até a rodada'
          />
        ) : null}

        <NativeSelect
          value={scoringRule}
          onChange={event =>
            onScoringRuleChange(
              event.target.value as RankingScoringRuleFilter,
            )
          }
          className={cn(filterSelectLgClassName, 'bg-white')}
          aria-label='Regra de pontuação'
          disabled={!isPoolSelected}
        >
          {SCORING_RULE_FILTER_OPTIONS.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </NativeSelect>

        <ClearFiltersButton
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        />
      </div>

      <div className='flex flex-col gap-1 px-2 sm:flex-row sm:items-center sm:justify-between'>
        {championshipName ? (
          <p className='text-muted-foreground text-xs'>
            Campeonato:{' '}
            <span className='text-foreground font-medium'>
              {championshipName}
            </span>
            {isLeague && selectedRound !== null ? (
              <>
                {' '}
                · até a rodada{' '}
                <span className='text-foreground font-medium'>
                  {selectedRound}
                </span>
              </>
            ) : null}
          </p>
        ) : (
          <span />
        )}
      </div>
    </>
  );
}
