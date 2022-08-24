import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { getEnvs } from './envs'
type optionsType = {
  url:string,
  method:string,
  data?:any
}
class HttpRequest {
  private baseUrl:string
  // 默认值为false。在获取同域资源时设置 withCredentials 没有影响。
  // true：在跨域请求时，会携带用户凭证
  // false：在跨域请求时，不会携带用户凭证；返回的 response 里也会忽略 cookie
  private withCredentials:boolean
  private timeout:number
  constructor () {
    this.baseUrl = this.getBaseUrl()
    this.withCredentials = false
    this.timeout = 60 * 60 * 24 * 1000
  }

  //   获取baseurl
  getBaseUrl ():string {
    const { envStr } = getEnvs()

    const baseUrlStr = envStr === 'dev'
      ? import.meta.env.VITE_PROXY_DOMAIN
      : '123456'

    return baseUrlStr
  }

  //   获取axios的基本配置信息
  getConfig () {
    const config = {
      baseURL: this.baseUrl,
      timeout: this.timeout,
      withCredentials: this.withCredentials,
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    return config
  }

  //  post 使用 data
  //  get 使用   params
  getParams (payload:any) {
    const { method, data } = payload

    if (['post', 'put', 'patch', 'delete'].indexOf(method) >= 0) {
      payload.data = data
    } else {
      payload.params = data
      delete payload.data
    }
    return payload
  }

  //   设置拦截
  setInterceptors (instance:AxiosInstance) {
    instance.interceptors.request.use((config:AxiosRequestConfig) => {
      return config
    })
    instance.interceptors.response.use((response:AxiosRequestConfig) => {
      return response
    })
  }

  request (options:optionsType) {
    const instance = axios.create()
    const baseOpt = this.getConfig()
    const params = Object.assign({}, baseOpt, this.getParams(options))
    this.setInterceptors(instance)
    return instance(params)
  }
}

const http = new HttpRequest()

export default http
