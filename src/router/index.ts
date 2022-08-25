import type { AppRouteRecordRaw } from '@/router/types'

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
