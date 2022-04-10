import axios from 'axios'
import type { AxiosInstance } from 'axios'
// 注意loading的样式需要单独在main.ts中加载
import { ElLoading } from 'element-plus'
import { HYRequestInterceptors, HYRequestConfig } from './type'

// HYRequestInterceptors 自定义拦截器接口
// HYRequestConfig 拓展 AxiosRequestConfig 加入拦截器 和 showLoading

const DEFAULT_LOADING = true

class HYRequest {
  instace: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: any

  constructor(config: HYRequestConfig) {
    this.instace = axios.create(config)
    // 配置是否开启loading
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    // 保存传入的拦截器
    this.interceptors = config.interceptors
    this.instace.interceptors.request.use(
      this.interceptors?.requestInterceptors,
      this.interceptors?.requestInterceptorsCatch
    )
    this.instace.interceptors.response.use(
      this.interceptors?.responseInterceptors,
      this.interceptors?.responseInterceptorsCatch
    )
    this.instace.interceptors.request.use(
      (config) => {
        if (this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: 'Loading',
            background: 'rgba(0, 0, 0, 0.7)'
          })
        }
        // console.log('全局拦截器')
        return config
      },
      (err) => {
        return err
      }
    )
    this.instace.interceptors.response.use(
      (res) => {
        this.loading?.close()
        const data = res.data
        if (data.returnCode === '-1001') {
          // console.log('返回成功，请求失败')
        } else {
          return data
        }
      },
      (err) => {
        this.loading?.close()
        if (err.response.status === 404) {
          // console.log('404的错误')
        }
        return err
      }
    )
  }
  // 泛型T 由外界决定,T 表示Promise返回的数据类型
  request<T>(config: HYRequestConfig<T>): Promise<T> {
    // 使用promise是为了将结果导出给外界，不破坏被封装的代码
    return new Promise((resolve, reject) => {
      if (config.interceptors?.requestInterceptors) {
        // 执行单独出入的requestInterceptors，然后再将其返回
        config = config.interceptors.requestInterceptors(config)
      }
      if (config.showLoading === false) {
        this.showLoading = config.showLoading
      }
      this.instace
        .request<any, T>(config)
        .then((res) => {
          if (config.interceptors?.responseInterceptors) {
            // 单独请求的拦截器
            res = config.interceptors.responseInterceptors(res)
          }

          // 将请求返回的结果返回出去
          resolve(res)
          // console.log(res)
          // 重置showLoading,这样不会影响下一个请求
          this.showLoading = DEFAULT_LOADING
        })
        .catch((err) => {
          this.showLoading = DEFAULT_LOADING
          reject(err)
          return err
        })
    })
  }

  // 建立一些快捷请求
  get<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'GET' })
  }
  post<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'POST' })
  }
  delete<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
  patch<T>(config: HYRequestConfig<T>): Promise<T> {
    return this.request<T>({ ...config, method: 'PATCH' })
  }
}

export default HYRequest
