'use client';

import Image from 'next/image';
import Link from 'next/link';
import { PiSoccerBallDuotone } from 'react-icons/pi';

import { useSidebar } from '@/components/ui/sidebar';
import { brand } from '@/config/brand';

export function AppLogo() {
  const { isMobile, setOpenMobile } = useSidebar();

  return (
    <Link
      href='/dashboard'
      className='flex w-full items-center justify-center px-2 py-1 group-data-[collapsible=icon]:px-0'
      onClick={() => {
        if (isMobile) {
          setOpenMobile(false);
        }
      }}
    >
      <Image
        src={brand.logo.src}
        alt={brand.logo.alt}
        width={brand.logo.width}
        height={brand.logo.height}
        className='h-10 w-auto group-data-[collapsible=icon]:hidden'
        style={{ width: 'auto', height: '2.5rem' }}
        priority
      />
      <PiSoccerBallDuotone
        className='text-sidebar-primary hidden size-8 shrink-0 group-data-[collapsible=icon]:block'
        aria-label={brand.logo.alt}
      />
    </Link>
  );
}
