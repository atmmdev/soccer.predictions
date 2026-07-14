import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface PageLoadingProps {
  label?: string;
  className?: string;
  compact?: boolean;
}

export function PageLoading({
  label = 'Carregando...',
  className,
  compact = false,
}: PageLoadingProps) {
  return (
    <div
      role='status'
      aria-live='polite'
      aria-busy='true'
      className={cn(
        'flex flex-col items-center justify-center gap-3 text-center',
        compact ? 'py-12' : 'min-h-[40vh] py-16',
        className,
      )}
    >
      <Loader2Icon
        className='text-primary size-8 animate-spin'
        aria-hidden='true'
      />
      <p className='text-muted-foreground text-sm'>{label}</p>
    </div>
  );
}
