import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

import { championshipFilterSelectTriggerClassName } from './championship-select-trigger';

interface ChampionshipStatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function ChampionshipStatusSelect({
  value,
  onChange,
}: ChampionshipStatusSelectProps) {
  return (
    <Select value={value} onValueChange={onChange}>
      <SelectTrigger
        size='lg'
        className={cn(championshipFilterSelectTriggerClassName, 'sm:min-w-36')}
      >
        <SelectValue placeholder='Selecione o status' />
      </SelectTrigger>

      <SelectContent>
        <SelectItem value='all'>Todos</SelectItem>
        <SelectItem value='active'>Ativo</SelectItem>
        <SelectItem value='inactive'>Inativo</SelectItem>
      </SelectContent>
    </Select>
  );
}
