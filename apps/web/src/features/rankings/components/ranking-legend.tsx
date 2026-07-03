import { RANKING_LEGEND_ITEMS } from '../constants/ranking-columns';

export function RankingLegend() {
  return (
    <div className='border-t px-4 py-3'>
      <p className='text-muted-foreground mb-2 text-xs font-medium'>Legenda</p>
      <dl className='grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3 lg:grid-cols-5'>
        {RANKING_LEGEND_ITEMS.map(item => (
          <div key={item.sigla} className='flex items-baseline gap-1.5 text-xs'>
            <dt className='min-w-[2rem] font-bold'>{item.sigla}</dt>
            <dd className='text-muted-foreground'>{item.label}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
