export default function SignIn() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
        <div className='flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left'>
          <h1 className='max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50'>
            Sign In
          </h1>
          <p className='max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
            Sign in to your account. This page is organized under the (auth) route group.
          </p>
          <div className='mt-4 w-full max-w-md'>
            <form className='flex flex-col gap-4'>
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
                  className='rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-400'
                  placeholder='Enter your email'
                />
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
                  className='rounded-lg border border-zinc-300 bg-white px-4 py-2 text-zinc-900 placeholder-zinc-500 focus:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-50 dark:placeholder-zinc-400'
                  placeholder='Enter your password'
                />
              </div>
              <button
                type='submit'
                className='mt-2 rounded-lg bg-zinc-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200'
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

