<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted } from 'vue'
import { $fetch } from 'ofetch'
import { useHead } from '#imports'

interface User {
  username: string
  role: 'admin' | 'employee'
}

interface MeResponse {
  user: User
}

const router = useRouter()

useHead({
  title: 'Welcome - Simple Login'
})

onMounted(async () => {
  try {
    const response = await $fetch<MeResponse>('/api/auth/me')
    if (response.user) {
      router.push('/home')
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
  <div class="min-h-screen bg-gray-50 flex items-center justify-center">
    <div class="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
  </div>
</template>
