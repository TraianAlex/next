import { describe, it, expect, vi, beforeEach } from 'vitest'
import { createIssue } from '../issues'
import { getCurrentUser } from '@/lib/dal'

// Mock @/db to avoid DATABASE_URL check and database calls
vi.mock('@/db', () => ({
  db: {
    insert: vi.fn(() => ({
      values: vi.fn(() => Promise.resolve()),
    })),
  },
}))

vi.mock('@/lib/dal', () => ({
  getCurrentUser: vi.fn(),
  authorizeUserToEditIssue: vi.fn(),
}))

vi.mock('next/cache', () => ({
  revalidateTag: vi.fn(),
}))

describe('Server Action: createIssue', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('creates an issue successfully', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue({
      id: 'user1',
      email: 'user@example.com',
      password: 'hashed',
      createdAt: new Date(),
    })

    const result = await createIssue({
      title: 'Test Issue',
      status: 'todo',
      priority: 'medium',
      userId: 'user1',
      description: 'Test Description',
    })

    expect(result).toEqual({ success: true, message: 'Issue created successfully' })
  })

  it('returns an error if the user is not authenticated', async () => {
    vi.mocked(getCurrentUser).mockResolvedValue(null)

    const result = await createIssue({
      title: 'Test Issue',
      status: 'todo',
      priority: 'medium',
      userId: 'user1',
      description: 'Test Description',
    })

    expect(result).toEqual({
      success: false,
      message: 'Unauthorized access',
      error: 'Unauthorized',
    })
  })
})
