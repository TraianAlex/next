import Link from 'next/link';
import { Suspense } from 'react';
import Button from '../components/ui/Button';
import { getCurrentUser } from '@/lib/dal';
import { Timestamp } from '../components/Timestamp';

async function AuthButtons() {
  const user = await getCurrentUser();

  if (user) {
    return (
      <div className="mt-10">
        <Link href="/dashboard">
          <Button size="lg">Go to Dashboard</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-10">
      <Link href="/signup">
        <Button size="lg">Get Started</Button>
      </Link>
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-24">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tight">
              Issue tracking <br className="hidden sm:block" />
              <span className="text-purple-600 dark:text-purple-400">
                simplified
              </span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600 dark:text-gray-300">
              A minimal and elegant issue tracking tool for modern teams. Manage
              your projects with ease.
            </p>
            <Suspense fallback={<div className="mt-10 h-11" />}>
              <AuthButtons />
            </Suspense>
          </div>
        </div>
      </main>

      <footer className="border-t border-zinc-200 dark:border-zinc-800 dark:bg-black/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            <p>
              ©{' '}
              <Suspense fallback="...">
                <Timestamp />
              </Suspense>{' '}
              Built with Next.js and Tailwind CSS.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
