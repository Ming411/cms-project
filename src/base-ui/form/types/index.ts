type IFromType = 'input' | 'password' | 'select' | 'datepicker'

export interface IFormItem {
  type: IFromType
  label: string
  rules?: any[]
  placeholder?: any
  // 针对select
  options?: any[]
  // 针对其他特殊属性
  otherOptions?: any
}
