'use client'

import { useActionState, startTransition } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast'
import { ActionResponse, signUp } from '@/app/actions/auth';

const initialState: ActionResponse = {
  success: false,
  message: '',
  errors: undefined,
}

export default function SignUp() {
  const router = useRouter();

  const [state, formAction, isPending] = useActionState<
    ActionResponse,
    FormData
  >(async (prevState: ActionResponse, formData: FormData): Promise<ActionResponse> => {
    try {
      const result = await signUp(formData)
      if (result.success) {
        toast.success('Account created successfully')
        // Use startTransition to handle navigation after state update
        // Small delay ensures cookies are set before navigation
        startTransition(() => {
          router.refresh()
          setTimeout(() => {
            router.push('/dashboard')
          }, 150)
        })
      }
      return result as unknown as ActionResponse;
    } catch (err) {
      return {
        success: false,
        message: (err as Error).message || 'An error occurred',
        errors: undefined,
      }
    }
  }, initialState)

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
        <div className='flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left'>
          <h1 className='max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50'>
            Sign Up
          </h1>
          <p className='max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
            Create a new account. This page is organized under the (auth) route group.
          </p>
          <div className='mt-4 w-full max-w-md'>
            <form className='flex flex-col gap-4' action={formAction}>
            {state?.message && !state.success && (
              <p className="text-sm text-red-500">{state.message}</p>
          )}
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='email'
                  className='text-sm font-medium text-zinc-900 dark:text-zinc-50'
                >
                  Email
                </label>
                <input
                  type='email'
                  id='email'
                  name='email'
                  disabled={isPending}
                  className={state?.errors?.email ? 'rounded-lg border border-red-500 bg-red-50 px-4 py-2 text-red-500 placeholder-red-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-400 dark:bg-red-900 dark:text-red-50 dark:placeholder-red-400' : 'rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-400'}
                  placeholder='Enter your email'
                />
                {state?.errors?.email && (
                  <p id="email-error" className="text-sm text-red-500">
                    {state.errors.email[0]}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='password'
                  className='text-sm font-medium text-zinc-900 dark:text-zinc-50'
                >
                  Password
                </label>
                <input
                  type='password'
                  id='password'
                  name='password'
                  disabled={isPending}
                  aria-describedby="password-error"
                  className={state?.errors?.password ? 'rounded-lg border border-red-500 bg-red-50 px-4 py-2 text-red-500 placeholder-red-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-400 dark:bg-red-900 dark:text-red-50 dark:placeholder-red-400' : 'rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-400'}
                  placeholder='Enter your password (min 6 characters)'
                />
                {state?.errors?.password && (
                  <p id="password-error" className="text-sm text-red-500">
                    {state.errors.password[0]}
                  </p>
                )}
              </div>
              <div className='flex flex-col gap-2'>
                <label
                  htmlFor='confirmPassword'
                  className='text-sm font-medium text-zinc-900 dark:text-zinc-50'
                >
                  Confirm Password
                </label>
                <input
                  type='password'
                  id='confirmPassword'
                  name='confirmPassword'
                  disabled={isPending}
                  aria-describedby="confirmPassword-error"
                  className={state?.errors?.confirmPassword ? 'rounded-lg border border-red-500 bg-red-50 px-4 py-2 text-red-500 placeholder-red-500 focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500 dark:border-red-400 dark:bg-red-900 dark:text-red-50 dark:placeholder-red-400' : 'rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-400'}
                  placeholder='Confirm your password'
                />
                {state?.errors?.confirmPassword && (
                  <p id="confirmPassword-error" className="text-sm text-red-500">
                    {state.errors.confirmPassword[0]}
                  </p>
                )}
              </div>
              <button
                type='submit'
                disabled={isPending}
                className='mt-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
              >
                {isPending ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          </div>
          <div className='mt-4'>
            <Link
              href='/signin'
              className='text-sm text-zinc-600 underline transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50'
            >
              Already have an account? Sign in
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

