import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/Home.vue')
  },
  {
    path: '/game',
    name: 'Game',
    component: () => import('@/views/Game.vue')
  },
  {
    path: '/ranking',
    name: 'Ranking',
    component: () => import('@/views/Ranking.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// TODO: 添加路由守卫
router.beforeEach((to, from, next) => {
  // TODO: 实现认证检查
  next()
})

export default router

