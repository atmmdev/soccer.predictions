import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

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
      <SelectTrigger>
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
