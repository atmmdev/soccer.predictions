import { NativeSelect } from '@/components/ui/native-select';
import { filterSelectSmClassName } from '@/lib/filter-styles';
import { cn } from '@/lib/utils';

import { championshipSelectClassName } from './championship-select-styles';

interface ChampionshipStatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ChampionshipStatusSelect({
  value,
  onChange,
}: ChampionshipStatusSelectProps) {
  return (
    <NativeSelect
      value={value}
      onChange={event => onChange(event.target.value)}
      className={cn(championshipSelectClassName, filterSelectSmClassName)}
    >
      <option value='all'>Todos</option>
      <option value='active'>Ativo</option>
      <option value='inactive'>Inativo</option>
    </NativeSelect>
  );
}
