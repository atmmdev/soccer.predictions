'use client';

import { Search, User } from 'lucide-react';

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

import type { PredictionFilterStatus } from '../../hooks/use-prediction-search-filters';

interface PredictionFiltersProps {
  search: string;
  onSearchChange: (value: string) => void;
  status: PredictionFilterStatus;
  onStatusChange: (value: PredictionFilterStatus) => void;
  poolName: string;
  onPoolNameChange: (value: string) => void;
  poolOptions: string[];
  showDateFilter: boolean;
  selectedDate: string;
  onSelectedDateChange: (value: string) => void;
  showParticipantFilter: boolean;
  participantSearch: string;
  onParticipantSearchChange: (value: string) => void;
  hasActiveFilters: boolean;
  onClearFilters: () => void;
}

export function PredictionFilters({
  search,
  onSearchChange,
  status,
  onStatusChange,
  poolName,
  onPoolNameChange,
  poolOptions,
  showDateFilter,
  selectedDate,
  onSelectedDateChange,
  showParticipantFilter,
  participantSearch,
  onParticipantSearchChange,
  hasActiveFilters,
  onClearFilters,
}: PredictionFiltersProps) {
  return (
    <div className={filterToolbarClassName}>
      <div className={filterSearchFieldClassName}>
        <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
        <Input
          placeholder='Buscar por time ou campeonato...'
          className='bg-white pl-9'
          value={search}
          onChange={event => onSearchChange(event.target.value)}
        />
      </div>

      {showParticipantFilter ? (
        <div className='relative w-full xl:w-52'>
          <User className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            type='search'
            placeholder='Participante...'
            aria-label='Buscar por participante'
            className='bg-white pl-9'
            value={participantSearch}
            onChange={event => onParticipantSearchChange(event.target.value)}
          />
        </div>
      ) : null}

      <NativeSelect
        value={poolName}
        onChange={event => onPoolNameChange(event.target.value)}
        className={`${filterSelectMdClassName} bg-white`}
      >
        <option value='ALL'>Todos os bolões</option>
        {poolOptions.map(name => (
          <option key={name} value={name}>
            {name}
          </option>
        ))}
      </NativeSelect>

      <NativeSelect
        value={status}
        onChange={event =>
          onStatusChange(event.target.value as PredictionFilterStatus)
        }
        className={`${filterSelectSmClassName} bg-white`}
      >
        <option value='ALL'>Todos</option>
        <option value='PENDING'>Sem palpite</option>
        <option value='SUBMITTED'>Palpites feitos</option>
      </NativeSelect>

      {showDateFilter ? (
        <Input
          id='prediction-date'
          type='date'
          aria-label='Data do jogo'
          title='Data do jogo'
          className={`${filterDateInputClassName} bg-white`}
          value={selectedDate}
          onChange={event => onSelectedDateChange(event.target.value)}
        />
      ) : null}

      <ClearFiltersButton
        onClick={onClearFilters}
        disabled={!hasActiveFilters}
        className='w-full sm:w-auto'
      />
    </div>
  );
}
