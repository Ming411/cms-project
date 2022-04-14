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
      <div>面包屑</div>
      <div class="user-info">
        <user-info />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import userInfo from './user-info.vue'
export default defineComponent({
  // 首先定义要传递的事件
  emits: ['foldChange'],
  components: {
    userInfo
  },
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldClick = () => {
      isFold.value = !isFold.value
      // 触发传递事件，传值
      emit('foldChange', isFold.value)
    }
    return {
      isFold,
      handleFoldClick
    }
  }
})
</script>

<style lang="less" scoped>
.nav-header {
  display: flex;
  width: 100%;
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
