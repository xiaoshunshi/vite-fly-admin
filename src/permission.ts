import router from './router'
import { toRouteType } from './router/types'
import NProgress from '@/utils/progress'

router.beforeEach(async (to:toRouteType, form, next):Promise<void> => {
  NProgress.start()
  next()
})

router.afterEach(() => {
  NProgress.done()
})
