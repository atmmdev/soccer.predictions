'use client';

import { useState } from 'react';

import { Card, CardContent } from '@/components/ui/card';

import { usePredictionList } from '../hooks/use-prediction-list';
import type { PredictionFixtureItem } from '../types/prediction-fixture';
import { canEditPrediction } from '../utils/prediction-window';
import { SubmitPredictionDialog } from './dialogs/submit-prediction-dialog';
import { PredictionFilters } from './filters/prediction-filters';
import { PredictionTable } from './table/prediction-table';

export function PredictionList() {
  const { submitPrediction, searchFilters } = usePredictionList();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedFixture, setSelectedFixture] =
    useState<PredictionFixtureItem | null>(null);

  function handlePredict(fixture: PredictionFixtureItem) {
    if (!canEditPrediction(fixture)) {
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
            resultCount={searchFilters.filteredFixtures.length}
            hasActiveFilters={searchFilters.hasActiveFilters}
            onClearFilters={searchFilters.clearFilters}
          />
          <PredictionTable
            rows={searchFilters.filteredFixtures}
            onPredict={handlePredict}
          />
        </CardContent>
      </Card>

      <SubmitPredictionDialog
        fixture={selectedFixture}
        open={dialogOpen}
        onOpenChange={handleDialogOpenChange}
        onSubmit={submitPrediction}
      />
    </>
  );
}
