'use client';

import { Eye, EyeOff } from 'lucide-react';
import * as React from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

function PasswordInput({
  className,
  ...props
}: React.ComponentProps<typeof Input>) {
  const [visible, setVisible] = React.useState(false);

  return (
    <div className='relative'>
      <Input
        type={visible ? 'text' : 'password'}
        className={cn('pr-10', className)}
        {...props}
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className='text-muted-foreground absolute top-1/2 right-1 size-8 -translate-y-1/2'
        onClick={() => setVisible(current => !current)}
        aria-label={visible ? 'Ocultar senha' : 'Mostrar senha'}
        aria-pressed={visible}
      >
        {visible ? (
          <EyeOff className='size-4' aria-hidden />
        ) : (
          <Eye className='size-4' aria-hidden />
        )}
      </Button>
    </div>
  );
}

export { PasswordInput };
