'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

import { FAQ_ITEMS } from '../constants/help-content';

export function HelpFaq() {
  return (
    <Accordion type='single' collapsible className='w-full'>
      {FAQ_ITEMS.map(item => (
        <AccordionItem key={item.id} value={item.id}>
          <AccordionTrigger className='text-left hover:no-underline'>
            {item.question}
          </AccordionTrigger>
          <AccordionContent className='text-muted-foreground'>
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
