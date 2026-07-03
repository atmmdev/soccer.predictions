'use client';

import { Search } from 'lucide-react';

import { ClearFiltersButton } from '@/components/ui/clear-filters-button';
import { Input } from '@/components/ui/input';
import { NativeSelect } from '@/components/ui/native-select';

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
  resultCount: number;
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
  resultCount,
  hasActiveFilters,
  onClearFilters,
}: PredictionFiltersProps) {
  return (
    <>
      <div className='grid grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap lg:items-center'>
        <div className='relative sm:col-span-2 lg:min-w-0 lg:flex-1'>
          <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
          <Input
            placeholder='Buscar por time ou campeonato...'
            className='h-11 pl-9'
            value={search}
            onChange={event => onSearchChange(event.target.value)}
          />
        </div>

        <NativeSelect
          value={poolName}
          onChange={event => onPoolNameChange(event.target.value)}
          className='w-full lg:w-52'
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
          className='w-full lg:w-44'
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
            className='h-11 w-full lg:w-40'
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

      <p className='text-muted-foreground px-2 text-xs'>
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
