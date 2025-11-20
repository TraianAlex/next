'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SideNavigationLinksProps {
  navItems: Array<{ href: string; label: string }>;
}

export default function SideNavigationLinks({ navItems }: SideNavigationLinksProps) {
  const pathname = usePathname();

  return (
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
  );
}

