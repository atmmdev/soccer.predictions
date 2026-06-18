import { mainNav } from '@/config/sidebar';
import { NavMenu } from '@/components/layout/app-sidebar/nav-main';
import { SidebarProvider } from '@/components/ui/sidebar';

export default function DashboardPage() {
  return (
    <>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <SidebarProvider>
        <NavMenu items={mainNav} />
      </SidebarProvider>
    </>
  );
}
