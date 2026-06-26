import { Lightbulb } from 'lucide-react';

export function AppFooter() {
  return (
    <footer>
      <small className='text-xs italic text-muted-foreground'>
        <a
          href='https://www.atmm.dev'
          target='_blank'
          rel='noopener noreferrer'
        >
          by <span className='text-primary'>www.atmm.dev</span>
        </a>{' '}
        - © 2026 Soccer Predictions. Todos os direitos reservados.
      </small>
    </footer>
  );
}
