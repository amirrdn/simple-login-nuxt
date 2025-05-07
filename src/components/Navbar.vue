<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import { useThemeMode } from '../composables/useColorMode'

export default defineComponent({
  name: 'Navbar',
  components: {
    RouterLink,
  },
  setup() {
    const { session, logout, isAuthenticated, isLoading } = useAuth()
    const router = useRouter()
    const isCheckingAuth = ref(true)
    const { colorMode, toggleColorMode } = useThemeMode()
    const isMobileMenuOpen = ref(false)
    
    const checkAuth = async () => {
      try {
        await isAuthenticated()
      }
      catch (error) {
        console.error('Auth check failed:', error)
      }
      finally {
        isCheckingAuth.value = false
      }
    }

    onMounted(checkAuth)

    watch(() => session.value, (newSession) => {
      if (!newSession && !isCheckingAuth.value) {
        router.push('/login')
      }
    })

    async function handleLogout() {
      try {
        await logout()
        router.push('/login')
      }
      catch (error) {
        console.error('Logout error:', error)
      }
    }

    const toggleMobileMenu = () => {
      isMobileMenuOpen.value = !isMobileMenuOpen.value
    }

    return {
      session,
      router,
      handleLogout,
      isLoading: isCheckingAuth,
      colorMode,
      toggleColorMode,
      isMobileMenuOpen,
      toggleMobileMenu,
    }
  },
})
</script>

<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between h-16">
        <div class="flex items-center">
          <h1 class="text-xl font-bold text-gray-900 dark:text-white">
            {{ isLoading ? 'Loading...' : (session?.data?.user?.role === 'admin' ? 'Admin Dashboard' : 'Employee Dashboard') }}
          </h1>
          <div class="hidden md:ml-8 md:flex md:items-center md:space-x-4">
            <RouterLink
              v-if="!isLoading && session?.data?.user?.role === 'admin'"
              :to="router.currentRoute.value.path === '/admin' ? '/' : '/admin'"
              class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 text-sm font-medium transition-colors duration-200"
              :class="{ 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400': router.currentRoute.value.path === '/admin' || router.currentRoute.value.path === '/home' }"
            >
              {{ router.currentRoute.value.path === '/admin' ? 'Dashboard' : 'Admin Panel' }}
            </RouterLink>
          </div>
        </div>

        <div class="flex items-center md:hidden">
          <button
            @click="toggleMobileMenu"
            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-6 w-6"
              :class="{ 'hidden': isMobileMenuOpen, 'block': !isMobileMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
            <svg
              class="h-6 w-6"
              :class="{ 'block': isMobileMenuOpen, 'hidden': !isMobileMenuOpen }"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="!isLoading && session?.data?.user" class="hidden md:flex md:items-center md:space-x-4">
          <button
            @click="toggleColorMode"
            class="p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
          >
            <svg v-if="colorMode.value === 'dark'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
            </svg>
            <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
            </svg>
          </button>
          <div class="flex items-center space-x-3">
            <div class="h-9 w-9 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
              <span class="text-blue-600 dark:text-blue-300 font-medium text-sm">
                {{ session.data.user.username?.charAt(0).toUpperCase() }}
              </span>
            </div>
            <div class="flex flex-col">
              <span class="text-sm font-medium text-gray-900 dark:text-white">{{ session.data.user.username }}</span>
              <span
                class="text-xs px-2 py-0.5 rounded-full font-medium"
                :class="{
                  'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300': session.data.user.role === 'admin',
                  'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300': session.data.user.role === 'employee',
                }"
              >
                {{ session.data.user.role }}
              </span>
            </div>
          </div>
          <button
            class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 dark:bg-red-500 dark:hover:bg-red-600"
            @click="handleLogout"
          >
            Logout
          </button>
        </div>

        <div v-else-if="isLoading" class="hidden md:flex md:items-center">
          <div class="animate-pulse flex space-x-4">
            <div class="h-9 w-9 rounded-full bg-gray-200 dark:bg-gray-700"></div>
            <div class="flex flex-col space-y-2">
              <div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div class="h-3 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
            </div>
          </div>
        </div>
      </div>

      <div
        v-if="isMobileMenuOpen"
        class="md:hidden"
      >
        <div class="px-2 pt-2 pb-3 space-y-1">
          <RouterLink
            v-if="!isLoading && session?.data?.user?.role === 'admin'"
            :to="router.currentRoute.value.path === '/admin' ? '/' : '/admin'"
            class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
            :class="{ 'text-blue-600 dark:text-blue-400 bg-gray-50 dark:bg-gray-700': router.currentRoute.value.path === '/admin' || router.currentRoute.value.path === '/home' }"
          >
            {{ router.currentRoute.value.path === '/admin' ? 'Dashboard' : 'Admin Panel' }}
          </RouterLink>
        </div>

        <div v-if="!isLoading && session?.data?.user" class="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <div class="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                <span class="text-blue-600 dark:text-blue-300 font-medium text-sm">
                  {{ session.data.user.username?.charAt(0).toUpperCase() }}
                </span>
              </div>
            </div>
            <div class="ml-3">
              <div class="text-base font-medium text-gray-800 dark:text-white">{{ session.data.user.username }}</div>
              <div class="text-sm font-medium text-gray-500 dark:text-gray-400">{{ session.data.user.role }}</div>
            </div>
            <button
              @click="toggleColorMode"
              class="ml-auto flex-shrink-0 p-2 rounded-lg text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700"
            >
              <svg v-if="colorMode.value === 'dark'" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clip-rule="evenodd" />
              </svg>
              <svg v-else class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            </button>
          </div>
          <div class="mt-3 px-2 space-y-1">
            <button
              class="w-full flex items-center px-3 py-2 text-base font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200 dark:bg-red-500 dark:hover:bg-red-600"
              @click="handleLogout"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
