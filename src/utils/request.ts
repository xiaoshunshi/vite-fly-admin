import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import { ElMessage } from 'element-plus'
// import cookies from '@/utils/cookies'
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
      : ''

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
      if (!navigator.onLine) {
        ElMessage({
          message: '请检查您的网络是否正常',
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(new Error('请检查您的网络是否正常'))
      }

      // const token = cookies.get(TOKEN)
      return config
    })
    instance.interceptors.response.use((res:AxiosRequestConfig) => {
      console.log(res)
      //       config: {transitional: {…}, transformRequest: Array(1), transformResponse: Array(1), timeout: 86400000, adapter: ƒ, …}
      // data: {code: 200, data: {…}, msg: 'success'}
      // headers: {access-control-allow-credentials: 'true', access-control-allow-origin: 'http://localhost:3088', connection: 'close', content-length: '103', content-type: 'application/json; charset=utf-8', …}
      // request: XMLHttpRequest {onreadystatechange: null, readyState: 4, timeout: 86400000, withCredentials: false, upload: XMLHttpRequestUpload, …}
      // status: 200
      // statusText: "OK"
      const ressult = res.data
      const { code, msg } = ressult

      if (code === 200) {
        return ressult
      } else {
        ElMessage({
          message: msg || 'Error',
          type: 'error',
          duration: 3 * 1000
        })
        return Promise.reject(new Error(msg || 'Error'))
      }
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
