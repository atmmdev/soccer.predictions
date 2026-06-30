export function AuthLegalFooter() {
  return (
    <p className='text-muted-foreground mt-6 max-w-lg text-center text-xs leading-relaxed'>
      Ao continuar, você concorda com nossos{' '}
      <a href='/help' className='text-foreground underline underline-offset-4'>
        Termos de Uso
      </a>{' '}
      e{' '}
      <a href='/help' className='text-foreground underline underline-offset-4'>
        Política de Privacidade
      </a>
      .
    </p>
  );
}
