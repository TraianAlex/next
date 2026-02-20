import { getCurrentUser } from '@/lib/dal';
import SignOutButton from './SignOutButton';
import { Suspense } from 'react';
import { UserIcon } from 'lucide-react';

async function AuthSection() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className='mt-auto border-t border-zinc-200 pt-4 dark:border-zinc-800'>
      <div className="flex items-center justify-start px-2 py-2">
        <UserIcon size={20} className="text-gray-500 mr-2" />
        <span className="hidden md:inline text-sm text-gray-700 dark:text-gray-400 truncate">
          {user?.email}
        </span>
      </div>
      <SignOutButton />
    </div>
  );
}

export default function SideNavigationAuth() {
  return (
    <Suspense
      fallback={
        <div className='mt-auto border-t border-zinc-200 pt-4 dark:border-zinc-800'>
          <div className="flex items-center justify-start px-2 py-2">
            <span className="inline-block size-4 shrink-0 animate-spin rounded-full border-2 border-gray-400 border-t-transparent dark:border-gray-200 dark:border-t-transparent" />
          </div>
        </div>
      }
    >
      <AuthSection />
    </Suspense>
  );
}

