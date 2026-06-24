import { CreateChampionshipDialog } from './dialogs/create-championship-dialog';

export function ChampionshipHeader() {
  return (
    <div className='flex items-center justify-between gap-4 border-b pb-2'>
      <div>
        <h1 className='title'>Campeonatos</h1>
        <p className='text-sm tracking-tight'>
          Gerencie os campeonatos disponíveis
        </p>
      </div>
      <CreateChampionshipDialog />
    </div>
  );
}
