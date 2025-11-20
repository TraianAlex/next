import { Suspense } from 'react';
import Navigation from '@/app/components/Navigation';

function NavigationSkeleton() {
  return (
    <nav className='sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur-sm dark:border-zinc-800 dark:bg-black/80'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8'>
        <div className='flex items-center gap-8'>
          <div className='h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
          <div className='h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
          <div className='h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
          <div className='h-5 w-12 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
          <div className='h-5 w-16 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
        </div>
        <div className='flex items-center gap-8'>
          <div className='h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
          <div className='h-5 w-20 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
        </div>
      </div>
    </nav>
  );
}

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Suspense fallback={<NavigationSkeleton />}>
        <Navigation />
      </Suspense>
      {children}
    </>
  );
}

