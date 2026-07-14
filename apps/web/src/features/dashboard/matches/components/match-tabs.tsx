'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  lineTabTriggerClassName,
  lineTabsListClassName,
} from '@/lib/line-tabs';

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
      <TabsList variant='line' className={lineTabsListClassName}>
        <TabsTrigger value='all' className={lineTabTriggerClassName}>
          Todos ({counts.all})
        </TabsTrigger>
        <TabsTrigger value='live' className={lineTabTriggerClassName}>
          Ao vivo ({counts.live})
        </TabsTrigger>
        <TabsTrigger value='today' className={lineTabTriggerClassName}>
          Hoje ({counts.today})
        </TabsTrigger>
        <TabsTrigger value='tomorrow' className={lineTabTriggerClassName}>
          Amanhã ({counts.tomorrow})
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
