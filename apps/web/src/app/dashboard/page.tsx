import { mainNav } from '@/config/sidebar';
import { NavMenu } from '@/components/layout/app-sidebar/nav-main';

export default function DashboardPage() {
  return (
    <>
      <h1 className='text-2xl font-bold'>Dashboard</h1>
      <NavMenu items={mainNav} />
    </>
  );
}