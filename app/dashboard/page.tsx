import { getCurrentUser, getIssues } from '@/lib/dal'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

import { Priority, Status } from '@/lib/types'
import { ISSUE_PRIORITY, ISSUE_STATUS } from '@/db/schema'
import { formatRelativeTime } from '@/lib/utils'
import Badge from '../components/ui/Badge'

export default async function Dashboard() {  
  const user = await getCurrentUser()
  if (!user) {
    notFound()
  }
  const issues = await getIssues(user!.id)

  return (
    <div className="mt-8 px-4">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Issues</h1>
        <Link href="/issues/new">
          <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md">
            <span className="flex items-center">
              <PlusIcon size={18} className="mr-2" />
              New Issue
            </span>
          </button>
        </Link>
      </div>

      {issues.length > 0 ? (
        <div className="overflow-hidden rounded-lg border border-gray-800 dark:bg-dark-high shadow-sm">
          {/* Header row */}
          <div className="grid grid-cols-12 gap-4 px-6 py-3 text-sm font-medium text-gray-500 dark:text-gray-400 dark:bg-dark-elevated border-b border-gray-700">
            <div className="col-span-5">Title</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2">Priority</div>
            <div className="col-span-3">Created</div>
          </div>

          {/* Issue rows */}
          <div className="divide-y divide-gray-800 dark:divide-dark-border-default">
            {issues.map((issue) => (
              <Link
                key={issue.id}
                href={`/issues/${issue.id}`}
                className="block hover:bg-gray-700 dark:hover:bg-dark-elevated transition-colors"
              >
                <div className="grid grid-cols-12 gap-4 px-6 py-4 items-center">
                  <div className="col-span-5 font-medium truncate text-gray-300 dark:text-gray-300">
                    {issue.title}
                  </div>
                  <div className="col-span-2">
                    <Badge status={issue.status as Status}>
                      {ISSUE_STATUS[issue.status as Status].label}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <Badge priority={issue.priority as Priority}>
                      {ISSUE_PRIORITY[issue.priority as Priority].label}
                    </Badge>
                  </div>
                  <div className="col-span-3 text-sm text-gray-500 dark:text-gray-400">
                    {formatRelativeTime(new Date(issue.createdAt))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center border border-gray-200 dark:border-dark-border-default rounded-lg bg-white dark:bg-dark-high p-8">
          <h3 className="text-lg font-medium mb-2">No issues found</h3>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Get started by creating your first issue.
          </p>
          <Link href="/issues/new">
            <button className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md">
              <span className="flex items-center">
                <PlusIcon size={18} className="mr-2" />
                Create Issue
              </span>
            </button>
          </Link>
        </div>
      )}
    </div>
  )
}

