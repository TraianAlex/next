'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function SideNavigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard' },
    { href: '/dashboard/overview', label: 'Overview' },
    { href: '/dashboard/settings', label: 'Settings' },
    { href: '/dashboard/profile', label: 'Profile' },
  ];

  return (
    <aside className='sticky top-0 h-screen w-64 border-r border-zinc-200 bg-white dark:border-zinc-800 dark:bg-black'>
      <nav className='flex flex-col gap-2 p-4'>
        <div className='mb-6 px-4 py-2'>
          <h2 className='text-lg font-semibold text-zinc-900 dark:text-zinc-50'>
            Dashboard
          </h2>
        </div>
        <div className='flex flex-col gap-1'>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-lg px-4 py-2 text-base font-medium transition-colors ${
                  isActive
                    ? 'bg-zinc-100 text-zinc-900 dark:bg-zinc-900 dark:text-zinc-50'
                    : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-900 dark:hover:text-zinc-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
}

