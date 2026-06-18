import Image from 'next/image';
import Link from 'next/link';

export function AppLogo() {
  return (
    <Link href='/' className='text-xl font-bold flex items-center justify-center gap-2'>
      <Image src='/logomarca.png' alt='Soccer Predictions Logo' width={247} height={32} />
    </Link>
  );
}
