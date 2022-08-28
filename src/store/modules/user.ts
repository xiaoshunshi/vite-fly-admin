import { defineStore } from 'pinia'
import { userType } from '../types'
import { TOKEN, AVATAR } from '@/config/constant'
import cookies from '@/utils/cookies'
const useUserStore = defineStore( {
  id : 'users',
  state : ():userType => {
    return {
      token : '',
      avatar : AVATAR,
      roles : []
    }
  },
  actions : {
    SET_TOKEN( token = '' ) {
      token ? cookies.set( TOKEN, token ) : cookies.remove( TOKEN )
      this.token = token
    }

  }

} )

export default useUserStore
