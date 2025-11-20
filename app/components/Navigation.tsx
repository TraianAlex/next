import Link from 'next/link';
import { getCurrentUser } from '@/lib/dal';
import SignOutButton from './SignOutButton';

export default async function Navigation() {
  const user = await getCurrentUser();

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
            href='/dashboard'
            className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
          >
            Dashboard
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
          {!user ? (
            <>
              <Link
                href='/signin'
                className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
              >
                Sign In
              </Link>
              <Link
                href='/signup'
                className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
              >
                Sign Up
              </Link>
            </>
          ) : (
            <SignOutButton />
          )}
        </div>
      </div>
    </nav>
  );
}
