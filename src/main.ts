import { createApp } from 'vue'
import router, { setupRouter } from './router' // 路由
import { createPinia } from 'pinia'
import App from './App.vue'
import 'normalize.scss/normalize.scss'
const app = createApp(App)
app.use(createPinia())
setupRouter(app) // 引入路由
router.isReady().then(() => {
  app.mount('#app')
})
