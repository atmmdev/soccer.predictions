import { Search } from 'lucide-react';

import { Input } from '@/components/ui/input';

export function AppHeaderSearch() {
  return (
    <div className='relative hidden w-full max-w-sm lg:block'>
      {/* <Search className='text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2' />
      <Input
        type='search'
        placeholder='Buscar...'
        className='h-11 bg-muted/40 border pl-10 w-full'
        aria-label='Buscar'
      /> */}
    </div>
  );
}
