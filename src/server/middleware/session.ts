import { defineEventHandler, getCookie, setCookie } from 'h3'

export default defineEventHandler((event) => {
  const config = useRuntimeConfig()
  const session = getCookie(event, 'session')
  if (!session) {
    const newSession = crypto.randomUUID()
    setCookie(event, 'session', newSession, {
      httpOnly: true,
      secure: config.public.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })
  }
})
