import { getCurrentUser } from '@/lib/dal';
import SignOutButton from './SignOutButton';
import { Suspense } from 'react';

async function AuthSection() {
  const user = await getCurrentUser();

  if (!user) {
    return null;
  }

  return (
    <div className='mt-auto border-t border-zinc-200 pt-4 dark:border-zinc-800'>
      <SignOutButton className='w-full' />
    </div>
  );
}

export default function SideNavigationAuth() {
  return (
    <Suspense fallback={null}>
      <AuthSection />
    </Suspense>
  );
}

