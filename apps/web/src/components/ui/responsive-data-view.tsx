'use client';

import { useEffect, useState, type ReactNode } from 'react';

import { cn } from '@/lib/utils';

export type ResponsiveBreakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

/** Matches Tailwind default screens (rem → px at 16px root). */
const BREAKPOINT_MIN_WIDTH_PX: Record<ResponsiveBreakpoint, number> = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
};

interface ResponsiveDataViewProps {
  desktop: ReactNode;
  mobile: ReactNode;
  /** Viewport width at which the desktop view appears. Default: `lg`. */
  breakpoint?: ResponsiveBreakpoint;
  className?: string;
}

function useIsMinWidth(minWidthPx: number) {
  const [matches, setMatches] = useState<boolean | null>(() => {
    if (typeof window === 'undefined') {
      return null;
    }

    return window.matchMedia(`(min-width: ${minWidthPx}px)`).matches;
  });

  useEffect(() => {
    const mediaQuery = window.matchMedia(`(min-width: ${minWidthPx}px)`);
    const update = () => setMatches(mediaQuery.matches);

    update();
    mediaQuery.addEventListener('change', update);
    return () => mediaQuery.removeEventListener('change', update);
  }, [minWidthPx]);

  return matches;
}

/**
 * Renders either the desktop or mobile view — never both.
 * Uses matchMedia so only one tree is in the DOM.
 */
export function ResponsiveDataView({
  desktop,
  mobile,
  breakpoint = 'lg',
  className,
}: ResponsiveDataViewProps) {
  const isDesktop = useIsMinWidth(BREAKPOINT_MIN_WIDTH_PX[breakpoint]);

  // Before mount, prefer desktop to avoid a mobile flash on large screens.
  const content = isDesktop === false ? mobile : desktop;

  return <div className={cn('min-w-0', className)}>{content}</div>;
}
