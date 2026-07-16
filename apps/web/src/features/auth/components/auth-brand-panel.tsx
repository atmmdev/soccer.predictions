import Image from 'next/image';

import { BrandLogo } from '@/components/brand/brand-logo';
import { brand } from '@/config/brand';

export function AuthBrandPanel() {
  return (
    <div className='relative hidden min-h-full overflow-hidden lg:block'>
      <Image
        src={brand.authBackground.src}
        alt={brand.authBackground.alt}
        fill
        priority
        sizes='(min-width: 1024px) 50vw, 0px'
        className='object-cover'
      />

      <div
        aria-hidden
        className='absolute inset-0 bg-gradient-to-br from-black/50 via-black/25 to-black/40'
      />

      <div className='text-sidebar-foreground relative z-10 flex min-h-full flex-col justify-between p-10'>
        <div>
          <BrandLogo priority />

          <div className='space-y-4 mt-10'>
            <h2 className='text-2xl font-semibold tracking-tight text-white drop-shadow-sm'>
              Palpite. Compete. Vença.
            </h2>
            <p className='max-w-sm text-sm leading-relaxed text-white/85'>
              Crie bolões, acompanhe jogos reais e dispute a classificação com regras
              de pontuação personalizadas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
