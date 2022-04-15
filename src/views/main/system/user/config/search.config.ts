import type { IForm } from '@/base-ui/form'
const formConfig: IForm = {
  formItems: [
    {
      type: 'input',
      label: '用户名1',
      rules: [],
      placeholder: '请输入1'
    },
    {
      type: 'password',
      label: '用户名2',
      rules: [],
      placeholder: '请输入2'
    },
    {
      type: 'select',
      label: '用户名3',
      rules: [],
      placeholder: '请输入3',
      options: [
        {
          title: '篮球',
          value: 'basketball'
        },
        {
          title: '足球',
          value: 'football'
        }
      ]
    },
    {
      type: 'datepicker',
      label: '用户名4',
      rules: [],
      otherOptions: {
        'start-placeholder': '开始的时间',
        'end-placeholder': '结束的时间',
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
export default formConfig
