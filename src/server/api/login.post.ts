import { createError, defineEventHandler, readBody } from 'h3'
import { z } from 'zod'
import { getUser } from '../repositories/user'
import { setSession } from '../services/session'

const schema = z.object({
  username: z
    .string({
      required_error: 'Username is required',
    })
    .min(4, { message: 'Invalid username' }),
  password: z
    .string({
      required_error: 'Password is required',
    })
    .min(4, { message: 'Password must be at least 4 characters' }),
})

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event)
    const result = schema.safeParse(body)

    if (!result.success) {
      throw createError({
        statusCode: 400,
        message: result.error.errors[0].message,
      })
    }

    const { username, password } = result.data
    const user = await getUser(username, password)

    if (!user) {
      throw createError({
        statusCode: 401,
        message: 'Username atau password salah',
      })
    }

    setSession(event, { user })

    return {
      success: true,
      user,
    }
  }
  catch (error: any) {
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || 'An error occurred while trying to login. Please try again.',
    })
  }
})
