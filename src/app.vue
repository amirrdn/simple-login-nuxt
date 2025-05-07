<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { $fetch } from 'ofetch'

interface User {
  username: string
  role: 'admin' | 'employee'
}

interface MeResponse {
  user: User
}

const route = useRoute()
const router = useRouter()

onMounted(async () => {
  try {
    const response = await $fetch<MeResponse>('/api/auth/me')
    if (response.user) {
      if (route.path === '/') {
        router.push('/home')
      }
    }
    else {
      router.push('/login')
    }
  }
  catch {
    router.push('/login')
  }
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
