import { db } from '@/db'
import { issues } from '@/db/schema'
import { getCurrentUser } from '@/lib/dal'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const CreateIssueSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters').max(100, 'Title must be less than 100 characters'),
  description: z.string().optional().nullable(),
  status: z.enum(['backlog', 'todo', 'in_progress', 'done']),
  priority: z.enum(['low', 'medium', 'high']),
})

export const GET = async () => {
  try {
    const issues = await db.query.issues.findMany({})
    return NextResponse.json({ data: { issues } })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'nah' }, { status: 500 })
  }
}

// export const POST = async (req: NextRequest) => {
//   try {
//     const [newIssue] = await db
//       .insert(issues)
//       .values(await req.json())
//       .returning()

//     return NextResponse.json({ data: newIssue })
//   } catch (e) {
//     console.error(e)
//     return NextResponse.json({ error: 'nah' }, { status: 500 })
//   }
// }

export const POST = async (req: NextRequest) => {
  try {
    const user = await getCurrentUser()
    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }
    const newIssueData = await req.json()
    const validation = CreateIssueSchema.safeParse(newIssueData)
    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid issue' }, { status: 400 })
    }
    const [newIssue] = await db
      .insert(issues)
      .values({ userId: user.id, ...validation.data })
      .returning()

    return NextResponse.json({ data: newIssue })
  } catch (e) {
    console.error(e)
    return NextResponse.json({ error: 'nah' }, { status: 500 })
  }
}
