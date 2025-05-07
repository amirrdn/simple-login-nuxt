import { getSession } from '../services/session'

export default defineEventHandler((event) => {
  if (event.path.startsWith('/admin')) {
    const session = getSession(event)
    if (!session?.data?.user) {
      throw createError({
        statusCode: 401,
        message: 'Please login first',
      })
    }

    if (session.data.user.role !== 'admin') {
      throw createError({
        statusCode: 403,
        message: 'Access denied. Admin privileges required.',
      })
    }
  }
})
