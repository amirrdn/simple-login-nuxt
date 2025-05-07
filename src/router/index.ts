import { createRouter, createWebHistory } from 'vue-router'
import { useAuth } from '../composables/useAuth'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      redirect: to => {
        const { session } = useAuth()
        return session.value?.data?.user?.role === 'admin' ? '/admin' : '/home'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../pages/home.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../pages/admin.vue'),
      meta: { requiresAuth: true, requiresAdmin: true }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../pages/login.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const { isAuthenticated, session } = useAuth()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin)

  try {
    if (requiresAuth) {
      const isAuth = await isAuthenticated()
      if (!isAuth) {
        next('/login')
        return
      }

      if (requiresAdmin && session.value?.data?.user?.role !== 'admin') {
        next('/home')
        return
      }
    }

    if (to.path === '/login' && await isAuthenticated()) {
      next(session.value?.data?.user?.role === 'admin' ? '/admin' : '/home')
      return
    }

    next()
  }
  catch (error) {
    console.error('Navigation error:', error)
    next('/login')
  }
})

export default router 