'use client';

import { Search } from 'lucide-react';

import { RoundFilterSelect } from '@/components/filters/round-filter-select';
import { ClearFiltersButton } from '@/components/ui/clear-filters-button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';
import {
  filterDateInputClassName,
  filterSearchFieldClassName,
  filterSelectMdClassName,
  filterSelectSmClassName,
  filterToolbarClassName,
} from '@/lib/filter-styles';
import { cn } from '@/lib/utils';

import type { MatchFilterStatus } from '../../hooks/use-match-search-filters';

interface MatchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: MatchFilterStatus;
  onStatusChange: (value: MatchFilterStatus) => void;
  championshipName: string;
  onChampionshipNameChange: (value: string) => void;
  selectedRound: number | null;
  onRoundChange: (round: number | null) => void;
  availableRounds: number[];
  currentRound: number | null;
  isLeagueChampionship: boolean;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
  championshipOptions: string[];
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function MatchFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  championshipName,
  onChampionshipNameChange,
  selectedRound,
  onRoundChange,
  availableRounds,
  currentRound,
  isLeagueChampionship,
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  championshipOptions,
  hasActiveFilters,
  onClearFilters,
}: MatchFiltersProps) {
  return (
    <>
      <div className={filterToolbarClassName}>
        <div className={filterSearchFieldClassName}>
          <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            placeholder='Buscar por time ou campeonato...'
            className='pl-9 bg-white'
            value={search}
            onChange={event => onSearchChange(event.target.value)}
          />
        </div>

        <NativeSelect
          value={championshipName}
          onChange={event => onChampionshipNameChange(event.target.value)}
          className={cn(filterSelectMdClassName, 'bg-white')}
        >
          <option value='ALL'>Todos os campeonatos</option>
          {championshipOptions.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </NativeSelect>

        {isLeagueChampionship ? (
          <RoundFilterSelect
            availableRounds={availableRounds}
            value={selectedRound}
            onChange={onRoundChange}
            ariaLabel='Rodada'
            formatOptionLabel={round =>
              round === currentRound
                ? `Rodada ${round} · Atual`
                : `Rodada ${round}`
            }
          />
        ) : null}

        <NativeSelect
          value={status}
          onChange={event =>
            onStatusChange(event.target.value as MatchFilterStatus)
          }
          className={cn(filterSelectSmClassName, 'bg-white')}
        >
          <option value='ALL'>Todos</option>
          <option value='SCHEDULED'>Agendado</option>
          <option value='LIVE'>Ao vivo</option>
          <option value='FINISHED'>Encerrado</option>
        </NativeSelect>

        <Input
          id='match-date-from'
          type='date'
          aria-label='Data inicial'
          title='Data inicial'
          className={cn(filterDateInputClassName, 'bg-white')}
          value={dateFrom}
          onChange={event => onDateFromChange(event.target.value)}
        />

        <Input
          id='match-date-to'
          type='date'
          aria-label='Data final'
          title='Data final'
          className={cn(filterDateInputClassName, 'bg-white')}
          min={dateFrom || undefined}
          value={dateTo}
          onChange={event => onDateToChange(event.target.value)}
        />

        <ClearFiltersButton
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        />
      </div>

      {isLeagueChampionship && currentRound !== null ? (
        <p className='text-muted-foreground px-2 text-xs'>
          Rodada atual:{' '}
          <span className='text-foreground font-medium'>{currentRound}</span>
          {selectedRound !== null && selectedRound !== currentRound ? (
            <>
              {' '}
              · exibindo rodada{' '}
              <span className='text-foreground font-medium'>
                {selectedRound}
              </span>
            </>
          ) : null}
        </p>
      ) : null}
    </>
  );
}
