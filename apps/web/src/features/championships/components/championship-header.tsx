'use client';

import { CreateChampionshipDialog } from './dialogs/create-championship-dialog';

export function ChampionshipHeader() {
  return (
    <div className='flex items-center justify-end'>
      <CreateChampionshipDialog />
    </div>
  );
}
