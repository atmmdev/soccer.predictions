import { Lightbulb } from 'lucide-react';

export function AppFooter() {
  return (
    <footer className='bg-primary/10 border-primary/20 mt-auto border-t px-4 py-3 md:px-6'>
      <p className='text-foreground flex items-start gap-2 text-sm leading-relaxed'>
        <Lightbulb className='text-primary mt-0.5 size-4 shrink-0' aria-hidden />
        <span>
          <strong className='font-medium'>Dica:</strong> Mantenha os bolões e
          campeonatos sempre atualizados para uma melhor experiência dos
          participantes.
        </span>
      </p>
    </footer>
  );
}
