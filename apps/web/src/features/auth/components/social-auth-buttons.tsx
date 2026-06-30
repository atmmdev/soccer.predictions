'use client';

import { FaGoogle, FaInstagram } from 'react-icons/fa6';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3001/api';

const providers = [
  {
    id: 'google',
    label: 'Google',
    icon: FaGoogle,
    href: `${API_URL}/auth/google`,
  },
  {
    id: 'instagram',
    label: 'Instagram',
    icon: FaInstagram,
    href: `${API_URL}/auth/instagram`,
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
            <Button
              key={provider.id}
              type='button'
              variant='outline'
              size='lg'
              className='h-11'
              aria-label={`Continuar com ${provider.label}`}
              onClick={() => {
                window.location.href = provider.href;
              }}
            >
              <Icon className='size-4' />
              <span>{provider.label}</span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
