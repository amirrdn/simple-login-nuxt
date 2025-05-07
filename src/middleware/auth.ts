interface User {
  username: string
  role: 'admin' | 'employee'
}

interface MeResponse {
  user: User
}

export default defineNuxtRouteMiddleware(async (to) => {
  if (to.path === '/login' || to.path.startsWith('/api/')) {
    return
  }

  try {
    const response = await $fetch<MeResponse>('/api/auth/me')
    if (!response.user) {
      return navigateTo('/login')
    }
  }
  catch {
    return navigateTo('/login')
  }
})
