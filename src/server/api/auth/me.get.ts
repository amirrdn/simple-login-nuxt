import { getSession } from '~/server/services/session'

export default defineEventHandler(async (event) => {
  const session = getSession(event)

  if (!session?.data?.user) {
    throw createError({
      statusCode: 401,
      message: 'Unauthorized',
    })
  }

  return {
    user: session.data.user,
  }
})
