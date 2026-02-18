import { Suspense } from 'react';
import Link from 'next/link';
import Navigation from '@/app/components/Navigation';
import { Timestamp } from '../components/Timestamp';

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
      <footer className="border-t border-zinc-200 dark:border-zinc-800 dark:bg-black/80">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">Mode</h3>
              <p className="text-sm text-gray-600">
                A modern project management tool built with Next.js.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Product</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/features"
                    className="text-sm text-gray-600 hover:text-purple-600"
                  >
                    Features
                  </Link>
                </li>
                <li>
                  <Link
                    href="/pricing"
                    className="text-sm text-gray-600 hover:text-purple-600"
                  >
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-sm text-gray-600 hover:text-purple-600"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Resources</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/docs/getting-started"
                    className="text-sm text-gray-600 hover:text-purple-600"
                  >
                    Documentation
                  </Link>
                </li>
                <li>
                  <a
                    href="https://github.com/TraianAlex/next"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-gray-600 hover:text-purple-600"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold mb-4">Legal</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/terms"
                    className="text-sm text-gray-600 hover:text-purple-600"
                  >
                    Terms of Service
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 text-center text-gray-500 dark:text-gray-400">
            <p className="text-sm text-gray-600">
              &copy; <Suspense fallback="...">
                <Timestamp />
              </Suspense> All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}

