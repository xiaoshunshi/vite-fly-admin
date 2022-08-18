import { createApp } from 'vue'
import router, { setupRouter } from './router' // 路由
import App from './App.vue'
const app = createApp(App)
setupRouter(app) // 引入路由
router.isReady().then(() => {
  app.mount('#app')
})
