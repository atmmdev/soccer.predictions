'use client';

import type { ComponentProps, ReactNode } from 'react';

import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip';
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

interface IconActionButtonProps
  extends Omit<ComponentProps<typeof Button>, 'children' | 'size' | 'variant'> {
  label: string;
  tone?: IconActionTone;
  children: ReactNode;
}

export function IconActionButton({
  label,
  tone = 'neutral',
  className,
  children,
  ...props
}: IconActionButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type='button'
          size='icon-sm'
          variant='ghost'
          aria-label={label}
          className={cn(toneClassName[tone], className)}
          {...props}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side='top'>{label}</TooltipContent>
    </Tooltip>
  );
}
