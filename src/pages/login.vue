<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { object, string } from 'yup'
import { useAuth } from '../composables/useAuth'
import { useHead } from '#imports'

const { login } = useAuth()
const router = useRouter()

useHead({
  title: 'Login - Simple Login'
})

const form = ref({
  username: '',
  password: '',
})

const errors = ref({
  username: '',
  password: '',
  general: '',
})

const loading = ref(false)

const schema = object({
  username: string()
    .min(4, 'Username must be at least 4 characters')
    .required('Username is required'),
  password: string()
    .min(4, 'Password must be at least 4 characters')
    .required('Password is required'),
})

async function handleSubmit() {
  try {
    loading.value = true
    errors.value = { username: '', password: '', general: '' }

    await schema.validate(form.value, { abortEarly: false })
    await login(form.value.username, form.value.password)
    router.push('/home')
  }
  catch (error: any) {
    if (error.inner) {
      error.inner.forEach((err: any) => {
        errors.value[err.path as keyof typeof errors.value] = err.message
      })
    }
    else if (error.message === 'Login failed') {
      errors.value.general = 'Invalid username or password'
    }
    else {
      console.error('Login error:', error)
      errors.value.general = 'An error occurred. Please try again.'
    }
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md w-full space-y-8 bg-white/80 dark:bg-gray-800/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
      <div>
        <div class="flex justify-center">
          <div class="h-12 w-12 bg-blue-600 dark:bg-blue-500 rounded-xl flex items-center justify-center">
            <svg class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
        </div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900 dark:text-white">
          Welcome Back
        </h2>
        <p class="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Please sign in to your account
        </p>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Username</label>
            <input
              id="username"
              v-model="form.username"
              name="username"
              type="text"
              required
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 sm:text-sm"
              placeholder="Enter your username"
              :class="{ 'border-red-500 dark:border-red-500': errors.username }"
            >
            <p v-if="errors.username" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.username }}</p>
          </div>
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input
              id="password"
              v-model="form.password"
              name="password"
              type="password"
              required
              class="appearance-none relative block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 placeholder-gray-500 dark:placeholder-gray-400 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors duration-200 sm:text-sm"
              placeholder="Enter your password"
              :class="{ 'border-red-500 dark:border-red-500': errors.password }"
            >
            <p v-if="errors.password" class="mt-1 text-sm text-red-600 dark:text-red-400">{{ errors.password }}</p>
          </div>
        </div>

        <p v-if="errors.general" class="text-center text-sm text-red-600 dark:text-red-400">{{ errors.general }}</p>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 dark:focus:ring-offset-gray-800"
          >
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <svg
                v-if="!loading"
                class="h-5 w-5 text-blue-500 group-hover:text-blue-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                class="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                />
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                />
              </svg>
            </span>
            {{ loading ? 'Signing in...' : 'Sign in' }}
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
