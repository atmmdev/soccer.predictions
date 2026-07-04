'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

import { HELP_SECTIONS } from '../constants/help-content';

function scrollToSection(id: string) {
  const element = document.getElementById(id);

  if (!element) {
    return;
  }

  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  window.history.replaceState(null, '', `#${id}`);
}

export function HelpSectionNav() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Navegação rápida</CardTitle>
        <CardDescription>Ir direto para o tópico desejado.</CardDescription>
      </CardHeader>
      <CardContent>
        <nav className='flex flex-wrap gap-2'>
          {HELP_SECTIONS.map(section => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={event => {
                event.preventDefault();
                scrollToSection(section.id);
              }}
              className='bg-muted/50 hover:bg-accent rounded-md px-3 py-1.5 text-xs font-medium transition-colors ring-1 ring-foreground/10'
            >
              {section.label}
            </a>
          ))}
        </nav>
      </CardContent>
    </Card>
  );
}
