import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, POST } from '../issue/route';
import { db } from '@/db';
import { NextRequest, NextResponse } from 'next/server';
import { Issue, issues } from '@/db/schema';
import { getCurrentUser } from '@/lib/dal';

// Mock dependencies
vi.mock('@/lib/dal', () => ({
  getCurrentUser: vi.fn(),
}))

vi.mock('@/db', () => ({
  db: {
    query: {
      issues: {
        findMany: vi.fn(),
      },
    },
    insert: vi.fn(),
  },
}))

vi.mock('next/server', () => ({
  NextResponse: {
    json: vi.fn((data) => data),
  },
}))

describe('Issue API Routes', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  describe('GET', () => {
    it('returns all issues successfully', async () => {
      // Mock the database response
      const mockIssues = [
        {
          id: 1,
          title: 'Issue 1',
          status: 'todo',
          priority: 'medium',
          description: null,
          createdAt: new Date(),
          updatedAt: new Date(),
          userId: 'user1',
        },
      ]
      vi.mocked(db.query.issues.findMany).mockResolvedValueOnce(mockIssues as Issue[])

      // Call the GET function
      const response = await GET()

      // Verify the response
      // create a test wirth the response to be sure it is the correct response
      expect(response).toEqual({ data: { issues: mockIssues } })
      expect(db.query.issues.findMany).toHaveBeenCalledTimes(1)
      expect(NextResponse.json).toHaveBeenCalledWith({ data: { issues: mockIssues } })
    })
  })

  describe('POST', () => {
    const mockRequest = new Request('http://localhost/api/issue', {
      method: 'POST',
      body: JSON.stringify({ title: 'Test', status: 'todo', priority: 'medium' }),
    })

    it('creates an issue successfully', async () => {
      const mockIssue = {
        id: 1,
        title: 'Issue 1',
        status: 'todo',
        priority: 'medium',
        description: null,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 'user1',
      }
      vi.mocked(getCurrentUser).mockResolvedValue({
        id: 'user1',
        email: 'user1@example.com',
        password: 'hashed-password',
        createdAt: new Date(),
      })
      const mockValues = vi.fn().mockReturnValue({
        returning: vi.fn().mockResolvedValue([mockIssue]),
      })
      // eslint-disable-next-line @typescript-eslint/no-explicit-any -- mock object for Drizzle insert chain
      vi.mocked(db.insert).mockReturnValue({ values: mockValues } as any)

      const createRequest = new Request('http://localhost/api/issue', {
        method: 'POST',
        body: JSON.stringify({ title: 'Issue 1', status: 'todo', priority: 'medium' }),
      })
      const response = await POST(createRequest as NextRequest)

      expect(response).toEqual({ data: mockIssue })
      expect(db.insert).toHaveBeenCalledWith(issues)
      expect(mockValues).toHaveBeenCalledWith({
        userId: 'user1',
        title: 'Issue 1',
        status: 'todo',
        priority: 'medium',
      })
      expect(getCurrentUser).toHaveBeenCalledTimes(1)
      expect(db.insert).toHaveBeenCalledTimes(1)
    })
    it('returns an error if the user is not authenticated', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue(null)
      const response = await POST(mockRequest as NextRequest)
      expect(response).toEqual({ error: 'Unauthorized' })
    })
    it('returns an error if the issue is not valid', async () => {
      vi.mocked(getCurrentUser).mockResolvedValue({
        id: 'user1',
        email: 'user1@example.com',
        password: 'hashed-password',
        createdAt: new Date(),
      })
      const invalidRequest = new Request('http://localhost/api/issue', {
        method: 'POST',
        body: JSON.stringify({ title: 'ab', status: 'todo', priority: 'medium' }),
      })
      const response = await POST(invalidRequest as NextRequest)
      expect(response).toEqual({ error: 'Invalid issue' })
    })
  })
})
