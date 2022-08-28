import { createApp } from 'vue'
import router from './router' // 路由
import App from './App.vue'
import { registerStore } from './store'
import 'normalize.scss/normalize.scss'
import '@/styles/index.scss' // global css
import i18n from './lang'
import './permission'
const app = createApp( App )

const initApp = async() => {
  app.use( router )
  registerStore( app )
  await router.isReady()
  app.use( i18n )
  app.mount( '#app' )
}

initApp()
