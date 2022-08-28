import Cookies from 'js-cookie'
import { getEnvs } from './envs'
const { hostname } = window.location
interface ProxyCookie {
  getPrefix():string
  getAll():any
  clearAll():void
  get( key:string, hasPrefix:boolean ):any
  set( key:string, value:any, params:any ):any
  remove( key:string, hasPrefix:boolean ):any
}

class CookiesProxy implements ProxyCookie {
  protected prefix:string
  protected baseParams:any
  constructor() {
    this.prefix = this.getPrefix()
    this.baseParams = {
      expires : 7,
      path : '/',
      domain : hostname || undefined
      // Secure : true,
      // SameSite : 'none',
    }
  }

  getPrefix():string {
    const { envStr } = getEnvs()
    let cookiePreFix
    if ( envStr === 'dev' ) {
      cookiePreFix = 'dev_'
    } else {
      cookiePreFix = 'pro_'
    }
    return cookiePreFix
  }

  getAll():any {
    return Cookies.get()
  }

  clearAll(): void {
    const keys = Object.keys( this.getAll() )
    keys.forEach( key => {
      this.remove( key, false )
    } )
  }

  get( key: string, hasPrefix = true ) {
    const keyStr = hasPrefix ? this.prefix + '' + key : key
    return Cookies.get( keyStr )
  }

  set( key: string, value: any, params?: any ) {
    const options = params === undefined ? this.baseParams : params
    const keyStr = this.prefix + '' + key
    return Cookies.set( keyStr, value, options )
  }

  remove( key: string, hasPrefix = true ) {
    const keyStr = !hasPrefix ? key : this.prefix + '' + key
    return Cookies.remove( keyStr, {
      path : '/',
      domain : hostname
    } )
  }
}

const cookies = new CookiesProxy()

export default cookies
