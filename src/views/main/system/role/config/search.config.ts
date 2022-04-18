import type { IForm } from '@/base-ui/form'
const searchFormConfig: IForm = {
  formItems: [
    {
      field: 'name',
      type: 'input',
      label: '角色名称',
      rules: [],
      placeholder: '请输入角色名称'
    },
    {
      field: 'intro',
      type: 'input',
      label: '权限介绍',
      rules: [],
      placeholder: '请输入权限介绍'
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      rules: [],
      otherOptions: {
        'start-placeholder': '开始时间',
        'end-placeholder': '结束时间',
        type: 'datetimerange'
      }
    }
  ],
  labelWidth: '120px',
  colLayout: {
    xl: 6,
    lg: 8,
    md: 12,
    sm: 24,
    xs: 25
  },
  itemStyle: {
    padding: '10px 30px'
  }
}
export { searchFormConfig }
