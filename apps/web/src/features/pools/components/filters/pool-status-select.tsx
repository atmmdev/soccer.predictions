import { NativeSelect } from '@/components/ui/native-select';
import { cn } from '@/lib/utils';

import { poolSelectClassName } from './pool-select-styles';

interface PoolStatusSelectProps {
  value: string;
  onChange: (value: string) => void;
}

export function PoolStatusSelect({ value, onChange }: PoolStatusSelectProps) {
  return (
    <NativeSelect
      value={value}
      onChange={event => onChange(event.target.value)}
      className={cn(poolSelectClassName, 'sm:min-w-36')}
    >
      <option value='all'>Todos</option>
      <option value='active'>Ativo</option>
      <option value='inactive'>Inativo</option>
    </NativeSelect>
  );
}
