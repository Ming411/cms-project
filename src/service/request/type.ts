import type { AxiosRequestConfig, AxiosResponse } from 'axios'

// 属性不能直接接收泛型
export interface HYRequestInterceptors<T = AxiosResponse> {
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorsCatch?: (error: any) => any
  responseInterceptors?: (res: T) => T
  responseInterceptorsCatch?: (error: any) => any
}
export interface HYRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  // 扩展AxiosRequestConfig的类型,默认他是不支持自定义传入拦截器的
  interceptors?: HYRequestInterceptors<T>
  showLoading?: boolean
}
