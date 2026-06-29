import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { FormControl } from '@/components/ui/form';

import { countries } from '../../mocks/countries';

interface ChampionshipCountrySelectProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export function ChampionshipCountrySelect({
  value,
  onChange,
  disabled,
}: ChampionshipCountrySelectProps) {
  return (
    <Select
      value={value || undefined}
      onValueChange={onChange}
      disabled={disabled}
    >
      <FormControl>
        <SelectTrigger size='lg' className='w-full'>
          <SelectValue placeholder='Selecione o país' />
        </SelectTrigger>
      </FormControl>
      <SelectContent className='z-[200]'>
        {countries.map(country => (
          <SelectItem key={country.name} value={country.name}>
            {country.flag} {country.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
