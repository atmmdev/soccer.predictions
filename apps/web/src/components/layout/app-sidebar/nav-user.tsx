export function NavUser() {
  return (
    <div className='flex items-center gap-3 rounded-lg p-3 group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:p-2'>
      <div className='bg-sidebar-primary text-sidebar-primary-foreground flex size-10 shrink-0 items-center justify-center rounded-full text-sm font-semibold'>
        A
      </div>
      <div className='flex min-w-0 flex-col group-data-[collapsible=icon]:hidden'>
        <span className='text-sidebar-foreground truncate text-sm font-medium'>
          Anderson
        </span>
        <span className='text-sidebar-foreground/60 truncate text-xs'>
          Administrador
        </span>
      </div>
    </div>
  );
}
