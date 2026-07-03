'use client';

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import { usePredictionList } from '../hooks/use-prediction-list';
import type { SubmitPredictionFormData } from '../schemas/submit-prediction.schema';
import type { PredictionFixtureItem } from '../types/prediction-fixture';
import { canEditPrediction } from '../utils/prediction-window';
import { SubmitPredictionDialog } from './dialogs/submit-prediction-dialog';
import { PredictionFilters } from './filters/prediction-filters';
import { PredictionTable } from './table/prediction-table';

export function PredictionList() {
  const { isLoading, error, reloadFixtures, submitPrediction, searchFilters } =
    usePredictionList();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFixture, setSelectedFixture] =
    useState<PredictionFixtureItem | null>(null);

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
      <Card className='overflow-visible shadow-sm'>
        <CardContent className='space-y-4 pt-4'>
          <PredictionFilters
            search={searchFilters.search}
            onSearchChange={searchFilters.setSearch}
            status={searchFilters.status}
            onStatusChange={searchFilters.setStatus}
            poolName={searchFilters.poolName}
            onPoolNameChange={searchFilters.setPoolName}
            poolOptions={searchFilters.poolOptions}
            showDateFilter={searchFilters.enableDateFilter}
            selectedDate={searchFilters.selectedDate}
            onSelectedDateChange={searchFilters.setSelectedDate}
            resultCount={searchFilters.filteredFixtures.length}
            hasActiveFilters={searchFilters.hasActiveFilters}
            onClearFilters={searchFilters.clearFilters}
          />
          {isLoading ? (
            <div className='flex items-center justify-center py-12'>
              <p className='text-muted-foreground text-sm'>
                Carregando palpites...
              </p>
            </div>
          ) : error ? (
            <div className='flex flex-col items-center justify-center gap-3 py-12'>
              <p className='text-destructive text-sm text-center'>{error}</p>
              <button
                type='button'
                className='text-primary text-sm underline'
                onClick={() => void reloadFixtures()}
              >
                Tentar novamente
              </button>
            </div>
          ) : (
            <PredictionTable
              rows={searchFilters.filteredFixtures}
              onPredict={handlePredict}
            />
          )}
        </CardContent>
      </Card>

      <SubmitPredictionDialog
        fixture={selectedFixture}
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        onSubmit={handleSubmit}
      />
    </>
  );
}
