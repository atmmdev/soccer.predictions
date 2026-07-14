'use client';

import { useState } from 'react';

import { ListPagination } from '@/components/ui/list-pagination';
import { PageLoading } from '@/components/ui/page-loading';
import { useClientPagination } from '@/hooks/use-client-pagination';

import { usePredictionList } from '../hooks/use-prediction-list';
import type { SubmitPredictionFormData } from '../schemas/submit-prediction.schema';
import type { PredictionFixtureItem } from '../types/prediction-fixture';
import { canEditPrediction } from '../utils/prediction-window';
import { SubmitPredictionDialog } from './dialogs/submit-prediction-dialog';
import { FixturePredictionsDialog } from './dialogs/fixture-predictions-dialog';
import { PredictionFilters } from './filters/prediction-filters';
import { PredictionMobileList } from './prediction-mobile-list';
import { PredictionTable } from './table/prediction-table';

export function PredictionList() {
  const { isLoading, error, reloadFixtures, submitPrediction, searchFilters } =
    usePredictionList();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFixture, setSelectedFixture] =
    useState<PredictionFixtureItem | null>(null);
  const [predictionsDialogOpen, setPredictionsDialogOpen] = useState(false);
  const [viewPredictionsFixture, setViewPredictionsFixture] =
    useState<PredictionFixtureItem | null>(null);

  const pagination = useClientPagination(searchFilters.filteredFixtures, {
    resetKey: [
      searchFilters.search,
      searchFilters.status,
      searchFilters.matchStatus,
      searchFilters.poolName,
      searchFilters.selectedDate,
      searchFilters.participantSearch,
    ].join('|'),
  });

  function handlePredict(fixture: PredictionFixtureItem) {
    if (!fixture.isOwnPrediction || !canEditPrediction(fixture)) {
      return;
    }

    setSelectedFixture(fixture);
    setDialogOpen(true);
  }

  function handleDialogOpenChange(open: boolean) {
    setDialogOpen(open);

    if (!open) {
      setSelectedFixture(null);
    }
  }

  function handleViewAllPredictions(fixture: PredictionFixtureItem) {
    setViewPredictionsFixture(fixture);
    setPredictionsDialogOpen(true);
  }

  function handlePredictionsDialogOpenChange(open: boolean) {
    setPredictionsDialogOpen(open);

    if (!open) {
      setViewPredictionsFixture(null);
    }
  }

  async function handleSubmit(
    fixtureId: number,
    data: SubmitPredictionFormData,
  ): Promise<boolean> {
    if (!selectedFixture) {
      return false;
    }

    return submitPrediction(fixtureId, selectedFixture.poolId, data);
  }

  return (
    <>
      <div className='flex min-w-0 flex-col gap-4'>
        <PredictionFilters
          search={searchFilters.search}
          onSearchChange={searchFilters.setSearch}
          status={searchFilters.status}
          onStatusChange={searchFilters.setStatus}
          matchStatus={searchFilters.matchStatus}
          onMatchStatusChange={searchFilters.setMatchStatus}
          poolName={searchFilters.poolName}
          onPoolNameChange={searchFilters.setPoolName}
          poolOptions={searchFilters.poolOptions}
          showDateFilter={searchFilters.enableDateFilter}
          selectedDate={searchFilters.selectedDate}
          onSelectedDateChange={searchFilters.setSelectedDate}
          showParticipantFilter={searchFilters.enableParticipantFilter}
          participantSearch={searchFilters.participantSearch}
          onParticipantSearchChange={searchFilters.setParticipantSearch}
          isPoolSelected={searchFilters.isPoolSelected}
          hasActiveFilters={searchFilters.hasActiveFilters}
          onClearFilters={searchFilters.clearFilters}
        />

        {isLoading ? (
          <PageLoading compact label='Carregando palpites...' />
        ) : error ? (
          <div className='flex flex-col items-center justify-center gap-3 py-12'>
            <p className='text-destructive text-center text-sm'>{error}</p>
            <button
              type='button'
              className='text-primary text-sm underline'
              onClick={() => void reloadFixtures()}
            >
              Tentar novamente
            </button>
          </div>
        ) : !searchFilters.isPoolSelected ? (
          <div className='flex items-center justify-center py-16'>
            <div className='max-w-sm space-y-2 text-center'>
              <p className='text-foreground text-sm font-medium'>
                Selecione um bolão
              </p>
              <p className='text-muted-foreground text-sm'>
                Escolha um bolão no filtro acima para visualizar seus palpites.
              </p>
            </div>
          </div>
        ) : searchFilters.filteredFixtures.length === 0 ? (
          <div className='flex items-center justify-center py-12'>
            <p className='text-muted-foreground text-center text-sm'>
              Nenhum jogo encontrado com os filtros selecionados.
              <br />
              Tente limpar a busca ou usar &quot;Todos&quot; no filtro de
              palpite.
            </p>
          </div>
        ) : (
          <>
            <PredictionMobileList
              rows={pagination.pageItems}
              onPredict={handlePredict}
              onViewAllPredictions={handleViewAllPredictions}
            />
            <PredictionTable
              rows={pagination.pageItems}
              onPredict={handlePredict}
              onViewAllPredictions={handleViewAllPredictions}
            />
            <ListPagination pagination={pagination} itemLabel='jogos' />
          </>
        )}
      </div>

      <SubmitPredictionDialog
        fixture={selectedFixture}
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        onSubmit={handleSubmit}
      />

      <FixturePredictionsDialog
        fixture={viewPredictionsFixture}
        open={predictionsDialogOpen}
        onOpenChange={handlePredictionsDialogOpenChange}
      />
    </>
  );
}
