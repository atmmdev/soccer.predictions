'use client';

import { Bell } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useSyncExternalStore } from 'react';

import { Button } from '@/components/ui/button';
import { useActivity } from '@/features/dashboard/activity/hooks/use-activity';

const NOTIFICATIONS_READ_AT_KEY = 'soccer_predictions_notifications_read_at';
const NOTIFICATIONS_READ_EVENT = 'soccer-predictions-notifications-read';
const NOTIFICATION_FETCH_LIMIT = 100;

function subscribeToReadState(onStoreChange: () => void): () => void {
  window.addEventListener('storage', onStoreChange);
  window.addEventListener(NOTIFICATIONS_READ_EVENT, onStoreChange);

  return () => {
    window.removeEventListener('storage', onStoreChange);
    window.removeEventListener(NOTIFICATIONS_READ_EVENT, onStoreChange);
  };
}

function getReadAtSnapshot(): string {
  return window.localStorage.getItem(NOTIFICATIONS_READ_AT_KEY) ?? '';
}

function getServerReadAtSnapshot(): string {
  return '';
}

export function NotificationButton() {
  const pathname = usePathname();
  const { items, isLoading } = useActivity(NOTIFICATION_FETCH_LIMIT);
  const readAt = useSyncExternalStore(
    subscribeToReadState,
    getReadAtSnapshot,
    getServerReadAtSnapshot,
  );

  const markAsRead = useCallback(() => {
    window.localStorage.setItem(
      NOTIFICATIONS_READ_AT_KEY,
      new Date().toISOString(),
    );
    window.dispatchEvent(new Event(NOTIFICATIONS_READ_EVENT));
  }, []);

  useEffect(() => {
    if (pathname.startsWith('/notifications')) {
      markAsRead();
    }
  }, [markAsRead, pathname]);

  const readAtTime = readAt ? new Date(readAt).getTime() : 0;
  const unreadCount = isLoading
    ? 0
    : items.filter(item => new Date(item.occurredAt).getTime() > readAtTime)
        .length;
  const badgeLabel = unreadCount > 99 ? '99+' : String(unreadCount);

  return (
    <Button
      variant='ghost'
      size='icon'
      className='relative size-11'
      aria-label={
        unreadCount > 0
          ? `Notificações: ${unreadCount} não lidas`
          : 'Notificações'
      }
      asChild
    >
      <Link href='/notifications' onClick={markAsRead}>
        <Bell className='size-5' />
        {unreadCount > 0 ? (
          <span
            aria-live='polite'
            className='bg-primary text-primary-foreground absolute top-1 right-0.5 flex h-4 min-w-4 items-center justify-center rounded-full px-1 text-[10px] leading-none font-bold'
          >
            {badgeLabel}
          </span>
        ) : null}
      </Link>
    </Button>
  );
}
