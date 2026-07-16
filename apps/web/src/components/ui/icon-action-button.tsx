'use client';

import type { LucideIcon } from 'lucide-react';
import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type IconActionTone =
  | 'link'
  | 'copy'
  | 'edit'
  | 'success'
  | 'mute'
  | 'danger'
  | 'sync'
  | 'neutral';

const toneClassName: Record<IconActionTone, string> = {
  link: 'text-blue-600 hover:bg-blue-50 hover:text-blue-700',
  copy: 'text-violet-600 hover:bg-violet-50 hover:text-violet-700',
  edit: 'text-amber-500 hover:bg-amber-50 hover:text-amber-600',
  success: 'text-primary hover:bg-primary/10 hover:text-primary',
  mute: 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900',
  danger: 'text-destructive hover:bg-destructive/10 hover:text-destructive',
  sync: 'text-sky-600 hover:bg-sky-50 hover:text-sky-700',
  neutral: 'text-muted-foreground hover:bg-muted hover:text-foreground',
};

interface IconActionButtonContentProps {
  icon: LucideIcon;
  label: string;
  iconClassName?: string;
}

export function IconActionButtonContent({
  icon: Icon,
  label,
  iconClassName,
}: IconActionButtonContentProps) {
  return (
    <div className='flex w-full flex-col items-center justify-center gap-1'>
      <span className='flex w-full justify-center'>
        <Icon className={cn('size-4 shrink-0', iconClassName)} />
      </span>
      <span className='w-full text-center text-[7px] leading-none font-medium tracking-widest uppercase'>
        {label}
      </span>
    </div>
  );
}

interface IconActionButtonProps
  extends Omit<ComponentProps<typeof Button>, 'children' | 'size' | 'variant'> {
  label: string;
  icon?: LucideIcon;
  tone?: IconActionTone;
  stacked?: boolean;
  loading?: boolean;
  children?: ReactNode;
}

export function IconActionButton({
  label,
  icon,
  tone = 'neutral',
  stacked = true,
  loading = false,
  className,
  children,
  disabled,
  ...props
}: IconActionButtonProps) {
  const content =
    children ??
    (icon ? (
      <IconActionButtonContent
        icon={icon}
        label={label}
        iconClassName={loading ? 'animate-spin' : undefined}
      />
    ) : null);

  return (
    <Button
      type='button'
      size={stacked ? 'sm' : 'icon-sm'}
      variant='ghost'
      aria-label={label}
      disabled={loading || disabled}
      className={cn(
        toneClassName[tone],
        stacked &&
          'flex h-auto w-auto min-w-9 flex-col items-center justify-center gap-0 px-1.5 py-1',
        className,
      )}
      {...props}
    >
      {content}
    </Button>
  );
}
