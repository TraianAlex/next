import Link from 'next/link';

export default function Navigation() {
  return (
    <nav className='sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-8'>
          <Link
            href='/'
            className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
          >
            Home
          </Link>
          <Link
            href='/todos'
            className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
          >
            Todos
          </Link>
          <Link
            href='/docs/getting-started'
            className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
          >
            Docs
          </Link>
          <Link
            href='/about'
            className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
          >
            About
          </Link>
        </div>
        <div className='flex items-center gap-8'>
          <Link
            href='/signin'
            className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
          >
            Sign In
          </Link>
          <Link
            href='/signout'
            className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
          >
            Sign Out
          </Link>
        </div>
      </div>
    </nav>
  );
}
