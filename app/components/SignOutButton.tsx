'use client';

import { signOut } from '@/app/actions/auth';
import { useFormStatus } from 'react-dom';

interface SignOutButtonProps {
  className?: string;
  variant?: 'link' | 'button';
}

function SignOutForm({ className, variant }: SignOutButtonProps) {
  const { pending } = useFormStatus();

  const baseClasses = variant === 'button'
    ? 'rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
    : 'text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300';

  return (
    <button
      type='submit'
      disabled={pending}
      className={`${baseClasses} ${className}`}
    >
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

