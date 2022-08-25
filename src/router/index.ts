import type { AppRouteRecordRaw } from '@/router/types'
import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'

export const constantRoutes:AppRouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
      title: '登录'
    }
  }
]

export const asyncRoutes: AppRouteRecordRaw[] = [

]

const router:Router = createRouter({
  history: createWebHashHistory('./'),
  routes: constantRoutes.concat(asyncRoutes) as unknown as RouteRecordRaw[],
  scrollBehavior: () => ({ left: 0, top: 0 })
})

export default router
