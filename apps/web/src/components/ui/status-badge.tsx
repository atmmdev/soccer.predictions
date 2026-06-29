import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

export const statusBadgeVariants = cva(
  'inline-flex min-w-12 items-center justify-center rounded-full px-2.5 py-0.5 text-xs font-semibold',
  {
    variants: {
      tone: {
        success: 'bg-primary/10 text-primary',
        warning: 'bg-amber-100 text-amber-700',
        danger: 'bg-destructive/10 text-destructive',
        neutral: 'bg-muted text-muted-foreground',
      },
    },
    defaultVariants: {
      tone: 'neutral',
    },
  },
);

export type StatusTone = NonNullable<
  VariantProps<typeof statusBadgeVariants>['tone']
>;

interface StatusBadgeProps extends ComponentProps<'span'> {
  tone?: StatusTone;
}

export function StatusBadge({
  tone = 'neutral',
  className,
  children,
  ...props
}: StatusBadgeProps) {
  return (
    <span
      className={cn(statusBadgeVariants({ tone }), className)}
      {...props}
    >
      {children}
    </span>
  );
}
