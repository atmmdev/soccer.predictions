import type { ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ResponsiveBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const desktopVisibility: Record<ResponsiveBreakpoint, string> = {
  sm: 'hidden sm:block',
  md: 'hidden md:block',
  lg: 'hidden lg:block',
  xl: 'hidden xl:block',
  '2xl': 'hidden 2xl:block',
};

const mobileVisibility: Record<ResponsiveBreakpoint, string> = {
  sm: 'sm:hidden',
  md: 'md:hidden',
  lg: 'lg:hidden',
  xl: 'xl:hidden',
  '2xl': '2xl:hidden',
};

interface ResponsiveDataViewProps {
  desktop: ReactNode;
  mobile: ReactNode;
  /** Viewport width at which the desktop view appears. Default: `lg`. */
  breakpoint?: ResponsiveBreakpoint;
  className?: string;
  desktopClassName?: string;
  mobileClassName?: string;
}

export function ResponsiveDataView({
  desktop,
  mobile,
  breakpoint = 'lg',
  className,
  desktopClassName,
  mobileClassName,
}: ResponsiveDataViewProps) {
  return (
    <div className={cn('min-w-0', className)}>
      <div
        className={cn(
          desktopVisibility[breakpoint],
          'min-w-0',
          desktopClassName,
        )}
      >
        {desktop}
      </div>
      <div className={cn(mobileVisibility[breakpoint], mobileClassName)}>
        {mobile}
      </div>
    </div>
  );
}
