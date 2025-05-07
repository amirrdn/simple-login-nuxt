import { clearSession } from '~/server/services/session'

export default defineEventHandler(async (event) => {
  clearSession(event)
  return {
    success: true,
  }
})
