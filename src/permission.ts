import router from './router'
import { toRouteType } from './router/types'
import NProgress from '@/utils/progress'

import { TOKEN } from '@/config/constant'
import cookies from './utils/cookies'
const whiteList = ['/login']
router.beforeEach(async (to:toRouteType, form, next):Promise<void> => {
  NProgress.start()

  const hasToken = cookies.get(TOKEN)
  if (hasToken && hasToken !== 'undefined') {
    // 有token
    if (to.path === '/login') {
      // 是登录页面，直接转入到首页，不让二次登录
      next({ path: '/' })
      NProgress.done()
    } else {
      // 跳转的不是登录页面
      next()
    }
  } else {
    // 没有token
    // 检测是否在系统白名单内部
    if (whiteList.indexOf(to.path) !== -1) {
      // 在白名单，直接放行
      next()
    } else {
      // 否则跳转到登录页面
      next('/login')
      NProgress.done()
    }
  }
})

router.afterEach(() => {
  NProgress.done()
})
