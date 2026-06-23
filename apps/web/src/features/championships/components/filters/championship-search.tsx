import { Input } from '@/components/ui/input';

interface ChampionshipSearchProps {
  value: string;
  onChange: (value: string) => void;
}

export function ChampionshipSearch({
  value,
  onChange,
}: ChampionshipSearchProps) {
  return (
    <Input
      placeholder='Pesquisar Campeonato ...'
      value={value}
      onChange={e => onChange(e.target.value)}
    />
  );
}
