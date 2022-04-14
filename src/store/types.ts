// 专门用于存放自定义的接口
import { ILoginState } from './login/types'

export interface IRootState {
  name: string
  age: number
}

// 导出子模块的state类型
export interface IRootWidthModule {
  login: ILoginState
}

// 合并二者的类型/合并
export type IStoreType = IRootState & IRootWidthModule
