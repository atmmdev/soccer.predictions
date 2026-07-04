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
      className={cn('xl:min-w-[200px] xl:flex-1', className)}
    />
  );
}
