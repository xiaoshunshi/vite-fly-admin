import cookies from '@/utils/cookies'
import { defineStore } from 'pinia'
import { appType } from '../types'

const useAppStore = defineStore( {
  id : 'app',
  state : ():appType => {
    const status = cookies.get( 'sidebarStatus' )
    return {
      sidebar : {
        opened : status ? !!+status : true,
        withoutAnimation : false
      },
      device : 'desktop',
      size : cookies.get( 'size' ) || 'default',
      lang : cookies.get( 'lang' ) || 'zh'
    }
  },
  actions : {
    TOGGLE_SIDEBAR() {
      this.sidebar.opened = !this.sidebar.opened
      this.sidebar.withoutAnimation = false
      if ( this.sidebar.opened ) {
        cookies.set( 'sidebarStatus', 1 )
      } else {
        cookies.set( 'sidebarStatus', 0 )
      }
    },
    CLOSE_SIDEBAR( withoutAnimation: boolean ) {
      cookies.set( 'sidebarStatus', 0 )
      this.sidebar.opened = false
      this.sidebar.withoutAnimation = withoutAnimation
    },
    TOGGLE_DEVICE( device: string ) {
      this.device = device
    },
    SET_SIZE( size: string ) {
      this.size = size
      cookies.set( 'size', size )
    },
    SET_LANG( lang: string ) {
      this.lang = lang
      cookies.set( 'lang', lang )
    }
  }
} )

export default useAppStore
