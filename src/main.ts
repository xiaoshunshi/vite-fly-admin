import { createApp } from 'vue'
import router, { setupRouter } from './router' // 路由
import { createPinia } from 'pinia'
import App from './App.vue'
import 'normalize.scss/normalize.scss'
import i18n from './lang'
const app = createApp(App)
app.use(createPinia())
app.use(i18n)
setupRouter(app) // 引入路由
router.isReady().then(() => {
  app.mount('#app')
})
