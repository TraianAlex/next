'use client';

import { signOut } from '@/app/actions/auth';
import { useFormStatus } from 'react-dom';
import { LogOutIcon } from 'lucide-react';

interface SignOutButtonProps {
  className?: string;
  variant?: 'link' | 'button';
}

function SignOutForm({ className, variant }: SignOutButtonProps) {
  const { pending } = useFormStatus();

  const baseClasses = variant === 'button'
    ? 'rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
    : 'flex items-center w-full px-2 py-2 text-sm font-medium transition-colors hover:text-zinc-200 dark:text-zinc-400 dark:hover:text-zinc-200';

  return (
    <button
      type='submit'
      disabled={pending}
      className={`${baseClasses} ${className}`}
    >
      <LogOutIcon size={20} className="mr-2" />
      {pending ? 'Signing out...' : 'Sign Out'}
    </button>
  );
}

export default function SignOutButton({ className = '', variant = 'link' }: SignOutButtonProps) {
  return (
    <form action={signOut}>
      <SignOutForm className={className} variant={variant} />
    </form>
  );
}

