export default function Todos() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start'>
        <div className='flex w-full flex-col items-center gap-6 text-center sm:items-start sm:text-left'>
          <h1 className='max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50'>
            Todos
          </h1>
          <p className='max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
            Your todos list will appear here. Logic and functionality will be
            added later.
          </p>
          <div className='w-full'>
            {/* Todos list section - logic will be added here */}
          </div>
        </div>
      </main>
    </div>
  );
}
