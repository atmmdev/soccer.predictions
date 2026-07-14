import { NativeSelect } from '@/components/ui/native-select';
import { filterSelectSmClassName } from '@/lib/filter-styles';
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
      className={cn(poolSelectClassName, filterSelectSmClassName)  + ' bg-white'}
    >
      <option value='all'>Todos</option>
      <option value='active'>Ativo</option>
      <option value='inactive'>Inativo</option>
      <option value='closed'>Encerrado</option>
    </NativeSelect>
  );
}
