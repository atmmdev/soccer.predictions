import { NativeSelect } from '@/components/ui/native-select';
import { cn } from '@/lib/utils';

import { championshipSelectClassName } from './championship-select-styles';

interface ChampionshipSeasonSelectProps {
  value: string;
  onChange: (value: string) => void;
  seasons: number[];
}

export function ChampionshipSeasonSelect({
  value,
  onChange,
  seasons,
}: ChampionshipSeasonSelectProps) {
  return (
    <NativeSelect
      value={value}
      onChange={event => onChange(event.target.value)}
      className={cn(championshipSelectClassName, 'sm:min-w-48')}
    >
      <option value='all'>Todas as temporadas</option>
      {seasons.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </NativeSelect>
  );
}
