'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const tabTriggerClass = cn(
  'flex-none px-0 pt-0 text-xs ',
  'text-foreground/60 hover:text-foreground',
  'data-active:text-primary! data-active:bg-transparent',
  'after:bottom-0 after:h-0.5 after:rounded-none after:bg-primary',
);

export function MatchTabs() {
  return (
    <Tabs defaultValue='all'>
      <TabsList
        variant='line'
        className='h-auto w-full justify-start gap-4'
      >
        <TabsTrigger value='all' className={tabTriggerClass}>
          Todos
        </TabsTrigger>
        <TabsTrigger value='live' className={tabTriggerClass}>
          Ao vivo (2)
        </TabsTrigger>
        <TabsTrigger value='today' className={tabTriggerClass}>
          Hoje (8)
        </TabsTrigger>
        <TabsTrigger value='tomorrow' className={tabTriggerClass}>
          Amanhã (4)
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
