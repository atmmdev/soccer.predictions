import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';

import type { League } from '../../types/league';

interface ChampionshipLeagueSelectProps {
  value?: string;
  onChange: (value: string) => void;
  leagues: League[];
  disabled?: boolean;
  resetKey?: string;
}

export function ChampionshipLeagueSelect({
  value,
  onChange,
  leagues,
  disabled,
  resetKey,
}: ChampionshipLeagueSelectProps) {
  return (
    <Select
      key={resetKey}
      value={value || undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger size='lg' className='w-full'>
          <SelectValue placeholder='Selecione o campeonato' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='z-[200]'>
        {leagues.map(league => (
          <SelectItem key={league.id} value={league.id.toString()}>
            {league.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
