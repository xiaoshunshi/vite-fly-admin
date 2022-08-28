
import { createPinia } from 'pinia'
import type { App } from 'vue'
import useUserStore from './modules/user'
import useAppStore from './modules/app'
import useSettingsStore from './modules/settings'

import usePermissionStore from './modules/usePermissionStore'

const store = createPinia()

export function registerStore( app:App ) {
  app.use( store )
}

export { useUserStore, useAppStore, useSettingsStore, usePermissionStore }

export default store
