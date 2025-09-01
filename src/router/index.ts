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
    path: '/check/check-start',
    name: 'check.check-start',
    component: () => import('@/views/check/CheckStartView.vue'),
  },

  {
    path: '/check/im-safe',
    name: 'check.im-safe',
    component: () => import('@/views/check/ImSafeView.vue'),
  },

  {
    path: '/check/weather',
    name: 'check.weather',
    component: () => import('@/views/check/WeatherView.vue'),
  },

  {
    path: '/check/judge',
    name: 'check.judge',
    component: () => import('@/views/check/JudgeView.vue'),
  },

  {
    path: '/check/complete',
    name: 'check.complete',
    component: () => import('@/views/check/CompleteView.vue'),
  },

  {
    path: '/session/input-start',
    name: 'session.input-start',
    component: () => import('@/views/session/InputStartView.vue'),
  },

  {
    path: '/session/start-complete',
    name: 'session.start-complete',
    component: () => import('@/views/session/StartCompleteView.vue'),
  },

  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
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
