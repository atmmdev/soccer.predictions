import Image from 'next/image';

import { brand } from '@/config/brand';
import { cn } from '@/lib/utils';

interface BrandLogoProps {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
}

export function BrandLogo({
  className,
  imageClassName,
  priority = false,
}: BrandLogoProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Image
        src={brand.logo.src}
        alt={brand.logo.alt}
        width={brand.logo.width}
        height={brand.logo.height}
        className={cn('h-11 w-auto', imageClassName)}
        style={{ width: 'auto', height: '2.75rem' }}
        priority={priority}
      />
    </div>
  );
}
