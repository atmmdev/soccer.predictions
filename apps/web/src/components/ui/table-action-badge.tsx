import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import {
  StatusBadge,
  statusBadgeVariants,
  type StatusTone,
} from './status-badge';

interface TableActionBadgeProps
  extends React.ComponentProps<'button'> {
  tone: StatusTone;
  icon?: LucideIcon;
}

export function TableActionBadge({
  tone,
  icon: Icon,
  className,
  children,
  disabled,
  ...props
}: TableActionBadgeProps) {
  return (
    <button
      type='button'
      disabled={disabled}
      className={cn(
        statusBadgeVariants({ tone }),
        'min-w-[88px] gap-1.5 px-3 py-1.5 transition-opacity',
        disabled
          ? 'cursor-not-allowed opacity-100'
          : 'cursor-pointer hover:opacity-90',
        className,
      )}
      {...props}
    >
      {Icon ? <Icon className='size-3.5 shrink-0' /> : null}
      {children}
    </button>
  );
}
