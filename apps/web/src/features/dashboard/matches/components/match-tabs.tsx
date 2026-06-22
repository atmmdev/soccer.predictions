'use client';

import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';

export function MatchTabs() {
  return (
    <Tabs>
      <TabsList>
        <TabsTrigger value='yesterday'>Ontem</TabsTrigger>
        <TabsTrigger value='today'>Hoje</TabsTrigger>
        <TabsTrigger value='tomorrow'>Amanhã</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
