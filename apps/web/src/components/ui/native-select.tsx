import * as React from 'react';
import { ChevronDown } from 'lucide-react';

import { cn } from '@/lib/utils';

function NativeSelect({
  className,
  children,
  ...props
}: React.ComponentProps<'select'>) {
  return (
    <div className={cn('relative w-full', className)}>
      <select
        data-slot='native-select'
        className='h-11 w-full min-w-0 appearance-none rounded-lg border border-input bg-transparent py-0 pr-10 pl-3 text-sm transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:bg-input/50 disabled:opacity-50 dark:bg-input/30'
        {...props}
      >
        {children}
      </select>
      <ChevronDown
        aria-hidden
        className='pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-muted-foreground'
      />
    </div>
  );
}

export { NativeSelect };
