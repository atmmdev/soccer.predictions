import Link from 'next/link';

import { BrandLogo } from '@/components/brand/brand-logo';
import { Button } from '@/components/ui/button';

export default function Home() {
  return (
    <div className='bg-muted flex min-h-dvh w-full items-center justify-center'>
      <div className='flex w-full max-w-md flex-col items-center gap-8 text-center'>
        <BrandLogo priority />

        <div className='space-y-2'>
          <h1 className='text-2xl font-bold tracking-widest uppercase'>
            Soccer Predictions
          </h1>
          <p className='text-muted-foreground text-xs'>
            Bolões de futebol — palpite e dispute o ranking
          </p>
        </div>

        <div className='flex w-full flex-col gap-3 sm:flex-row sm:justify-center'>
          <Button
            asChild
            size='lg'
            className='h-11 min-w-36 hover:shadow-lg tracking-widest uppercase'
          >
            <Link href='/login'>Entrar</Link>
          </Button>
          <Button
            asChild
            variant='outline'
            size='lg'
            className='h-11 min-w-36 hover:shadow-lg tracking-widest uppercase'
          >
            <Link href='/register'>Cadastrar</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
