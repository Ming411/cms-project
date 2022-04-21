<template>
  <div class="role">
    <page-search :searchFormConfig="searchFormConfig"></page-search>
    <page-content
      :contentTableConfig="contentTableConfig"
      pageName="role"
      @newBtnClick="handleNewData"
      @editBtnClick="handleEditData"
    ></page-content>
    <page-model
      ref="pageModelRef"
      :modelConfig="modelConfig"
      :defaultInfo="defaultInfo"
      :otherInfo="otherInfo"
      pageName="role"
    >
      <div class="menu-tree">
        <el-tree
          :data="menus"
          ref="elTreeRef"
          show-checkbox
          node-key="id"
          :props="{ children: 'children', label: 'name' }"
          @check="handleCheckChange"
        />
      </div>
    </page-model>
  </div>
</template>

<script lang="ts">
import { useStore } from 'vuex'
import type { ElTree } from 'element-plus'
import { defineComponent, computed, ref, nextTick } from 'vue'
import PageSearch from '@/components/page-search'
import { searchFormConfig } from './config/search.config'
import PageContent from '@/components/page-content'
import { contentTableConfig } from './config/content.config'
import pageModel from '@/components/page-model'
import { modelConfig } from './config/model.config'
import { usePageModel } from '@/hooks/use-page-model'
import { menuMapLeafKeys } from '@/utils/map-menus'
export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch,
    pageModel
  },
  setup() {
    //处理usePageModel的hook
    const elTreeRef = ref<InstanceType<typeof ElTree>>()
    const editCallback = (item: any) => {
      const leafKeys = menuMapLeafKeys(item.menuList)
      // console.log(elTreeRef.value) // undefined 获取时组件还未创建
      nextTick(() => {
        // 菜单树的回显
        // console.log(elTreeRef.value)
        elTreeRef.value?.setCheckedKeys(leafKeys, false)
      })
    }
    const [defaultInfo, pageModelRef, handleNewData, handleEditData] =
      usePageModel(undefined, editCallback)
    // 从vuex中获取全部菜单
    const store = useStore()
    const menus = computed(() => store.state.entireMenu)

    // 获取树组件中的数据
    const otherInfo = ref({})
    const handleCheckChange = (data1: any, data2: any) => {
      // console.log(data1, '-------', data2)
      const checkedKeys = data2.checkedKeys
      const halfCheckedKeys = data2.halfCheckedKeys
      const menuList = [...checkedKeys, halfCheckedKeys]
      console.log(menuList)
      otherInfo.value = { menuList: menuList }
    }
    return {
      contentTableConfig,
      searchFormConfig,
      modelConfig,
      defaultInfo,
      pageModelRef,
      handleNewData,
      handleEditData,
      menus,
      otherInfo,
      handleCheckChange,
      elTreeRef
    }
  }
})
</script>

<style scoped>
.menu-tree {
  margin-left: 40px;
}
</style>
