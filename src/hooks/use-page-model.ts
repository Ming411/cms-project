// 注意 hooks 中都为公共代码
// 不应该出现页面逻辑的代码，页面逻辑的写在页面中

import { ref } from 'vue'
import PageModel from '@/components/page-model'

type CallbackFn = () => void

export function usePageModel(newCb?: CallbackFn, editCb?: CallbackFn) {
  // 编辑的每一项的信息
  const defaultInfo = ref({})

  // 获取model组件实例
  const pageModelRef = ref<InstanceType<typeof PageModel>>()
  // 新增
  const handleNewData = () => {
    defaultInfo.value = {}
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    newCb && newCb()
  }
  // 编辑
  const handleEditData = (item: any) => {
    defaultInfo.value = { ...item }
    if (pageModelRef.value) {
      pageModelRef.value.dialogVisible = true
    }
    editCb && editCb()
  }
  return [defaultInfo, pageModelRef, handleNewData, handleEditData]
}
