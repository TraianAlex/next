import TodoList from '@/app/components/TodoList'

export default function Todos() {
  return (
    <div className='min-h-screen bg-gray-50 dark:bg-dark-base font-sans'>
      <main className='container mx-auto py-8'>
        <TodoList />
      </main>
    </div>
  );
}
