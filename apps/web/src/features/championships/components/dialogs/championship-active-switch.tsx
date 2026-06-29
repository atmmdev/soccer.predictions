import { FormControl, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

interface ChampionshipActiveSwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export function ChampionshipActiveSwitch({
  checked,
  onCheckedChange,
}: ChampionshipActiveSwitchProps) {
  return (
    <FormItem className='flex items-center justify-between rounded-lg border p-3'>
      <FormLabel className='mt-0'>Ativar campeonato após importar</FormLabel>
      <FormControl>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
      </FormControl>
    </FormItem>
  );
}
