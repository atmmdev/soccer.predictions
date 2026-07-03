'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

const tabTriggerClass = cn(
  'flex-none px-0 pt-0 text-xs ',
  'text-foreground/60 hover:text-foreground',
  'data-active:text-primary! data-active:bg-transparent',
  'after:bottom-0 after:h-0.5 after:rounded-none after:bg-primary',
);

interface MatchTabsProps {
  activeTab: 'all' | 'live' | 'today' | 'tomorrow';
  onTabChange: (tab: 'all' | 'live' | 'today' | 'tomorrow') => void;
  counts: {
    all: number;
    live: number;
    today: number;
    tomorrow: number;
  };
}

export function MatchTabs({ activeTab, onTabChange, counts }: MatchTabsProps) {
  return (
    <Tabs
      value={activeTab}
      onValueChange={value =>
        onTabChange(value as MatchTabsProps['activeTab'])
      }
    >
      <TabsList variant='line' className='h-auto w-full justify-start gap-4'>
        <TabsTrigger value='all' className={tabTriggerClass}>
          Todos ({counts.all})
        </TabsTrigger>
        <TabsTrigger value='live' className={tabTriggerClass}>
          Ao vivo ({counts.live})
        </TabsTrigger>
        <TabsTrigger value='today' className={tabTriggerClass}>
          Hoje ({counts.today})
        </TabsTrigger>
        <TabsTrigger value='tomorrow' className={tabTriggerClass}>
          Amanhã ({counts.tomorrow})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
