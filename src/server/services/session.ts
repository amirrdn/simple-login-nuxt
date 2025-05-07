import { deleteCookie, getCookie, setCookie } from 'h3'
import { useRuntimeConfig } from '#imports'

interface SessionData {
  user: {
    username: string
    role: 'admin' | 'employee'
  }
}

const sessions = new Map<string, SessionData>()

export function getSession(event: any) {
  try {
    const sessionId = getCookie(event, 'session')
    if (!sessionId)
      return null

    const session = sessions.get(sessionId)
    if (!session) {
      const sessionCookie = getCookie(event, 'session_data')
      if (sessionCookie) {
        try {
          const sessionData = JSON.parse(sessionCookie)
          sessions.set(sessionId, sessionData)
          return { data: sessionData }
        }
        catch (e) {
          console.error('Failed to parse session data:', e)
          return null
        }
      }
      return null
    }
    return { data: session }
  }
  catch (error) {
    console.error('Error getting session:', error)
    return null
  }
}

export function setSession(event: any, data: SessionData) {
  try {
    let sessionId = getCookie(event, 'session')
    if (!sessionId) {
      sessionId = crypto.randomUUID()
      const config = useRuntimeConfig()
      setCookie(event, 'session', sessionId, {
        httpOnly: true,
        secure: config.public.nodeEnv === 'production',
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
      })
    }

    sessions.set(sessionId, data)
    setCookie(event, 'session_data', JSON.stringify(data), {
      httpOnly: true,
      secure: useRuntimeConfig().public.nodeEnv === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 * 7,
    })
  }
  catch (error) {
    console.error('Error setting session:', error)
    throw error
  }
}

export function clearSession(event: any) {
  try {
    const sessionId = getCookie(event, 'session')
    if (!sessionId)
      return

    sessions.delete(sessionId)
    deleteCookie(event, 'session')
    deleteCookie(event, 'session_data')
  }
  catch (error) {
    console.error('Error clearing session:', error)
  }
}
