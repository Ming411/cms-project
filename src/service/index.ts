import HYRequest from './request'
import { BASE_URL, TIME_OUT } from './request/config'
const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptors: (config: any) => {
      const token = ''
      if (token) {
        config.headers['Authorization'] = `Bearer ${token}`
      }
      console.log('每个实例的拦截器')
      return config
    },
    requestInterceptorsCatch: (err) => {
      return err
    },
    responseInterceptors: (res) => {
      return res
    },
    responseInterceptorsCatch: (err) => {
      return err
    }
  }
})
export default hyRequest
