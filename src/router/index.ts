import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'
import { useUserStore } from '@/stores/user'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue'),
  },

  {
    path: '/check',
    name: 'check',
    component: () => import('@/views/CheckView.vue'),
  },

  {
    path: '/check/imsafe',
    name: 'check.imsafe',
    component: () => import('@/views/check/ImSafeView.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
})

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()
  if (to.name === 'login') {
    return next()
  }
  if (await userStore.isAuthenticated()) {
    return next()
  } else {
    return next({ name: 'login' })
  }
})

export default router
