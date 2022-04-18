<template>
  <div class="content">
    <hy-table v-bind="contentTableConfig" :listData="DataList">
      <!-- header中的插槽 -->
      <template #handerHandler>
        <el-button type="success">新建用户</el-button>
        <el-button icon="refresh" type="primary">刷新</el-button>
      </template>
      <!-- 列中的插槽 -->
      <template #enable="scope">
        <el-button :type="scope.row.enable ? 'success' : 'danger'" plain>{{
          scope.row.enable ? '启用' : '禁用'
        }}</el-button>
      </template>
      <template #createAt="scope">
        <!-- scope是一个对象，里面包含插槽传递给我们的row对象 -->
        <strong>{{ $filters.formatTime(scope.row.createAt) }}</strong>
      </template>
      <template #updateAt="scope">
        <strong>{{ $filters.formatTime(scope.row.updateAt) }}</strong>
      </template>
      <template #handler>
        <div class="handler_btns">
          <el-button icon="edit" size="small" type="text">编辑</el-button>
          <el-button icon="delete" size="small" type="text">删除</el-button>
        </div>
      </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '@/store/index'
import HyTable from '@/base-ui/table'
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    HyTable
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getPageListAction', {
      // pageUrl: 'users/list',
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })
    // const DataList = computed(() => store.state.system.userList)
    const DataList = computed(() =>
      // 不能使用 . 的方式
      store.getters[`system/pageListData`](props.pageName)
    )
    return {
      DataList
    }
  }
})
</script>

<style scoped>
.content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
