import { ReactNode } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

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
    <section id={id} className='scroll-mt-24'>
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
          {description ? (
            <CardDescription className='leading-relaxed'>
              {description}
            </CardDescription>
          ) : null}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </section>
  );
}
