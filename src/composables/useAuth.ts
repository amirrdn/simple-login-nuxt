import { ref } from 'vue'
import { useAuthSession } from './useSession'
import { useNuxtApp } from '#imports'

interface User {
  username: string
  role: 'admin' | 'employee'
}

interface SessionData {
  data: {
    user: User
  }
}

export function useAuth() {
  const sessionData = ref<SessionData | null>(null)
  const { getSession } = useAuthSession()
  const isLoading = ref(false)
  const nuxtApp = useNuxtApp()

  const setLoading = (loading: boolean) => {
    isLoading.value = loading
    if (nuxtApp.$client) {
      if (loading) {
        document.body.classList.add('loading')
      } else {
        document.body.classList.remove('loading')
      }
    }
  }

  const login = async (username: string, password: string) => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Login failed')
      }

      const data = await response.json()
      sessionData.value = { data: { user: data.user } }
      return data
    }
    catch (error) {
      console.error('Login error:', error)
      throw error
    }
    finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })

      if (!response.ok) {
        throw new Error('Logout failed')
      }

      sessionData.value = null
    }
    catch (error) {
      console.error('Logout error:', error)
      throw error
    }
    finally {
      setLoading(false)
    }
  }

  const isAuthenticated = async () => {
    try {
      setLoading(true)
      const session = await getSession() as SessionData | null

      if (session?.data?.user) {
        sessionData.value = session
        return true
      }

      const response = await fetch('/api/auth/me', {
        credentials: 'include',
      })

      if (response.ok) {
        const data = await response.json()
        if (data.user) {
          sessionData.value = { data: { user: data.user } }
          return true
        }
      }

      sessionData.value = null
      return false
    }
    catch (error) {
      console.error('Auth check error:', error)
      sessionData.value = null
      return false
    }
    finally {
      setLoading(false)
    }
  }

  return {
    session: sessionData,
    login,
    logout,
    isAuthenticated,
    isLoading,
  }
}
