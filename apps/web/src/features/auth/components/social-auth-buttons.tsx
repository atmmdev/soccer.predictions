'use client';

import { FaGoogle, FaInstagram } from 'react-icons/fa6';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const providers = [
  {
    id: 'google',
    label: 'Google',
    icon: FaGoogle,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: FaInstagram,
  },
] as const;

export function SocialAuthButtons() {
  return (
    <div className='space-y-4'>
      <div className='relative'>
        <Separator />
        <span className='bg-card text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 text-xs'>
          Ou continue com
        </span>
      </div>

      <div className='grid grid-cols-2 gap-3'>
        {providers.map(provider => {
          const Icon = provider.icon;

          return (
            <div key={provider.id} className='relative'>
              <Button
                type='button'
                variant='outline'
                size='lg'
                className='h-11 w-full'
                disabled
                aria-label={`${provider.label} — em breve`}
              >
                <Icon className='size-4' />
                {provider.label}
              </Button>
              <Badge className='bg-amber-200 text-amber-800 pointer-events-none absolute -top-1 -right-2 z-10 h-4 px-1.5 text-[9px] font-normal tracking-wide'>
                Em breve
              </Badge>
            </div>
          );
        })}
      </div>
    </div>
  );
}
