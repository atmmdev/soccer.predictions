import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface ChampionshipSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function ChampionshipSearch({
  value,
  onChange,
  className,
}: ChampionshipSearchProps) {
  return (
    <Input
      placeholder='Pesquisar Campeonato ...'
      value={value}
      onChange={e => onChange(e.target.value)}
      className={cn('h-11 px-3 py-0', className)}
    />
  );
}
