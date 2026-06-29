'use client';

import { RotateCcw } from 'lucide-react';

import { cn } from '@/lib/utils';

import { Button } from './button';

interface ClearFiltersButtonProps {
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

export function ClearFiltersButton({
  onClick,
  disabled = false,
  className,
}: ClearFiltersButtonProps) {
  return (
    <Button
      type='button'
      variant='outline'
      onClick={onClick}
      disabled={disabled}
      className={cn('h-11 shrink-0 px-4', className)}
    >
      <RotateCcw className='size-4' />
      Limpar filtros
    </Button>
  );
}
