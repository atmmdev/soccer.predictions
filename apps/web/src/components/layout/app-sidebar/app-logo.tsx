import Image from 'next/image';
import Link from 'next/link';
import { PiSoccerBallDuotone } from 'react-icons/pi';

export function AppLogo() {
  return (
    <Link
      href='/dashboard'
      className='flex w-full items-center justify-center px-2 py-1 group-data-[collapsible=icon]:px-0'
    >
      <Image
        src='/logomarca.png'
        alt='Soccer Predictions'
        width={140}
        height={40}
        className='h-10 w-auto group-data-[collapsible=icon]:hidden'
        style={{ width: 'auto', height: '2.5rem' }}
        priority
      />
      <PiSoccerBallDuotone
        className='text-sidebar-primary hidden size-8 shrink-0 group-data-[collapsible=icon]:block'
        aria-label='Soccer Predictions'
      />
    </Link>
  );
}
