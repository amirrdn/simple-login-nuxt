interface SessionResponse {
  user: {
    username: string
    role: 'admin' | 'employee'
  } | null
}

export default defineNuxtPlugin(async () => {
  const user = useState('user')
  try {
    const { data } = await useFetch<SessionResponse>('/api/session')
    if (data.value?.user) {
      user.value = data.value.user
    }
  }
  catch (error) {
    console.error('Failed to fetch session:', error)
  }
})
