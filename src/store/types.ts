// 专门用于存放自定义的接口
import { ILoginState } from './login/types'
import { ISystemState } from './main/system/types'

export interface IRootState {
  name: string
  age: number
  entireDepartment: any[]
  entireRole: any[]
  entireMenu: any[]
}

// 导出子模块的state类型
export interface IRootWidthModule {
  login: ILoginState
  system: ISystemState
}

// 合并二者的类型/合并
export type IStoreType = IRootState & IRootWidthModule
