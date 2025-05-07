import { setSession } from '../../services/session'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password } = body

  if (username === 'admin' && password === 'admin') {
    const user = {
      username: 'admin',
      role: 'admin' as const,
    }
    setSession(event, { user })
    return { user }
  }

  if (username === 'employee' && password === 'employee') {
    const user = {
      username: 'employee',
      role: 'employee' as const,
    }
    setSession(event, { user })
    return { user }
  }

  throw createError({
    statusCode: 401,
    message: 'Invalid username or password',
  })
})
