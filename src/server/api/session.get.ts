import { defineEventHandler } from 'h3'
import { getSession } from '../services/session'

export default defineEventHandler((event) => {
  const session = getSession(event)
  return {
    user: session?.data?.user || null,
  }
})
