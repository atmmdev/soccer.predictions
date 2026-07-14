'use client';

import { Search } from 'lucide-react';

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

import type { MatchFilterStatus } from '../../hooks/use-match-search-filters';

interface MatchFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: MatchFilterStatus;
  onStatusChange: (value: MatchFilterStatus) => void;
  championshipName: string;
  onChampionshipNameChange: (value: string) => void;
  dateFrom: string;
  onDateFromChange: (value: string) => void;
  dateTo: string;
  onDateToChange: (value: string) => void;
  championshipOptions: string[];
  resultCount: number;
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
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
  championshipOptions,
  resultCount,
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
          className={filterSelectMdClassName + ' bg-white'}
        >
          <option value='ALL'>Todos os campeonatos</option>
          {championshipOptions.map(name => (
            <option key={name} value={name}>
              {name}
            </option>
          ))}
        </NativeSelect>

        <NativeSelect
          value={status}
          onChange={event =>
            onStatusChange(event.target.value as MatchFilterStatus)
          }
          className={filterSelectSmClassName + ' bg-white'}
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
          className={filterDateInputClassName + ' bg-white'}
          value={dateFrom}
          onChange={event => onDateFromChange(event.target.value)}
        />

        <Input
          id='match-date-to'
          type='date'
          aria-label='Data final'
          title='Data final'
          className={filterDateInputClassName + ' bg-white'}
          min={dateFrom || undefined}
          value={dateTo}
          onChange={event => onDateToChange(event.target.value)}
        />

        <ClearFiltersButton
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        />
      </div>
    </>
  );
}
