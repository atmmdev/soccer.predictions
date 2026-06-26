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
      <span className='bg-primary absolute top-2 right-2 size-2 rounded-full' />
    </Button>
  );
}
