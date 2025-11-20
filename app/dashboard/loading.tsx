import DashboardSkeleton from '@/app/components/DashboardSkeleton';

export default function Loading() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-7xl flex-col items-start justify-start py-16 px-8 bg-white dark:bg-black'>
        <DashboardSkeleton />
      </main>
    </div>
  );
}

