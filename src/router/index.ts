import type { AppRouteRecordRaw } from '@/router/types'
import { createRouter, createWebHashHistory, Router, RouteRecordRaw } from 'vue-router'
import Layout from '@/layout/index.vue'
export const constantRoutes:AppRouteRecordRaw[] = [
  {
    path : '/login',
    name : 'Login',
    component : () => import( '@/views/login/index.vue' ),
    meta : {
      hidden : true,
      title : '登录'
    }
  }
]

export const asyncRoutes: AppRouteRecordRaw[] = [
  {
    path : '/',
    name : 'Dashboard',
    component : Layout,
    redirect : '/dashboard',
    meta : {
      title : '主页'
    },
    children : [
      {
        path : 'dashboard',
        name : 'Dashboard',
        component : () => import( '@/views/dashboard/index.vue' ),
        meta : {
          title : '主页',
          icon : 'dashboard',
          noCache : true,
          affix : true
        }
      }
    ]
  }

]

const router:Router = createRouter( {
  history : createWebHashHistory( './' ),
  routes : constantRoutes.concat( asyncRoutes ) as unknown as RouteRecordRaw[],
  scrollBehavior : () => ( { left : 0, top : 0 } )
} )

export default router
