<template>
  <div class="user">
    <div class="search">
      <hy-form :formItems="formItems" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import HyForm, { IFormItem } from '@/base-ui/form'
export default defineComponent({
  name: 'user',
  components: {
    HyForm
  },
  setup() {
    const formItems: IFormItem[] = [
      { type: 'input', label: '用户名1', rules: [], placeholder: '请输入1' },
      { type: 'password', label: '用户名2', rules: [], placeholder: '请输入2' },
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
    ]
    return {
      formItems
    }
  }
})
</script>

<style scoped></style>
