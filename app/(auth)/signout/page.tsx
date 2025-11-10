import Link from 'next/link';

export default function SignOut() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
        <div className='flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left'>
          <h1 className='max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50'>
            Sign Out
          </h1>
          <p className='max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
            Are you sure you want to sign out? This page is organized under the (auth) route group.
          </p>
          <div className='mt-4 flex flex-col gap-4 sm:flex-row'>
            <button
              type='button'
              className='rounded-lg bg-zinc-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
            >
              Sign Out
            </button>
            <Link
              href='/'
              className='flex items-center justify-center rounded-lg border border-zinc-300 bg-white px-6 py-2 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:hover:bg-zinc-800'
            >
              Cancel
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

