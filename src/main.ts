import { createApp } from 'vue'
import router from './router' // 路由
import { createPinia } from 'pinia'
import App from './App.vue'
import 'normalize.scss/normalize.scss'
import '@/styles/index.scss' // global css
import i18n from './lang'
import './permission'
const app = createApp(App)
console.log(import.meta.env)

const initApp = async () => {
  app.use(router)
  app.use(createPinia())
  await router.isReady()
  app.use(i18n)
  app.mount('#app')
}

initApp()
