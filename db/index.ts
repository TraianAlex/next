import { drizzle as drizzleNeon } from 'drizzle-orm/neon-http'
import { drizzle as drizzlePostgres } from 'drizzle-orm/node-postgres'
import { neon } from '@neondatabase/serverless'

import * as schema from './schema'

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set')
}

// Check if we're in Vercel environment or if DATABASE_URL is a Neon connection string
const isVercel = process.env.VERCEL === '1' || process.env.VERCEL_ENV !== undefined
const isNeonUrl = process.env.DATABASE_URL?.includes('neon.tech') || process.env.DATABASE_URL?.includes('neon.tech')

export const db = isVercel || isNeonUrl
  ? drizzleNeon({
      client: neon(process.env.DATABASE_URL),
      schema,
      casing: 'snake_case',
    })
  : drizzlePostgres(process.env.DATABASE_URL, { schema, casing: 'snake_case' })
