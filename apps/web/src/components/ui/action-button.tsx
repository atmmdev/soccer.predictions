import type { LucideIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './button';

interface ActionButtonProps extends React.ComponentProps<typeof Button> {
  icon: LucideIcon;
  variant?: 'soft' | 'soft-muted';
}

export function ActionButton({
  icon: Icon,
  children,
  className,
  variant = 'soft',
  size = 'lg',
  ...props
}: ActionButtonProps) {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn('h-11 shrink-0 px-4 font-medium', className)}
      {...props}
    >
      <Icon className='size-4' />
      {children}
    </Button>
  );
}
