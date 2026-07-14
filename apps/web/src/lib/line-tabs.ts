import { cn } from '@/lib/utils';

/** Line tabs — mesma aparência do dashboard (underline primary). */
export const lineTabTriggerClassName = cn(
  'flex-none px-0 pt-0 text-xs',
  'text-foreground/60 hover:text-foreground',
  'data-active:text-primary! data-active:bg-transparent',
  'after:bottom-0 after:h-0.5 after:rounded-none after:bg-primary',
);

export const lineTabsListClassName = 'h-auto w-full justify-start gap-4';
