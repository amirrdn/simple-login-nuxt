import { getSession as getServerSession } from '~/server/services/session'

export function useAuthSession() {
  const event = useRequestEvent()

  return {
    getSession: async () => {
      if (!event) {
        try {
          const response = await fetch('/api/auth/me', {
            credentials: 'include',
          })
          if (response.ok) {
            const data = await response.json()
            return { data: { user: data.user } }
          }
          return null
        }
        catch (error) {
          console.error('Error fetching session:', error)
          return null
        }
      }
      const session = getServerSession(event)
      if (!session) return null
      return { data: session }
    },
  }
}
