import http from '@/utils/request'
import { requestType } from './index'
// 登录

// export function login( data?:object ):requestType {
//   return http.request( {
//     method : 'post',
//     url : '/user/login',
//     data
//   } )
// }
export function login( data?: object ): requestType {
  return http.request( {
    method: 'post',
    url: '/user/login',
    data
  } )
}
