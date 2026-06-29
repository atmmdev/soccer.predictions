import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface PoolActiveSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function PoolActiveSwitch({
  checked,
  onCheckedChange,
}: PoolActiveSwitchProps) {
  return (
    <FormItem className='flex items-center justify-between rounded-lg border p-3'>
      <FormLabel className='mt-0'>Ativar bolão após criar</FormLabel>
      <FormControl>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </FormControl>
    </FormItem>
  );
}
