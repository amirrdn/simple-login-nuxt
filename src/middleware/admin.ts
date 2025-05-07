interface User {
  username: string
  role: 'admin' | 'employee'
}

interface MeResponse {
  user: User
}

export default defineNuxtRouteMiddleware(async (_to) => {
  try {
    const response = await $fetch<MeResponse>('/api/auth/me')
    if (response.user?.role !== 'admin') {
      return navigateTo('/home')
    }
  }
  catch {
    return navigateTo('/login')
  }
})
