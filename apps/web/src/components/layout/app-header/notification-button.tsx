import { Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotificationButton() {
  return (
    <Button variant='ghost' size='icon'>
      <Bell />
    </Button>
  );
}
