import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';

import { seasons } from '../../mocks/seasons';

interface ChampionshipSeasonSelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ChampionshipSeasonSelect({
  value,
  onChange,
  disabled,
}: ChampionshipSeasonSelectProps) {
  return (
    <Select
      value={value || undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger size='lg' className='w-full'>
          <SelectValue placeholder='Selecione a temporada' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='z-[200]'>
        {seasons.map(season => (
          <SelectItem key={season} value={season.toString()}>
            {season}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
