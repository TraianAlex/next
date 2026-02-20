import { db } from '@/db'
import { eq } from 'drizzle-orm'
import { cache } from 'react'
import {
  cacheTag,
  // unstable_cacheLife as cacheLife,
} from 'next/cache'

import { getSession } from './auth'
import { issues, users } from '@/db/schema'
import { mockDelay } from './utils'

export const getCurrentUser = cache(async () => {
  await mockDelay(1000)
  const session = await getSession()
  if (!session) {
    return null
  }

  try {
    const results = await db
      .select()
      .from(users)
      .where(eq(users.id, session.userId))

    return results[0] || null
  } catch (e) {
    console.error(e)
    return null
  }
})

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.query.users.findFirst({
      where: eq(users.email, email),
    })

    return user
  } catch (e) {
    console.error(e)
    return null
  }
}

export async function getIssues(userId: string) {
  'use cache'
  cacheTag('issues')
  try {
    await mockDelay(1000)
    const result = await db.query.issues.findMany({
      // with: {
      //   user: true,
      // },
      where: eq(issues.userId, userId),
      orderBy: (issues, { desc }) => [desc(issues.createdAt)],
    })

    return result
  } catch (error) {
    console.error('Error fetching issues:', error)
    throw new Error('Failed to fetch issues')
  }
}

export const getIssue = async (id: number) => {
  try {
    await mockDelay(700)
    const issue = await db.query.issues.findFirst({
      where: eq(issues.id, id),
      with: {
        user: true,
      },
    })

    return issue
  } catch (e) {
    console.error(e)
    return null
  }
}

export const authorizeUserToEditIssue = async function authorizeIssue(
  loggedInUserId: string,
  issueId: number,
): Promise<boolean> {
  const response = await db
    .select({
      userId: issues.userId,
    })
    .from(issues)
    .where(eq(issues.id, issueId));

  if (!response.length) {
    return false;
  }

  return response[0].userId === loggedInUserId;
};
