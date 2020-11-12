/**
 * @name Axios request module
 * @author SunSeekerX
 * @time 2019-08-13 10:29:11
 * @LastEditors SunSeekerX
 * @LastEditTime 2020-03-19 11:28:43
 */

import axios from 'axios'
import qs from 'qs'
// import { Toast } from 'vant'

import store from '@/store'
// import i18n from '@/lang/index'
import router from '@/router'
import { Message } from 'element-ui';
/**
 * @name Create request object
 * @param { Object } options options for axios.create
 * @returns { Object } request obj
 */


const b = (data) => {
  for (var i in data) {
    if (!data[i]) {
      delete data[i]
    }
  }
  return data
}
export default function createRequest (options) {
  // create an axios instance
  const instance = axios.create(
    Object.assign(
      {
        baseURL: process.env.VUE_APP_BASE_API,
        withCredentials: false,
        timeout: 15000
      },
      options
    )
  )

  // Request interceptor
  instance.interceptors.request.use(

    async config => {
      // Token
      config.headers['token'] = store.state.token
      switch (config.method) {
        case 'get':
          b(config.params)
          config.params
            ? (config.params._t = new Date().getTime())
            : (config.params = {
              _t: new Date().getTime()
            })
          // config.params._t = new Date().getTime()
          break
        case 'post':
          b(config.data)
          if (Object.prototype.toString.call(config.data) != '[object FormData]') {
            if (config.data && config.data.JSON) {
              delete config.data.JSON
            } else {
              config.data = qs.stringify(config.data)
            }
          }
          break
        case 'put':
          b(config.data)
          if (Object.prototype.toString.call(config.data) != '[object FormData]') {
            config.data = qs.stringify(config.data)
          }
          break
        default:
          break
      }
      return config
    },
    error => Promise.reject(error)
  )

  // Response interceptor
  instance.interceptors.response.use(
    response => {
      // 未设置状态码则默认(成功状态
      const code = parseInt(response.data.code) || 100;
      const success = response.data.success == null ? true : response.data.success;
      // 获取错误信息
      const msg = response.data.msg;
      if (code === 401) {
        sessionStorage.removeItem('USER_TOKEN')
        sessionStorage.removeItem('mapRoutes')
        sessionStorage.removeItem('route')
        Message({
          type: 'warning',
          message: '用户信息过期，请重新登录'
        })
        router.replace('/login')
      } else if (success == false) {
        Message({
          message: msg,
          type: 'error'
        })
        return response.data
      } else {
        return response.data
      }
    },
    error => Promise.reject(error)
  )

  return instance

  // Return service
  // return {
  //   request: async requestConfig => {
  //     const res = await service.request(requestConfig)
  //     // Api code 401 and have token
  //     if (res && res.code === '401' && store.state.token) {
  //       // Get new token
  //       const getNewTokenRes = await service.request({
  //         url: `${process.env.VUE_APP_BASE_API_2}/user/getNewToken`,
  //         method: 'post',
  //         headers: {
  //           token: store.state.token
  //         },
  //         data: {
  //           refreshToken: store.state.refreshToken
  //         }
  //       })
  //       // Get new token success
  //       if (getNewTokenRes.success) {
  //         // Update vuex token
  //         store.commit('UPDATE_TOKEN', { token: getNewTokenRes.obj.token })
  //         // Re request
  //         return await service.request(requestConfig)
  //       } else {
  //         // Get new token fail redirect to login
  //         store.commit('USER_LOGIN_OUT')
  //         // To login
  //         if (router.currentRoute.fullPath !== '/login') {
  //           router.replace('/login')
  //         }
  //         return Promise.reject(401)
  //       }
  //     } else {
  //       return res
  //     }
  //   }
  // }
}
