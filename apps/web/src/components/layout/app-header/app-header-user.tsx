export function AppHeaderUser() {
  return (
    <div className='hidden items-center gap-2 sm:flex'>
      <div className='bg-primary text-primary-foreground flex size-9 items-center justify-center rounded-full text-sm font-semibold'>
        A
      </div>
      <div className='hidden flex-col md:flex'>
        <span className='text-sm font-medium leading-none'>Anderson</span>
        <span className='text-muted-foreground text-xs'>Administrador</span>
      </div>
    </div>
  );
}
