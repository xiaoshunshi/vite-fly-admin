
import { createPinia } from 'pinia'
import type { App } from 'vue'
import useUserStore from './modules/user'
const store = createPinia()

export function registerStore (app:App) {
  app.use(store)
}

export { useUserStore }

export default store
