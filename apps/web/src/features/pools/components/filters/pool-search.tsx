import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

interface PoolSearchProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

export function PoolSearch({ value, onChange, className }: PoolSearchProps) {
  return (
    <Input
      placeholder='Pesquisar bolão ...'
      value={value}
      onChange={event => onChange(event.target.value)}
      className={cn('h-11 px-3 py-0', className)}
    />
  );
}
