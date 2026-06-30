import { ReactNode } from 'react';

interface HelpSectionProps {
  id: string;
  title: string;
  description?: string;
  children: ReactNode;
}

export function HelpSection({
  id,
  title,
  description,
  children,
}: HelpSectionProps) {
  return (
    <section id={id} className='scroll-mt-24 space-y-4'>
      <div className='space-y-1'>
        <h2 className='text-lg font-semibold tracking-tight'>{title}</h2>
        {description ? (
          <p className='text-muted-foreground text-sm leading-relaxed'>
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </section>
  );
}
