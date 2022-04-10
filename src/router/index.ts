import { createRouter, createWebHistory } from 'vue-router'
// 加上一个type可以让代码更具有阅读性，一看就知道是一个类型
import type { RouteRecordRaw } from 'vue-router'
import localCache from '@/utils/cache'
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/main'
  },
  {
    path: '/login',
    name: 'login',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () =>
      import(/* webpackChunkName: "about" */ '@/views/main/main.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})
router.beforeEach((to) => {
  if (to.path !== '/login') {
    const token = localCache.getCache('token')
    if (!token) {
      return '/login'
    }
  }
})
export default router
