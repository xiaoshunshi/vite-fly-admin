import { defineStore } from 'pinia'
import { setType } from '../types'
import defaultSettings from '@/settings'
import { localStorageHandle } from '@/utils/storage'
const { sidebarLogo } = defaultSettings
const useSettingStore = defineStore( {
  id: 'settings',
  state: ():setType => {
    const localSidebarLogo = localStorageHandle.getItem( 'sidebarLogo' )
    return {
      sidebarLogo: localSidebarLogo ? !!+localSidebarLogo : sidebarLogo
    }
  }
} )

export default useSettingStore
