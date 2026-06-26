import { Bell } from 'lucide-react';

import { Button } from '@/components/ui/button';

export function NotificationButton() {
  return (
    <Button
      variant='ghost'
      size='icon'
      className='relative size-11'
      aria-label='Notificações'
    >
      <Bell className='size-5' />
      <span className='bg-primary text-primary-foreground absolute top-1.5 right-1.5 flex size-4 items-center justify-center rounded-full text-[10px] font-bold'>
        3
      </span>
    </Button>
  );
}
