import SideNavigationLinks from './SideNavigationLinks';
import SideNavigationAuth from './SideNavigationAuth';

const navItems = [
  { href: '/', label: 'Home' },
  { href: '/dashboard/overview', label: 'Overview' },
  { href: '/dashboard/settings', label: 'Settings' },
  { href: '/dashboard/profile', label: 'Profile' },
];

export default function SideNavigation() {
  return (
    <aside className='sticky top-0 flex h-screen w-64 flex-col border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black'>
      <nav className='flex flex-1 flex-col gap-2 p-4'>
        <div className='mb-6 px-4 py-2'>
          <h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
            Dashboard
          </h2>
        </div>
        <SideNavigationLinks navItems={navItems} />
        <SideNavigationAuth />
      </nav>
    </aside>
  );
}

