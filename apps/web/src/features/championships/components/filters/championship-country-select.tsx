import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { championshipFilterSelectTriggerClassName } from './championship-select-trigger';

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
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        size='lg'
        className={cn(championshipFilterSelectTriggerClassName, 'sm:min-w-44')}
      >
        <SelectValue placeholder='Filtrar por país' />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value='all'>Todos os países</SelectItem>
        {countries.map(item => (
          <SelectItem key={item} value={item}>
            {item}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
