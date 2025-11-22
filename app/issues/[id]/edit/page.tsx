import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeftIcon } from 'lucide-react'

import IssueForm from '@/app/components/IssueForm'
import { getCurrentUser, getIssue } from '@/lib/dal'


const EditIssuePage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const user = await getCurrentUser()
  if (!user) {
    notFound()
  }
  const issue = await getIssue(parseInt(id))
  if (!issue || issue.userId !== user.id) {
    notFound()
  }
  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 mt-8">
      <Link
        href="/dashboard"
        className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 mb-6"
      >
        <ArrowLeftIcon size={16} className="mr-1" />
        Back to Dashboard
      </Link>

    <h1 className="text-2xl font-bold mb-6">Edit Issue</h1>

    <div className="bg-dark dark:bg-dark-elevated border border-gray-700 dark:border-dark-border-default rounded-lg shadow-sm p-6">
      <IssueForm issue={issue} userId={user.id} isEditing={true} />
    </div>
  </div>
  )

}

export default EditIssuePage
