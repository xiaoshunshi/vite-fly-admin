
import { createPinia } from 'pinia'
import type { App } from 'vue'
const store = createPinia()

export function registerStore (app:App) {
  app.use(store)
}

export default store
