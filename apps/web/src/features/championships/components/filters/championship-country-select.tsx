import { NativeSelect } from '@/components/ui/native-select';
import { cn } from '@/lib/utils';

import { championshipSelectClassName } from './championship-select-styles';

interface ChampionshipCountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  countries: string[];
}

export function ChampionshipCountrySelect({
  value,
  onChange,
  countries,
}: ChampionshipCountrySelectProps) {
  return (
    <NativeSelect
      value={value}
      onChange={event => onChange(event.target.value)}
      className={cn(championshipSelectClassName, 'sm:min-w-44')}
    >
      <option value='all'>Todos os países</option>
      {countries.map(item => (
        <option key={item} value={item}>
          {item}
        </option>
      ))}
    </NativeSelect>
  );
}
