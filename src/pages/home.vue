<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuth } from '../composables/useAuth'
import Navbar from '../components/Navbar.vue'
import { useHead, useNuxtApp } from '#imports'

const { session } = useAuth()
const router = useRouter()
const nuxtApp = useNuxtApp()

const stats = ref([
  { name: 'Tasks Completed', value: '12', change: '+2', changeType: 'increase' },
  { name: 'Hours Worked', value: '32', change: '+8', changeType: 'increase' },
  { name: 'Projects', value: '3', change: '0', changeType: 'neutral' },
  { name: 'Team Members', value: '8', change: '+1', changeType: 'increase' },
])

const recentActivities = ref([
  { id: 1, user: 'You', action: 'Completed task', time: '1 hour ago', type: 'update' },
  { id: 2, user: 'Team Lead', action: 'Assigned new project', time: '3 hours ago', type: 'update' },
  { id: 3, user: 'You', action: 'Updated profile', time: '1 day ago', type: 'update' },
  { id: 4, user: 'System', action: 'Logged in', time: '2 days ago', type: 'login' },
])

useHead({
  title: 'Home - Simple Login'
})

onMounted(() => {
  if (nuxtApp.$client) {
    document.body.classList.add('loading')
    setTimeout(() => {
      document.body.classList.remove('loading')
    }, 100)
  }
})
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <Navbar />

    <main class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="px-6 py-5">
            <h2 class="text-xl font-semibold text-gray-900 dark:text-white">
              Welcome back, {{ session?.username }}!
            </h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Here's an overview of your work and activities.
            </p>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-1">
                <p class="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {{ stat.name }}
                </p>
                <p class="mt-2 flex items-baseline">
                  <span class="text-2xl font-semibold text-gray-900 dark:text-white">
                    {{ stat.value }}
                  </span>
                  <span
                    class="ml-2 text-sm font-medium"
                    :class="{
                      'text-green-600 dark:text-green-400': stat.changeType === 'increase',
                      'text-red-600 dark:text-red-400': stat.changeType === 'decrease',
                      'text-gray-600 dark:text-gray-400': stat.changeType === 'neutral'
                    }"
                  >
                    {{ stat.change }}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Recent Activities</h3>
        </div>
        <ul class="divide-y divide-gray-200 dark:divide-gray-700">
          <li
            v-for="activity in recentActivities"
            :key="activity.id"
            class="px-6 py-4"
          >
            <div class="flex items-center space-x-4">
              <div class="flex-1 min-w-0">
                <p class="text-sm font-medium text-gray-900 dark:text-white truncate">
                  {{ activity.user }}
                </p>
                <p class="text-sm text-gray-500 dark:text-gray-400 truncate">
                  {{ activity.action }}
                </p>
              </div>
              <div class="text-sm text-gray-500 dark:text-gray-400">
                {{ activity.time }}
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div class="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-if="session?.role === 'admin'"
          class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700 hover:shadow-md transition-shadow duration-200"
        >
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756.426-1.756 2.924 0 3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                  Admin Panel
                </h4>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Access admin controls and settings
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                  My Tasks
                </h4>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  View and manage your tasks
                </p>
              </div>
            </div>
            <div class="mt-6">
              <button
                class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
              >
                View Tasks
              </button>
            </div>
          </div>
        </div>

        <div class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg border border-gray-200 dark:border-gray-700">
          <div class="p-6">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <svg
                  class="h-6 w-6 text-blue-600 dark:text-blue-400"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div class="ml-4">
                <h4 class="text-lg font-medium text-gray-900 dark:text-white">
                  Profile
                </h4>
                <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  Update your profile information
                </p>
              </div>
            </div>
            <div class="mt-6">
              <button
                class="w-full inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-offset-gray-800"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
