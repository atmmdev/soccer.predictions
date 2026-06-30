'use client';

import { Search } from 'lucide-react';

import { ClearFiltersButton } from '@/components/ui/clear-filters-button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';

import { SCORING_RULE_FILTER_OPTIONS } from '../../constants/scoring-rule-filters';
import type { RankingScoringRuleFilter } from '../../types/ranking-entry';

interface RankingFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  poolName: string;
  onPoolNameChange: (value: string) => void;
  poolOptions: string[];
  scoringRule: RankingScoringRuleFilter;
  onScoringRuleChange: (value: RankingScoringRuleFilter) => void;
  championshipName: string | null;
  resultCount: number;
  isPoolSelected: boolean;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function RankingFilters({
  search,
  onSearchChange,
  poolName,
  onPoolNameChange,
  poolOptions,
  scoringRule,
  onScoringRuleChange,
  championshipName,
  resultCount,
  isPoolSelected,
  hasActiveFilters,
  onClearFilters,
}: RankingFiltersProps) {
  return (
    <>
      <div className='flex flex-col gap-3 xl:flex-row xl:flex-wrap xl:items-center'>
        <div className='relative xl:min-w-[200px] xl:flex-1'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            placeholder='Buscar participante...'
            className='h-11 pl-9'
            value={search}
            disabled={!isPoolSelected}
            onChange={event => onSearchChange(event.target.value)}
          />
        </div>

        <NativeSelect
          value={poolName}
          onChange={event => onPoolNameChange(event.target.value)}
          className='xl:w-56'
        >
          <option value=''>Selecione um bolão</option>
          {poolOptions.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </NativeSelect>

        <NativeSelect
          value={scoringRule}
          onChange={event =>
            onScoringRuleChange(
              event.target.value as RankingScoringRuleFilter,
            )
          }
          className='xl:w-64'
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
          </p>
        ) : (
          <span />
        )}

        <p className='text-muted-foreground text-xs xl:ml-auto'>
          {isPoolSelected ? (
            <span
              className={resultCount === 0 ? 'text-red-500' : 'text-primary'}
            >
              {resultCount} participante{resultCount !== 1 ? 's' : ''} no
              ranking
            </span>
          ) : (
            <span className='text-muted-foreground'>
              Selecione um bolão para ver o ranking
            </span>
          )}
        </p>
      </div>
    </>
  );
}
