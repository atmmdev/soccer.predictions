'use client';

import { Search } from 'lucide-react';

import { ClearFiltersButton } from '@/components/ui/clear-filters-button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';

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
      <div className='flex flex-col gap-3 xl:flex-row xl:flex-wrap xl:items-center'>
        <div className='relative xl:min-w-[200px] xl:flex-1'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            placeholder='Buscar por time ou campeonato...'
            className='h-11 pl-9'
            value={search}
            onChange={event => onSearchChange(event.target.value)}
          />
        </div>

        <NativeSelect
          value={championshipName}
          onChange={event => onChampionshipNameChange(event.target.value)}
          className='xl:w-56'
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
          className='xl:w-44'
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
          className='h-11 xl:w-40'
          value={dateFrom}
          onChange={event => onDateFromChange(event.target.value)}
        />

        <Input
          id='match-date-to'
          type='date'
          aria-label='Data final'
          title='Data final'
          className='h-11 xl:w-40'
          min={dateFrom || undefined}
          value={dateTo}
          onChange={event => onDateToChange(event.target.value)}
        />

        <ClearFiltersButton
          onClick={onClearFilters}
          disabled={!hasActiveFilters}
        />
      </div>

      <p className='text-muted-foreground px-2 text-xs xl:ml-auto'>
        <span
          className={resultCount === 0 ? 'text-red-500' : 'text-primary'}
        >
          {resultCount} jogo{resultCount !== 1 ? 's' : ''} encontrado
          {resultCount !== 1 ? 's' : ''}
        </span>
      </p>
    </>
  );
}
