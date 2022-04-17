<template>
  <div class="nav-header">
    <el-icon
      v-show="!isFold"
      :size="30"
      class="fold-menu"
      @click="handleFoldClick"
      ><fold
    /></el-icon>
    <el-icon
      v-show="isFold"
      :size="30"
      class="fold-menu"
      @click="handleFoldClick"
      ><Expand
    /></el-icon>
    <div class="content">
      <div><hy-breadcumb :breadcrumbs="breadcrumbs" /></div>
      <div class="user-info">
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import userInfo from './user-info.vue'
import HyBreadcumb from '@/base-ui/breadcrumb'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { pathMapBreadcrumbs } from '@/utils/map-menus'
export default defineComponent({
  // 首先定义要传递的事件
  emits: ['foldChange'],
  components: {
    userInfo,
    HyBreadcumb
  },
  setup(props, { emit }) {
    const store = useStore()
    const route = useRoute()
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 触发传递事件，传值
      emit('foldChange', isFold.value)
    }
    // 面包屑的数据
    const breadcrumbs = computed(() => {
      // 必须要放到计算属性中，不然不具有响应式
      const menus = store.state.login.userMenus
      const path = route.path
      return pathMapBreadcrumbs(menus, path)
    })
    return {
      isFold,
      handleFoldClick,
      breadcrumbs
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
  align-items: center;
  .fold-menu {
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>
