export default function Dashboard() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-7xl flex-col items-start justify-start py-16 px-8 bg-white dark:bg-black'>
        <div className='w-full'>
          <h1 className='mb-8 text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50'>
            Dashboard
          </h1>
          <p className='mb-8 text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
            Welcome to your dashboard. Content will be added here.
          </p>
        </div>
      </main>
    </div>
  );
}

