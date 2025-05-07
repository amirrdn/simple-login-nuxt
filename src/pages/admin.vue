<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '../composables/useAuth'
import Navbar from '../components/Navbar.vue'
import { useHead, useNuxtApp } from '#imports'

const nuxtApp = useNuxtApp()

useHead({
  title: 'Admin Dashboard - Simple Login'
})

const stats = ref([
  { name: 'Total Users', value: '2,543', change: '+12.5%', changeType: 'increase' },
  { name: 'Active Sessions', value: '1,234', change: '+8.2%', changeType: 'increase' },
  { name: 'System Load', value: '42%', change: '-3.1%', changeType: 'decrease' },
  { name: 'Response Time', value: '245ms', change: '-12.3%', changeType: 'decrease' },
])

const recentActivities = ref([
  { id: 1, user: 'John Doe', action: 'Logged in', time: '2 minutes ago', type: 'login' },
  { id: 2, user: 'Jane Smith', action: 'Updated profile', time: '15 minutes ago', type: 'update' },
  { id: 3, user: 'Mike Johnson', action: 'Changed password', time: '1 hour ago', type: 'security' },
  { id: 4, user: 'Sarah Wilson', action: 'Logged out', time: '2 hours ago', type: 'logout' },
])

const users = ref([
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'employee', status: 'active' },
  { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'employee', status: 'inactive' },
  { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'employee', status: 'active' },
])

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
              Welcome to Admin Dashboard
            </h2>
            <p class="mt-2 text-sm text-gray-600 dark:text-gray-300">
              Monitor and manage your system from this central dashboard.
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

      <div class="mt-8 bg-white dark:bg-gray-800 shadow rounded-lg border border-gray-200 dark:border-gray-700">
        <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium leading-6 text-gray-900 dark:text-white">Users</h3>
        </div>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead class="bg-gray-50 dark:bg-gray-900">
              <tr>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Email</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Role</th>
                <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
              </tr>
            </thead>
            <tbody class="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              <tr v-for="user in users" :key="user.id">
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900 dark:text-white">{{ user.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500 dark:text-gray-400">{{ user.email }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300': user.role === 'admin',
                      'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300': user.role === 'employee'
                    }"
                  >
                    {{ user.role }}
                  </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <span
                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                    :class="{
                      'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300': user.status === 'active',
                      'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300': user.status === 'inactive'
                    }"
                  >
                    {{ user.status }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  </div>
</template>
