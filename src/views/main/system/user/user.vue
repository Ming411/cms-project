<template>
  <div class="user">
    <page-search
      :searchFormConfig="searchFormConfig"
      @resetBtnClick="handleResetClick"
      @queryBtnClick="handleQueryClick"
    />
    <page-content
      ref="pageContentRef"
      :contentTableConfig="contentTableConfig"
      pageName="users"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      ref="pageModelRef"
      :modelConfig="modelConfigRef"
      :defaultInfo="defaultInfo"
      pageName="users"
    ></page-model>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store'
import PageModel from '@/components/page-model'

import { modelConfig } from './config/model.config'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'

import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'

import { usePageSearch } from '@/hooks/use-page-search'
import { usePageModel } from '@/hooks/use-page-model'
export default defineComponent({
  name: 'user',
  components: {
    PageSearch,
    PageContent,
    PageModel
  },
  // setup相当于create，只会在组件创建时执行一次，刷新不会再次执行
  setup() {
    // pageModel相关的逻辑,控制密码框是否显示
    const newCallback = () => {
      // 新增显示密码
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      // ! 表示非空断言，表示passwordItem一定存在
      passwordItem!.isHidden = false
    }
    // 编辑隐藏密码
    const editCallback = () => {
      const passwordItem = modelConfig.formItems.find(
        (item) => item.field === 'password'
      )
      passwordItem!.isHidden = true
    }

    // 动态添加部分和角色
    const store = useStore()
    const modelConfigRef = computed(() => {
      // 当modelConfig数据改变重新赋值
      const departmentItem = modelConfig.formItems.find(
        (item) => item.field === 'departmentId'
      )
      const roleItem = modelConfig.formItems.find(
        (item) => item.field === 'roleId'
      )
      departmentItem!.options = store.state.entireDepartment.map((item) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      roleItem!.options = store.state.entireRole.map((item) => {
        return {
          title: item.name,
          value: item.id
        }
      })
      return modelConfig
    })
    // 数据请求是异步的，所以一开始是拿不到数据的
    /*  const departmentItem = modelConfig.formItems.find(
      (item) => item.field === 'departmentId'
    )
    const roleItem = modelConfig.formItems.find(
      (item) => item.field === 'roleId'
    )
    departmentItem!.options = store.state.entireDepartment.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    })
    roleItem!.options = store.state.entireRole.map((item) => {
      return {
        label: item.name,
        value: item.id
      }
    }) */
    // 代码依赖性少，相对独立，抽取为hook
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()
    const [defaultInfo, pageModelRef, handleNewData, handleEditData] =
      usePageModel(newCallback, editCallback)

    return {
      searchFormConfig,
      contentTableConfig,
      handleResetClick,
      handleQueryClick,
      pageContentRef,
      modelConfigRef,
      handleNewData,
      handleEditData,
      PageModel,
      pageModelRef,
      defaultInfo
    }
  }
})
</script>

<style scoped></style>
