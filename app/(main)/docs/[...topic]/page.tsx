import Link from 'next/link';
import { Suspense } from 'react';

interface DocsPageProps {
  params: Promise<{
    topic: string[];
  }>;
}

// Define the 4 subpages content
const docsContent: Record<string, { title: string; description: string; content: string }> = {
  'getting-started': {
    title: 'Getting Started',
    description: 'Learn how to get started with our application',
    content: 'Welcome to the getting started guide. This section will help you understand the basics and set up your environment.',
  },
  'api': {
    title: 'API Reference',
    description: 'Complete API documentation and reference',
    content: 'This section contains detailed API documentation, including endpoints, parameters, and response formats.',
  },
  'examples': {
    title: 'Examples',
    description: 'Code examples and use cases',
    content: 'Browse through practical examples and code snippets to see how to use different features of the application.',
  },
  'faq': {
    title: 'FAQ',
    description: 'Frequently asked questions',
    content: 'Find answers to commonly asked questions about the application, troubleshooting tips, and best practices.',
  },
};

// Generate static params for known routes
export async function generateStaticParams() {
  return [
    { topic: ['getting-started'] },
    { topic: ['api'] },
    { topic: ['examples'] },
    { topic: ['faq'] },
  ];
}

async function DocsContent({ params }: DocsPageProps) {
  const { topic } = await params;
  const topicPath = topic.join('/');
  const topicKey = topic[0]; // Get the first segment as the main topic

  // Get content for the specific topic or show default
  const pageContent = docsContent[topicKey] || {
    title: topicPath,
    description: `Documentation for ${topicPath}`,
    content: `This is the documentation page for ${topicPath}. The content for this section will be added here.`,
  };

  return (
    <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-start justify-start py-32 px-16 bg-white dark:bg-black'>
        <div className='mb-8 flex w-full flex-col gap-4'>
          <h1 className='text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50'>
            {pageContent.title}
          </h1>
          <p className='text-lg leading-8 text-zinc-600 dark:text-zinc-400'>
            {pageContent.description}
          </p>
        </div>

        <div className='mb-8 w-full'>
          <p className='text-base leading-7 text-zinc-700 dark:text-zinc-300'>
            {pageContent.content}
          </p>
        </div>

        <div className='w-full'>
          <h2 className='mb-4 text-xl font-semibold text-black dark:text-zinc-50'>
            Available Documentation Pages:
          </h2>
          <nav className='flex flex-col gap-2'>
            <Link
              href='/docs/getting-started'
              className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
            >
              • Getting Started
            </Link>
            <Link
              href='/docs/api'
              className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
            >
              • API Reference
            </Link>
            <Link
              href='/docs/examples'
              className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
            >
              • Examples
            </Link>
            <Link
              href='/docs/faq'
              className='text-base font-medium text-zinc-900 transition-colors hover:text-zinc-600 dark:text-zinc-50 dark:hover:text-zinc-300'
            >
              • FAQ
            </Link>
          </nav>
        </div>

        <div className='mt-8 w-full rounded-lg bg-zinc-100 p-4 dark:bg-zinc-900'>
          <p className='text-sm text-zinc-600 dark:text-zinc-400'>
            Current path: <code className='rounded bg-zinc-200 px-2 py-1 dark:bg-zinc-800'>/docs/{topicPath}</code>
          </p>
        </div>
      </main>
    </div>
  );
}

export default async function DocsPage({ params }: DocsPageProps) {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black'>
          <main className='flex min-h-screen w-full max-w-3xl flex-col items-start justify-start py-32 px-16 bg-white dark:bg-black'>
            <div className='mb-8 flex w-full flex-col gap-4'>
              <div className='h-8 w-48 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
              <div className='h-6 w-64 bg-zinc-200 dark:bg-zinc-800 rounded animate-pulse' />
            </div>
          </main>
        </div>
      }
    >
      <DocsContent params={params} />
    </Suspense>
  );
}

